import { Accordion } from 'react-bootstrap';
import styles from './Settings.module.scss';

import { VolumeControl } from '../VolumeControl';
import { ProcEditor } from '../ProcEditor';
import { JsonButtons } from '../JsonButtons';
import { SetCPS } from '../SetCPS';

// TODO: instruments will be updated with state from another component later
export const Settings = ({ setGlobalEditor, handleProcessing, tracks, extractTracks }) => {
    const soloExists = false;

    return (
        <Accordion flush className="col-md-6" defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item className={styles.header} eventKey="0">
                <Accordion.Header>Text to Preprocess</Accordion.Header>
                <Accordion.Body>
                    <div className="row mb-2">
                        <div className="col-md-6 mb-2">
                            <SetCPS />
                        </div>
                        <div className="col-md-6 mb-2">
                            <JsonButtons />
                        </div>
                    </div>
                    <ProcEditor
                        setGlobalEditor={setGlobalEditor}
                        handleProcessing={handleProcessing}
                    />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header onClick={extractTracks}>Volume</Accordion.Header>
                <Accordion.Body>
                    {Array.from({ length: tracks.length }, (_, i) => (
                        <VolumeControl
                            key={i}
                            trackNumber={i + 1}
                            trackName={tracks[i]}
                            soloExists={soloExists}
                        />
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
