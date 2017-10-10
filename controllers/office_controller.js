module.exports = function (app, models, sequelize, Sequelize, ssCRUD, moment) {

	 var office = models[0];

	var logController = new ssCRUD.Controller(office);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Office_ID', //offsetFieldName
			'Office_Name', //countFieldName
			'Office_ID', //searchQFieldName
			['Office_ID', 'Office_Name', 'IsActive', 'createdAt', 'updatedAt', 'Address_ID'], //arrayWithSearchFields
			'Office_ID', //filterFieldName
			['Office_ID', 'Office_Name', 'IsActive', 'createdAt', 'updatedAt', 'Address_ID']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Office_ID';

	logController
	.addCreate(
		['Office_ID', 'Address_ID', 'Office_Name', 'IsActive', 'createdAt', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addUpdate(
		['Office_Name', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);

	app.get('/office/:id', logController.getItem);
	app.get('/office', logController.getItems);
	app.post('/office', function (req, res) {

		var Office_Request = {};
		var Address_Request = {};

		const uuidv1 = require('uuid/v1');

		var Address_ID = uuidv1();
		var address = models[1];

		Office_Request = req.body.office;
		Office_Request.Office_ID = uuidv1();
		Office_Request.Address_ID = Address_ID;
		Office_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Office_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Office_Request.IsActive = '1';

		Address_Request = req.body.address;
		Address_Request.Address_ID = Address_ID;
		Address_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Address_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Address_Request.IsActive = '1';

		req.body = Office_Request;
		
		 
		address.create(Address_Request)
		.then(() =>  logController.createItem(req, res ));
 
	});
	app.put('/office/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

		logController.updateItem(req, res);
	});
	app.delete ('/office/:id', logController.deleteItem);
};
