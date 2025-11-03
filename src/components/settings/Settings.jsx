import { Accordion } from 'react-bootstrap';
import styles from './Settings.module.scss';

import { VolumeControl } from '../VolumeControl';
import { ProcEditor } from '../ProcEditor';
import { JsonButtons } from '../JsonButtons';
import { SetCPS } from '../SetCPS';
import { ReverbControls } from '../ReverbControls';

export const Settings = ({
    setGlobalEditor,
    handleProcessing,
    handleProcPlay,
    tracks,
    tracksInitialised,
    setTracksInitialised,
    extractTracks,
    muteMap,
    setMuteMap,
    soloTrack,
    setSoloTrack,
    volumeMap,
    setVolumeMap,
    reverbSettings,
    setReverbSettings,
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
                                volumeMap={volumeMap}
                                muteMap={muteMap}
                                reverbSettings={reverbSettings}
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
                <Accordion.Header onClick={initTracks}>Volume</Accordion.Header>
                <Accordion.Body>
                    {tracks.map((track, i) => (
                        <VolumeControl
                            key={i}
                            trackNumber={i + 1}
                            trackName={track}
                            handleProcPlay={handleProcPlay}
                            muteMap={muteMap}
                            setMuteMap={setMuteMap}
                            soloTrack={soloTrack}
                            setSoloTrack={setSoloTrack}
                            volumeMap={volumeMap}
                            setVolumeMap={setVolumeMap}
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
                                    setReverbSettings={setReverbSettings}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                        {tracks.map((track, i) => (
                            <Accordion.Item key={i} eventKey={`${i + 1}`}>
                                <Accordion.Header>{track}</Accordion.Header>
                                <Accordion.Body>
                                    <ReverbControls
                                        trackName={track}
                                        setReverbSettings={setReverbSettings}
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
