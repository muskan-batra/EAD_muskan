const express= require('express')
const studentController = require('../controllers/StudentController')
const studentRouter = express();

studentRouter.get('/',studentController.displayHome);
//page
studentRouter.get('/addStudent',studentController.addStudent);
studentRouter.get('/displayStudents',studentController.displayStudents);
//add api
studentRouter.post('/addNewStudent', studentController.addNewStudent);
studentRouter.get('/deleteStudent',studentController.deleteStudent);
//page
studentRouter.get('/updateStudent',studentController.updateStudent);
//Updation api
studentRouter.post('/studentUpdated', studentController.studentUpdated)
module.exports=studentRouter;