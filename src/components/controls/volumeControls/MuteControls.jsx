import { ButtonGroup, ToggleButton } from 'react-bootstrap';

export const MuteControls = ({
    trackName,
    handleProcPlay,
    trackEffectMap,
    setTrackEffectMap,
    soloTrack,
    setSoloTrack,
    setChangesActive,
}) => {
    /**
     * Handle Track Solo Setting change event.
     * Should make track associated with Solo Button 'soloed' and
     * update all other tracks to be muted.
     *
     * @param {boolean} status TRUE - Solo button turned on,
     *                         FALSE - Solo button turned off
     */
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

    /**
     * Handle Track Mute Setting change event
     */
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

    return (
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
    );
};
