module.exports = function (app, models, sequelize, Sequelize, ssCRUD, moment) {

	var vehicle = models[0];

	var logController = new ssCRUD.Controller(vehicle);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Vehicle_Reg_Number', //offsetFieldName
			'Make', //countFieldName
			'Vehicle_Reg_Number', //searchQFieldName
			['Vehicle_Reg_Number', 'Make', 'Model', 'Type', 'IsActive', 'createdAt', 'updatedAt', 'Office_ID'], //arrayWithSearchFields
			'Vehicle_Reg_Number', //filterFieldName
			['Vehicle_Reg_Number', 'Make', 'Model', 'Type', 'IsActive', 'createdAt', 'updatedAt', 'Office_ID']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Vehicle_Reg_Number';

	logController
	.addCreate(
		['Vehicle_Reg_Number', 'Make', 'Model', 'Type', 'IsActive', 'createdAt', 'updatedAt', 'Office_ID'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addUpdate(
		['Make', 'Model', 'Type', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);

	app.get('/vehicle/:id', logController.getItem);
	app.get('/vehicle', logController.getItems);
	app.post('/vehicle', function (req, res) {

		var vehicle_Request = {};
		var Address_Request = {};

		const uuidv1 = require('uuid/v1');

		var address = models[1];

		vehicle_Request = req.body;
		vehicle_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		vehicle_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		vehicle_Request.IsActive = '1';

		req.body = vehicle_Request;

		logController.createItem(req, res);

	});
	app.put('/vehicle/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

		logController.updateItem(req, res);
	});
	app.delete ('/vehicle/:id', logController.deleteItem);
};
