exports.getWebPage = function (req, res) {
	res.render('index', {title: 'E-Commerce Web Application'});
};