import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table';

export const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);

    // useAsyncDebounce hook is used for filtering data when table has 1000's of rows; at that time performance of the filter will not be the same as before.
    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined)
    }, 1000)

    return (
        <span>
            Search: {' '}
            <input value={value || ''} onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
            }} />
        </span>
    )
}
