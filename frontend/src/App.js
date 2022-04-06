
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup';
import CoursePage from './pages/Course';
import StudentPage from './pages/Student';
import MainNavigation from './pages/Navigation';
import AuthContext from './context/Authentication-Context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    studentnumber: null
  };

  login = (token, studentnumber, tokenExpiration) => {
    this.setState({ token: token, studentnumber: studentnumber });
  };

  logout = () => {
    this.setState({ token: null, studentnumber: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              studentnumber: this.state.studentnumber,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {this.state.token && <Redirect from="/" to="/course" exact />}
                {this.state.token && (
                  <Redirect from="/login" to="/course" exact />
                )}
                {!this.state.token && (
                  <Route path="/login" component={LoginPage} />
                )}
                {!this.state.token && (
                  <Route path="/signup" component={SignupPage} />
                )}
                {this.state.token && (
                  <Route path="/student" component={StudentPage} />
                )}
                {this.state.token && (
                  <Route path="/course" component={CoursePage} />
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
