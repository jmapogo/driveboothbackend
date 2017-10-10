module.exports = function (app,model, sequelize, Sequelize, ssCRUD, moment) {

	var Ref_Payment_Method = model;

	var logController = new ssCRUD.Controller(Ref_Payment_Method);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Payment_Method_Code', //offsetFieldName
			'Payment_Method_Description', //countFieldName
			'Payment_Method_Code', //searchQFieldName
			['Payment_Method_Code', 'Payment_Method_Description', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Payment_Method_Code', //filterFieldName
			['Payment_Method_Code', 'Payment_Method_Description', 'IsActive', 'createdAt', 'updatedAt']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Payment_Method_Code';

	logController
	.addCreate(
		['Payment_Method_Code', 'Payment_Method_Description', 'IsActive', 'createdAt', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addUpdate(
		['Payment_Method_Description', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);

	app.get('/Ref_Payment_Method/:id', logController.getItem);
	app.get('/Ref_Payment_Method', logController.getItems);
	app.post('/Ref_Payment_Method', function (req, res) {

		const uuidv1 = require('uuid/v1');

		req.body.Payment_Method_Code = uuidv1();
		req.body.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.IsActive = '1';

		logController.createItem(req, res);
	});
	app.put('/Ref_Payment_Method/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

		logController.updateItem(req, res);
	});
	app.delete ('/Ref_Payment_Method/:id', logController.deleteItem);
};
