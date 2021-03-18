import React, { useMemo } from 'react';
// import axios from 'axios';
import { useFilters, useGlobalFilter, useTable } from 'react-table';
import { COLUMNS } from './columns';
import './DisplayTable.css';
import { observer } from 'mobx-react';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

function DisplayTable({ store }) {

    // console.log("Users----->", users);
    // console.log("COLUMNS----->", COLUMNS);
    
    console.log(store.users.slice())
    const dataStore = store.users.slice();
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => dataStore, []);
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])
    
    console.log("columns----->", columns);
    console.log("data----->", data);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        state,
        setGlobalFilter,
        prepareRow,
    } = useTable({ columns, data, defaultColumn }, useFilters, useGlobalFilter)

    const { globalFilter } = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                { column.render('Header') }
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
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
        </>
    )
}

export default observer(DisplayTable)