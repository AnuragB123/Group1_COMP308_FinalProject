/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//We left the Old Code for Lab 3
import Course from '../../models/coursesinfo.js';
import Students from '../../models/studentsinfo.js';

import  transformCourse  from './merger.js';

export default {
  courses: async () => {
    try {
      const courses = await Course.find();
      return courses.map(course => {
        return transformCourse(course);
      });
    } catch (err) {
      throw err;
    }
  },
  addCourse: async (args, req) => {
    /*if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }*/
    const course = new Course({
        coursecode: args.courseInput.coursecode,
        coursename: args.courseInput.coursename,
        section: args.courseInput.section,
        semester: args.courseInput.semester,
        student: req.studentnumber
    });
    let addedCourses;
    try {
      const result = await course.save();
      addedCourses = transformCourse(result);
      console.log(`${req.studentnumber}`);
      const student = await Students.find(req._id);

      if (!student) {
        throw new Error('Student not found.');
      }

      student.addedCourses.push(course);
      await student.save();
      return addedCourses;

    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updateCourse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const course = await Course.findByIdAndUpdate(args.courseId);
      return course;
    } catch (err) {
      throw err;
    }
  },
  removeCourse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const course = await Course.findById(args.courseId).populate('course');
      await Course.deleteOne({ _id: args.courseId });
      return course;
    } catch (err) {
      throw err;
    }
  }
};