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
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
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
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
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

  const [isFieldValid, setIsFieldValid] = useState(true)
  const [invalidMessage, setInvalidMessage] = useState('')
  const loginSignUp = e => {

    e.preventDefault();
    if (pathname === '/signup') {
      if (user.password !== user.confirmPassword) {
        setInvalidMessage('Password do not match!');
        setIsFieldValid(false);
        return;
      }
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setInvalidMessage('Enter a valid email');
      setIsFieldValid(false);
      return;
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/.test(user.password)) {
      setInvalidMessage('Password must have at least 1 uppercase, 1 lowercase letter and 1 number');
      setIsFieldValid(false);
      return;
    }
    if (user.password.length < 6) {
      setInvalidMessage('Password must be at least 6 characters');
      setIsFieldValid(false);
      return;
    }
    if (pathname === '/signup') {
      createUser(user.name, user.email, user.password)
        .then(res => {
          setUser(res)
          setLoggedInUser(res)
          history.replace(from)
          console.log(res);
        })
    }
    if (pathname === '/login') {
      logInHandler(user.email, user.password)
        .then(res => {
          setUser(res)
          setLoggedInUser(res);
          console.log(res);
          history.replace(from);
        })
    }
    setTimeout(() => {
      setInvalidMessage('');
      setIsFieldValid(true)
    }, 3000);
  }
  return (
    <Container component="main" maxWidth="xs" style={{ padding: 20 }}>
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
                  onBlur={onBlurHandler}
                  name="name"
                  variant="standard"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus />
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
              />
            </Grid>}
            <Grid item xs={12}>
              {pathname === '/login' && <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />}
            </Grid>
            {!isFieldValid && <Grid item xs={12}>
              <Alert variant="filled" severity="error">{invalidMessage}</Alert>
            </Grid>}
          </Grid>
          <Button
            onClick={loginSignUp}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {pathname === '/signup' ? 'Sign Up' : 'Log in'}
          </Button>
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