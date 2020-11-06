import React, { FC } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, InputAdornment, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: 'inherit',
  },
}))

interface Props {
  preGlobalFilteredRows: any,
  globalFilter: any,
  setGlobalFilter: any
}

const GlobalFilter: FC<Props> = ({preGlobalFilteredRows, globalFilter, setGlobalFilter}) => {
  const classes = useStyles()
  const count = preGlobalFilteredRows.length

  // Global filter only works with pagination from the first page.
  // This may not be a problem for server side pagination when
  // only the current page is downloaded.

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={1}
    >
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined" 
              value={globalFilter || ''}
              onChange={e => {
                setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
              }}
              placeholder={`${count} rækker...`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              classes={{
                root: classes.inputRoot,
                // input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
        </Grid>
    </Grid>
  )
}

export default GlobalFilter



