/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//We left the Old Code for Lab 3
import DataLoader from 'dataloader';

import Student from '../../models/studentsinfo.js';
import Course from '../../models/coursesinfo.js';

const courseLoader = new DataLoader(courseIds => {
    return courses(courseIds);
});
  
const studentLoader = new DataLoader(studentIds => {
    return Student.find({ _id: { $in: studentIds } });
});

const courses = async courseIds => {
    try {
      const courses = await Course.find({ _id: { $in: courseIds } });
      courses.sort((a, b) => {
        return (
            courseIds.indexOf(a._id.toString()) - courseIds.indexOf(b._id.toString())
        );
      });
      return courses.map(course => {
        return transformCourse(course);
      });
    } catch (err) {
      throw err;
    }
};

const student = async studentId => {
    try {
        const student = await studentLoader.load(studentId.toString());
        return {
        ...student._doc,
        _id: student.id,
        studentnumber:student.studentnumber,
        createdCourses: () => courseLoader.loadMany(student._doc.addedCourses)
        };
    } catch (err) {
        throw err;
    }
};

const transformCourse = course => {
    return {
        ...course._doc,
        _id: course.id,
        student: student.bind(this, course.student)
    };
};

export default transformCourse