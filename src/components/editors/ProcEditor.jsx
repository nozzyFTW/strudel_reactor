import { useEffect, useRef } from 'react';

import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../../tunes';
import console_monkey_patch from '../../console-monkey-patch';

export const ProcEditor = ({ setGlobalEditor, d3Data, setD3Data, handleProcessing }) => {
    const handleD3Data = (event) => {
        let tempArray = [...d3Data, event.detail];
        if (tempArray.length > 20) {
            tempArray.shift();
        }
        setD3Data(tempArray);
        console.log(d3Data);
    };

    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener('d3Data', handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio')
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            globalEditor.root.style.fontSize = '14px';
            setGlobalEditor(globalEditor);
            document.getElementById('proc').value = stranger_tune;
        }
    }, [setGlobalEditor, handleProcessing]);

    return (
        <div className="w-100" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <textarea className="form-control" rows="15" id="proc"></textarea>
        </div>
    );
};
