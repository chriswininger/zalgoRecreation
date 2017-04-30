const colors = require('colors');
const { MongoClient } = require('mongodb');
const async = require('async');
const Backbone = require('Backbone');
const _ = require('lodash');
const url = 'mongodb://localhost:27017/hecomes';

console.log('Welcome The World Of Zalgo'.red);

async.waterfall([
	function _start(_nextTask) {
		console.log('get connection');
		MongoClient.connect(url, {}, _nextTask);
	},
	function _doModelStuff(db, _nextTask) {
		console.log('setup a contrived version of what happened using backbone');
		let mdl = new Backbone.Model({ name: 'myModel', id: 1 });
		let obj = _.extend({}, 'bob is your uncle');
		mdl.set('myBad', obj);
		_nextTask(null, db, mdl);
	},
	function _persistTheModel(db, mdl, _nextTask) {
		console.log('update the database');
		var coll = db.collection('doom');
		coll.insertOne(mdl.toJSON(), { upsert: true }, function(err) {
			console.log('database updated');
			_nextTask(err, db, mdl);
		});
	}
], function(err, db) {
	if (err)
		return console.error(err);

	if (db && db.close)
		db.close();

	console.log('success'.green);
});

