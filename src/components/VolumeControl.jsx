import { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export const VolumeControl = ({ trackNumber, trackName, soloExists }) => {
    const [volume, setVolume] = useState(1);

    const [isMuted, setIsMuted] = useState(false);

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
                    disabled={isMuted}
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
                        id={`mute_${trackNumber}`}
                        variant={isMuted ? 'danger' : 'outline-danger'}
                        size="sm"
                        onClick={() => setIsMuted(!isMuted)}
                    >
                        Mute
                    </ToggleButton>
                </ButtonGroup>
            </div>
        </div>
    );
};
