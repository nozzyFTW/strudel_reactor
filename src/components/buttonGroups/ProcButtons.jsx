import { Button } from 'react-bootstrap';

export const ProcButtons = ({ globalEditor, handleProcessing }) => {
    /**
     * Handle Proc and Play button click
     * @param {Number} newValue
     */
    const handleProcPlayButtonClick = () => {
        if (globalEditor != null) {
            handleProcessing();
            globalEditor.evaluate();
        }
    };

    return (
        <>
            <Button id="process" variant="outline-primary" onClick={handleProcessing}>
                <i className="bi bi-sliders me-2"></i>
                Preprocess
            </Button>
            <Button id="process_play" variant="outline-primary" onClick={handleProcPlayButtonClick}>
                <i className="bi bi-arrow-repeat me-1"></i>
                Proc & Play
            </Button>
        </>
    );
};
