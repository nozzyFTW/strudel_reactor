import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export const VolumeControl = ({
    trackNumber,
    trackName,
    handleProcPlay,
    soloTrack,
    setSoloTrack,
    trackEffectMap,
    setTrackEffectMap,
    setChangesActive,
}) => {
    const handleSoloUpdate = (status) => {
        if (status) {
            for (const track in trackEffectMap) {
                if (track !== trackName) {
                    setTrackEffectMap((prevMap) => ({
                        ...prevMap,
                        [track]: {
                            ...prevMap[track],
                            mute: true,
                        },
                    }));
                }
            }
            setSoloTrack(trackName);
            setChangesActive(true);
        } else {
            for (const track in trackEffectMap) {
                setTrackEffectMap((prevMap) => ({
                    ...prevMap,
                    [track]: {
                        ...prevMap[track],
                        mute: false,
                    },
                }));
            }
            setSoloTrack('');
            setChangesActive(true);
        }
        handleProcPlay();
    };

    const handleMuteUpdate = () => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            [trackName]: {
                ...prevMap[trackName],
                mute: !prevMap[trackName].mute,
            },
        }));
        setChangesActive(true);
        handleProcPlay();
    };

    const handleVolumeChange = (newVolume) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            [trackName]: {
                ...prevMap[trackName],
                volume: newVolume,
            },
        }));
        setChangesActive(true);
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
                    value={trackEffectMap?.[trackName]?.volume || 1}
                    style={{ width: '70%' }}
                    disabled={trackEffectMap[trackName]?.mute}
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
                        variant={trackEffectMap[trackName]?.mute ? 'danger' : 'outline-danger'}
                        size="sm"
                        onClick={handleMuteUpdate}
                    >
                        {trackEffectMap[trackName]?.mute ? 'Unmute' : 'Mute'}
                    </ToggleButton>
                </ButtonGroup>
            </div>
        </div>
    );
};
