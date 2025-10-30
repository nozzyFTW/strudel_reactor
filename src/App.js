import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { StrudelEditor } from './components/StrudelEditor';
import { Settings } from './components/settings/Settings';

export const App = () => {
    const [globalEditor, setGlobalEditor] = useState(null);
    const [tracks, setTracks] = useState([]);

    // Map track names to mute states
    const [muteMap, setMuteMap] = useState({});

    const handleProcessing = () => {
        let proc_text = document.getElementById('proc').value;
        let proc_text_replaced = proc_text;

        if (tracks.length === 0) {
            proc_text_replaced = proc_text.replaceAll(/<([A-Za-z][A-Za-z0-9_]*)_mute>/g, '');
        } else {
            tracks.forEach((track) => {
                proc_text_replaced = proc_text_replaced.replace(
                    `<${track}_mute>`,
                    processText(track)
                );
            });
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

        tracks.forEach((track) => {
            if (!(track in muteMap)) {
                setMuteMap((prevMuteMap) => ({
                    ...prevMuteMap,
                    [track]: false,
                }));
            }
        });
    };

    // Ensure processing occurs only once globalEditor is set
    useEffect(() => {
        if (globalEditor) {
            handleProcessing();
        }
    }, [globalEditor]);

    const processText = (track) => {
        let replace = '';
        if (muteMap[track]) {
            replace = '_';
        }
        // if (document.getElementById('flexRadioDefault2').checked) {
        //     replace = '_';
        // }
        return replace;
    };

    return (
        <>
            <Header globalEditor={globalEditor} handleProcessing={handleProcessing} />

            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <StrudelEditor />
                            <Settings
                                setGlobalEditor={setGlobalEditor}
                                handleProcessing={handleProcessing}
                                handleProcPlay={handleProcPlay}
                                tracks={tracks}
                                extractTracks={extractTracks}
                                muteMap={muteMap}
                                setMuteMap={setMuteMap}
                            />
                        </div>
                    </div>
                    <canvas id="roll"></canvas>
                </main>
            </div>
        </>
    );
};
