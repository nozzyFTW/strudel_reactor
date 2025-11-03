import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const JsonButtons = ({ volumeMap, muteMap, reverbSettings, handleProcessing }) => {
    const handleSave = () => {
        // Eventual JSON Structure:
        //
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

        let json = {};
        const val = document.getElementById('proc').value;
        json['ProcText'] = val;
        json['Volumes'] = volumeMap;
        json['MuteStatus'] = muteMap;
        json['ReverbSettings'] = reverbSettings;

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
                        volumeMap[track] = volume;
                    }
                }
                if (json.MuteStatus) {
                    for (const [track, muteStatus] of Object.entries(json.MuteStatus)) {
                        muteMap[track] = muteStatus;
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
