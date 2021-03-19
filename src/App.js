import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home'
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import Navigation from './components/Navigation/Navigation'
import Destination from './components/Destination/Destination'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { CssBaseline } from '@material-ui/core';
import './App.css';
export const UserContext = createContext();
function App() {
  const [rideOption, setRideOption] = useState({})
  const [loggedInUser, setLoggedInUser] = useState({
    email:'',
    password:''
  })
  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser,rideOption, setRideOption}}>
    <div className="app">
      <CssBaseline/>
      <Router>
      <Navigation/>
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/login' component={LoginSignUp}/>
              <Route path='/signup' component={LoginSignUp}/>
              <PrivateRoute path='/destination'>
                <Destination/>
              </PrivateRoute>
          </Switch>
      </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
