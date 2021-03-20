import {  faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { firebaseInitialize, githubSignInHandler, googleSignInHandler } from '../LoginManager/LoginManager';

const useStyles = makeStyles((theme) => ({
    root:{
        borderTop:'1px solid gray',
        marginTop:15,
        textAlign:'center'
    },
    brandIcons:{
        margin:'10px 25px',
        fontSize:30,
        color:theme.palette.primary.main,
        transition:'.3s linear',
        cursor:'pointer',
        borderRadius:'50%',
        width:'35px !important',
        height:'35px',
        padding:5,
        '&:hover':{
            transform:'translateY(-2px)',
            boxShadow:'0px 5px 20px rgba(0,0,0,.4)',
        }
    }
}));
firebaseInitialize();
const SignUpWithOthers = () => {
    const {brandIcons, root} = useStyles();
    const { setLoggedInUser } = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        googleSignInHandler()
        .then(res => {
            setLoggedInUser(res);
            history.replace(from);
        })
    }
    const githubSignIn = () => {
        githubSignInHandler()
        .then(res => {
            setLoggedInUser(res);
            history.replace(from);
        })
    }
    return (
        <div className={root}>  
            <Typography variant="h6">or sign up with</Typography>
            <Grid>
                <FontAwesomeIcon onClick={googleSignIn} className={brandIcons} icon={faGoogle} />
                <FontAwesomeIcon onClick={githubSignIn} className={brandIcons} icon={faGithub} />
            </Grid>
        </div>
    );
};

export default SignUpWithOthers;