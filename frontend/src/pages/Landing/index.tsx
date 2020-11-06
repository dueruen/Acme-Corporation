import React, { FC, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as controllers from '../../api/controllers';
import APIRequest from '../../components/helpers/APIRequest';
import { ApiResponse } from '../../api';
import DoneDialog from '../../components/dialogs/DoneDialog';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    '& label': {
      color: '#e2e2e1',
    },
    '& label.Mui-focused': {
      color: '#e2e2e1',
    },
  },
  form: {
    display: "flex",
    height: '100%',
    width: '25rem',
    margin: 'auto',
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down('xs')]: {
      borderBottom: "5px solid #ddd",
      width: '20rem',
    }
  },
  innerBody: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(65vh circle at 50% 50%,  rgb(51, 67, 138) 50%, transparent 51%)'
  },
  circleBody01: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(42vh circle at 50% 50%, rgba(255,214,0,1) 66%, rgba(221,95,27,1) 85%, rgba(255,46,0,1) 94%, transparent 51%)'
  },
  circleBody02: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(50vh circle at 50% 50%, rgba(255,214,0,1) 66%, rgba(221,95,27,1) 85%, rgba(255,46,0,1) 94%, transparent 51%)'
  },
  circleBody03: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(62vh circle at 50% 50%, rgba(255,214,0,1) 66%, rgba(221,95,27,1) 85%, rgba(255,46,0,1) 94%, transparent 51%)'
  },
  circleBody04: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(76vh circle at 50% 50%, rgba(255,214,0,1) 66%, rgba(221,95,27,1) 85%, rgba(255,46,0,1) 94%, transparent 51%)'
  },
  circleBody05: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(92vh circle at 50% 50%, rgba(255,214,0,1) 66%, rgba(221,95,27,1) 85%, rgba(255,46,0,1) 94%, transparent 51%)'
  },
  circleBody06: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(110vh circle at 50% 50%, rgba(255,214,0,1) 66%, rgba(221,95,27,1) 85%, rgba(255,46,0,1) 94%, transparent 51%)'
  },
  circleBody07: {
    width: '100%',
    height: '100%',
    background: 'rgba(255,46,0,1) 94%'
  }
}));

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  serialNumber: string;
}

const Landing: FC = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm<FormValues>();
    const [data, setData] = useState<any>([]);
    const [run, setRun] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormValues>();
    const [result, setResult] = useState<ApiResponse<any>>({data: undefined, errorMessage: undefined, errorStatus: undefined});
    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
      if (!run && isPending && !result.data && !result.errorMessage && !result.errorStatus) {
        setOpen(true);
      }
    }, [run, isPending, result])

    const RequestData = () => {
      return (
        <APIRequest<any> 
            run={run} 
            setRun={setRun}
            pending={isPending}
            setIsPending={setIsPending} 
            req={() => controllers.submit({
              body: {
                firstName: formData!.firstName, 
                lastName: formData!.lastName, 
                email: formData!.email,
                serialNumber: formData!.serialNumber}
              })}
            setData={setData}
            setResult={setResult}
            result={result}
        />
      );
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      if (data.firstName && data.lastName && data.email && data.serialNumber) {
        setFormData({
          firstName: data.firstName, 
          lastName: data.lastName, 
          email: data.email,
          serialNumber: data.serialNumber
        })
        setRun(true);
      }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    return (
      <Grid container component="main" className={classes.root}>
        <RequestData />
        <div className={classes.circleBody07}>
          <div className={classes.circleBody06}>
            <div className={classes.circleBody05}>
              <div className={classes.circleBody04}>
                <div className={classes.circleBody03}>
                  <div className={classes.circleBody02}>    
                    <div className={classes.circleBody01}>
                      <div className={classes.innerBody}>
                        <div className={classes.form}>
                          <Grid container>
                            <Grid item xs={12} >
                              <div>
                                <Typography component="h1" variant="h5">
                                  Acme Corporation: Enter the draw 
                                </Typography>
                                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First name"
                                    name="firstName"
                                    autoComplete="firstName"
                                    autoFocus
                                    inputRef={register({
                                      required: true,
                                    })}
                                    error={errors.firstName ? true : false}
                                  />
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="lastName"
                                    label="Last name"
                                    type="lastName"
                                    id="lastName"
                                    autoComplete="lastName"
                                    inputRef={register({
                                      required: true,
                                    })}
                                    error={errors.lastName ? true : false}
                                  />
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="email"
                                    id="email"
                                    autoComplete="email"
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
                                    name="serialNumber"
                                    label="Serial number"
                                    type="serialNumber"
                                    id="serialNumber"
                                    autoComplete="serialNumber"
                                    inputRef={register({
                                      required: true,
                                    })}
                                    error={errors.serialNumber ? true : false}
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        name="age"
                                        color="secondary"
                                      />
                                    }
                                    label="I confirm that I am over 18 years old"
                                  />
    
                                  <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={!checked || isPending}
                                  >
                                    Submit
                                  </Button>
                                </form>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DoneDialog open={open} onClose={() => setOpen(false)} title={"You have now entered the draw"} text={""}/>
      </Grid>
    );
}

export default Landing;