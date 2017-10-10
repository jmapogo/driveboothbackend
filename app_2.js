const express = require('express');
const app = express();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('drivebooth6', 'root', 'root', {
		host: 'localhost',
		dialect: 'mysql',

		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},

	});

app.post('/address/add', function (req, res) {
	res.send('Hello World!');

	sequelize
	.authenticate()
	.then(() => {

	/*
		const address = sequelize.define('address', {
				Address_ID: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				Line_1_Number_Building: {
					type: Sequelize.STRING
				},
				Line_2_Number_Street: {
					type: Sequelize.STRING
				},
				Line_3_Area_Locality: {
					type: Sequelize.STRING
				},
				City: {
					type: Sequelize.STRING
				},
				Postal_Code: {
					type: Sequelize.STRING
				},
				Province: {
					type: Sequelize.STRING
				},
				Country: {
					type: Sequelize.STRING
				},
				IsActive:{
					type: Sequelize.STRING
				}
			}, {
				freezeTableName: true,
				underscored: true,
				timestamps: false,
				tableName: 'address'

			});
			*/

		 var address =   require('./models/address.js')(sequelize,  Sequelize ) ;
		 
		  
		address.create({
			'Line_1_Number_Building': '555',
			'Line_2_Number_Street': '555',
			'Line_3_Area_Locality': '555',
			'City': '555',
			'Postal_Code': '555',
			'Province': '555',
			'Country':'555',
			'IsActive':1
		}).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
			return address.findAll();
		}).then(addresses => {
			for(var i  = 0; i < addresses.length; i++){
				  console.log(addresses[i].dataValues);
				  console.log('');
			}
		});
		 
		 

	})
	.catch (err => {
		console.error('Unable to connect to the database:', err);
	});

})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})
