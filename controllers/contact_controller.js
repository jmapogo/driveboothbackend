module.exports = function (app,model, sequelize, Sequelize, ssCRUD, moment) {

	var Contact = model;

	var logController = new ssCRUD.Controller(Contact);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Contact_ID', //offsetFieldName
			'Cell', //countFieldName
			'Cell', //searchQFieldName
			['Cell', 'Cell_Alt', 'Email'], //arrayWithSearchFields
			'Contact_ID', //filterFieldName
			['Cell', 'Cell_Alt', 'Email']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Contact_ID';

	logController
	.addCreate(
		['Cell', 'Email'], // arrayOfMandatoryFields
		['Contact_ID', 'Cell_Alt', 'IsActive', 'createdAt', 'updatedAt']) // arrayOfNotMandatoryFields
	.addUpdate(
		['Cell', 'Email'], // arrayOfMandatoryFields
		['Cell_Alt', 'IsActive', 'createdAt', 'updatedAt']) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);

	app.get('/Contact/:id', logController.getItem);
	app.get('/Contact', logController.getItems);
	app.post('/Contact', function (req, res) {
		const uuidv1 = require('uuid/v1');

		req.body.Contact_ID = uuidv1();
		req.body.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.IsActive = '1';
		
		logController.createItem(req, res);
	});
	app.put('/Contact/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		 
		logController.updateItem(req, res);
	});
	app.delete ('/Contact/:id', logController.deleteItem);
};
