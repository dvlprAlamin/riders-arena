import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import rideOption from '../../data/data.json'
const useStyles = makeStyles((theme) => ({
    ticketContainer: {
        minHeight: 'calc(100vh - 64px)',
        alignContent: 'center'
    },
    ticketItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '1rem',
        cursor: 'pointer',
        transition: '.3s linear',
        '&:hover': {
            transform: 'scale(1.03)'
        }
    },
    ticketItemImg: {
        maxWidth: '100%'
    }
}));

const Home = () => {
    const { ticketItemImg, ticketItem, ticketContainer } = useStyles();
    const {setRideOption} = useContext(UserContext);
    // default value
    setRideOption(rideOption[0])
    return (
        <div >
            <Container>
                <Grid container className={ticketContainer} spacing={3}>
                    {
                        rideOption.map(item =>
                            <Grid
                            onClick={()=> setRideOption(item)} 
                            key={item.id} 
                            item lg={3} md={4} sm={6} xs={12}>
                                <Link to="/destination" style={{ textDecoration: 'none' }}>
                                    <Paper className={ticketItem}>
                                        <img className={ticketItemImg} src={item.image} alt="" />
                                        <Typography variant="h4">{item.optionName}</Typography>
                                    </Paper>
                                </Link>
                            </Grid>)
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default Home;