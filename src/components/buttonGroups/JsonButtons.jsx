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

export const JsonButtons = ({ trackEffectMap, setTrackEffectMap, handleProcessing }) => {
    /**
     * Handle save button click.
     * Takes data from trackEffectMap and appends it to a JSON format.
     */
    const handleSave = () => {
        let json = {};

        const val = document.getElementById('proc').value;
        json['ProcText'] = val;

        json['cps'] = trackEffectMap['global'].cps;
        json['Volumes'] = {};
        json['MuteStatus'] = {};
        json['ReverbSettings'] = {};
        json['FilterSettings'] = trackEffectMap['global']?.filter;

        for (const track in trackEffectMap) {
            json['Volumes'][track] = trackEffectMap[track].volume;
            json['MuteStatus'][track] = trackEffectMap[track].mute;
            json['ReverbSettings'][track] = trackEffectMap[track].reverb;
        }

        json = JSON.stringify(json);

        // generate downloadable JSON file from JSONified data
        const blob = new Blob([json], { type: 'application/json' });
        downloadBlob(blob);
    };

    /**
     * Handle download of JSON Blob, simulating button click.
     * @param {Blob} blob file blob to download (containing JSON file)
     */
    const downloadBlob = (blob) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = 'strudel_reactor_data.json';
        a.click();

        // cleans up memory taken by URL object
        URL.revokeObjectURL(url);
    };

    /**
     * Will load a JSON file in, and set the Proc textarea accordingly.
     * The trackEffectMap will also be populated with each track's associated
     * effect setting.
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
                const jsonData = JSON.parse(JSON.stringify(trackEffectMap));

                if (json.ProcText) {
                    document.getElementById('proc').value = json.ProcText;
                }
                if (json.cps) {
                    jsonData['global'] = { ...(jsonData['global'] || {}), cps: json.cps };
                }
                if (json.Volumes) {
                    for (const [track, volume] of Object.entries(json.Volumes)) {
                        if (!jsonData[track]) jsonData[track] = {};
                        jsonData[track].volume = volume;
                    }
                }
                if (json.MuteStatus) {
                    for (const [track, muteStatus] of Object.entries(json.MuteStatus)) {
                        if (!jsonData[track]) jsonData[track] = {};
                        jsonData[track].mute = muteStatus;
                    }
                }
                if (json.ReverbSettings) {
                    for (const [track, reverbSettings] of Object.entries(json.ReverbSettings)) {
                        if (!jsonData[track]) jsonData[track] = {};
                        jsonData[track].reverb = reverbSettings;
                    }
                }
                if (json.FilterSettings) {
                    jsonData['global'] = {
                        ...(jsonData['global'] || {}),
                        filter: json.FilterSettings,
                    };
                }
                setTrackEffectMap(jsonData);
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
