import { Accordion } from 'react-bootstrap';
import styles from './Settings.module.scss';

import { VolumeControl } from '../VolumeControl';
import { ProcEditor } from '../ProcEditor';
import { JsonButtons } from '../JsonButtons';
import { SetCPS } from '../SetCPS';

// TODO: instruments will be updated with state from another component later
export const Settings = ({
    setGlobalEditor,
    handleProcessing,
    handleProcPlay,
    tracks,
    muteMap,
    setMuteMap,
    volumeMap,
    setVolumeMap,
}) => {
    const soloExists = false;

    return (
        <Accordion flush className="col-md-6" defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item className={styles.header} eventKey="0">
                <Accordion.Header>Text to Preprocess</Accordion.Header>
                <Accordion.Body>
                    <div className="row mb-2">
                        <div className="col-md-5">
                            <SetCPS />
                        </div>
                        <div
                            className="col-md-7 d-flex justify-content-end"
                            style={{ height: '36px' }}
                        >
                            <JsonButtons
                                volumeMap={volumeMap}
                                muteMap={muteMap}
                                handleProcessing={handleProcessing}
                            />
                        </div>
                    </div>
                    <ProcEditor
                        setGlobalEditor={setGlobalEditor}
                        handleProcessing={handleProcessing}
                    />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Volume</Accordion.Header>
                <Accordion.Body>
                    {tracks.map((track, i) => (
                        <VolumeControl
                            key={i}
                            trackNumber={i + 1}
                            trackName={track}
                            soloExists={soloExists}
                            handleProcPlay={handleProcPlay}
                            muteMap={muteMap}
                            setMuteMap={setMuteMap}
                            volumeMap={volumeMap}
                            setVolumeMap={setVolumeMap}
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
