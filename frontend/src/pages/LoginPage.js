/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//This would allow the User to login
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Pages.css';
import AuthContext from '../context/Authentication-Context';
//Login Page to fit with User Model 
class LoginPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.usernameEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = course => {
    course.preventDefault();
    const username = this.usernameEl.current.value;
    const password = this.passwordEl.current.value;

    if (username.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query:`
        query Login {
          login(username: ${username}, password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };
    console.log(`${JSON.stringify(requestBody)}`);
    fetch('http://localhost:4000/user', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`${res.status} ${res.statusText} Failed!`);
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
          console.log(resData.data.login.userId);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="username">User Name</label>
          <input type="username" id="username" ref={this.usernameEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <NavLink to='/signup' type="button">
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </NavLink>
        </div>
      </form>
    );
  }
}

export default LoginPage;