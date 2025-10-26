import { Accordion } from 'react-bootstrap';

import { VolumeControl } from '../VolumeControl';
import { ProcEditor } from '../ProcEditor';

// TODO: instruments will be updated with state from another component later
export const Settings = ({ instruments = 2, setGlobalEditor, handleProcessing }) => {
    const soloExists = false;

    return (
        <Accordion flush className="col-md-6">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Text to Preprocess</Accordion.Header>
                <Accordion.Body>
                    <ProcEditor
                        setGlobalEditor={setGlobalEditor}
                        handleProcessing={handleProcessing}
                    />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Volume</Accordion.Header>
                <Accordion.Body>
                    {Array.from({ length: instruments }, (_, i) => (
                        <VolumeControl key={i} trackNumber={i + 1} soloExists={soloExists} />
                    ))}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Coming Soon...</Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};
