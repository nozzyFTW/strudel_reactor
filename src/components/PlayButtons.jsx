import { ButtonGroup, Button } from 'react-bootstrap';

export const PlayButtons = ({ globalEditor }) => {
    return (
        <>
            <Button id="play" variant="outline-success" onClick={() => globalEditor.evaluate()}>
                Play
            </Button>
            <Button id="stop" variant="outline-danger" onClick={() => globalEditor.stop()}>
                Stop
            </Button>
        </>
    );
};
