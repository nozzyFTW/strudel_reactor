import { ProcButtons } from './buttonGroups/ProcButtons';
import { PlayButtons } from './buttonGroups/PlayButtons';
import { Col, Row } from 'react-bootstrap';

export const Header = ({ globalEditor, handleProcessing, changesActive }) => {
    return (
        <Row
            className="d-flex justify-content-between align-items-center mb-3 text-white p-2"
            style={{ backgroundColor: '#222' }}
        >
            <Col md={5}>
                <h1 className="ms-1 mb-0" style={{ fontSize: '24px' }}>
                    Strudel Reactor
                </h1>
            </Col>
            <Col md={6}>
                <nav
                    className="d-flex justify-content-end me-3 align-items-center "
                    style={{ gap: '10px' }}
                >
                    <p className="mb-0" style={{ color: '#f88' }}>
                        {changesActive
                            ? 'Changes not processed yet. Click "Preprocess" to apply changes.'
                            : ''}
                    </p>
                    <ProcButtons globalEditor={globalEditor} handleProcessing={handleProcessing} />
                    <PlayButtons globalEditor={globalEditor} />
                </nav>
            </Col>
        </Row>
    );
};
