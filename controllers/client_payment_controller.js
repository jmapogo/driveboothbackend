module.exports = function (app, models, sequelize, Sequelize, ssCRUD, moment) {

	var Client_Payment = models[0];

	var logController = new ssCRUD.Controller(Client_Payment);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Date_Of_Payment', //offsetFieldName
			'Payment_Amount', //countFieldName
			'Date_Of_Payment', //searchQFieldName
			['Date_Of_Payment', 'Payment_Amount', 'Payment_Method_Code', 'Client_ID', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Date_Of_Payment', //filterFieldName
			['Date_Of_Payment', 'Payment_Amount', 'Payment_Method_Code', 'Client_ID', 'IsActive', 'createdAt', 'updatedAt']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Date_Of_Payment';

	logController
	.addCreate(
		['Date_Of_Payment', 'Payment_Amount', 'Payment_Method_Code', 'Client_ID', 'IsActive', 'createdAt', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addUpdate(
		['Payment_Amount', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);
	app.patch('/Client_Payment/', function (req, res) {
		console.log(Client_Payment.rawAttributes);
		res.json({
			columns: Client_Payment.rawAttributes
		});
	});
	app.get('/Client_Payment/:id', logController.getItem);
	app.get('/Client_Payment', logController.getItems);
	app.post('/Client_Payment', function (req, res) {

		const uuidv1 = require('uuid/v1');
 
		req.body.Date_Of_Payment = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.IsActive = '1';

		logController.createItem(req, res);
	});
	app.put('/Client_Payment/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

		logController.updateItem(req, res);
	});
	app.delete ('/Client_Payment/:id', logController.deleteItem);
};
