const mongodb = require("mongodb")
const mongoEstdCon = require("../config/db-connection")


const getAllTask = async (req, res) => {
	const taskCollection = mongoEstdCon.GetCollectionObj('Tasks');
	let searched = new RegExp(req.query.taskSearch, 'i')
	if(searched){
		await taskCollection.find({isActive: true, taskName: searched}).sort({ _id: 1 }).toArray()
			.then(async (data) => {
				if (!data.length) return res.status(200).send({ message: "No Tasks Found", result: []});
				else{
					let completed =  await taskCollection.countDocuments({isActive: true, taskStatus: "Completed"});
					// console.log(completed, uncompleted)
					return res.status(200).send({ message: "Tasks Found", result: data, completed });
				}
			})
			.catch((err) => {
				return res.status(500).send({ message: "Something went wrong"});
			});
		return
	}
	await taskCollection.find({isActive: true}).sort({ _id: 1 }).toArray()
		.then((data) => {
			if (!data.length) return res.status(200).send({ message: "No Tasks Found", result: []});
			return res.status(200).send({ message: "Tasks Found", result: data });
		})
		.catch((err) => {
			return res.status(500).send({ message: "Something went wrong"});
		});
};

const addTask = async (req, res) => {
	if (!req.body.taskName || !req.body.taskDate || !req.body.taskStatus) {
		return res.status(402).send({ message: "Missing Payload"});
	}
	let TaskObject = {
		taskName: req.body.taskName,
		taskDate: new Date(req.body.taskDate),
		createdDate: new Date(),
		taskStatus: req.body.taskStatus,
		isActive: true
	};
	try {
		// console.log("Data Recieved", TaskObject);
		const taskCollection = mongoEstdCon.GetCollectionObj('Tasks');
		await taskCollection.insertOne(TaskObject).then((data) => {
			if (!data) return res.status(402).send({ message: "Task Not Added"});
			return res.status(201).send({ message: "Task Added Successfully", result: data });
		});
	} catch (error) {
		console.log(error)
		return res.status(500).send({ message: "Something went wrong"});
	}
};

const deleteTask = async (req, res) => {
	let taskId = req.params.id;
	if (!taskId) {
		return res.status(402).send({ message: "Missing Payload"});
	}
	try {
		const taskCollection = mongoEstdCon.GetCollectionObj('Tasks');
		await taskCollection.updateOne({_id: mongodb.ObjectId(taskId)}, {$set: {isActive: false}}).then((data) => {
			if (!data) return res.status(402).send({ message: "No Task Found with the Task Id"});
			return res.status(200).send({ message: "Task Deleted Successfully", result: data });
		});
	} catch (error) {
		console.log(error)
		return res.status(500).send({ message: "Something went wrong"});
	}
};

const updateTask = async (req, res) => {
	let taskId = req.params.id;
	// let updates = req.body
	let updates = {
		taskName: req.body.taskName,
		taskDate: new Date(req.body.taskDate),
		updatedDate: new Date(),
		taskStatus: req.body.taskStatus
	};
	if (!taskId || !updates) {
		return res.status(402).send({ message: "Missing Payload"});
	}
	try {
		const taskCollection = mongoEstdCon.GetCollectionObj('Tasks');
		await taskCollection.updateOne({_id: mongodb.ObjectId(taskId), isActive: true}, {$set: updates}).then((data) => {
			if (!data) return res.status(402).send({ message: "No Task Found with the Task Id"});
			return res.status(200).send({ message: "Task Updated Successfully", result: data });
		});
	} catch (error) {
		console.log(error)
		return res.status(500).send({ message: "Something went wrong"});
	}
};

const markComplete = async (req, res) => {
	let taskId = req.params.id;
	if (!taskId) {
		return res.status(402).send({ message: "Missing Payload"});
	}
	try {
		const taskCollection = mongoEstdCon.GetCollectionObj('Tasks');
		await taskCollection.updateOne({_id: mongodb.ObjectId(taskId),  isActive: true}, {$set: {taskStatus: "Completed"}}).then((data) => {
			if (!data) return res.status(402).send({ message: "No Task Found with the Task Id"});
			return res.status(200).send({ message: "Task Updated Successfully", result: data });
		});
	} catch (error) {
		console.log(error)
		return res.status(500).send({ message: "Something went wrong"});
	}
};

module.exports = { getAllTask, addTask, deleteTask, updateTask, markComplete };
