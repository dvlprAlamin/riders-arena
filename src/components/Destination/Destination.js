import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';

const useStyles = makeStyles({
    rideOptionImg: {
        height: 60,
        marginLeft: -15
    },
    searchedItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
const Destination = () => {
    const { rideOptionImg, searchedItem } = useStyles()
    const { rideOption } = useContext(UserContext);
    
    const [searchInfo, setSearchInfo] = useState({
        from:'',
        to:''
    })
    const handleSearch = (e) => {
        const searchFieldInfo = {...searchInfo};
        searchFieldInfo[e.target.name] = e.target.value;
        setSearchInfo(searchFieldInfo)
        console.log(e.target.value);
    }
    const resultCount = 8;
    const [showSearchResult, setShowSearchResult] = useState(false)
    return (
        <div>
            <Container>
                <Grid container spacing={3} style={{ paddingTop: 20 }}>
                    <Grid item md={4} sm={5} xs={12}>
                        <Paper style={{ padding: 15 }}>
                            <Grid container spacing={3}>
                                {!showSearchResult && <><Grid item xs={12}>
                                    <TextField
                                        name="from"
                                        variant="outlined"
                                        fullWidth
                                        id="name"
                                        label="Pick From"
                                        autoFocus
                                        onBlur={handleSearch}
                                    />
                                </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="to"
                                            variant="outlined"
                                            fullWidth
                                            id="name"
                                            label="Pick To"
                                            onBlur={handleSearch}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            id="datetime-local"
                                            label="Choose Date and Time"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            onClick={() => setShowSearchResult(true)}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            Search
                                    </Button>
                                    </Grid></>}
                                    {showSearchResult && <>
                                    <Grid  item xs={12}>
                                        <Paper color="primary" style={{padding:15,}}>
                                            <Typography variant="h6">From: {searchInfo.from}</Typography>
                                            <Typography variant="h6">To: {searchInfo.to}</Typography>
                                        </Paper>
                                    </Grid>
                                    {
                                       [...Array(resultCount)].map((e, i) => 
                                    <Grid item xs={12} key={i}>
                                       <Paper>
                                           <Typography className={searchedItem} variant="body1">
                                               <img className={rideOptionImg} src={rideOption.image} alt="" />
                                               <span>{rideOption.optionName} <FontAwesomeIcon icon={faUserFriends} /> 4</span>
                                               <span> $80</span>
                                           </Typography>
                                       </Paper>
                                   </Grid>)
                                    }
                                    </>}
                                {/* {showSearchResult &&
                                    <Grid item xs={12}>
                                        <Paper>
                                            <Typography className={searchedItem} variant="body1">
                                                <img className={rideOptionImg} src={rideOption.image} alt="" />
                                                <span>{rideOption.optionName} <FontAwesomeIcon icon={faUserFriends} /> 4</span>
                                                <span> $80</span>
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                } */}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={8} sm={7} xs={12}></Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Destination;


