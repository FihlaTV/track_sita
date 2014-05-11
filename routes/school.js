
/*
 * GET home page.
 */

var School = require('../models/schema.js').School;

var getSchool = function(req, res){
	var school_id = new String(req.params.schoolId);
	console.log('Fetching the details about the scholl ' + school_id);
	School.findOne(
		{
			$and: [
				{id: school_id},
		 		{id: {$type: 2}}
			]
		}, 
		function(err, data){
			if (err || data == null){
				return res.redirect('/');
			}
			var map_data = data;
			console.log(map_data);
			var total = 0;
			data.posts.forEach(function(post){
				total+= parseFloat(post.rating) || 0;
			});
			data.rating = total/data.posts.length;
	  		res.render('school', { school: data});
		}
	);
};

exports.getSchool = getSchool;