module.exports = function (app, model, sequelize, Sequelize, ssCRUD, moment) {

	var Ref_Job_Title = model;

	var logController = new ssCRUD.Controller(Ref_Job_Title);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Job_Title_Code', //offsetFieldName
			'Job_Title_Description', //countFieldName
			'Job_Title_Code', //searchQFieldName
			['Job_Title_Code', 'Job_Title_Description', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Job_Title_Code', //filterFieldName
			['Job_Title_Code', 'Job_Title_Description', 'IsActive', 'createdAt', 'updatedAt']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Job_Title_Code';

	logController
	.addCreate(
		['Job_Title_Code', 'Job_Title_Description', 'IsActive', 'createdAt', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addUpdate(
		['Job_Title_Description', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);

	app.get('/Ref_Job_Title/:id', logController.getItem);
	app.get('/Ref_Job_Title', logController.getItems);
	app.post('/Ref_Job_Title', function (req, res) {

		const uuidv1 = require('uuid/v1');

		req.body.Job_Title_Code = uuidv1();
		req.body.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.IsActive = '1';

		logController.createItem(req, res);
	});
	app.put('/Ref_Job_Title/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

		logController.updateItem(req, res);
	});
	app.delete ('/Ref_Job_Title/:id', logController.deleteItem);
};
