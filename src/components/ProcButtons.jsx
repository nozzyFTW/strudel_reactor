import { ButtonGroup, Button } from 'react-bootstrap';

export const ProcButtons = ({ globalEditor, handleProcessing }) => {
    const handleProcPlay = () => {
        if (globalEditor != null && globalEditor.repl.state.started === true) {
            console.log(globalEditor);
            handleProcessing();
            globalEditor.evaluate();
        }
    };

    const handleProcPlayButtonClick = () => {
        if (globalEditor != null) {
            console.log(globalEditor);
            handleProcessing();
            globalEditor.evaluate();
        }
    };

    return (
        <ButtonGroup className="btn-group" role="group" aria-label="Preprocess Controls">
            <Button id="process" variant="outline-primary" onClick={handleProcessing}>
                Preprocess
            </Button>
            <Button id="process_play" variant="outline-primary" onClick={handleProcPlayButtonClick}>
                Proc & Play
            </Button>
        </ButtonGroup>
    );
};
