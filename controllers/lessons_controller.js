module.exports = function (app, models, sequelize, Sequelize, ssCRUD, moment, underscore) {

	var Lessons = models[0];

	var logController = new ssCRUD.Controller(Lessons);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Lessons_ID', //offsetFieldName
			'Lesson_DateTime ', //countFieldName
			'Lessons_ID', //searchQFieldName
			['Lessons_ID', 'Lesson_DateTime', 'Fee','Mileage_Used','Client_Progress_Made', 'Staff_ID', 'Client_ID', 'Lesson_Status_Code', 'Vehicle_Reg_Number', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Lessons_ID', //filterFieldName
			['Lessons_ID', 'Lesson_DateTime', 'Fee','Mileage_Used','Client_Progress_Made', 'Staff_ID', 'Client_ID', 'Lesson_Status_Code', 'Vehicle_Reg_Number', 'IsActive', 'createdAt', 'updatedAt']) //arrayWithSearchFields

			queryHelper.id = 'Lessons_ID';

			logController
			.addCreate(
				['Lessons_ID', 'Lesson_DateTime', 'Fee','Mileage_Used','Client_Progress_Made', 'Staff_ID', 'Client_ID', 'Lesson_Status_Code', 'Vehicle_Reg_Number', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
				[]) // arrayOfNotMandatoryFields
			.addUpdate(
				['Lessons_ID', 'Lesson_DateTime', 'Fee','Mileage_Used','Client_Progress_Made', 'updatedAt'], //arrayWithSearchFields
				[]) // arrayOfNotMandatoryFields
			.addQueryHelper(queryHelper);

			app.get('/Lessons/:id', logController.getItem);
			app.patch('/Lessons/', function (req, res) {
				console.log(Lessons.rawAttributes);
				res.json({
					columns: Lessons.rawAttributes
				});
			});
			app.get('/Lessons', logController.getItems);
			app.post('/Lessons', function (req, res) {

				const uuidv1 = require('uuid/v1');

				var Lessons_Request = {};
				var Contact_Request = {};
				var Address_Request = {};

				var contact = models[1];
				var address = models[2];
				var staff = models[3];

				var Lesson_Status_Code = uuidv1();
				var Vehicle_Reg_Number = uuidv1();
				var Staff_ID = uuidv1();

				Lessons_Request = req.body.Lessons;
				Lessons_Request.Lessons_ID = uuidv1();
				Lessons_Request.Lesson_Status_Code = Lesson_Status_Code;
				Lessons_Request.Vehicle_Reg_Number = Vehicle_Reg_Number;
				Lessons_Request.Staff_ID = Staff_ID;
				Lessons_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Lessons_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Lessons_Request.IsActive = '1';

				Staff_Request = req.body.staff;
				Staff_Request.Staff_ID = Staff_ID;
				Staff_Request.Lesson_Status_Code = Lesson_Status_Code;
				Staff_Request.Vehicle_Reg_Number = Vehicle_Reg_Number;
				Staff_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Staff_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Staff_Request.IsActive = '1';

				Contact_Request = req.body.contact;
				Contact_Request.Lesson_Status_Code = Lesson_Status_Code;
				Contact_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Contact_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Contact_Request.IsActive = '1';

				Address_Request = req.body.address;
				Address_Request.Vehicle_Reg_Number = Vehicle_Reg_Number;
				Address_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Address_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				Address_Request.IsActive = '1';

				req.body = Lessons_Request;

				contact.create(Contact_Request);
				address.create(Address_Request);
				staff.create(Staff_Request); 
				logController.createItem(req, res, underscore);

				//logController.createItem(req, res);
			});
			app.put('/Lessons/:id', function (req, res) {
				req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

				logController.updateItem(req, res);
			});
			app.delete ('/Lessons/:id', logController.deleteItem);

			return Lessons;
};
