import React, { FC, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as auth from '../../api/auth';
import * as controllers from '../../api/controllers';
import APIRequest from '../../components/helpers/APIRequest';
import { ListSubmissions, SubmissionData } from '../../api/controllers/models';
import { Column, TableState } from 'react-table'
import Table from '../../components/Table';
import { ApiResponse } from '../../api';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
      },
      paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      }
}));

const List: FC = () => {
    const classes = useStyles();
    const [data, setData] = useState<any[]>([]);
    const [run, setRun] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [result, setResult] = useState<ApiResponse<SubmissionData[]>>({data: undefined, errorMessage: undefined, errorStatus: undefined});

    useEffect(() => {
      if (!run && isPending) {
      }
    }, [run, isPending, data.length]);

    const columns: Column<ListSubmissions>[] = React.useMemo(
      () => [
        {
          Header: 'First name',
          accessor: 'firstName',
        },
        {
          Header: 'Last name',
          accessor: 'lastName',
        },
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Serial numbers',
          accessor: 'number',
        },
        {
          Header: 'Redeemed',
          accessor: 'redeemed',
        },
      ],
      []
    );

    const RequestData = () => {
      return (
        <APIRequest<SubmissionData[]> 
            run={run} 
            setRun={setRun}
            pending={isPending}
            setIsPending={setIsPending} 
            req={() => controllers.adminGetAllSubmissions()}
            setData={setData}
            setResult={setResult}
            result={result}
        />
      );
    }

    return (
      <Grid container component="main" className={classes.root}>
        <RequestData />
        <CssBaseline />
        <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Acme Corporation Admin Panel
            </Typography>
          </div>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <Table<ListSubmissions> columns={columns} data={mapData(data)} initialState={undefined}/>
          </Grid>
        </Grid>
      </Grid>
    );
}

export default List;

export const mapData = (data: SubmissionData[] | undefined): ListSubmissions[] => {
  var res: ListSubmissions[] = []
  if (!data) {
    return res;
  }

  data.map(d => {
    if (d.serialNumbers.length == 0) {
      res.push({
        id: d.id,
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        number: "-",
        redeemed: 0
      });
    } else {
      d.serialNumbers.forEach(s => {
        res.push({
          id: d.id,
          firstName: d.firstName,
          lastName: d.lastName,
          email: d.email,
          number: s.number,
          redeemed: s.redeemed
        });
      })
    }

  });

  return res;
}