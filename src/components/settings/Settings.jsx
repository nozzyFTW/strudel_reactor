import { Accordion } from 'react-bootstrap';
import styles from './Settings.module.scss';

import { VolumeControl } from '../controls/VolumeControl';
import { ProcEditor } from '../editors/ProcEditor';
import { JsonButtons } from '../buttonGroups/JsonButtons';
import { SetCPS } from '../controls/SetCPS';
import { ReverbControls } from '../controls/ReverbControls';

export const Settings = ({
    setGlobalEditor,
    handleProcessing,
    handleProcPlay,
    tracks,
    tracksInitialised,
    setTracksInitialised,
    extractTracks,
    soloTrack,
    setSoloTrack,
    trackEffectMap,
    setTrackEffectMap,
    setChangesActive,
}) => {
    const initTracks = () => {
        if (tracksInitialised) return;
        extractTracks();
        setTracksInitialised(true);
    };

    return (
        <Accordion flush className={styles.accordionDark} defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
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
                                trackEffectMap={trackEffectMap}
                                handleProcessing={handleProcessing}
                            />
                        </div>
                    </div>
                    <ProcEditor
                        setGlobalEditor={setGlobalEditor}
                        handleProcessing={handleProcessing}
                        setChangesActive={setChangesActive}
                    />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header onClick={initTracks}>Volume</Accordion.Header>
                <Accordion.Body>
                    {tracks.map((track, i) => (
                        <VolumeControl
                            key={i}
                            trackNumber={i + 1}
                            trackName={track}
                            handleProcPlay={handleProcPlay}
                            soloTrack={soloTrack}
                            setSoloTrack={setSoloTrack}
                            trackEffectMap={trackEffectMap}
                            setTrackEffectMap={setTrackEffectMap}
                            setChangesActive={setChangesActive}
                        />
                    ))}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Reverb</Accordion.Header>
                <Accordion.Body>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Global Reverb</Accordion.Header>
                            <Accordion.Body>
                                <ReverbControls
                                    trackName="global"
                                    setTrackEffectMap={setTrackEffectMap}
                                    setChangesActive={setChangesActive}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                        {tracks.map((track, i) => (
                            <Accordion.Item key={i} eventKey={`${i + 1}`}>
                                <Accordion.Header>{track}</Accordion.Header>
                                <Accordion.Body>
                                    <ReverbControls
                                        trackName={track}
                                        setTrackEffectMap={setTrackEffectMap}
                                        setChangesActive={setChangesActive}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};
