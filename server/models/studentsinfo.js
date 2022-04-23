/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//We left the Old Code for Lab 3
import mongoose from 'mongoose';

// student model class

let studentSchema = new mongoose.Schema({
    studentnumber: {
        type: Number,
        default: '',
        trim: true,
        required: true
    }, 
    password: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    firstname: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    lastname: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    address: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    city: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    phonenumber: {
        type: Number,
        default: '',
        trim: true,
        required: true
    }, 
    email: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    program: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    addedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
},
{
    collection: "infos"
});

let Student = mongoose.model('Student', studentSchema);

export default Student;