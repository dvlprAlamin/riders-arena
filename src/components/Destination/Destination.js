import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import Map from '../Map/Map';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { TimelineOppositeContent } from '@material-ui/lab';
const useStyles = makeStyles({
    rideOptionImg: {
        height: 60,
        marginLeft: -10
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
        from: '',
        to: ''
    })
    const handleSearch = (e) => {
        const searchFieldInfo = { ...searchInfo };
        searchFieldInfo[e.target.name] = e.target.value;
        setSearchInfo(searchFieldInfo)
        console.log(e.target.value);
    }
    const randomResultCount = Math.round(Math.random()*8 + 2);
    const randomUserCount = Math.round(Math.random()*5 + 1);
    const randomCost = Math.round(Math.random()*80 + 20);
    const [showSearchResult, setShowSearchResult] = useState(false)
    return (
        <div>
            <Container>
                <Grid container spacing={3} style={{ paddingTop: 20, minHeight: 'calc(100vh - 64px)' }}>
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
                                    <Grid item xs={12}>
                                        <Paper style={{paddingTop:15, background:'#3F51B5', color:'#fff'}}>
                                            <Timeline style={{textAlign:'left'}}>
                                                <TimelineItem>
                                                <TimelineOppositeContent style={{flex:0}} />
                                                    <TimelineSeparator>
                                                        <TimelineDot/>
                                                        <TimelineConnector/>
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                    <Typography style={{lineHeight:1}} variant="h6">From: {searchInfo.from || 'Savar'}</Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                                <TimelineItem>
                                                 <TimelineOppositeContent style={{flex:0}} />
                                                    <TimelineSeparator>
                                                        <TimelineDot />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                    <Typography style={{lineHeight:1}} variant="h6">To: {searchInfo.to || 'Mirpur'}</Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            </Timeline>
                                        </Paper>
                                    </Grid>
                                    {
                                        [...Array(randomResultCount)].map((e, i) =>
                                            <Grid item xs={12} key={i}>
                                                <Paper style={{padding:'5px 10px', background:'#3F51B555'}}>
                                                    <Typography className={searchedItem} variant="body1">
                                                        <img className={rideOptionImg} src={rideOption.image} alt="" />
                                                        <span>{rideOption.optionName} <FontAwesomeIcon icon={faUserFriends} /> {randomUserCount}</span>
                                                        <span> ${randomCost}</span>
                                                    </Typography>
                                                </Paper>
                                            </Grid>)
                                    }
                                </>}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={8} sm={7} xs={12}>
                        <Map />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Destination;


