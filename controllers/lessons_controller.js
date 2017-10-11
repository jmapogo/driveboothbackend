module.exports = function (app, models, sequelize, Sequelize, ssCRUD, moment, underscore) {

	var Lessons = models[0];

	var logController = new ssCRUD.Controller(Lessons);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Lesson_ID', //offsetFieldName
			'Lesson_DateTime ', //countFieldName
			'Lesson_ID', //searchQFieldName
			['Lesson_ID', 'Lesson_DateTime', 'Fee','Mileage_Used','Client_Progress_Made', 'Staff_ID', 'Client_ID', 'Lesson_Status_Code', 'Vehicle_Reg_Number', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Lesson_ID', //filterFieldName
			['Lesson_ID', 'Lesson_DateTime', 'Fee','Mileage_Used','Client_Progress_Made', 'Staff_ID', 'Client_ID', 'Lesson_Status_Code', 'Vehicle_Reg_Number', 'IsActive', 'createdAt', 'updatedAt']) //arrayWithSearchFields

			queryHelper.id = 'Lesson_ID';

			logController
			.addCreate(
				['Lesson_ID', 'Lesson_DateTime', 'Fee','Mileage_Used','Client_Progress_Made', 'Staff_ID', 'Client_ID', 'Lesson_Status_Code', 'Vehicle_Reg_Number', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
				[]) // arrayOfNotMandatoryFields
			.addUpdate(
				['Lesson_ID', 'Lesson_DateTime', 'Fee','Mileage_Used','Client_Progress_Made', 'updatedAt'], //arrayWithSearchFields
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

				  
				req.body.Lesson_ID = uuidv1(); 
				req.body.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
				req.body.IsActive = '1';
 
  
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
