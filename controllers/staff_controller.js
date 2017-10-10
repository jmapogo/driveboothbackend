module.exports = function (app, models, sequelize, Sequelize, ssCRUD, moment, underscore) {

	var Staff = models[0];

	var logController = new ssCRUD.Controller(Staff);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Staff_ID', //offsetFieldName
			'First_Name ', //countFieldName
			'Staff_ID', //searchQFieldName
			['Staff_ID', 'First_Name', 'Middle_Name', 'Last_Name', 'Nickname', 'Date_Joined_Staff', 'Date_Of_Birth', 'Date_Left_Staff', 'Gender', 'Office_ID', 'Contact_ID', 'Address_ID', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Staff_ID', //filterFieldName
			['Staff_ID', 'First_Name', 'Middle_Name', 'Last_Name', 'Nickname', 'Date_Joined_Staff', 'Date_Of_Birth', 'Date_Left_Staff', 'Gender', 'Office_ID', 'Contact_ID', 'Address_ID', 'IsActive', 'createdAt', 'updatedAt']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Staff_ID';

	logController
	.addCreate(
		['Staff_ID', 'First_Name', 'Middle_Name', 'Last_Name', 'Nickname', 'Date_Joined_Staff', 'Date_Of_Birth', 'Date_Left_Staff', 'Gender', 'Office_ID', 'Contact_ID', 'Address_ID', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
		[]) // arrayOfNotMandatoryFields
	.addUpdate(
		['Staff_ID', 'First_Name', 'Middle_Name', 'Last_Name', 'Nickname', 'Date_Joined_Staff', 'Date_Of_Birth', 'Date_Left_Staff', 'Gender', 'updatedAt'], //arrayWithSearchFields
		[]) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);

	app.get('/Staff/:id', logController.getItem);
	app.patch('/Staff/', function (req, res) {
		console.log(Staff.rawAttributes);
		res.json({
			columns: Staff.rawAttributes
		});
	});
	app.get('/Staff', logController.getItems);
	app.post('/Staff', function (req, res) {

		const uuidv1 = require('uuid/v1');

		var Staff_Request = {};
		var Contact_Request = {};
		var Address_Request = {};

		var contact = models[1];
		var address = models[2];

		var Contact_ID = uuidv1();
		var Address_ID = uuidv1();

		Staff_Request = req.body.staff;
		Staff_Request.Staff_ID = uuidv1();
		Staff_Request.Contact_ID = Contact_ID;
		Staff_Request.Address_ID = Address_ID;
		Staff_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Staff_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Staff_Request.IsActive = '1';

		Contact_Request = req.body.contact;
		Contact_Request.Contact_ID = Contact_ID;
		Contact_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Contact_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Contact_Request.IsActive = '1';

		Address_Request = req.body.address;
		Address_Request.Address_ID = Address_ID;
		Address_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Address_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Address_Request.IsActive = '1';

		req.body = Staff_Request;

		 contact.create(Contact_Request);
		 address.create(Address_Request);
		logController.createItem(req, res, underscore);

		//logController.createItem(req, res);
	});
	app.put('/Staff/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

		logController.updateItem(req, res);
	});
	app.delete ('/Staff/:id', logController.deleteItem);

	return Staff;
};
