import React from 'react';

import './CourseItem.css';

const courseItem = props => (
  <li key={props.courseId} className="courses__list-item">
    <div>
      <h1>{props.coursename}</h1>
      <h2>
        {props.coursecode} - {props.section}
      </h2>
    </div>
    <div>
      <h1>{props.semester}</h1>
      <p>Your are enrolled in this course.</p>
      <button className="btn" onClick={props.onStudent.bind(this, props.studentId)}>
          View Students
      </button>
      <button className="btn" onClick={props.onDelete.bind(this, props.courseId)}>
        Cancel Enrollment
      </button>
      
    </div>
  </li>
);

export default courseItem;