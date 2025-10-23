import { ButtonGroup, Button } from 'react-bootstrap';

export const ProcButtons = () => {
    return (
        <ButtonGroup className="btn-group" role="group" aria-label="Preprocess Controls">
            <Button id="process" variant="outline-primary">
                Preprocess
            </Button>
            <Button id="process_play" variant="outline-primary">
                Proc & Play
            </Button>
        </ButtonGroup>
    );
};
