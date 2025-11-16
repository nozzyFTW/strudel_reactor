import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const PlayButtons = ({ globalEditor }) => {
    return (
        <>
            <Button id="play" variant="outline-success" onClick={() => globalEditor.evaluate()}>
                <i className="bi bi-play-fill me-1"></i>
                Play
            </Button>
            <Button id="stop" variant="outline-danger" onClick={() => globalEditor.stop()}>
                <i className="bi bi-stop-fill me-1"></i>
                Stop
            </Button>
        </>
    );
};
