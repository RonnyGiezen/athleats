import React from 'react';
import './DataBoolean.css';

function DataBoolean(props: any) {
    const selected = props.data ? 'checkmark selected': 'checkmark ';
    return (
        <div className="data-boolean">
            <div key={selected} className={selected}/>
        </div>
    );
}

export default DataBoolean;
