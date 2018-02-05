var express = require('express');
var app = express();

app.set('port',(process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

var siteData = {
	uriPath:{rootSite:'http://smithy.canbotics.ca',rootAsset:'http://asset.canbotics.ca/smithy/'},
	title:{en:'Canbotics Smithy',fr:'Forge Canbotics'}
}

var pageData = {
	index:{
		navSite:'index',
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
		navSite:'melee',
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
		navSite:'ranged',
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
		navSite:'magic',
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

var weaponData = {
	melee:[
		{
			name:{
				en:['Sword','Swords'],
				fr:['Épée','Épées']
			},
			weapons:[
				{
					name:'Gladius',
					en:{
						className:'Short Sword',
						uriSafe:'gladius-short-sword',
						descBlurb:'A true classic - its name literally meaning "sword" - this is a staple of Roman footsoldiers.'},
					fr:{
						className:'Épée courte',
						uriSafe:'gladius-epee-courte',
						descBlurb:'Un vrai classique - son nom signifiant littéralement «épée» - c\'est une base de footsolders romains.'},
					attr:{
						price:32,
						damage:[1,6,0],
						speed:1.5,
						weight:1,
						dimlow:[60,45,5],
						dimhigh:[85,68,7]}
				},{
					name:'Xiphos',
					en:{
						className:'Short Sword',
						uriSafe:'xiphos-short-sword',
						descBlurb:'Hailing from the Greeks, this feisty beauty knows how to make its mark. Traditionally used as a secondary weapon once the enemy has closed in, it comes out of its scabbard ready to maim.'},
					fr:{
						className:'Épée courte',
						uriSafe:'xiphos-epee-courte',
						descBlurb:'Originaire des Grecs, cette beauté fougueuse sait comment faire sa marque. Traditionnellement utilisé comme une arme secondaire une fois l\'ennemi fermé, il sort de son fourreau prêt à mutiler.'},
					attr:{
						price:39,
						damage:[1,6,1],
						speed:1.7,
						weight:999,
						dimlow:[65,50,5],
						dimhigh:[77,60,7]}
				},{
					name:'Claymore',
					en:{
						className:'Heavy Long Sword',
						uriSafe:'claymore-heavy-long-sword',
						descBlurb:'Enemies will cower, when they glimpse this Highland beast being wielded. Boasting a heavy weight, and two handed grip it will slice the strongest armour in half.'},
					fr:{
						className:'Lourde épée longue',
						uriSafe:'claymore-lourde-epee-longue',
						descBlurb:'Les ennemis se recroquevilleront lorsqu\'ils apercevront cette bête des Highlands qui est brandie. Bénéficiant d\'un poids lourd et d\'une prise à deux mains, il découpera l\'armure la plus solide en deux.'},
					attr:{
						price:46,
						damage:[1,10,0],
						speed:3.1,
						weight:2.8,
						dimlow:[120,100,4.8],
						dimhigh:[140,120,5.1]}
				},{
					name:'Scimitar',
					en:{
						className:'Exotic Eastern Sabre',
						uriSafe:'scimitar-exotic-eastern-sabre',
						descBlurb:'Be the star of your own Arabian Night, with this shining pinnacle of Middle Eastern combat. The exotic curve of the blade will be the talk of your enemies.'},
					fr:{
						className:'Sabre de l\'est exotique',
						uriSafe:'scimitar-sabre-de-lest-exotique',
						descBlurb:'Soyez la star de votre propre nuit arabe, avec ce pinacle brillant du combat moyen-oriental. La courbe exotique de la lame sera le sujet de vos ennemis.'},
					attr:{
						price:89,
						damage:[1,8,0],
						speed:2.1,
						weight:1.7,
						dimlow:[106,76,3],
						dimhigh:[122,92,6]}
				},{
					name:'Katana',
					en:{
						className:'Exotic Oriental Sword',
						uriSafe:'katana-exotic-oriental-sword',
						descBlurb:'A truly beautiful, and exotic sword straight from Japan. Now you too can be a samurai, and cut evil from the land.'},
					fr:{
						className:'Épée orientale exotique',
						uriSafe:'katana-epee-orientale-exotique',
						descBlurb:'Une épée vraiment belle et exotique venant tout droit du Japon. Maintenant vous aussi pouvez être un samouraï et couper le mal de la terre.'},
					attr:{
						price:102,
						damage:[2,8,0],
						speed:1.9,
						weight:1.3,
						dimlow:[90,60,3],
						dimhigh:[103,73,4]}
				}
			]
		},{
			name:{
				en:['Staff','Staves'],
				fr:['Bâton','Bâtons']
			},
			weapons:[
				{
					price:32,
					name:'Bō',
					en:{
						className:'Full Staff',
						uriSafe:'bo-full-staff',
						descBlurb:'An imposing staff from Japan, with proper training it\'ll have your enemies fleeing!'},
					fr:{
						className:'Bâton complet',
						uriSafe:'bo-baton-complet',
						descBlurb:'Un bâton imposant en provenance du Japon, avec un entraînement approprié, fera fuir vos ennemis!'},
					attr:{
						price:54,
						damage:[1,6,0],
						speed:1.5,
						weight:1,
						dimlow:[180,2.5],
						dimhigh:[270,3]}
				}
			]
		}
	],
	ranged:[
		{
			name:{
				en:['Bow','Bows'],
				fr:['Arc','Arcs']
			},
			weapons:[
				{
					name:'Shortbow',
					en:{
						className:'Short Sword',
						uriSafe:'shortbow-short-distance-bow',
						descBlurb:'A true classic - its name literally meaning "sword" - this is a staple of Roman footsoldiers.'},
					fr:{
						className:'Épée courte',
						uriSafe:'gladius-epee-courte',
						descBlurb:'Un vrai classique - son nom signifiant littéralement «épée» - c\'est une base de footsolders romains.'},
					attr:{
						price:32,
						damage:[1,6,0],
						speed:1.5,
						weight:1,
						dimlow:[60,45,5],
						dimhigh:[85,68,7]}
				},{
					name:'Longbow',
					en:{
						className:'Short Sword',
						uriSafe:'longbow-long-distance-bow',
						descBlurb:'Hailing from the Greeks, this feisty beauty knows how to make its mark. Traditionally used as a secondary weapon once the enemy has closed in, it comes out of its scabbard ready to maim.'},
					fr:{
						className:'Épée courte',
						uriSafe:'xiphos-epee-courte',
						descBlurb:'Originaire des Grecs, cette beauté fougueuse sait comment faire sa marque. Traditionnellement utilisé comme une arme secondaire une fois l\'ennemi fermé, il sort de son fourreau prêt à mutiler.'},
					attr:{
						price:39,
						damage:[1,6,1],
						speed:1.7,
						weight:999,
						dimlow:[65,50,5],
						dimhigh:[77,60,7]}
				}
			]
		},{
			name:{
				en:['Crossbow','Crossbows'],
				fr:['Arbalète','Arbalètes']
			},
			weapons:[
				{
					price:32,
					name:'Crossbow',
					en:{
						className:'Crossbow',
						uriSafe:'crossbow-powerful-mid-range-bow',
						descBlurb:'An imposing staff from Japan, with proper training it\'ll have your enemies fleeing!'},
					fr:{
						className:'Bâton complet',
						uriSafe:'bo-baton-complet',
						descBlurb:'Un bâton imposant en provenance du Japon, avec un entraînement approprié, fera fuir vos ennemis!'},
					attr:{
						price:54,
						damage:[1,6,0],
						speed:1.5,
						weight:1,
						dimlow:[180,2.5],
						dimhigh:[270,3]}
				}
			]
		}
	],
	magic:[
		{
			name:{
				en:['Wand','Wands'],
				fr:['Baguette magique','Baguettes magique']
			},
			weapons:[
				{
					name:'Gladius',
					en:{
						className:'Short Sword',
						uriSafe:'gladius-short-sword',
						descBlurb:'A true classic - its name literally meaning "sword" - this is a staple of Roman footsoldiers.'},
					fr:{
						className:'Épée courte',
						uriSafe:'gladius-epee-courte',
						descBlurb:'Un vrai classique - son nom signifiant littéralement «épée» - c\'est une base de footsolders romains.'},
					attr:{
						price:32,
						damage:[1,6,0],
						speed:1.5,
						weight:1,
						dimlow:[60,45,5],
						dimhigh:[85,68,7]}
				},{
					name:'Xiphos',
					en:{
						className:'Short Sword',
						uriSafe:'xiphos-short-sword',
						descBlurb:'Hailing from the Greeks, this feisty beauty knows how to make its mark. Traditionally used as a secondary weapon once the enemy has closed in, it comes out of its scabbard ready to maim.'},
					fr:{
						className:'Épée courte',
						uriSafe:'xiphos-epee-courte',
						descBlurb:'Originaire des Grecs, cette beauté fougueuse sait comment faire sa marque. Traditionnellement utilisé comme une arme secondaire une fois l\'ennemi fermé, il sort de son fourreau prêt à mutiler.'},
					attr:{
						price:39,
						damage:[1,6,1],
						speed:1.7,
						weight:999,
						dimlow:[65,50,5],
						dimhigh:[77,60,7]}
				}
			]
		},{
			name:{
				en:['Staff','Staves'],
				fr:['Bâton magique','Bâtons magique']
			},
			weapons:[
				{
					price:32,
					name:'Bō',
					en:{
						className:'Full Staff',
						uriSafe:'bo-full-staff',
						descBlurb:'An imposing staff from Japan, with proper training it\'ll have your enemies fleeing!'},
					fr:{
						className:'Bâton complet',
						uriSafe:'bo-baton-complet',
						descBlurb:'Un bâton imposant en provenance du Japon, avec un entraînement approprié, fera fuir vos ennemis!'},
					attr:{
						price:54,
						damage:[1,6,0],
						speed:1.5,
						weight:1,
						dimlow:[180,2.5],
						dimhigh:[270,3]}
				}
			]
		}
	]
};

















app.get('/',function(request,response) {
	response.render('landing',{siteData:siteData});
});

app.get('/:langCode(en|fr)',function(request,response) {
	var pageDetails = pageData.index;
	pageDetails.langCode = request.params.langCode;
	
	pageDetails.metaTitle = siteData.title[pageDetails.langCode];

	response.render('index',{siteData:siteData,pageDetails:pageDetails});
});










/* CATEGORY PAGES */
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee)',function(request,response) {
	var pageDetails = pageData.melee;
	pageDetails.langCode = request.params.langCode;
	
	pageDetails.metaTitle = pageDetails[pageDetails.langCode].title + ' | ' + siteData.title[pageDetails.langCode];
	
	response.render('category',{siteData:siteData,pageDetails:pageDetails,weaponData:weaponData.melee});
});

app.get('/:langCode(en|fr)/:categoryPage(ranged-weapons|armes-a-distance)',function(request,response) {
	var pageDetails = pageData.ranged;
	pageDetails.langCode = request.params.langCode;
	
	pageDetails.metaTitle = pageDetails[pageDetails.langCode].title + ' | ' + siteData.title[pageDetails.langCode];
	
	response.render('category',{siteData:siteData,pageDetails:pageDetails,weaponData:weaponData.ranged});
});

app.get('/:langCode(en|fr)/:categoryPage(magic-weapons|armes-magiques)',function(request,response) {
	var pageDetails = pageData.magic;
	pageDetails.langCode = request.params.langCode;
	
	pageDetails.metaTitle = pageDetails[pageDetails.langCode].title + ' | ' + siteData.title[pageDetails.langCode];
	
	response.render('category',{siteData:siteData,pageDetails:pageDetails,weaponData:weaponData.magic});
});









app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee)/:weaponUri',function(request,response) {
	var weaponDetails;
	weaponData.melee.forEach(function(category) {
		var weaponFilter = category.weapons.filter(function (weapon) {return weapon.en.uriSafe == request.params.weaponUri});
		console.log('   ' + weaponFilter.length);
		if (weaponFilter.length) {
			weaponDetails = weaponFilter;
			console.log('\n  +++\n  +++\n')
			console.log('  weaponDetails: ' + weaponDetails.name)
			console.log('\n  +++\n  +++\n')
		};
		
		console.log('weaponFilter: ' + weaponFilter)
		console.log('\n---\n---\n')
	});
		console.log('weaponDetails: ' + weaponDetails.name)
		console.log('\n+++\n+++\n')
	
	
	var weaponDetails = weaponData.melee.filter(function (weapon) {return weapon != request.params.weaponUri}).weapons;
	var pageDetails = pageData.melee;
	pageDetails.langCode = request.params.langCode;
	pageDetails.navSite = 'melee';
	
	
	console.log(weaponDetails)
	
	pageDetails.meta = metaData[pageDetails.langCode];
	pageDetails.meta.titlePage = pageDetails[pageDetails.langCode].title + ' | ' + metaData[pageDetails.langCode].titleSite;
	
	response.render('category-melee',{uriPath:uriPath,pageDetails:pageDetails,weaponData:weaponData.melee});
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


/*
var weaponData = {
	melee:{
		sword:{
			gladius:{
				price:32,
				name:'Gladius',
				en:{
					className:'Short Sword',
					uriSafe:'gladius-short-sword',
					descBlurb:'A true classic - its name literally meaning "sword" - this is a staple of Roman footsoldiers.'},
				fr:{
					className:'Épée courte',
					uriSafe:'gladius-epee-courte',
					descBlurb:'Un vrai classique - son nom signifiant littéralement «épée» - c\'est une base de footsolders romains.'},
				attr:{
					price:32,
					damage:[1,6,0],
					speed:1.5,
					weight:1,
					dimlow:[60,45,5],
					dimhigh:[85,68,7]}
			},
			xiphos:{
				price:39,
				name:'Xiphos',
				en:{
					className:'Short Sword',
					uriSafe:'xiphos-short-sword',
					descBlurb:'Hailing from the Greeks, this feisty beauty knows how to make its mark. Traditionally used as a secondary weapon once the enemy has closed in, it comes out of its scabbard ready to maim.'},
				fr:{
					className:'Épée courte',
					uriSafe:'xiphos-epee-courte',
					descBlurb:'Originaire des Grecs, cette beauté fougueuse sait comment faire sa marque. Traditionnellement utilisé comme une arme secondaire une fois l\'ennemi fermé, il sort de son fourreau prêt à mutiler.'},
				attr:{
					price:32,
					damage:[1,6,0],
					speed:1.5,
					weight:1,
					dimlow:[60,45,5],
					dimhigh:[85,68,7]}
			}
		}
	}
};
*/