import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navItem:{
    padding:'.3rem .8rem',
    marginLeft:10,
    textDecoration:'none',
    color:'#fff',
    transition:'.3s linear',
    '&:hover':{
        transform:'translateY(-2px)'
    }
  },
}));

export default function ButtonAppBar() {
  const {root, title, navItem} = useStyles();

  return (
    <div className={root}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" className={title}>
            Riders Arena
          </Typography>
          <Link className={navItem} to="/">Home</Link>
          <Link className={navItem} to="destination">Destination</Link>
          <Link className={navItem} to="#">Blog</Link>
          <Link className={navItem} to="#">Contact</Link>
          <Link className={navItem} to="/login"><Button variant="outlined" color="inherit">Login</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
