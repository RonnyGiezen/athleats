import React from 'react';
import Type from "./Type";
import DataBoolean from "./DataBoolean";

function DataCell(props: any) {
    return (
        <td>
            {visualize(props.data)}
        </td>
    );
}

function visualize(data: any){
    switch (Type.typeOf(data)) {
        case Type.BOOLEAN:
            return <DataBoolean data={data}/>
        default:
            return data;
    }
}

export default DataCell;
