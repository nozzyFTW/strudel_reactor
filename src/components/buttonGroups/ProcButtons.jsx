import { Button } from 'react-bootstrap';

export const ProcButtons = ({ globalEditor, handleProcessing }) => {
    const handleProcPlayButtonClick = () => {
        if (globalEditor != null) {
            handleProcessing();
            globalEditor.evaluate();
        }
    };

    return (
        <>
            <Button id="process" variant="outline-primary" onClick={handleProcessing}>
                Preprocess
            </Button>
            <Button id="process_play" variant="outline-primary" onClick={handleProcPlayButtonClick}>
                Proc & Play
            </Button>
        </>
    );
};
