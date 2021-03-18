import React, { useMemo } from 'react';
// import axios from 'axios';
import { usePagination, useTable } from 'react-table';
import { GROUPED_COLUMNS } from './columns';
import './DisplayTable.css';
import { observer } from 'mobx-react';

function PaginationTable({ store }) {

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
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
    } = useTable({ columns, data }, usePagination)

    const { pageIndex, pageSize } = state;

    return (
        <>
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
                    page.map(row => {
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
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page: {' '}
                    <input type='number' defaultValue={pageIndex + 1} onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }} 
                    style={{ width: '50px' }}
                    />
                </span>
                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                >
                    {
                        [10, 25, 50, 75].map(pageSize => (
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        ))
                    }
                </select>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} >{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage} >Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage} >Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} >{'>>'}</button>
            </div>
        </>
    )
}

export default observer(PaginationTable)