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

type FormValues = {
  email: string;
  password: string;
}

const Login: FC = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm<FormValues>();
    const history = useHistory();

    useEffect(() => {
      const checkAuth = async () => {
        if ((await auth.isAuth())) {
          history.push("/admin");
        }
      }
      checkAuth();
    })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      await auth.login(data.email, data.password).catch(_ => {});
    }

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Acme Corporation 
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={register({
                  required: true,
                })}
                error={errors.email ? true : false}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({
                  required: true,
                })}
                error={errors.password ? true : false}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                // className={classes.submit}
              >
                Log ind
              </Button>
              {/* <LoadingButton pending={pending} text={"Log ind"} update={() => {}}/> */}
            </form>
          </div>
        </Grid>
      </Grid>
    );
}

export default Login;