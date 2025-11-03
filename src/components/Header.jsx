import { ProcButtons } from './ProcButtons';
import { PlayButtons } from './PlayButtons';

export const Header = ({ globalEditor, handleProcessing }) => {
    return (
        <div
            className="row d-flex justify-content-between align-items-center mb-3 text-white p-2"
            style={{ backgroundColor: '#222' }}
        >
            <h1 className="col-md-6 ms-1 mb-0" style={{ fontSize: '24px' }}>
                Strudel Reactor
            </h1>
            <div className="col-md-3">
                <nav className="d-flex justify-content-end me-3" style={{ gap: '10px' }}>
                    <ProcButtons globalEditor={globalEditor} handleProcessing={handleProcessing} />
                    <PlayButtons globalEditor={globalEditor} />
                </nav>
            </div>
        </div>
    );
};
