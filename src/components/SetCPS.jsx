export const SetCPS = () => {
    return (
        <div className="input-group mb-3" style={{ width: '50%' }}>
            <span className="input-group-text" id="basic-addon1">
                CPS
            </span>
            <input
                type="text"
                className="form-control"
                placeholder="..."
                aria-label="CPS"
                aria-describedby="basic-addon1"
                style={{ minWidth: '50px' }}
            ></input>
        </div>
    );
};
