import './App.css';
import { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { StrudelEditor } from './components/StrudelEditor';
import { Settings } from './components/settings/Settings';

export const App = () => {
    const [globalEditor, setGlobalEditor] = useState(null);

    const handleProcessing = () => {
        let proc_text = document.getElementById('proc').value;
        let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', processText);
        processText(proc_text);
        globalEditor.setCode(proc_text_replaced);
    };

    // Ensure processing occurs only once globalEditor is set
    useEffect(() => {
        if (globalEditor) {
            handleProcessing();
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
                            />
                        </div>
                    </div>
                    <canvas id="roll"></canvas>
                </main>
            </div>
        </>
    );
};
