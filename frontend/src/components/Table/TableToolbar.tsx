import React, { FC } from 'react';

import GlobalFilter from './GlobalFilter';
import Toolbar from '@material-ui/core/Toolbar';

interface Props {
    preGlobalFilteredRows: any
    setGlobalFilter: any
    globalFilter: any
}

const TableToolbar: FC<Props> = ({
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter
  }) => {

  return (
    <Toolbar>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
    </Toolbar>
  )
}

export default TableToolbar;
