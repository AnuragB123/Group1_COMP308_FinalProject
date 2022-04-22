/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//We left the Old Code for Lab 3

import Student from "../../models/studentsinfo.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default {
    students: async (res,req) => {
        /*if (!req.isAuth) {
            throw new Error("Unauthorized");
        }*/
        const studentInfo = await Student.find();
        if (!studentInfo) {
          throw new Error('Error')
        }       
       return studentInfo;
    },
    student: async ({res, req, studentId}) => {
        /*if (!req.isAuth) {
            throw new Error("Unauthorized");
        }*/
        const studentInfo =  await Student.findOne({_id: studentId});
        if (!studentInfo) {
          throw new Error('Error')
        }       
       return studentInfo;
    },
    createStudent: async (args) => {
        try {
            const existingUser = await Student.findOne({ studentnumber: args.userInput.studentnumber });
            if (existingUser) {
              throw new Error('Student exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      
            const student = new Student({
                studentnumber: args.userInput.studentnumber,
                email: args.userInput.email,
                password: hashedPassword,
                firstname: args.userInput.firstname,
                lastname: args.userInput.lastname,
                address:args.userInput.address,
                city: args.userInput.city,
                phonenumber: args.userInput.phonenumber,
                program: args.userInput.program
            });
      
            const result = await student.save();
      
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ studentnumber, password }) => {
        console.log(studentnumber);
        try {
            const student = await Student.findOne({ studentnumber: studentnumber });
            if (!student) {
                throw new Error('Invalid Student Number Credentials!')
            }
            const isCorrectPassword = await bcrypt.compare(password, student.password);
            if (!isCorrectPassword) {
                throw new Error("Invalid Password Credentials!")
            }
            const token = jwt.sign({ _id: student._id, studentnumber: student.studentnumber }, 'somesupersecretkey', {
                expiresIn: '1h'
            });
            return { token: token, studentId: student._id, tokenExpiration: 1 }
        } catch (error) {
            return error
        }
    }
}