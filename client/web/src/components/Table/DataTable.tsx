import React from 'react';
import {Spinner, Table} from "react-bootstrap";
import {DataRow} from "./index";

function DataTable(props: any) {
    if (props.data == null) {
        return (
            <Table><tbody><tr><td colSpan={0}><Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner></td></tr></tbody></Table>
        );
    } else if (props.data.length === 0) {
        return (<Table><tbody><tr>
                <td colSpan={0}>No data</td>
            </tr></tbody></Table>);
    } else {
        const keys = Object.keys(props.data[0]);
        return (
            <>
                <h2>{props.title}</h2>
                <Table>
                    <thead>
                    <tr>
                        {keys.map(k =>
                            <td key={k.toString()}>{k}</td>)}
                    </tr>
                    </thead>
                    <tbody>
                        {props.data.map((d: any) =>
                            <DataRow key={props.data.id} data={d}/>)}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default DataTable;
