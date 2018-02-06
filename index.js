var express = require('express');
var app = express();

app.set('port',(process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

var dataSite = {
	uriPath:{rootSite:'http://smithy.canbotics.ca',rootAsset:'http://asset.canbotics.ca/smithy/'},
	title:{en:'Canbotics Smithy',fr:'Forge Canbotics'}
}

var dataPage = {
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


var dataWeapon = {
	gladius:{
		en:{
			weapClass:'Short Sword',
			weapUri:'gladius-short-sword',
			weapBlurb:'A true classic - its name literally meaning "sword" - this is a staple of Roman footsoldiers.'},
		fr:{
			weapClass:'Épée courte',
			weapUri:'gladius-epee-courte',
			weapBlurb:'Un vrai classique - son nom signifiant littéralement «épée» - c\'est une base de footsolders romains.'},
		attr:{
			name:'Gladius',
			skill:'Sword',
			range:'1.1',
			price:32,
			damage:[1,6,0],
			speed:1.5,
			weight:1,
			dimMin:[60,45,5],
			dimMax:[85,68,7]}},
	xiphos:{
		en:{
			weapClass:'Short Sword',
			weapUri:'xiphos-short-sword',
			weapBlurb:'Hailing from the Greeks, this feisty beauty knows how to make its mark. Traditionally used as a secondary weapon once the enemy has closed in, it comes out of its scabbard ready to maim.'},
		fr:{
			weapClass:'Épée courte',
			weapUri:'xiphos-epee-courte',
			weapBlurb:'Originaire des Grecs, cette beauté fougueuse sait comment faire sa marque. Traditionnellement utilisé comme une arme secondaire une fois l\'ennemi fermé, il sort de son fourreau prêt à mutiler.'},
		attr:{
			name:'Xiphos',
			skill:'Sword',
			range:'1',
			price:39,
			damage:[1,6,1],
			speed:1.7,
			weight:999,
			dimMin:[65,50,5],
			dimMax:[77,60,7]}},
	claymore:{
		en:{
			weapClass:'Heavy Long Sword',
			weapUri:'claymore-heavy-long-sword',
			weapBlurb:'Enemies will cower, when they glimpse this Highland beast being wielded. Boasting a heavy weight, and two handed grip it will slice the strongest armour in half.'},
		fr:{
			weapClass:'Lourde épée longue',
			weapUri:'claymore-lourde-epee-longue',
			weapBlurb:'Les ennemis se recroquevilleront lorsqu\'ils apercevront cette bête des Highlands qui est brandie. Bénéficiant d\'un poids lourd et d\'une prise à deux mains, il découpera l\'armure la plus solide en deux.'},
		attr:{
			name:'Claymore',
			skill:'Sword',
			range:'1.8',
			price:46,
			damage:[1,10,0],
			speed:3.1,
			weight:2.8,
			dimMin:[120,100,4.8],
			dimMax:[140,120,5.1]}},
	scimitar:{
		en:{
			weapClass:'Exotic Eastern Sabre',
			weapUri:'scimitar-exotic-eastern-sabre',
			weapBlurb:'Be the star of your own Arabian Night, with this shining pinnacle of Middle Eastern combat. The exotic curve of the blade will be the talk of your enemies.'},
		fr:{
			weapClass:'Sabre de l\'est exotique',
			weapUri:'scimitar-sabre-de-lest-exotique',
			weapBlurb:'Soyez la star de votre propre nuit arabe, avec ce pinacle brillant du combat moyen-oriental. La courbe exotique de la lame sera le sujet de vos ennemis.'},
		attr:{
			name:'Scimitar',
			skill:'Sword',
			range:'1.5',
			price:89,
			damage:[1,8,0],
			speed:2.1,
			weight:1.7,
			dimMin:[106,76,3],
			dimMax:[122,92,6]}},
	katana:{
		en:{
			weapClass:'Exotic Oriental Sword',
			weapUri:'katana-exotic-oriental-sword',
			weapBlurb:'A truly beautiful, and exotic sword straight from Japan. Now you too can be a samurai, and cut evil from the land.'},
		fr:{
			weapClass:'Épée orientale exotique',
			weapUri:'katana-epee-orientale-exotique',
			weapBlurb:'Une épée vraiment belle et exotique venant tout droit du Japon. Maintenant vous aussi pouvez être un samouraï et couper le mal de la terre.'},
		attr:{
			name:'Katana',
			skill:'Sword',
			range:'1.2',
			price:102,
			damage:[2,8,0],
			speed:1.9,
			weight:1.3,
			dimMin:[90,60,3],
			dimMax:[103,73,4]}},
	bo:{
		en:{
			weapClass:'Full Staff',
			weapUri:'bo-full-staff',
			weapBlurb:'An imposing staff from Japan, with proper training it\'ll have your enemies fleeing!'},
		fr:{
			weapClass:'Bâton complet',
			weapUri:'bo-baton-complet',
			weapBlurb:'Un bâton imposant en provenance du Japon, avec un entraînement approprié, fera fuir vos ennemis!'},
		attr:{
			name:'Bō',
			skill:'Pole',
			range:'3',
			price:54,
			damage:[1,8,-1],
			speed:1.5,
			weight:1,
			dimMin:[180,2.5],
			dimMax:[270,3]}},
	shortbow:{
		en:{
			weapClass:'Short Distance Archery Bow',
			weapUri:'shortbow-short-distance-archery-bow',
			weapBlurb:'Small and lightweight bow, excellent for small game hunting.'},
		fr:{
			weapClass:'Arc de tir à courte distance',
			weapUri:'shortbow-arc-de-tir-a-courte-distance',
			weapBlurb:'Arc petit et léger, excellent pour la chasse au petit gibier.'},
		attr:{
			name:'Shortbow',
			skill:'Archer',
			range:'70',
			price:32,
			damage:[1,4,1],
			speed:999,
			weight:999,
			dimMin:[999,999,999],
			dimMax:[999,999,999]}},
	longbow:{
		en:{
			weapClass:'Long Distance Archery Bow',
			weapUri:'longbow-long-distance-archery-bow',
			weapBlurb:'They will never know what hit them, literally.'},
		fr:{
			weapClass:'Arc de tir à longue distance',
			weapUri:'longbow-arc-de-tir-a-longue-distance',
			weapBlurb:'Ils ne sauront jamais ce qui les a frappés, littéralement.'},
		attr:{
			name:'Longbow',
			skill:'Archer',
			range:'200',
			price:78,
			damage:[1,8,0],
			speed:999,
			weight:999,
			dimMin:[999,999,999],
			dimMax:[999,999,999]}},
	crossbow:{
		en:{
			weapClass:'Powerful Mid-range Marksman Bow',
			weapUri:'crossbow-powerful-mid-range-marksman-bow',
			weapBlurb:'An imposing staff from Japan, with proper training it\'ll have your enemies fleeing!'},
		fr:{
			weapClass:'Puissant arc de tireur de milieu de gamme',
			weapUri:'crossbow-puissant-arc-de-tireur-de-milieu-de-gamme',
			weapBlurb:'Un bâton imposant en provenance du Japon, avec un entraînement approprié, fera fuir vos ennemis!'},
		attr:{
			name:'Crossbow',
			skill:'Marksman',
			range:'100',
			price:120,
			damage:[1,10,1],
			speed:999,
			weight:999,
			dimMin:[999,999,999],
			dimMax:[999,999,999]}},
		
};


















var listCategory = {
	melee:[
		{
			en:['Sword','Swords'],
			fr:['Épée','Épées'],
			weapons:[
				dataWeapon.gladius,
				dataWeapon.xiphos,
				dataWeapon.claymore,
				dataWeapon.scimitar,
				dataWeapon.katana]},
		{
			en:['Staff','Staves'],
			fr:['Bâton','Bâtons'],
			weapons:[
				dataWeapon.bo]},
		{
			en:['Polearm','Polearms'],
			fr:['Guisarme','Guisarmes'],
			weapons:[
				dataWeapon.bo]}],
	ranged:[
		{
			en:['Bow','Bows'],
			fr:['Arc','Arcs'],
			weapons:[
				dataWeapon.shortbow,
				dataWeapon.longbow,
				dataWeapon.crossbow]},
		{
			en:['Sling','Slings'],
			fr:['Lance-pierres','frondes'],
			weapons:[
				dataWeapon.bo,
				dataWeapon.bo]},
		{
			en:['Gun','Guns'],
			fr:['Pistolet','Pistolets'],
			weapons:[
				dataWeapon.bo,
				dataWeapon.bo]}],
	magic:[
		{
			en:['Wand','Wands'],
			fr:['Baguette magique','Baguettes magique'],
			weapons:[
				dataWeapon.shortbow,
				dataWeapon.longbow,
				dataWeapon.crossbow]},
		{
			en:['Staff','Staves'],
			fr:['Bâton magique','Bâtons magique'],
			weapons:[
				dataWeapon.bo,
				dataWeapon.bo]},
		{
			en:['Spell Book','Spell Books'],
			fr:['Grimoire','Grimoires'],
			weapons:[
				dataWeapon.bo,
				dataWeapon.bo]}]
};


var listUri = {
	'gladius-short-sword':dataWeapon.gladius,
	'gladius-epee-courte':dataWeapon.gladius,
	'xiphos-short-sword':dataWeapon.xiphos,
	'xiphos-epee-courte':dataWeapon.xiphos,
	'claymore-heavy-long-sword':dataWeapon.claymore,
	'claymore-lourde-epee-longue':dataWeapon.claymore,
	'scimitar-exotic-eastern-sabre':dataWeapon.scimitar,
	'scimitar-sabre-de-lest-exotique':dataWeapon.scimitar,
	'katana-exotic-oriental-sword':dataWeapon.katana,
	'katana-epee-orientale-exotique':dataWeapon.katana,
	'bo-full-staff':dataWeapon.bo,
	'bo-baton-complet':dataWeapon.bo,
	'shortbow-short-distance-archery-bow':dataWeapon.shortbow,
	'shortbow-arc-de-tir-a-courte-distance':dataWeapon.shortbow,
	'longbow-long-distance-bow':dataWeapon.longbow,
	'longbow-arc-de-tir-a-longue-distance':dataWeapon.longbow,
	'crossbow-powerful-mid-range-marksman-bow':dataWeapon.crossbow,
	'crossbow-puissant-arc-de-tireur-de-milieu-de-gamme':dataWeapon.crossbow
};






app.get('/',function(request,response) {
	response.render('landing',{dataSite:dataSite});
});

app.get('/:langCode(en|fr)',function(request,response) {
	var detailsPage = dataPage.index;
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = dataSite.title[detailsPage.langCode];
	
	detailsPage.en.pathCanon = detailsPage.en.path;
	detailsPage.fr.pathCanon = detailsPage.fr.path;

	response.render('index',{dataSite:dataSite,detailsPage:detailsPage});
});










/* CATEGORY PAGES */
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee)',function(request,response) {
	var detailsPage = dataPage.melee;
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsPage[detailsPage.langCode].title + ' | ' + dataSite.title[detailsPage.langCode];
	
	detailsPage.en.pathCanon = detailsPage.en.path;
	detailsPage.fr.pathCanon = detailsPage.fr.path;

	response.render('category',{dataSite:dataSite,detailsPage:detailsPage,dataWeapon:listCategory.melee});
});

app.get('/:langCode(en|fr)/:categoryPage(ranged-weapons|armes-a-distance)',function(request,response) {
	var detailsPage = dataPage.ranged;
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsPage[detailsPage.langCode].title + ' | ' + dataSite.title[detailsPage.langCode];
	
	detailsPage.en.pathCanon = detailsPage.en.path;
	detailsPage.fr.pathCanon = detailsPage.fr.path;

	response.render('category',{dataSite:dataSite,detailsPage:detailsPage,dataWeapon:listCategory.ranged});
});

app.get('/:langCode(en|fr)/:categoryPage(magic-weapons|armes-magiques)',function(request,response) {
	var detailsPage = dataPage.magic;
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsPage[detailsPage.langCode].title + ' | ' + dataSite.title[detailsPage.langCode];
	
	detailsPage.en.pathCanon = detailsPage.en.path;
	detailsPage.fr.pathCanon = detailsPage.fr.path;

	response.render('category',{dataSite:dataSite,detailsPage:detailsPage,dataWeapon:listCategory.magic});
});





app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee)/:weaponUri',function(request,response) {
	var detailsWeapon = listUri[request.params.weaponUri];
	
	var detailsPage = dataPage.melee;
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsWeapon.attr.name + ' | ' + detailsWeapon[detailsPage.langCode].weapClass + ' | ' + dataSite.title[detailsPage.langCode];
	
	detailsPage.en.pathCanon = detailsPage.en.path + '/' + detailsWeapon.en.weapUri;
	detailsPage.fr.pathCanon = detailsPage.fr.path + '/' + detailsWeapon.fr.weapUri;
	
	
	
	response.render('weapon',{dataSite:dataSite,detailsPage:detailsPage,detailsWeapon:detailsWeapon});
});

app.get('/:langCode(en|fr)/:categoryPage(ranged-weapons|armes-a-distance)/:weaponUri',function(request,response) {
	var detailsWeapon = listUri[request.params.weaponUri];
	
	var detailsPage = dataPage.ranged;
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsWeapon.attr.name + ' | ' + detailsWeapon[detailsPage.langCode].weapClass + ' | ' + dataSite.title[detailsPage.langCode];
	
	detailsPage.en.pathCanon = detailsPage.en.path + '/' + detailsWeapon.en.weapUri;
	detailsPage.fr.pathCanon = detailsPage.fr.path + '/' + detailsWeapon.fr.weapUri;
	
	
	
	response.render('weapon',{dataSite:dataSite,detailsPage:detailsPage,detailsWeapon:detailsWeapon});
});



/*
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee)/:weaponUri',function(request,response) {
	var weaponDetails;
	weaponData.melee.forEach(function(category) {
		var weaponFilter = category.weapons.filter(function (weapon) {return weapon.en.weapUri == request.params.weaponUri});
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
	var detailsPage = dataPage.melee;
	detailsPage.langCode = request.params.langCode;
	detailsPage.navSite = 'melee';
	
	
	console.log(weaponDetails)
	
	detailsPage.meta = metaData[detailsPage.langCode];
	detailsPage.meta.titlePage = detailsPage[detailsPage.langCode].title + ' | ' + metaData[detailsPage.langCode].titleSite;
	
	response.render('category-melee',{uriPath:uriPath,detailsPage:detailsPage,weaponData:weaponData.melee});
});

*/



/* TEMPLATE */
/*
app.get('/:langCode(en|fr)/:categoryPage(EN|FR)',function(request,response) {
	var detailsPage = dataPage.melee;
	detailsPage.langCode = request.params.langCode;
	
	detailsPage.meta = metaData[detailsPage.langCode];
	detailsPage.meta.titlePage = detailsPage[detailsPage.langCode].title + ' | ' + metaData[detailsPage.langCode].titleSite;
	
	response.render('melee-weapons',{uriPath:uriPath,detailsPage:detailsPage});
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
	var dataPage = 
	
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
					weapClass:'Short Sword',
					weapUri:'gladius-short-sword',
					weapBlurb:'A true classic - its name literally meaning "sword" - this is a staple of Roman footsoldiers.'},
				fr:{
					weapClass:'Épée courte',
					weapUri:'gladius-epee-courte',
					weapBlurb:'Un vrai classique - son nom signifiant littéralement «épée» - c\'est une base de footsolders romains.'},
				attr:{
					price:32,
					damage:[1,6,0],
					speed:1.5,
					weight:1,
					dimMin:[60,45,5],
					dimMax:[85,68,7]}
			},
			xiphos:{
				price:39,
				name:'Xiphos',
				en:{
					weapClass:'Short Sword',
					weapUri:'xiphos-short-sword',
					weapBlurb:'Hailing from the Greeks, this feisty beauty knows how to make its mark. Traditionally used as a secondary weapon once the enemy has closed in, it comes out of its scabbard ready to maim.'},
				fr:{
					weapClass:'Épée courte',
					weapUri:'xiphos-epee-courte',
					weapBlurb:'Originaire des Grecs, cette beauté fougueuse sait comment faire sa marque. Traditionnellement utilisé comme une arme secondaire une fois l\'ennemi fermé, il sort de son fourreau prêt à mutiler.'},
				attr:{
					price:32,
					damage:[1,6,0],
					speed:1.5,
					weight:1,
					dimMin:[60,45,5],
					dimMax:[85,68,7]}
			}
		}
	}
};
*/