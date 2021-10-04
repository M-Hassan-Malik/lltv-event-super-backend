const db = require("../models");
const Register = require("../models/Registration");

exports.addNewUser = (req, res) => {
	let data = JSON.parse(req.body.data);
	const register = Register(data);
	try {
		db.Registration.create(register).then((result) => {
			res.status(200).json({ result: result });
		});
	} catch (e) {
		res.status(400).json({ error: "Error @addNewUser Else-block:" });
	}
};

exports.updateUser = (req, res) => {
	let data = JSON.parse(req.body.data);

	db.Registration.updateOne(
		{ _id: data.id },
		{ $set: data },
		{ upsert: false }
	).exec((err, result) => {
		console.log(result);
		result
			? res.status(200).json({ result: result })
			: err
			? res.status(400).json({ error: err })
			: res.status(400).json({ error: "Error @updateUser Else-block:" });
	});
};

exports.signin = (req, res) => {
	let data = JSON.parse(req.body.data);

	db.Registration.findOne({
		user_type: "super",
		email: data.email,
		password: data.password,
	}).exec((err, result) => {
		console.log({ result });
		result
			? res.status(200).json({ result: result })
			: err
			? res.status(200).json({ error: err })
			: res.status(200).json({ error: "Error @updateUser Else-block:" });
	});
};
 