var express = require('express');
var app = express();

app.set('port',(process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

var uriPath = {rootSite:'http://smithy.canbotics.ca',rootAsset:'http://asset.canbotics.ca/smithy/'};

var metaData = {
	en:{
		titleSite:'Canbotics Smithy',
		titlePage:''},
	fr:{
		titleSite:'Forge Canbotics',
		titlePage:''}
}

var pageData = {
	index:{
		en:{
			title:'',
			desc:'Visit the Canbotics Smithy, for all your medieval warfare needs.',
			path:'/en'},
		fr:{
			title:'',
			desc:'Visitez le Forge Canbotics, pour tous vos besoins de guerre médiévale.',
			path:'/fr'}
	},
	melee:{
		en:{
			title:'Melee Weapons',
			desc:'Browse the extensive lineup of high quality, melee weapons offered by the Canbotics Smithy.',
			path:'/en/melee-weapons'},
		fr:{
			title:'Armes de mêlée',
			desc:'Parcourez la vaste gamme d\'armes de mêlée de haute qualité offertes par la Forge Canbotics.',
			path:'/fr/armes-de-melee'}
	},
	ranged:{
		en:{
			title:'Ranged Weapons',
			desc:'Browse the extensive lineup of high quality, ranged weapons offered by the Canbotics Smithy.',
			path:'/en/ranged-weapons'},
		fr:{
			title:'Armes à distance',
			desc:'Parcourez la vaste gamme d\'armes à distance de haute qualité offertes par le Forge Canbotics.',
			path:'/fr/armes-a-distance'}
	},
	magic:{
		en:{
			title:'Magic Weapons',
			desc:'Browse the extensive lineup of high quality, magic weapons offered by the Canbotics Smithy.',
			path:'/en/magic-weapons'},
		fr:{
			title:'Armes magiques',
			desc:'Parcourez la vaste gamme d\'armes magiques de haute qualité offertes par la Forge Canbotics.',
			path:'/fr/armes-magiques'}
	}
}








/* TESTING PURPOSES */
app.get('/canbotics-smithy.css',function(request,response) {
	response.render('canbotics-smithy.css');
});

/* TESTING PURPOSES */











app.get('/',function(request,response) {
	response.render('landing',{uriPath:uriPath,metaData:metaData});
});

app.get('/:langCode(en|fr)',function(request,response) {
	var pageDetails = pageData.index;
	pageDetails.langCode = request.params.langCode;
	pageDetails.navSite = 'index';
	
	pageDetails.meta = metaData[pageDetails.langCode];
	pageDetails.meta.titlePage = metaData[pageDetails.langCode].titleSite;

	response.render('index',{uriPath:uriPath,pageDetails:pageDetails});
});



/* CATEGORY PAGES */
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee)',function(request,response) {
	var pageDetails = pageData.melee;
	pageDetails.langCode = request.params.langCode;
	pageDetails.navSite = 'melee';
	
	pageDetails.meta = metaData[pageDetails.langCode];
	pageDetails.meta.titlePage = pageDetails[pageDetails.langCode].title + ' | ' + metaData[pageDetails.langCode].titleSite;
	
	response.render('category-melee',{uriPath:uriPath,pageDetails:pageDetails});
});

app.get('/:langCode(en|fr)/:categoryPage(ranged-weapons|armes-a-distance)',function(request,response) {
	var pageDetails = pageData.ranged;
	pageDetails.langCode = request.params.langCode;
	pageDetails.navSite = 'ranged';
	
	pageDetails.meta = metaData[pageDetails.langCode];
	pageDetails.meta.titlePage = pageDetails[pageDetails.langCode].title + ' | ' + metaData[pageDetails.langCode].titleSite;
	
	response.render('category-ranged',{uriPath:uriPath,pageDetails:pageDetails});
});

app.get('/:langCode(en|fr)/:categoryPage(magic-weapons|armes-magiques)',function(request,response) {
	var pageDetails = pageData.magic;
	pageDetails.langCode = request.params.langCode;
	pageDetails.navSite = 'magic';
	
	pageDetails.meta = metaData[pageDetails.langCode];
	pageDetails.meta.titlePage = pageDetails[pageDetails.langCode].title + ' | ' + metaData[pageDetails.langCode].titleSite;
	
	response.render('category-magic',{uriPath:uriPath,pageDetails:pageDetails});
});


/* TEMPLATE */
/*
app.get('/:langCode(en|fr)/:categoryPage(EN|FR)',function(request,response) {
	var pageDetails = pageData.melee;
	pageDetails.langCode = request.params.langCode;
	
	pageDetails.meta = metaData[pageDetails.langCode];
	pageDetails.meta.titlePage = pageDetails[pageDetails.langCode].title + ' | ' + metaData[pageDetails.langCode].titleSite;
	
	response.render('melee-weapons',{uriPath:uriPath,pageDetails:pageDetails});
});
*/









/*
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




app.get('/:langCode(en|fr)/melee-weapons',function(request,response) {
	var PageData = 
	
	metaData['langCode'] = request.params.langCode;
	
	
	uriPath['en'] = '/en/melee-weapons';
	uriPath['fr'] = '/fr/armes-de-melee';
	
	uriPath['canon'] = '/en/melee-weapons';
	
	response.render('en/melee-weapons',{metaData:metaData,uriPath:uriPath});
});
*/






app.get('/fr/',function(request,response) {
	uriPath['canon'] = '/fr';
	uriPath['en'] = '/en';
	uriPath['fr'] = '/fr';

	metaData['langCode'] = 'fr';

	response.render('fr/fr',{metaData:metaData,uriPath:uriPath});
});

app.get('/fr/armes-de-melee',function(request,response) {
	uriPath['canon'] = '/fr/armes-de-melee';
	uriPath['en'] = '/en/melee-weapons';
	uriPath['fr'] = '/fr/armes-de-melee';
	
	metaData['langCode'] = 'fr';
	
	response.render('fr/armes-de-melee',{metaData:metaData,uriPath:uriPath});
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


