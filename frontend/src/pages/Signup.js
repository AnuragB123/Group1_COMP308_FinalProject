import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Pages.css';
import AuthContext from '../context/Authentication-Context';
//Sign Up Page to creare a New User
class SignupPage extends Component {
    state = {
      isLogin: true
    };
  
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
        this.usertypeEl = React.createRef();
    }

    submitHandler = event => {
        event.preventDefault();
        const username = this.usernameEl.current.value;
        const password = this.passwordEl.current.value;
        const usertype = this.usertypeEl.current.value;
    
        if (username.trim().length === 0 || password.trim().length === 0) {
          return;
        }
    
        let requestBody = {
            query: `
                mutation {
                createUser(userInput: {
                    username: ${username}, password: "${password}", usertype: "${usertype}"
                }) {
                    _id
                    username
                }
                }
            `
        };
            
        fetch('http://localhost:4000/user', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            alert(`${resData.data.createUser.username} added!`)
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
              <input type="text" id="username" ref={this.usernameEl} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={this.passwordEl} />
            </div>
            <div className="form-control">
              <label htmlFor="usertype">User Type</label>
              <input type="text" id="usertype" ref={this.usertypeEl} />
            </div>
            <div className="form-actions">
              <button type="submit">Submit </button>              
              <NavLink to='/login' type="button">
                Switch to Login
              </NavLink>
            </div>
          </form>
        );
      }
}

export default SignupPage;