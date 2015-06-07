exports.getHome = function (req, res) {
	res.render('index', {title: 'E-Commerce Web Application'});
};

exports.getPartial = function (req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};