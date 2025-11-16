import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState, useRef } from 'react';

import { Header } from './components/Header';
import { StrudelEditor } from './components/editors/StrudelEditor';
import { Settings } from './components/settings/Settings';
import { Graph } from './components/Graph';

export const App = () => {
    const [globalEditor, setGlobalEditor] = useState(null);
    const [d3Data, setD3Data] = useState([]);

    // Array of Track Names
    const [tracks, setTracks] = useState([]);

    // True is tracks have been added to tracks array
    const [tracksInitialised, setTracksInitialised] = useState(false);

    // Will trigger navbar text "Changes not processed yet. Click "Preprocess" to apply changes."
    // changesActive is set to true whenever a filter is actioned
    const [changesActive, setChangesActive] = useState(false);

    // Map track names to state
    const [trackEffectMap, setTrackEffectMap] = useState({});

    // Ensures only one track is "solo"ed at a time
    const [soloTrack, setSoloTrack] = useState('');

    // useRef to keep originalCPS value across renders
    // not useState, as it only needs to be kept for handling purposes
    let originalCPS = useRef(null);

    /**
     * Processes Strudel Preprocess Tags
     */
    const handleProcessing = () => {
        setChangesActive(false);

        // get text from Text to Preprocess textarea
        let proc_text = document.getElementById('proc').value;
        let proc_text_replaced = proc_text;

        const controls = ['mute', 'volume', 'reverb'];
        // will set all tags to '' when there are no tracks detected.
        // tracks will generally not be detected due to not being initialised yet.
        if (tracks.length === 0) {
            // checks for word begin with alpha character, and contain alphanumeric
            // or underscore characters
            const trackRegex = '([A-Za-z][A-Za-z0-9_]*)';

            controls.forEach((control) => {
                // generate regex == /<([A-Za-z][A-Za-z0-9_]*)_CONTROL_NAME>/g
                // 'g' is global flag - required for replaceAll
                const regex = new RegExp(`<${trackRegex}_${control}>`, 'g');
                proc_text_replaced = proc_text_replaced.replaceAll(regex, '');
            });
        } else {
            // trigger process and replace for each track's control
            controls.forEach((control) => {
                tracks.forEach((track) => {
                    proc_text_replaced = proc_text_replaced.replace(
                        `<${track}_${control}>`,
                        processText(track, control)
                    );
                });
            });

            // Global reverb processing
            proc_text_replaced = proc_text_replaced.replace(
                '<global_reverb>',
                processText('global', 'reverb')
            );
        }

        // Global filter processing
        proc_text_replaced = proc_text_replaced.replace(
            '<global_low_pass>',
            processText('global', 'lpf')
        );
        proc_text_replaced = proc_text_replaced.replace(
            '<global_band_pass>',
            processText('global', 'bpf')
        );
        proc_text_replaced = proc_text_replaced.replace(
            '<global_high_pass>',
            processText('global', 'hpf')
        );

        // Global CPS processing
        const setCpsValue = `setcps(${originalCPS.current})`;
        // Comment out pre-existing setcps() Strudel code
        proc_text_replaced = proc_text_replaced.replace(setCpsValue, `// ${setCpsValue}`);
        // update to new cps value
        proc_text_replaced = proc_text_replaced.replace('<cps>', processText('global', 'cps'));

        // update Strudel Editor
        globalEditor.setCode(proc_text_replaced);

        // initialise tracks
        // do not init if already initialised
        if (!tracksInitialised) {
            extractTracks();
        }
    };

    /**
     * Handle Proc and Play button click event
     */
    const handleProcPlay = () => {
        if (globalEditor != null && globalEditor.repl.state.started === true) {
            handleProcessing();
            globalEditor.evaluate();
        }
    };

    /**
     * Extract the tracks from the Strudel code to be used throughout
     * the application. The tracks are primarily visible to the UI for
     * the Track Volume Controls.
     */
    const extractTracks = () => {
        // Guard Clause: tracks cannot be extracted when there is no
        //               Strudel code to process.
        if (!globalEditor?.code) return;

        // get pattern label (i.e. 'bassline:') accounting for any word combination
        // and any subsequent whitespace.
        const trackNameRegex = /([A-Za-z][A-Za-z0-9_]*)\s*:\s*$/;

        // get current setcps() Strudel code (i.e. 'setcps(140/60/4)')
        const cpsRegex = /setcps\([0-9/]*\)/;
        const foundTracks = [];

        globalEditor.code.split('\n').forEach((line) => {
            let match = line.match(trackNameRegex);
            // add found track if it isn't already found or in tracks array
            if (match && !tracks.includes(match[1]) && !foundTracks.includes(match[1])) {
                foundTracks.push(match[1]);
            }

            match = line.match(cpsRegex);
            if (match) {
                // extract the cps value in original setcps() - results in (i.e.) '140/60/4'
                originalCPS.current = match[0].replace('setcps(', '').replace(')', '');
            }
        });

        setTracks((prevTracks) => [...prevTracks, ...foundTracks]);

        // define the defaults for the majority of effects
        const defaultEffectSettings = {
            mute: false,
            volume: 1,
            reverb: {
                room: 0,
                roomSize: 0,
                roomFade: 0,
                roomLowPass: 0,
            },
        };

        setTrackEffectMap((prevMap) => {
            const newMap = { ...prevMap };

            if (!('global' in newMap)) {
                newMap['global'] = defaultEffectSettings;
                newMap['global'] = {
                    ...newMap['global'],
                    cps: originalCPS.current,
                };
            }

            foundTracks.forEach((track) => {
                if (!(track in newMap)) {
                    newMap[track] = defaultEffectSettings;
                }
            });
            return newMap;
        });
    };

    /**
     * Ensure first processing occurs only once globalEditor is set
     */
    useEffect(() => {
        if (globalEditor) {
            handleProcessing();
        }
    }, [globalEditor]);

    /**
     * Process the tags passed in through the Text to Preprocess textarea
     * into a Studel-accepted format.
     *
     * This will involve either removing the tag altogether or updating it to
     * a valid representation of the action.
     *
     * @param {String} track the track that the preprocess tag effects.
     * @param {String} action the action that the tag is a placeholder for (i.e. mute).
     * @returns Strudel recognised code or an empty string
     */
    const processText = (track, action) => {
        let replace = '';

        if (!trackEffectMap[track]) return '';

        // Process MUTE action
        if (trackEffectMap[track].mute && action === 'mute') {
            replace = '_';
        }
        // Process VOLUME SLIDER action
        else if (trackEffectMap[track].volume && action === 'volume') {
            replace = `.postgain(${trackEffectMap[track].volume})`;
        }
        // Process GLOBAL REVERB action
        else if (track === 'global' && action === 'reverb') {
            const settings = trackEffectMap['global'].reverb;
            replace = 'all(x => x';
            if (settings.room) {
                replace += `.room(${settings.room})`;
            }
            if (settings.lpf) {
                replace += `.rlp(${settings.roomLowPass})`;
            }
            if (settings.roomSize) {
                replace += `.rsize(${settings.roomSize})`;
            }
            if (settings.roomFade) {
                replace += `.rfade(${settings.roomFade})`;
            }
            replace = replace === 'all(x => x' ? '' : replace + ')';
        }
        // Process TRACK-BASED REVERB action
        else if (trackEffectMap[track].reverb && action === 'reverb') {
            const settings = trackEffectMap[track].reverb;
            if (settings.room) {
                replace += `.room(${settings.room})`;
            }
            if (settings.lpf) {
                replace += `.rlp(${settings.roomLowPass})`;
            }
            if (settings.roomSize) {
                replace += `.rsize(${settings.roomSize})`;
            }
            if (settings.roomFade) {
                replace += `.rfade(${settings.roomFade})`;
            }
        }
        // Process GLOBAL LPF action
        else if (trackEffectMap['global'].filter?.low && action === 'lpf') {
            replace = `all(x => x.lpf(${trackEffectMap['global'].filter.low}))`;
        }
        // Process GLOBAL BPF/MPF action
        else if (trackEffectMap['global'].filter?.band && action === 'bpf') {
            replace = `all(x => x.bpf(${trackEffectMap['global'].filter.band}))`;
        }
        // Process GLOBAL HPF action
        else if (trackEffectMap['global'].filter?.high && action === 'hpf') {
            replace = `all(x => x.hpf(${trackEffectMap['global'].filter.high}))`;
        }
        // Process GLOBAL CPS action
        else if (track === 'global' && action === 'cps') {
            replace = `setcps(${trackEffectMap['global'].cps})`;
        }
        return replace;
    };

    return (
        <>
            <Header
                globalEditor={globalEditor}
                handleProcessing={handleProcessing}
                changesActive={changesActive}
            />
            <div className="container-fluid d-flex" style={{ gap: '10px' }}>
                <div className="w-100">
                    <Graph graphData={d3Data} />
                    <StrudelEditor />
                </div>

                <div className="w-100">
                    <Settings
                        setGlobalEditor={setGlobalEditor}
                        d3Data={d3Data}
                        setD3Data={setD3Data}
                        handleProcessing={handleProcessing}
                        handleProcPlay={handleProcPlay}
                        tracks={tracks}
                        tracksInitialised={tracksInitialised}
                        setTracksInitialised={setTracksInitialised}
                        extractTracks={extractTracks}
                        soloTrack={soloTrack}
                        setSoloTrack={setSoloTrack}
                        trackEffectMap={trackEffectMap}
                        setTrackEffectMap={setTrackEffectMap}
                        setChangesActive={setChangesActive}
                    />
                </div>
            </div>
        </>
    );
};
