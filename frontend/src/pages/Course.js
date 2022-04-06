import React, { Component } from 'react';

import Setup from '../components/setup/Setup';
import Backdrop from '../components/backdrop/Backdrop';
import CourseList from '../components/courses/CourseList';
import AuthContext from '../context/Authentication-Context';
import './Pages.css';

class CoursesPage extends Component {
  state = {
    creating: false,
    courses: [],
    isLoading: false,
    selectedCourse: null
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.coursecodeElRef = React.createRef();
    this.coursenameElRef = React.createRef();
    this.sectionElRef = React.createRef();
    this.semesterElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchCourses();
  }

  startCreateCourseHandler = () => {
    this.setState({ creating: true });
  };

  SetupConfirmHandler = () => {
    this.setState({ creating: false });
    const coursecode = this.coursecodeElRef.current.value;
    const coursename = this.coursenameElRef.current.value;
    const section = this.sectionElRef.current.value;
    const semester = this.semesterElRef.current.value;

    if (
        coursecode.trim().length === 0 ||
        coursename.trim().length === 0 ||
        section.trim().length === 0 ||
        semester.trim().length === 0
    ) {
      return;
    }

    const course = { coursename, coursecode, section, semester };
    console.log(course);

    const requestBody = {
      query: `
          mutation {
            addCourse(courseInput: {coursecode: "${coursecode}", coursename:"${coursename}", 
              section: ${section}, semester: "${semester}"}) {
              coursename
              coursecode
              section
              semester
            }
          }
        `
    };

    const token = this.context.token;

    fetch('http://localhost:4000/student', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedCourses = [...prevState.courses];
          updatedCourses.push({
            _id: resData.data._id,
            coursecode: resData.data.coursecode,
            coursename: resData.data.coursename,
            section: resData.data.section,
            semester: resData.data.semester,
            studentnumber: {
              student: this.context.studentnumber
            }
          });
          return { courses: updatedCourses };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  SetupCancelHandler = () => {
    this.setState({ creating: false, selectedCourse: null });
  };

  fetchCourses() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            courses {
                _id
                coursename
                coursecode
                section
                semester
                student{
                  _id
                  studentnumber
                }
            }
          }
        `
    };

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
      const courses = resData.data.courses;
      if (this.isActive) {
        this.setState({ courses: courses, isLoading: false });
      }
    })
    .catch(err => {
      console.log(err);
      if (this.isActive) {
        this.setState({ isLoading: false });
      }
    });
  }

  showStudentHandler = studentnumber => {
    this.setState(prevState => {
      const selectedCourse = prevState.courses.find(courses => courses.studentnumber === studentnumber);
      return { selectedCourse: selectedCourse };
    });
  };

  courseDeleteHandler = courseId => {
    this.setState({ isLoading: true });
    console.log(courseId)
    const requestBody = {
      query: `
          mutation {
            removeCourse(courseId: "${courseId}") {
              _id
              student{
                _id
              }
            }
          }
        `
    };

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
        this.setState(prevState => {
          const updatedCourses = prevState.courses.filter(courses => {
            return courses._id !== courseId;
          });
          return { courses: updatedCourses, isLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedCourse) && <Backdrop />}
        {this.state.creating && (
          <Setup
            title="Add Course"
            canCancel
            canConfirm
            onCancel={this.SetupCancelHandler}
            onConfirm={this.SetupConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div className="form-control">
                <label htmlFor="coursename">Course Name</label>
                <input type="text" id="coursename" ref={this.coursenameElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="section">Section</label>
                <input type="number" id="section" ref={this.sectionElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="coursecode">Course Code</label>
                <input type="text" id="coursecode" ref={this.coursecodeElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="semester">semester</label>
                <input type="text" id="coursecode" ref={this.semesterElRef}/>
              </div>
            </form>
          </Setup>
        )}
        {this.context.token && (
          <div className="course-control">
            <p>List of your course</p>
            <button className="btn" onClick={this.startCreateCourseHandler}>
              Add Course
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <h6>You have not enrolled in any courses.</h6>
        ):(
          <CourseList
            courses={this.state.courses}
            authStudentId={this.context.studentnumber}
            onViewStudent={this.showStudentHandler}
            onDeleteCourse={this.showStudentHandler && this.courseDeleteHandler}
          />
        )
      }
      </React.Fragment>
    );
  }
}

export default CoursesPage;