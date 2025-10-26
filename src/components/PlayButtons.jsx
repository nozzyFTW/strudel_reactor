import { ButtonGroup, Button } from 'react-bootstrap';

export const PlayButtons = ({ globalEditor }) => {
    return (
        <ButtonGroup className="btn-group" role="group" aria-label="Play Controls">
            <Button id="play" variant="outline-success" onClick={() => globalEditor.evaluate()}>
                Play
            </Button>
            <Button id="stop" variant="outline-danger" onClick={() => globalEditor.stop()}>
                Stop
            </Button>
        </ButtonGroup>
    );
};
