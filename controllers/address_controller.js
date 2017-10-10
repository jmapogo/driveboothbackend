module.exports = function (app, model, sequelize, Sequelize, ssCRUD, moment) {

	var address = model;

	var logController = new ssCRUD.Controller(address);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Address_ID', //offsetFieldName
			'Line_1_Number_Building', //countFieldName
			'Address_ID', //searchQFieldName
			['Address_ID', 'Line_1_Number_Building', 'Line_2_Number_Street', 'Line_3_Area_Locality', 'City', 'Postal_Code', 'Province', 'Country', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Address_ID', //filterFieldName
			['Address_ID', 'Line_1_Number_Building', 'Line_2_Number_Street', 'Line_3_Area_Locality', 'City', 'Postal_Code', 'Province', 'Country', 'IsActive', 'createdAt', 'updatedAt']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Address_ID';

	logController
	.addCreate(
		['Address_ID', 'Line_1_Number_Building', 'Line_2_Number_Street', 'Line_3_Area_Locality', 'City', 'Postal_Code', 'Province', 'Country', 'IsActive', 'createdAt', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addUpdate(
		['Line_1_Number_Building', 'Line_2_Number_Street', 'Line_3_Area_Locality', 'City', 'Postal_Code', 'Province', 'Country', 'IsActive', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);

	app.get('/address/:id', logController.getItem);
	app.patch('/address/', function (req, res) {
		console.log(address.rawAttributes);		
		res.json({ 
				columns: address.rawAttributes
			}); 
	});
	app.get('/address', logController.getItems);
	app.post('/address', function (req, res) {

		const uuidv1 = require('uuid/v1');

		req.body.Address_ID = uuidv1();
		req.body.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		req.body.IsActive = '1';

		logController.createItem(req, res);
	});
	app.put('/address/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

		logController.updateItem(req, res);
	});
	app.delete ('/address/:id', logController.deleteItem);

	return address;
};
