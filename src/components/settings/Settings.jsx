import { Accordion, Col, Row } from 'react-bootstrap';
import styles from './Settings.module.scss';

import { VolumeControl } from '../controls/VolumeControl';
import { ProcEditor } from '../editors/ProcEditor';
import { JsonButtons } from '../buttonGroups/JsonButtons';
import { SetCPS } from '../controls/SetCPS';
import { ReverbControls } from '../controls/ReverbControls';
import { FilterControls } from '../controls/FilterControls';

export const Settings = ({
    setGlobalEditor,
    d3Data,
    setD3Data,
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
                    <Row className="mb-2">
                        <Col md={5}>
                            <SetCPS
                                trackEffectsMap={trackEffectMap}
                                setTrackEffectsMap={setTrackEffectMap}
                                setChangesActive={setChangesActive}
                            />
                        </Col>
                        <Col
                            md={7}
                            className="d-flex justify-content-end"
                            style={{ height: '36px' }}
                        >
                            <JsonButtons
                                trackEffectMap={trackEffectMap}
                                handleProcessing={handleProcessing}
                            />
                        </Col>
                    </Row>
                    <ProcEditor
                        setGlobalEditor={setGlobalEditor}
                        d3Data={d3Data}
                        setD3Data={setD3Data}
                        handleProcessing={handleProcessing}
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
            <Accordion.Item eventKey="3">
                <Accordion.Header>Filters</Accordion.Header>
                <Accordion.Body>
                    <FilterControls
                        setTrackEffectMap={setTrackEffectMap}
                        setChangesActive={setChangesActive}
                    />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};
