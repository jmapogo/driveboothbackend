module.exports = function (app, model, sequelize, Sequelize, ssCRUD, moment, mysql, underscore) {

	var users = model[0];
	var queryHelper;
	var primary_key = "";
	var all_columns = underscore.map(users.rawAttributes, function (item) {
			return item.fieldName;
		});
	//var con = mysql.createConnection(sequelize.connectionManager.config );
	var config = sequelize.connectionManager.config;
	var con = mysql.createConnection({
			host: config.host,
			user: config.username,
			password: config.password,
			database: config.database
		});

	var query = " SELECT k.column_name, T.constraint_type ";
	query += " FROM information_schema.table_constraints t ";
	query += " JOIN information_schema.key_column_usage k ";
	query += " USING(constraint_name,table_schema,table_name)  ";
	query += " WHERE t.table_schema='" + config.database + "' ";
	query += " AND t.table_name='users' ";
	query += " AND t.constraint_type='PRIMARY KEY'; ";
 
	con.connect(function (err) {
		if (err)
			throw err;
		con.query(query, function (err, result, fields) {
			if (err)
				throw err;
			if (result.length > 0) {
				primary_key = result[0].column_name;
				queryHelper = new ssCRUD.QueryHelper(sequelize,
						result[0].column_name, //offsetFieldName
						result[0].column_name, //countFieldName
						result[0].column_name, //searchQFieldName
						all_columns, //arrayWithSearchFields
						result[0].column_name, //filterFieldName
						all_columns); //arrayOfAvailableFieldsForFilter

				queryHelper.id = result[0].column_name;

				var logController = new ssCRUD.Controller(users);
				logController
				.addCreate(
					underscore.without(all_columns, result[0].column_name, 'id'), // arrayOfMandatoryFields
					[]) // arrayOfNotMandatoryFields
				.addUpdate(
					underscore.without(all_columns, result[0].column_name, 'IsActive', 'createdAt'), // arrayOfMandatoryFields
					[]) // arrayOfNotMandatoryFields
				.addQueryHelper(queryHelper);

				app.get('/users/:id', logController.getItem);
				app.get('/users/', logController.getItems);
				app.post('/users/', function (req, res) {

					 

					const uuidv1 = require('uuid/v1');

					var address_id = uuidv1();
					var contact_id = uuidv1();
					var address = model[1];
					var contact = model[2];

					var users_request = req.body.users; 
					users_request.address_id = address_id;
					users_request.contact_id = contact_id;
					users_request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					users_request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					users_request.IsActive = '1';

					var address_request = req.body.address;
					address_request.address_id = address_id;
					address_request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					address_request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					address_request.IsActive = '1';
					
					var contacts_request = req.body.contact;
					contacts_request.contact_id = contact_id;
					contacts_request.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					contacts_request.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					contacts_request.IsActive = '1';

					req.body = users_request;
					
					address.create(address_request)
					contact.create(contacts_request)

					logController.createItem(req, res)

				});
				app.put('/users/:id', function (req, res) {
					req.body.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

					logController.updateItem(req, res);
				});
				app.delete ('/users/:id', logController.deleteItem);
				app.patch('/users/', function (req, res) {

					var query = "SELECT   column_name,  ";
					query += " data_type, character_maximum_length  ";
					query += " FROM     information_schema.columns  ";
					query += " WHERE    table_schema='" + sequelize.connectionManager.config.database + "'  ";
					query += " AND      table_name='users'  ";
					query += " AND      column_name NOT IN  ";
					query += " (  ";
					query += " SELECT k.column_name  ";
					query += " FROM   information_schema.table_constraints t  ";
					query += " JOIN   information_schema.key_column_usage k  ";
					query += " USING (constraint_name,table_schema,table_name)  ";
					query += " WHERE  t.table_schema='" + sequelize.connectionManager.config.database + "'  ";
					query += " AND    t.table_name='users')  ";
					query += " AND      column_name NOT IN ('IsActive',  ";
					query += " 'updatedAt',  ";
					query += "  'createdAt')";
					query += " ORDER BY column_name ASC ";

					con.connect(function (err) {
						con.query(query, function (err, result, fields) {
							console.log(result);
							//console.log(fields);
							res.json(underscore.map(result, function (item) {
									return item;
								}));
						});
					});

				});

			}

		});
	});

	return users;
};
