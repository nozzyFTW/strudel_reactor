import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const JsonButtons = () => {
    return (
        <>
            <Button id="save" variant="outline-primary">
                <i className="bi bi-download me-2"></i>
                Save to JSON
            </Button>
            <Button id="load" variant="outline-primary" className="ms-2">
                <i className="bi bi-upload me-2"></i>
                Load from JSON
            </Button>
        </>
    );
};
