import React from 'react';
import DataCell from "./DataCell";

function DataRow(props: any) {
    const keys = Object.keys(props.data);

    return (
        <tr>
            {keys.map(k =>
                <DataCell key={props.data.id+"_"+k} data={props.data[k]} />)}
        </tr>
    );
}

export default DataRow;
