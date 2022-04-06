import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Pages.css';
import AuthContext from '../context/Authentication-Context';

class LoginPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.studentnumberEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = course => {
    course.preventDefault();
    const studentnumber = this.studentnumberEl.current.value;
    const password = this.passwordEl.current.value;

    if (studentnumber.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query:`
        query Login {
          login(studentnumber: ${studentnumber}, password: "${password}") {
            studentId
            token
            tokenExpiration
          }
        }
      `
    };
    console.log(`${JSON.stringify(requestBody)}`);
    fetch('http://localhost:4000/student', {
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
            resData.data.login.studentId,
            resData.data.login.tokenExpiration
          );
          console.log(resData.data.login.studentId);
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
          <label htmlFor="studentnumber">Student Number</label>
          <input type="studentnumber" id="studentnumber" ref={this.studentnumberEl} />
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