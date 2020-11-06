import React from 'react'

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from './TablePaginationActions'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableToolbar from './TableToolbar'
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  Column,
  useFilters,
  TableState,
} from 'react-table'
import { makeStyles, Paper, TableFooter, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    //maxWidth: '20rem',
  },

  headerRow: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },

  tableRow: {
    [theme.breakpoints.down('sm')]: {
      borderBottom: "5px solid #ddd",
      display: "block",
    },
    "&:hover": {
      cursor: "pointer"
    }
  },

  tableCell: {
    [theme.breakpoints.down('sm')]: {
      borderBottom: "1px solid #ddd",
      display: "block",
      fontSize: "1em",
      textAlign: "right",
      fontWeight: "bold",
      marginBottom: "4%",
  
      "&::before": {
        content: '"" attr(label) ""',
        float: "left",
        textTransform: "uppercase",
        fontWeight: "normal",
        fontSize: ".85em",
      }
    }
  }
}));

interface ITable<T extends object> {
  columns: Column<T>[]
  data: T[]
  initialState: Partial<TableState<T>> | undefined
}

function EnhancedTable<T extends object>({columns,data,initialState}: ITable<T> & { children?: React.ReactNode }): React.ReactElement {
  const classes = useStyles();

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable<T>(
    {
      columns,
      data,
      initialState,
      //defaultColumn,
      //autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      // updateMyData,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        ...columns,
      ])
    }
  )

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    gotoPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(Number(event.target.value))
  }

  // Render the UI for your table
  return (
    <div>
    <Paper>
    <TableContainer>
      <TableToolbar
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <MaUTable {...getTableProps()} className={classes.table}>
        <TableHead className={classes.headerRow}>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                    {...(column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow 
                {...row.getRowProps()}
                className={classes.tableRow}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <TableCell
                      label={columns[index].Header?.toString()}
                      {...cell.getCellProps()}
                      className={classes.tableCell}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>

            )
          })}
        </TableBody>
        {data.length === 0 &&
          <TableFooter>
            <TableRow>
              <TableCell colSpan={headerGroups[0].headers.length} align="center">
                Ingen data
              </TableCell>
            </TableRow>
          </TableFooter>
        }
      </MaUTable>
    </TableContainer>
    <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                500
                //{ label: 'Alle', value: data.length },
              ]}
              component="div"
              colSpan={3}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              // labelRowsPerPage='Rækker per side'
              // SelectProps={{
              //   inputProps: { 'aria-label': 'Rækker per side' },
              //   //native: true,
              // }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
    </Paper >
    </div>
  )
}

export default EnhancedTable;