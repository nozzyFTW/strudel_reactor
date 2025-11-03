import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export const VolumeControl = ({
    trackNumber,
    trackName,
    handleProcPlay,
    muteMap,
    setMuteMap,
    soloTrack,
    setSoloTrack,
    volumeMap,
    setVolumeMap,
}) => {
    const handleSoloUpdate = (status) => {
        if (status) {
            for (const track in muteMap) {
                if (track !== trackName) {
                    setMuteMap((prevMuteMap) => ({
                        ...prevMuteMap,
                        [track]: true,
                    }));
                }
            }
            setSoloTrack(trackName);
        } else {
            for (const track in muteMap) {
                setMuteMap((prevMuteMap) => ({
                    ...prevMuteMap,
                    [track]: false,
                }));
            }
            setSoloTrack('');
        }
        handleProcPlay();
    };

    const handleMuteUpdate = () => {
        setMuteMap((prevMuteMap) => ({
            ...prevMuteMap,
            [trackName]: !prevMuteMap[trackName],
        }));
        handleProcPlay();
    };

    const handleVolumeChange = (newVolume) => {
        setVolumeMap((prevVolumeMap) => ({
            ...prevVolumeMap,
            [trackName]: newVolume,
        }));
        handleProcPlay();
    };

    return (
        <div className="inline-flex">
            Track {trackNumber} - {trackName}
            <div className="d-flex align-items-center justify-content-between">
                <Form.Range
                    id={`volume_${trackNumber}`}
                    min="0"
                    max="1"
                    step="0.1"
                    value={volumeMap?.[trackName] || 1}
                    style={{ width: '70%' }}
                    disabled={muteMap[trackName]}
                    onChange={(e) => handleVolumeChange(e.target.value)}
                />
                <ButtonGroup aria-label="Gain Buttons" style={{ width: '20%' }}>
                    <ToggleButton
                        id={`${trackName}_solo`}
                        variant={soloTrack === trackName ? 'primary' : 'outline-primary'}
                        size="sm"
                        onClick={() => handleSoloUpdate(soloTrack !== trackName)}
                        disabled={!!soloTrack && soloTrack !== trackName}
                    >
                        Solo
                    </ToggleButton>
                    <ToggleButton
                        id={`${trackName}_mute`}
                        variant={muteMap[trackName] ? 'danger' : 'outline-danger'}
                        size="sm"
                        onClick={handleMuteUpdate}
                    >
                        Mute
                    </ToggleButton>
                </ButtonGroup>
            </div>
        </div>
    );
};
