import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignUpWithOthers from '../SignUpWithOthers/SignUpWithOthers';
import { Paper } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { createUser, logInHandler } from '../LoginManager/LoginManager';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:15,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginSignUp() {
  const classes = useStyles();
  const {loggedUser, setLoggedUser} = useContext(UserContext);
  const [user, setUser] = useState({})
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const { from } = location.state || { from: { pathname: "/" } };

  const onBlurHandler = (e) => {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  }
  const login = (e) => {
    logInHandler(user.email, user.password)
      .then(res => {
        setUser(res)
        setLoggedUser(res);
        console.log(res);

        history.replace(from);

      })
    e.preventDefault();
  }
  const signUp = e => {
    createUser(user.email, user.password)
    .then(res => {
      setUser(res)
      setLoggedUser(res)
      history.replace(from)
      console.log(res);
    })
    e.preventDefault();
  }
  // const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  // const [isEmailValid, setIsEmailValid] = useState(true)
  // const [isPasswordValid, setIsPasswordValid] = useState(true)
  // const onSubmit = data => {
  //   setIsPasswordMatch((pathname === '/signup') && (data.password === data.confirmPassword));
  //   setIsEmailValid(/\S+@\S+\.\S+/.test(data.email));
  //   setIsPasswordValid(/\d{1}/.test(data.password) && data.password.length >= 6)
  //   setTimeout(() => {
  //     setIsPasswordMatch(true);
  //     setIsEmailValid(true);
  //     setIsPasswordValid(true)
  //   }, 3000);
  //   if(pathname === '/signup'){
  //     createNewUser(data.name,data.email,data.password)
  //     .then(res => {
  //       setUser(res)
  //       setLoggedInUser(res)
  //       console.log(res)
  //     })
  //   }
  // };
  return (
    <Container component="main" maxWidth="xs" style={{padding:20}}>
      <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            {pathname === '/signup' ? 'Sign up' : 'Log in'}
        </Typography>
          <form className={classes.form} noValidate >
            <Grid container spacing={2}>
              {pathname === '/signup' &&
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      variant="standard"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      // inputRef={register}
                    />
                  </Grid>}
              <Grid item xs={12}>
                <TextField
                  onBlur={onBlurHandler}
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // inputRef={register}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={onBlurHandler}
                  variant="standard"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  // inputRef={register}
                />
              </Grid>
              {pathname === '/signup' && <Grid item xs={12}>
                <TextField
                  onBlur={onBlurHandler}
                  variant="standard"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  // inputRef={register}
                />
              </Grid>}
              <Grid item xs={12}>
                {pathname === '/login' && <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />}

              </Grid>
              {/* {!isPasswordMatch && <Grid item xs={12}>
                <Alert variant="filled" severity="error">Password do not match!</Alert>
                </Grid>}
              {!isEmailValid && <Grid item xs={12}>
                <Alert variant="filled" severity="error">Enter a valid email</Alert>
                </Grid>}
              {!isPasswordValid && <Grid item xs={12}>
                <Alert variant="filled" severity="warning">Password contain at least a number and 6 digit</Alert>
                </Grid>} */}
            </Grid>
            {pathname === '/signup' ?
            // <Input type="submit"/>:
              <Button
                onClick={signUp}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
          </Button> :
              <Button
                onClick={login}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
        </Button>}
          </form>
              {pathname === '/signup' ?
                  <span>Already have an account? <Link to="/login">
                   Log in
            </Link></span> :
                  <span>Don't have an account? <Link to="/signup">
                   Sign Up
            </Link></span>}
          <SignUpWithOthers />
        </Paper>
    </Container>
  );
}