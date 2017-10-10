module.exports = function (app,model, sequelize, Sequelize, ssCRUD, moment) {

	var Ref_Lesson_Status = model;

	var logController = new ssCRUD.Controller(Ref_Lesson_Status);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Lesson_Status_Code', //offsetFieldName
			'Lesson_Status_Description', //countFieldName
			'Lesson_Status_Code', //searchQFieldName
			['Lesson_Status_Code', 'Lesson_Status_Description', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Lesson_Status_Code', //filterFieldName
			['Lesson_Status_Code', 'Lesson_Status_Description', 'IsActive', 'createdAt', 'updatedAt']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Lesson_Status_Code';

	logController
	.addCreate(
		['Lesson_Status_Code', 'Lesson_Status_Description', 'IsActive', 'createdAt', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addUpdate(
		['Lesson_Status_Description', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);

	app.get('/Ref_Lesson_Status/:id', logController.getItem);
	app.get('/Ref_Lesson_Status', logController.getItems);
	app.post('/Ref_Lesson_Status', function (req, res) {

		const uuidv1 = require('uuid/v1');

		req.body.Lesson_Status_Code = uuidv1();
		req.body.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.IsActive = '1';

		logController.createItem(req, res);
	});
	app.put('/Ref_Lesson_Status/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

		logController.updateItem(req, res);
	});
	app.delete ('/Ref_Lesson_Status/:id', logController.deleteItem);
};
