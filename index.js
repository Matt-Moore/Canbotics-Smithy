var express = require('express');
var app = express();

app.set('port',(process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

var metaData = {'pageTitle':'Shoppe','pageDesc':'Visit the Canbotics weaponsmith shoppe, for all your medieval warfare needs.','langCode':''};
var uriPath = {'siteRoot':'http://shoppe.canbotics.ca','assetRoot':'http://asset.canbotics.ca/shoppe/','en':'','fr':'','canon':''};










app.get('/',function(request,response) {
	response.render('index',{metaData:metaData,uriPath:uriPath})
});

app.get('/en/',function(request,response) {
	uriPath['canon'] = '/en';
	uriPath['en'] = '/en';
	uriPath['fr'] = '/fr';

	metaData['langCode'] = 'en';

	response.render('en/en',{metaData:metaData,uriPath:uriPath});
});

app.get('/en/melee-weapons',function(request,response) {
	uriPath['canon'] = '/en/melee-weapons';
	uriPath['en'] = '/en/melee-weapons';
	uriPath['fr'] = '/fr/arme-de-melee';
	
	metaData['langCode'] = 'en';
	
	response.render('en/melee-weapons',{metaData:metaData,uriPath:uriPath});
});





app.get('/product', function(request,response) {
	response.render('product',{metaData:metaData,uriPath:uriPath})
});

app.get('/product*', function(request,response) {
	var result = '';
	var times = process.env.TIMES || 5
	for (i=0; i < times; i++) {
		result += i + ' ';
	};
	response.send(result);
});












app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


