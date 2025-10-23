import { VolumeControl } from '../VolumeControl';
import { Accordion } from 'react-bootstrap';

export const Settings = () => {
    return (
        <Accordion flush className="col-md-4">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Volume</Accordion.Header>
                <Accordion.Body>
                    <VolumeControl />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Coming Soon...</Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};
