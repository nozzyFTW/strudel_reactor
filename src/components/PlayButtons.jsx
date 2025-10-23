import { ButtonGroup, Button } from 'react-bootstrap';

export const PlayButtons = () => {
    return (
        <ButtonGroup className="btn-group" role="group" aria-label="Play Controls">
            <Button id="play" variant="outline-success">
                Play
            </Button>
            <Button id="stop" variant="outline-danger">
                Stop
            </Button>
        </ButtonGroup>
    );
};
