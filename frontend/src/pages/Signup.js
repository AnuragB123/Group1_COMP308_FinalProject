import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Pages.css';
import AuthContext from '../context/Authentication-Context';

class SignupPage extends Component {
    state = {
      isLogin: true
    };
  
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.studentnumberEl = React.createRef();
        this.passwordEl = React.createRef();
        this.firstnameEl = React.createRef();
        this.lastnameEl = React.createRef();
        this.addressEl = React.createRef();
        this.cityEl = React.createRef();
        this.phonenumberEl = React.createRef();
        this.emailEl = React.createRef();
        this.programEl = React.createRef();
    }

    submitHandler = event => {
        event.preventDefault();
        const studentnumber = this.studentnumberEl.current.value;
        const password = this.passwordEl.current.value;
        const firstname = this.firstnameEl.current.value;
        const lastname = this.lastnameEl.current.value;
        const address = this.addressEl.current.value;
        const city = this.cityEl.current.value;
        const phonenumber = this.phonenumberEl.current.value;
        const email = this.emailEl.current.value;
        const program = this.programEl.current.value;
    
        if (studentnumber.trim().length === 0 || password.trim().length === 0) {
          return;
        }
    
        let requestBody = {
            query: `
                mutation {
                createStudent(userInput: {
                    studentnumber: ${studentnumber}, password: "${password}", firstname: "${firstname}",
                    lastname: "${lastname}", address: "${address}", city: "${city}", phonenumber: ${phonenumber},
                    email: "${email}", program: "${program}"
                }) {
                    _id
                    studentnumber
                    firstname
                }
                }
            `
        };
            
        fetch('http://localhost:4000/student', {
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
            alert(`${resData.data.createStudent.studentnumber} added!`)
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
              <input type="text" id="studentnumber" ref={this.studentnumberEl} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={this.passwordEl} />
            </div>
            <div className="form-control">
              <label htmlFor="firstname">First Name</label>
              <input type="text" id="firstname" ref={this.firstnameEl} />
            </div>
            <div className="form-control">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" id="lastname" ref={this.lastnameEl} />
            </div>
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" ref={this.addressEl} />
            </div>
            <div className="form-control">
              <label htmlFor="city">City</label>
              <input type="text" id="city" ref={this.cityEl} />
            </div>
            <div className="form-control">
              <label htmlFor="phonenumber">Phone Number</label>
              <input type="text" id="phonenumber" ref={this.phonenumberEl} />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" ref={this.emailEl} />
            </div>
            <div className="form-control">
              <label htmlFor="program">Program</label>
              <input type="text" id="program" ref={this.programEl} />
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