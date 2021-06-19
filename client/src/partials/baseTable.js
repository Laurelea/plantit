
import {useTable} from "react-table";
import React from "react";
import MainStore from "../stores/MainStore";
import {observer} from "mobx-react";

const Reacttable = ({dbToPrint}) => {
        const columns = [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
            }
        ];
        // const data = await observer (MainStore.dbToPrint)
        const data = dbToPrint
        // console.log("MainStore.dbToPrint baseTable:", MainStore.dbToPrint)
        // const data = [
        //     {id: 1, name: "Gavrish"},
        //     {id: 2, name: "Aelita"}
        // ]
        console.log("Type of data: ", data)
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({
            columns,
            data,
        });
        return (
            <>
                {        console.log("Started table")
                }
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
                {        console.log("Finished table")
                }

            </>
        );

    }

export default Reacttable