import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../context/Authentication-Context';
import './Pages.css';

class StudentPage extends Component {
    state = {
        creating: false,
        student: [],
        outputType: 'list'
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

    componentDidMount() {
      this.fetchStudent();
    }

    startCreateStudentHandler = () => {
      this.setState({ creating: true });
    };

    SetupCancelHandler = () => {
      this.setState({ creating: false, selectedCourse: null });
    };

    fetchStudent = () => {
        this.setState({ isLoading: true });
        const requestBody = {
          query: `
            query{
              student(studentId:"${this.context.studentnumber}"){
                _id
                studentnumber
                password
                firstname
                lastname
                address
                city
                phonenumber
                email
                program
              }
            }
          `
        };
        console.log(JSON.stringify(requestBody));
        fetch('http://localhost:4000/student', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.context.token
          }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
        }
            return res.json();
        })
        .then(resData => {
            const student = resData.data.student;
            console.log(student.studentnumber);
            this.setState({ student: student, isLoading: false });
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    };

    componentWillUnmount() {
      this.isActive = false;
    }
    
    render() {
        return (
          <React.Fragment>
            <form className="auth-form" onSubmit={this.submitHandler}>
              <div className="form-control">
                <label htmlFor="studentnumber">Student Number</label>
                <input type="text" id="studentnumber" value={this.state.student.studentnumber} ref={this.studentnumberEl} disabled/>
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={this.state.student.password} ref={this.passwordEl} />
              </div>
              <div className="form-control">
                <label htmlFor="firstname">First Name</label>
                <input type="text" id="firstname" value={this.state.student.firstname} ref={this.firstnameEl} />
              </div>
              <div className="form-control">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" value={this.state.student.lastname} ref={this.lastnameEl} />
              </div>
              <div className="form-control">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" value={this.state.student.address} ref={this.addressEl} />
              </div>
              <div className="form-control">
                <label htmlFor="city">City</label>
                <input type="text" id="city" value={this.state.student.city} ref={this.cityEl} />
              </div>
              <div className="form-control">
                <label htmlFor="phonenumber">Phone Number</label>
                <input type="text" id="phonenumber" value={this.state.student.phonenumber} ref={this.phonenumberEl} />
              </div>
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={this.state.student.email} ref={this.emailEl} />
              </div>
              <div className="form-control">
                <label htmlFor="program">Program</label>
                <input type="text" id="program" value={this.state.student.program} ref={this.programEl} />
              </div>
              <div className="form-actions">
                <button type="submit" disabled>Update</button>
                <NavLink to="/course" type="button">
                  Back to Courses
                </NavLink>
              </div>
            </form>
            </React.Fragment>
        );
    }
}

export default StudentPage;