import { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Dial } from './Dial';

export const VolumeControl = ({
    trackNumber,
    trackName,
    soloExists,
    handleProcPlay,
    muteMap,
    setMuteMap,
}) => {
    const [volume, setVolume] = useState(1);

    const [isSolo, setIsSolo] = useState(false);
    const handleSoloUpdate = ({}) => {
        if (!soloExists && isSolo) {
            setIsSolo(true);
            soloExists = true;
        } else if (soloExists && !isSolo) {
            setIsSolo(false);
            soloExists = false;
        }
    };

    const handleMuteUpdate = () => {
        setMuteMap((prevMuteMap) => ({
            ...prevMuteMap,
            [trackName]: !prevMuteMap[trackName],
        }));
        handleProcPlay();
    };

    return (
        <div className="inline-flex">
            Track {trackNumber} - {trackName}
            <div className="d-flex align-items-center justify-content-between">
                <Form.Range
                    id={`volume_${trackNumber}`}
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    style={{ width: '70%' }}
                    disabled={muteMap[trackName]}
                    onChange={(e) => setVolume(e.target.value)}
                />
                <ButtonGroup aria-label="Gain Buttons" style={{ width: '20%' }}>
                    <ToggleButton
                        id={`solo_${trackNumber}`}
                        variant={isSolo ? 'primary' : 'outline-primary'}
                        size="sm"
                        onClick={() => setIsSolo(!isSolo)}
                    >
                        Solo
                    </ToggleButton>
                    <ToggleButton
                        id={`${trackName}_mute`}
                        variant={muteMap[trackName] ? 'danger' : 'outline-danger'}
                        size="sm"
                        onClick={handleMuteUpdate}
                    >
                        Mute
                    </ToggleButton>
                </ButtonGroup>
            </div>
        </div>
    );
};
