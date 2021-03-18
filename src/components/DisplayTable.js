import React, { useMemo } from 'react';
// import axios from 'axios';
import { useTable } from 'react-table';
import { GROUPED_COLUMNS } from './columns';
import './DisplayTable.css';
import { observer } from 'mobx-react';

function DisplayTable({ store }) {

    // console.log("Users----->", users);
    // console.log("COLUMNS----->", COLUMNS);
    
    console.log(store.users.slice())
    const dataStore = store.users.slice();
    const columns = useMemo(() => GROUPED_COLUMNS, []);
    const data = useMemo(() => dataStore, []);
    
    console.log("columns----->", columns);
    console.log("data----->", data);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <table {...getTableProps()}>
            <thead>
            {
                headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                            { column.render('Header') }
                            </th>
                        ))
                    }
                    </tr>
                ))
            }
            </thead>
            <tbody {...getTableBodyProps()}>
            {
                rows.map(row => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        {
                            row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>
                                { cell.render('Cell') }
                                </td>
                            )
                            })
                        }
                    </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default observer(DisplayTable)