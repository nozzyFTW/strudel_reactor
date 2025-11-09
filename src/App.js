import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { StrudelEditor } from './components/editors/StrudelEditor';
import { Settings } from './components/settings/Settings';
import { Graph } from './components/Graph';
import { GraphTest } from './components/Graph';

export const App = () => {
    const [globalEditor, setGlobalEditor] = useState(null);
    const [d3Data, setD3Data] = useState([]);

    const [tracks, setTracks] = useState([]);
    const [tracksInitialised, setTracksInitialised] = useState(false);
    const [changesActive, setChangesActive] = useState(false);

    // Map track names to state
    const [trackEffectMap, setTrackEffectMap] = useState({});
    const [soloTrack, setSoloTrack] = useState('');

    const handleProcessing = () => {
        setChangesActive(false);
        let proc_text = document.getElementById('proc').value;
        let proc_text_replaced = proc_text;
        if (tracks.length === 0) {
            proc_text_replaced = proc_text_replaced.replaceAll(
                /<([A-Za-z][A-Za-z0-9_]*)_mute>/g,
                ''
            );
            proc_text_replaced = proc_text_replaced.replaceAll(
                /<([A-Za-z][A-Za-z0-9_]*)_volume>/g,
                ''
            );
            proc_text_replaced = proc_text_replaced.replaceAll(
                /<([A-Za-z][A-Za-z0-9_]*)_reverb>/g,
                ''
            );
        } else {
            tracks.forEach((track) => {
                proc_text_replaced = proc_text_replaced.replace(
                    `<${track}_mute>`,
                    processText(track, 'mute')
                );
                proc_text_replaced = proc_text_replaced.replace(
                    `<${track}_volume>`,
                    processText(track, 'volume')
                );
                proc_text_replaced = proc_text_replaced.replace(
                    `<${track}_reverb>`,
                    processText(track, 'reverb')
                );
            });

            // Global reverb processing
            proc_text_replaced = proc_text_replaced.replace(
                `<global_reverb>`,
                processText('global', 'reverb')
            );
        }

        globalEditor.setCode(proc_text_replaced);
        extractTracks();
    };

    const handleProcPlay = () => {
        if (globalEditor != null && globalEditor.repl.state.started === true) {
            handleProcessing();
            globalEditor.evaluate();
        }
    };

    const extractTracks = () => {
        if (!globalEditor?.code) return;

        const trackNameRegex = /([A-Za-z][A-Za-z0-9_]*)\s*:\s*$/;
        const foundTracks = [];

        globalEditor.code.split('\n').forEach((line) => {
            const match = line.match(trackNameRegex);
            if (match && !tracks.includes(match[1]) && !foundTracks.includes(match[1])) {
                foundTracks.push(match[1]);
            }
        });

        setTracks((prevTracks) => [...prevTracks, ...foundTracks]);

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
            }

            foundTracks.forEach((track) => {
                if (!(track in newMap)) {
                    newMap[track] = defaultEffectSettings;
                }
            });
            return newMap;
        });
    };

    // Ensure processing occurs only once globalEditor is set
    useEffect(() => {
        if (globalEditor) {
            handleProcessing();
        }
    }, [globalEditor]);

    const processText = (track, action) => {
        let replace = '';

        if (!trackEffectMap[track]) return '';

        if (trackEffectMap[track].mute && action === 'mute') {
            replace = '_';
        } else if (trackEffectMap[track].volume && action === 'volume') {
            replace = `.postgain(${trackEffectMap[track].volume})`;
        } else if (track === 'global' && action === 'reverb') {
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
        } else if (trackEffectMap[track].reverb && action === 'reverb') {
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
                <div style={{ width: '100%' }}>
                    <Graph graphData={d3Data} />
                    <StrudelEditor />
                </div>

                <div style={{ width: '100%' }}>
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
