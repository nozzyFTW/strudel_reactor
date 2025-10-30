import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { StrudelEditor } from './components/StrudelEditor';
import { Settings } from './components/settings/Settings';

export const App = () => {
    const [globalEditor, setGlobalEditor] = useState(null);
    const [tracks, setTracks] = useState([]);

    const handleProcessing = () => {
        let proc_text = document.getElementById('proc').value;
        let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', processText);
        processText(proc_text);
        globalEditor.setCode(proc_text_replaced);
    };

    const extractTracks = () => {
        const trackNameRegex = /^\s*(\w+):/;

        globalEditor.code.split('\n').forEach((line) => {
            const match = line.match(trackNameRegex);
            if (match && !tracks.includes(match[1])) {
                setTracks((prevTracks) => [...prevTracks, match[1]]);
            }
        });
    };

    // Ensure processing occurs only once globalEditor is set
    useEffect(() => {
        if (globalEditor) {
            handleProcessing();
            extractTracks();
        }
    }, [globalEditor]);

    const processText = () => {
        let replace = '';
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
                                tracks={tracks}
                                extractTracks={extractTracks}
                            />
                        </div>
                    </div>
                    <canvas id="roll"></canvas>
                </main>
            </div>
        </>
    );
};
