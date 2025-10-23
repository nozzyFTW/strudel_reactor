import { ButtonGroup, Button, ToggleButton } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export const VolumeControl = () => {
    return (
        <div className="inline-flex">
            <p>Track 1</p>
            <div className="d-flex items-center">
                <Form.Range
                    id="volume_1"
                    min="0"
                    max="1"
                    step="0.1"
                    value="1"
                    style={{ width: '70%' }}
                />
                <ButtonGroup aria-label="Gain Buttons" style={{ width: '20%' }}>
                    <ToggleButton id="solo_1" variant="outline-primary">
                        Solo
                    </ToggleButton>
                    <ToggleButton id="mute_1" variant="outline-danger">
                        Mute
                    </ToggleButton>
                </ButtonGroup>
            </div>
        </div>
    );
};
