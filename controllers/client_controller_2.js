module.exports = function (app, models, sequelize, Sequelize, ssCRUD, moment, underscore) {

	var client = models[0];

	var logController = new ssCRUD.Controller(client);

	var queryHelper = new ssCRUD.QueryHelper(sequelize,
			'Client_ID', //offsetFieldName
			'First_Name ', //countFieldName
			'Client_ID', //searchQFieldName
			['Client_ID', 'First_Name ', 'Middle_Name','Last_Name', 'Email_Address', 'Home_Phone_Number', 'Cell_Mobile_Phone_Number', 'Date_Became_Customer', 'Date_Last_Contact', 'IsActive', 'createdAt', 'updatedAt'], //arrayWithSearchFields
			'Client_ID', //filterFieldName
			['Client_ID', 'First_Name ', 'Middle_Name','Last_Name', 'Email_Address', 'Home_Phone_Number', 'Cell_Mobile_Phone_Number', 'Date_Became_Customer', 'Date_Last_Contact', 'IsActive', 'createdAt', 'updatedAt']); //arrayOfAvailableFieldsForFilter

	queryHelper.id = 'Client_ID';

	logController
	.addCreate(
		['Client_ID', 'First_Name', 'Middle_Name','Last_Name', 'Email_Address', 'Home_Phone_Number', 'Cell_Mobile_Phone_Number', 'Date_Became_Customer', 'Date_Last_Contact', 'Date_Of_Birth', 'Address_ID', 'Office_ID', 'Contact_ID', 'IsActive', 'createdAt', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addUpdate(
		['First_Name ', 'Middle_Name', 'Email_Address','Last_Name', 'Home_Phone_Number', 'Cell_Mobile_Phone_Number', 'Date_Became_Customer', 'Date_Last_Contact', 'IsActive', 'updatedAt'], // arrayOfMandatoryFields
		[]) // arrayOfNotMandatoryFields
	.addQueryHelper(queryHelper);

	app.get('/client/:id', logController.getItem);
	/*
	app.patch('/client/', function (req, res) {
		console.log(client.rawAttributes);
		res.json({
			columns: client.rawAttributes
		});
	});
	*/
	app.patch('/client/', function (req, res) {
			 
		var json = JSON.parse("[" +
			"    {" +
			"        \"key\": \"client\"," +
			"        \"descript\": \"Client Details\"," +
			"        \"props\": [" +
			"            {" +
			"                \"key\": \"Nickname\"," +
			"                \"descript\": \"Nick Name\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"First_Name\"," +
			"                \"descript\": \"First Name\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Middle_Name\"," +
			"                \"descript\": \"Middle Name\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Email_Address\"," +
			"                \"descript\": \"Email Address\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Home_Phone_Number\"," +
			"                \"descript\": \"Home Phone Number\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Cell_Mobile_Phone_Number\"," +
			"                \"descript\": \"Cell Number\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Last_Name\"," +
			"                \"descript\": \"Last Name\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Date_Of_Birth\"," +
			"                \"descript\": \"Date Of Birth\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Date_Became_Customer\"," +
			"                \"descript\": \"Date Became Customer\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Date_Last_Contact\"," +
			"                \"descript\": \"Date Last Contact\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Gender\"," +
			"                \"descript\": \"Gender\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Office_ID\"," +
			"                \"descript\": \"Office ID\"," +
			"                \"type\": \"txt\"" +
			"            }" +
			"        ]" +
			"    }," +
			"    {" +
			"        \"key\": \"contact\"," +
			"        \"descript\": \"Contact Details\"," +
			"        \"props\": [" +
			"            {" +
			"                \"key\": \"Cell\"," +
			"                \"descript\": \"Cell ID\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Cell_Alt\"," +
			"                \"descript\": \"Alternative Cell\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Email\"," +
			"                \"descript\": \"Email\"," +
			"                \"type\": \"txt\"" +
			"            }" +
			"        ]" +
			"    }," +
			"    {" +
			"        \"key\": \"address\"," +
			"        \"descript\": \"Physical Address\"," +
			"        \"props\": [" +
			"            {" +
			"                \"key\": \"Line_1_Number_Building\"," +
			"                \"descript\": \"Line 1 Number Building\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Line_2_Number_Street\"," +
			"                \"descript\": \"Line 2 Number Street\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Line_3_Area_Locality\"," +
			"                \"descript\": \"Line 3 Area Locality\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"City\"," +
			"                \"descript\": \"City\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Postal_Code\"," +
			"                \"descript\": \"Postal Code\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Province\"," +
			"                \"descript\": \"Province\"," +
			"                \"type\": \"txt\"" +
			"            }," +
			"            {" +
			"                \"key\": \"Country\"," +
			"                \"descript\": \"Country\"," +
			"                \"type\": \"txt\"" +
			"            }" +
			"        ]" +
			"    }" +
			"]");
			console.log(json);
		   res.json(json);   
	});
	app.get('/client', function (req, res) {
		logController.getItems(req, res);
	});
	app.post('/client', function (req, res) {

		const uuidv1 = require('uuid/v1');

		var Client_Request = {};
		var Contact_Request = {};
		var Address_Request = {};

		var contact = models[1];
		var address = models[2];

		var Contact_ID = uuidv1();
		var Address_ID = uuidv1();
		
		console.log(req.body);

		Client_Request = req.body.client;
		Client_Request.Client_ID = uuidv1();
		Client_Request.Contact_ID = Contact_ID;
		Client_Request.Address_ID = Address_ID;
		Client_Request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Client_Request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		Client_Request.IsActive = '1';

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

		req.body = Client_Request;

		contact.create(Contact_Request);
		address.create(Address_Request);
		logController.createItem(req, res, underscore);

		//logController.createItem(req, res);
	});
	app.put('/client/:id', function (req, res) {
		req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

		logController.updateItem(req, res);
	});
	app.delete ('/client/:id', logController.deleteItem);

	return client;
};
