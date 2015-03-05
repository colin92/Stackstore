var mongoose = require('mongoose'),
	chai = require('chai'),
	expect = chai.expect;

var dbconnection = require('../index.js');

require('./user'); 
var User = mongoose.model('User');

describe('User model', function() {
	var user;
	before(function(done) {
		User.create({
			email: 'vincent@daranyi.com',
			password: 'whatever'
		}, function(err, createdUser){
			user = createdUser;
			done();
		});
	});

	describe('correctPassword method', function(){
		it('returns true given a user\'s true password', function(){
			expect(user.correctPassword('whatever')).to.equal(true);
		});

		it('returns false given a wrong user\'s password', function() {
			expect(user.correctPassword('hello')).to.equal(false);
		});
		
		it('encrypts password', function(){
			expect(user.password).not.to.equal('whatever');
		});
	});
});

// describe('Schema model', function() {
// 	var product;
// 	before(function(done) {
// 		Product.create({
// 			title: 
// 		});
// 	});
// });







