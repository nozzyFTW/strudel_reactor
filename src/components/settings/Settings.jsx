import { VolumeControl } from '../VolumeControl';
import { Accordion } from 'react-bootstrap';

// TODO: instruments will be updated with state from another component later
export const Settings = ({ instruments = 2 }) => {
    const soloExists = false;

    return (
        <Accordion flush className="col-md-4">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Volume</Accordion.Header>
                <Accordion.Body>
                    {Array.from({ length: instruments }, (_, i) => (
                        <VolumeControl key={i} trackNumber={i + 1} soloExists={soloExists} />
                    ))}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Coming Soon...</Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};
