const express = require('express');
const app = express();
const mysql = require('mysql');
const Sequelize = require('sequelize');
const underscore = require('underscore');
const bodyParser = require('body-parser');

const sequelize = new Sequelize('drivebooth14', 'root', 'root', {
		host: 'localhost',
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},

	});
const moment = require('moment');
const ssCRUD = require('./utils/sequelize-crud.js');

app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

var options = {
	origin: '*', // default: '*'
	method: 'GET,PUT,POST,DELETE,HEAD,OPTIONS,PATCH', // default: 'GET,PUT,POST,DELETE,HEAD,OPTIONS'
	headers: 'Content-Type, Content-Length' // default: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
};

app.use(require('express-cors-options')(options));

var address = sequelize.import('./models/address');
require('./controllers/address_controller.js')(app, address, sequelize, Sequelize, ssCRUD, moment, mysql, underscore);

var ref_payment_method = sequelize.import('./models/ref_payment_method');
require('./controllers/ref_payment_method_controller.js')(app, ref_payment_method, sequelize, Sequelize, ssCRUD, moment, mysql, underscore);

var ref_lesson_status = sequelize.import('./models/ref_lesson_status');
require('./controllers/ref_lesson_status_controller.js')(app, ref_lesson_status, sequelize, Sequelize, ssCRUD, moment, mysql, underscore);

var ref_job_title = sequelize.import('./models/ref_job_title');
require('./controllers/ref_job_title_controller.js')(app, ref_job_title, sequelize, Sequelize, ssCRUD, moment, mysql, underscore);

var contact = sequelize.import('./models/contact');
require('./controllers/contact_controller.js')(app, contact, sequelize, Sequelize, ssCRUD, moment, mysql, underscore);

var roles = sequelize.import('./models/roles');
require('./controllers/roles_controller.js')(app, roles, sequelize, Sequelize, ssCRUD, moment, mysql, underscore);

var permissions = sequelize.import('./models/permissions');
console.log(permissions);
require('./controllers/permissions_controller.js')(app, [permissions, roles], sequelize, Sequelize, ssCRUD, moment, mysql, underscore);

var office = sequelize.import('./models/office');
require('./controllers/office_controller.js')(app, [office, address], sequelize, Sequelize, ssCRUD, moment, mysql, underscore);
office.hasOne(address, {
	foreignKey: 'address_id',
	sourceKey: 'address_id'
});

var vehicle = sequelize.import('./models/vehicle');
require('./controllers/vehicle_controller.js')(app, vehicle, sequelize, Sequelize, ssCRUD, moment, mysql, underscore);
vehicle.hasOne(office, {
	foreignKey: 'office_id',
	sourceKey: 'office_id'
});

var users = sequelize.import('./models/users');
require('./controllers/users_controller.js')(app, [users, address, contact], sequelize, Sequelize, ssCRUD, moment, mysql, underscore);
vehicle.hasOne(office, {
	foreignKey: 'office_id',
	sourceKey: 'office_id'
});
vehicle.hasOne(address, {
	foreignKey: 'address_id',
	sourceKey: 'address_id'
});
vehicle.hasOne(contact, {
	foreignKey: 'contact_id',
	sourceKey: 'contact_id'
});

/*
var user_roles = sequelize.import('./models/user_roles');
require('./controllers/user_roles_controller.js')(app, [user_roles, address, contact], sequelize, Sequelize, ssCRUD, moment, mysql, underscore);
user_roles.hasOne(users, {
	foreignKey: 'id',
	sourceKey: 'id'
});
user_roles.hasOne(role, {
	foreignKey: 'id',
	sourceKey: 'id'
});
*/

var client = sequelize.import('./models/client');
require('./controllers/client_controller.js')(app, [client, address, contact, users], sequelize, Sequelize, ssCRUD, moment, mysql, underscore);
client.hasOne(users, {
	foreignKey: 'user_id',
	sourceKey: 'user_id'
});
client.belongsTo(users,  {foreignKey: 'user_id', targetKey: 'id'});

var staff = sequelize.import('./models/staff');
require('./controllers/staff_controller.js')(app, [staff, address, contact, users], sequelize, Sequelize, ssCRUD, moment, mysql, underscore);
staff.hasOne(users, {
	foreignKey: 'user_id',
	sourceKey: 'user_id'
});


var lessons = sequelize.import('./models/lessons');
require('./controllers/lessons_controller.js')(app, [lessons, address, contact, users, staff], sequelize, Sequelize, ssCRUD, moment, mysql, underscore);
lessons.hasOne(users, {
	foreignKey: 'user_id',
	sourceKey: 'user_id'
});


var client_payment = sequelize.import('./models/client_payment');
require('./controllers/client_payment_controller.js')(app, [client_payment], sequelize, Sequelize, ssCRUD, moment, mysql, underscore);
client_payment.hasOne(client, {
	foreignKey: 'client_id',
	sourceKey: 'client_id'
}); 
client_payment.hasOne(ref_payment_method, {
	foreignKey: 'payment_method_code',
	sourceKey: 'payment_method_code'
});
 

/*


var contact = sequelize.import('./models/contact');
require('./controllers/contact_controller.js')(app, contact, sequelize, Sequelize, ssCRUD, moment);

var ref_payment_method = sequelize.import('./models/ref_payment_method');
require('./controllers/ref_payment_method_controller.js')(app, ref_payment_method, sequelize, Sequelize, ssCRUD, moment);

var ref_lesson_status = sequelize.import('./models/ref_lesson_status');
require('./controllers/ref_lesson_status_controller.js')(app, ref_lesson_status, sequelize, Sequelize, ssCRUD, moment);

var ref_job_title = sequelize.import('./models/ref_job_title');
require('./controllers/ref_job_title_controller.js')(app, ref_job_title, sequelize, Sequelize, ssCRUD, moment);

var office = sequelize.import('./models/office');
require('./controllers/office_controller.js')(app, [office, address, staff], sequelize, Sequelize, ssCRUD, moment);
office.hasOne(address, {
foreignKey: 'Address_ID',
sourceKey: 'Address_ID'
});

var client = sequelize.import('./models/client');
require('./controllers/client_controller.js')(app, [client, contact, address], sequelize, Sequelize, ssCRUD, moment, underscore);
client.hasOne(address, {
foreignKey: 'Address_ID',
sourceKey: 'Address_ID'
});
client.hasOne(office, {
foreignKey: 'Office_ID',
sourceKey: 'Office_ID'
});
client.hasOne(contact, {
foreignKey: 'Contact_ID',
sourceKey: 'Contact_ID'
});

var staff = sequelize.import('./models/staff');
require('./controllers/staff_controller.js')(app, [staff, contact, address], sequelize, Sequelize, ssCRUD, moment, underscore);
staff.hasOne(address, {
foreignKey: 'Address_ID',
sourceKey: 'Address_ID'
});
staff.hasOne(office, {
foreignKey: 'Office_ID',
sourceKey: 'Office_ID'
});
staff.hasOne(contact, {
foreignKey: 'Contact_ID',
sourceKey: 'Contact_ID'
});

var lessons = sequelize.import('./models/lessons');
require('./controllers/lessons_controller.js')(app, [lessons, contact, address, staff], sequelize, Sequelize, ssCRUD, moment, underscore);
lessons.hasOne(staff, {
foreignKey: 'Staff_ID',
sourceKey: 'Staff_ID'
});
lessons.hasOne(address, {
foreignKey: 'Address_ID',
sourceKey: 'Address_ID'
});
lessons.hasOne(office, {
foreignKey: 'Office_ID',
sourceKey: 'Office_ID'
});
lessons.hasOne(contact, {
foreignKey: 'Contact_ID',
sourceKey: 'Contact_ID'
});

var client_payment = sequelize.import('./models/client_payment');
require('./controllers/client_payment_controller.js')(app, [client_payment], sequelize, Sequelize, ssCRUD, moment, underscore);
client_payment.hasMany(client, {
foreignKey: 'Client_ID',
sourceKey: 'Client_ID'
});

var vehicle = sequelize.import('./models/vehicle');
require('./controllers/vehicle_controller.js')(app, [vehicle], sequelize, Sequelize, ssCRUD, moment);
office.hasOne(office, {
foreignKey: 'Office_ID',
sourceKey: 'Office_ID'
});

var lessons = sequelize.import('./models/lessons');
require('./controllers/lessons_controller.js')(app, [lessons, client, address, staff], sequelize, Sequelize, ssCRUD, moment, underscore);
lessons.hasOne(staff, {
foreignKey: 'Staff_ID',
sourceKey: 'Staff_ID'
});
lessons.hasOne(ref_lesson_status, {
foreignKey: 'Lesson_Status_Code',
sourceKey: 'Lesson_Status_Code'
});
lessons.hasOne(vehicle, {
foreignKey: 'Vehicle_Reg_Number',
sourceKey: 'Vehicle_Reg_Number'
});
lessons.hasOne(client, {
foreignKey: 'Client_ID',
sourceKey: 'Client_ID'
});
 */

//office .belongsTo(address);
//User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // Adds fk_companyname to User

app.listen(3000, function () {
	// Website you wish to allow to connect

	//console.log(sequelize.connectionManager.config);
	console.log('Example app listening on port 3000!');
})
