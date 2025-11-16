import { Form } from 'react-bootstrap';
import { MuteControls } from './MuteControls';

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
    /**
     * Handle Track Volume Slider Setting change event
     * @param {Number} newValue
     */
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
                <MuteControls
                    trackName={trackName}
                    handleProcPlay={handleProcPlay}
                    trackEffectMap={trackEffectMap}
                    setTrackEffectMap={setTrackEffectMap}
                    soloTrack={soloTrack}
                    setSoloTrack={setSoloTrack}
                    setChangesActive={setChangesActive}
                />
            </div>
        </div>
    );
};
