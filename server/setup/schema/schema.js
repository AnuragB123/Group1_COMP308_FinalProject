/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//We left the Old Code for Lab 3
import { buildSchema } from "graphql";

export default buildSchema(`
    type Student{
        _id:String!
        studentnumber:Int!        
        password:String!
        firstname:String!
        lastname:String!
        address:String!
        city:String!
        phonenumber:Int!
        email:String!
        program:String!
        addedCourses: [Course!]
    }
    type Course{
        _id:String!
        coursecode:String!
        coursename:String!
        section:Int!
        semester:String!
        student:Student! 
    }
    input UserInput{
        studentnumber:Int!        
        password:String!
        firstname:String!
        lastname:String!
        address:String!
        city:String!
        phonenumber:Int!
        email:String!
        program:String!
    }
    input CourseInput{
        coursecode:String!
        coursename:String!
        section:Int!
        semester:String!
    }
    type LoginReturnType{
        token:String!
        studentId:String!
        tokenExpiration: Int!
    }
    type RootMutation{
        createStudent(userInput:UserInput): Student
        addCourse(courseInput:CourseInput): Course
        updateCourse(courseInput:CourseInput, courseId: String!): Course
        removeCourse(courseId: String!): [Course!]
    }
    type RootQuery{
        login(studentnumber: Int!, password: String!): LoginReturnType!
        students: [Student!]!
        student(studentId: String!): Student
        courses: [Course!]!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)