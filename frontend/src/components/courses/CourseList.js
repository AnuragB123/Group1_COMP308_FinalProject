import React from 'react';

import CourseItem from './course/CourseItem';
import './CourseList.css';

const courseList = props => {
  const courses = props.courses.map(course => {
    return (
      <CourseItem
        key={course._id}
        courseId={course._id}
        coursecode={course.coursecode}
        coursename={course.coursename}
        section={course.section}
        semester={course.semester}
        studentId={props.studentId}
        onStudent={props.onViewStudent}
        onDelete={props.onDeleteCourse}
      />
    );
  });
  return <ul className="course__list">{courses}</ul>;
};
export default courseList;