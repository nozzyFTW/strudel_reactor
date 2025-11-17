import { Dial } from './Dial';

export const FilterControls = ({ trackEffectMap, setTrackEffectMap, setChangesActive }) => {
    /**
     * Handle LPF Setting change event
     * @param {Number} newValue
     */
    const handleLPFilterChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            global: {
                ...prevMap['global'],
                filter: {
                    ...prevMap['global'].filter,
                    low: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    /**
     * Handle BPF Setting change event
     * @param {Number} newValue
     */
    const handleBPFilterChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            global: {
                ...prevMap['global'],
                filter: {
                    ...prevMap['global'].filter,
                    band: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    /**
     * Handle HPF Setting change event
     * @param {Number} newValue
     */
    const handleHPFilterChange = (newValue) => {
        setTrackEffectMap((prevMap) => ({
            ...prevMap,
            global: {
                ...prevMap['global'],
                filter: {
                    ...prevMap['global'].filter,
                    high: newValue,
                },
            },
        }));
        setChangesActive(true);
    };

    const currentFilters = trackEffectMap?.['global']?.filter || {
        low: 0,
        band: 0,
        high: 0,
    };

    // Array of filter controls
    const filterControlList = [
        { name: 'Low', handlerFn: handleLPFilterChange, value: currentFilters.low },
        { name: 'Mid', handlerFn: handleBPFilterChange, value: currentFilters.band },
        { name: 'High', handlerFn: handleHPFilterChange, value: currentFilters.high },
    ];

    return (
        <div className="d-flex justify-content-between flex-wrap" style={{ width: '100%' }}>
            {filterControlList.map((control, index) => (
                <Dial
                    key={index}
                    effectType={control.name}
                    minValue={0}
                    maxValue={20000}
                    handler={control.handlerFn}
                    value={control.value}
                />
            ))}
        </div>
    );
};
