import { FormControl, InputGroup } from 'react-bootstrap';

export const SetCPS = ({ trackEffectsMap, setTrackEffectsMap, setChangesActive }) => {
    const handleCPSChange = (newValue) => {
        setTrackEffectsMap((prevMap) => ({
            ...prevMap,
            global: {
                ...prevMap['global'],
                cps: newValue,
            },
        }));
        setChangesActive(true);
    };

    return (
        <InputGroup className="mb-3 w-50">
            <InputGroup.Text>CPS</InputGroup.Text>
            <FormControl
                style={{ minWidth: '50px' }}
                placeholder="..."
                defaultValue={trackEffectsMap['global']?.cps}
                onChange={(e) => handleCPSChange(e.target.value)}
            ></FormControl>
        </InputGroup>
    );
};
