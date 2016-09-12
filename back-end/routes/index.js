var express = require('express');
var router = express.Router();
//include mongoose module
var mongoose = require('mongoose');
//set up the mongo url we will connect too. 
//Mongo listens on 27017, the path is the db we will use
var mongoUrl = 'mongodb://localhost:27017/searchApp';
//include our students model. It is a mongoose model so it will
//automatically use the db that mongoose connects to
var Student = require('../models/student');
//connect mongoose to the mongo url. Now our student model, is connected
//to mongo, using the collection we specified in the model
mongoose.connect(mongoUrl);

//set up an endpoint (route) for apps to get all the students
router.get('/getStudents', function(req, res, next){
	//use the student object (mongoose model - connected to mongo)
	//to run a query
	Student.find({}, function(error, documents){
		// if mongoose returns an error (such as can't connect)
		// our program will halt here
		if(error){
			//print off the error
			res.json(error);
		}else{
			//if there is no error, then print off the result of the 
			res.json(documents);
		}
	});
});

// make a route for someone to add a new student
router.post('/addStudent', function(req, res, next){
	//set up a var for the variable 'name' passed from a form
	var studentName = req.body.name;
	var studentGender = req.body.gender;
	//create a new Student object. This will be in the likeness of 
	var studentToAdd = new Student({
		name: studentName,
		gender: studentGender
	});
	//save the student to mongodb
	studentToAdd.save();
	//let the requester know that we added the student
		res.json({
			message: 'added',
			name: req.body.name
		});
});

router.post('/removeStudent', function(req, res, index){
	Student.find({name: req.query.student}).remove(function(error){
		if(error){
			console.log("Error removing");
		}else{
			res.json({message: 'removed'});
		}
	});
});

module.exports = router;
