var QueryHelper = require('./queryHelper');

var errorFunction;

function Controller(Model) {
	var queryHelper;
	var createMandatoryFields;
	var optionalCreateFields;
	var updateMandatoryFields;
	var optionalUpdateFields;

	// Settings

	function addQueryHelper(queryHelperI) {
		 
		queryHelper = queryHelperI;
		return this;
	}

	function addCreate(mandatoryFieldsI, optionalFieldsI) {
		createMandatoryFields = mandatoryFieldsI;
		optionalCreateFields = optionalFieldsI;
		return this;
	}

	function addUpdate(mandatoryFieldsI, optionalFieldsI) {
		updateMandatoryFields = mandatoryFieldsI;
		optionalUpdateFields = optionalFieldsI;
		return this;
	}

	// CRUD methods

	function getItem(request, response, parent) {
		var id = request.params.id;
		// Need 'id' field
		if (!id)
			return response.status(400).json({
				error: 'Wrong id'
			});

		Model
		.findById({include: [parent]})
		.then(function (result) {
			if (!result)
				return response.sendStatus(404);

			response.json({
				item: result
			});
		})
		.catch (function (error) {
			if (errorFunction)
				errorFunction(response, error, function () {
					error500(response, error)
				});
				else
					error500(response, error);
			});
	}

	function getItems(request, response) {
	

		
		var config = queryHelper.getConfig(request);
		
		console.log(  config);

		Model
		.findAndCount(config)
		.then(function (result) {

			
			response.json({
				count: result.count,
				items: result.rows
			}); 
		})
		.catch (function (error) {
			console.log(error.stack);
			response.status(500).json({
				error: error.toString()
			});
		});
	}

	function createItem(request, response, underscore) {
		console.log(Object.keys(request.body).sort());
		console.log('');
		console.log(createMandatoryFields);

		var config = {};

		if (createMandatoryFields) {
			for (var i = 0; i < createMandatoryFields.length; i++) {
				if (request.body[createMandatoryFields[i]] !== undefined) {
					config[createMandatoryFields[i]] = request.body[createMandatoryFields[i]];
				} else
					return response.status(400).json({
						error: 'Wrong parameters {' + createMandatoryFields[i] + '} {' + [createMandatoryFields[i]] + '}:{' + request.body[createMandatoryFields[i]] + '} '
					});
			}
		}

		if (optionalCreateFields) {
			for (var i = 0; i < optionalCreateFields.length; i++) {
				if (request.body[optionalCreateFields[i]] !== undefined) {
					config[optionalCreateFields[i]] = request.body[optionalCreateFields[i]];
				}
			}
		}

		Model
		.create(config)
		.then(function (result) {
			response.sendStatus(200);
		})
		.catch (function (error) {
			if (errorFunction)
				errorFunction(response, error, function () {
					error500(response, error)
				});
				else
					error500(response, error);
			});
	}

	function updateItem(request, response) {
		var id = request.params.id;
		
		// Need 'id' field
		if (!id)
			return response.status(400).json({
				error: 'Wrong id'
			});

		var config = {};

		if (updateMandatoryFields) {
			for (var i = 0; i < updateMandatoryFields.length; i++) {
				if (request.body[updateMandatoryFields[i]] !== undefined) {
					config[updateMandatoryFields[i]] = request.body[updateMandatoryFields[i]];
				} else
					return response.status(400).json({
						//error: 'Wrong parameters'
						error: 'Wrong parameters {' + updateMandatoryFields[i] + '} {' + [updateMandatoryFields[i]] + '}:{' + request.body[updateMandatoryFields[i]] + '} '
					});
			}
		}

		if (optionalUpdateFields) {
			for (var i = 0; i < optionalUpdateFields.length; i++) {
				if (request.body[optionalUpdateFields[i]] !== undefined) {
					config[optionalUpdateFields[i]] = request.body[optionalUpdateFields[i]];
				}
			}
		}
		var where = {};
		where[queryHelper.id] = id;

		Model
		.update(config, {
			where: where
		})
		.then(function (result) {
			response.sendStatus(result[0] == 0 ? 404 : 200);
		})
		.catch (function (error) {
			if (errorFunction)
				errorFunction(response, error, function () {
					error500(response, error)
				});
				else
					error500(response, error);
			});
	}

	function deleteItem(request, response) {
		var id = request.params.id;
		// Need 'id' field
		if (!id)
			return response.status(400).json({
				error: 'Wrong id'
			});

		var where = {};
		where[queryHelper.id] = id;

		Model
		.findById(id)
		.then(function (result) {
			if (!result) {
				response.sendStatus(404);
				return null;
			}
			return Model
			.destroy({
				where: where
			});
		})
		.then(function (result) {
			if (result)
				return response.sendStatus(200);
		})
		.catch (function (error) {
			if (errorFunction)
				errorFunction(response, error, function () {
					error500(response, error)
				});
				else
					error500(response, error);
			});
	}

	function error500(response, error) {
		if (error) {
			console.log(error.stack);
			response.status(500).json({
				error: error.toString()
			});
		} else
			response.sendStatus(500);
	}

	return {
		addQueryHelper: addQueryHelper,
		addCreate: addCreate,
		addUpdate: addUpdate,
		getItem: getItem,
		getItems: getItems,
		createItem: createItem,
		updateItem: updateItem,
		deleteItem: deleteItem
	}
}

module.exports = {
	setErrorFunction: function (obj) {
		errorFunction = obj;
	},
	QueryHelper: QueryHelper,
	Controller: Controller,
};
