import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

// JSON Structure Design:
// {
//     ProcText: ...,
//     CPS: ...,
//     Volumes: {
//         track1: ...,
//         track2: ...,
//         ...
//     },
//     MuteStatus: {
//         track1: ...,
//         track2: ...,
//         ...
//     },
//     ReverbSettings: {
//         track1: {
//             room: ...,
//             roomSize: ...,
//             roomFade: ...,
//             roomLowPass: ...,
//         },
//         track2: {
//             room: ...,
//             roomSize: ...,
//             roomFade: ...,
//             roomLowPass: ...,
//         },
//         ...
//     }
// }

export const JsonButtons = ({ trackEffectMap, handleProcessing }) => {
    const handleSave = () => {
        let json = {};
        const val = document.getElementById('proc').value;
        json['ProcText'] = val;

        json['Volumes'] = {};
        json['MuteStatus'] = {};
        json['ReverbSettings'] = {};

        for (const track in trackEffectMap) {
            json['Volumes'][track] = trackEffectMap[track].volume;
            json['MuteStatus'][track] = trackEffectMap[track].mute;
            json['ReverbSettings'][track] = trackEffectMap[track].reverb;
        }

        json = JSON.stringify(json);
        const blob = new Blob([json], { type: 'application/json' });
        downloadBlob(blob);
    };

    const downloadBlob = (blob) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = 'strudel_reactor_data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    /**
     * Will load a JSON file in, and set the ProcText area accordingly
     */
    const handleLoad = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;
                const json = JSON.parse(content);
                if (json.ProcText) {
                    document.getElementById('proc').value = json.ProcText;
                }
                if (json.Volumes) {
                    for (const [track, volume] of Object.entries(json.Volumes)) {
                        trackEffectMap[track].volume = volume;
                    }
                }
                if (json.MuteStatus) {
                    for (const [track, muteStatus] of Object.entries(json.MuteStatus)) {
                        trackEffectMap[track].mute = muteStatus;
                    }
                }
                if (json.ReverbSettings) {
                    for (const [track, reverbSettings] of Object.entries(json.ReverbSettings)) {
                        trackEffectMap[track].reverb = reverbSettings;
                    }
                }
                handleProcessing();
            };
            reader.readAsText(file);
        };
        input.click();
    };

    return (
        <>
            <Button id="save" variant="outline-primary" onClick={handleSave}>
                <i className="bi bi-download me-2"></i>
                Save to JSON
            </Button>
            <Button id="load" variant="outline-primary" className="ms-2" onClick={handleLoad}>
                <i className="bi bi-upload me-2"></i>
                Load from JSON
            </Button>
        </>
    );
};
