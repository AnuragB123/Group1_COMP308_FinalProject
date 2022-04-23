/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup';
import PatientPage from './pages/Patient';
import NursePage from './pages/CreateNurse';
import MainNavigation from './pages/Navigation';
import AuthContext from './context/Authentication-Context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    username: null,
  };

  login = (token, username, tokenExpiration) => {
    this.setState({ token: token, username: username });
  };

  logout = () => {
    this.setState({ token: null, username: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              username: this.state.username,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {this.state.token && <Redirect from="/" to="/patient" exact />}
                {this.state.token && (
                  <Redirect from="/login" to="/patient" exact />
                )}
                {!this.state.token && (
                  <Route path="/login" component={LoginPage} />
                )}
                {!this.state.token && (
                  <Route path="/signup" component={SignupPage} />
                )}
                {this.state.token && (
                  <Route path="/patient" component={PatientPage} />
                )}
                {this.state.token && (
                  <Route path="/nurse" component={NursePage} />
                )}
                {!this.state.token && <Redirect to="/login" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
