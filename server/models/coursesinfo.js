import mongoose from 'mongoose';

// course model class

let courseSchema = new mongoose.Schema({
    coursecode: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    coursename: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    section: {
        type: Number,
        default: '',
        trim: true,
        required: true
    }, 
    semester: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
},
{
    collection: "courses"
});

let Course = mongoose.model('Course', courseSchema);

export default Course;