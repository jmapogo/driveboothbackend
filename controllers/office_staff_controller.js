module.exports = function (app, models, sequelize, Sequelize, ssCRUD, moment, underscore) {

	var Office_Staff = models[0];

	var logController = new ssCRUD.Controller(Office_Staff);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Office_Staff_ID', //offsetFieldName
			'Date_From ', //countFieldName
			'Office_Staff_ID', //searchQFieldName
			['Office_Staff_ID', 'Date_From', 'Date_To','Job_Title_Code', 'Staff_ID', 'Office_ID', 'Contact_ID', 'Address_ID', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Office_Staff_ID', //filterFieldName
			['Office_Staff_ID', 'Date_From', 'Date_To','Job_Title_Code', 'Staff_ID', 'Office_ID', 'Contact_ID', 'Address_ID', 'IsActive', 'createdAt', 'updatedAt']) //arrayWithSearchFields

			queryHelper.id = 'Office_Staff_ID';

			logController
			.addCreate(
				['Office_Staff_ID', 'Date_From', 'Date_To','Job_Title_Code', 'Staff_ID', 'Office_ID', 'Contact_ID', 'Address_ID', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
				[]) // arrayOfNotMandatoryFields
			.addUpdate(
				['Office_Staff_ID', 'Date_From', 'Date_To','Job_Title_Code', 'updatedAt'], //arrayWithSearchFields
				[]) // arrayOfNotMandatoryFields
			.addQueryHelper(queryHelper);

			app.get('/Office_Staff/:id', logController.getItem);
			app.patch('/Office_Staff/', function (req, res) {
				console.log(Office_Staff.rawAttributes);
				res.json({
					columns: Office_Staff.rawAttributes
				});
			});
			app.get('/Office_Staff', logController.getItems);
			app.post('/Office_Staff', function (req, res) {

				const uuidv1 = require('uuid/v1');

				var Office_Staff_Request = {};
				var Contact_Request = {};
				var Address_Request = {};

				var contact = models[1];
				var address = models[2];
				var staff = models[3];

				var Contact_ID = uuidv1();
				var Address_ID = uuidv1();
				var Staff_ID = uuidv1();

				Office_Staff_Request = req.body.office_staff;
				Office_Staff_Request.Office_Staff_ID = uuidv1();
				Office_Staff_Request.Contact_ID = Contact_ID;
				Office_Staff_Request.Address_ID = Address_ID;
				Office_Staff_Request.Staff_ID = Staff_ID;
				Office_Staff_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Office_Staff_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Office_Staff_Request.IsActive = '1';

				Staff_Request = req.body.staff;
				Staff_Request.Staff_ID = Staff_ID;
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

				req.body = Office_Staff_Request;

				contact.create(Contact_Request);
				address.create(Address_Request);
				staff.create(Staff_Request); 
				logController.createItem(req, res, underscore);

				//logController.createItem(req, res);
			});
			app.put('/Office_Staff/:id', function (req, res) {
				req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

				logController.updateItem(req, res);
			});
			app.delete ('/Office_Staff/:id', logController.deleteItem);

			return Office_Staff;
};
