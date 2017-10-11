const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const underscore = require('underscore');
const bodyParser = require('body-parser');

const sequelize = new Sequelize('drivebooth12', 'root', 'root', {
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

var address = sequelize.import('./models/address');
require('./controllers/address_controller.js')(app, address, sequelize, Sequelize, ssCRUD, moment);

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

var office_staff = sequelize.import('./models/office_staff');
require('./controllers/office_staff_controller.js')(app, [office_staff, contact, address, staff], sequelize, Sequelize, ssCRUD, moment, underscore);
office_staff.hasOne(staff, {
	foreignKey: 'Staff_ID',
	sourceKey: 'Staff_ID'
});
office_staff.hasOne(address, {
	foreignKey: 'Address_ID',
	sourceKey: 'Address_ID'
});
office_staff.hasOne(office, {
	foreignKey: 'Office_ID',
	sourceKey: 'Office_ID'
});
office_staff.hasOne(contact, {
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

//office .belongsTo(address);
//User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // Adds fk_companyname to User

app.listen(3000, function () {

	console.log('Example app listening on port 3000!')
})
