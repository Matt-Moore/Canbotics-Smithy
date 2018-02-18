var express = require('express');
var app = express();

app.set('port',(process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views',__dirname + '/pages');
app.set('view engine', 'ejs');

var dataSite = {
	uriPath:{
		rootSite:'http://smithy.canbotics.ca',
		rootAsset:'http://asset.canbotics.ca/smithy/',
		rootAssetGlobal:'http://asset.canbotics.ca/global/'},
	title:{
		en:'Canbotics Smithy',
		fr:'Forge Canbotics'}
};

var dataPage = {
	index:{
		navSegment:'index',
		navCategory:'index',
		navPage:'index',
		template:'index',
		en:{
			title:'',
			desc:'Visit the ' & dataSite.title.en & ', for all your warfare needs.',
			path:'/en'},
		fr:{
			title:'',
			desc:'Visitez la ' & dataSite.title.fr & ', pour tous vos besoins de guerre.',
			path:'/fr'}
	},
	
	weapon:{
		navSegment:'weapon',
		navCategory:'',
		navPage:'',
		template:'segment',
		en:{
			title:'Weapons',
			desc:'Browse the extensive catalogue of high quality weapons available, on the official ' & dataSite.title.en & ' website.',
			path:'/en/weapons'},
		fr:{
			title:'Armes',
			desc:'Parcourez le vaste catalogue d\'armes de haute qualité disponibles sur le site officiel de ' & dataSite.title.fr & '.',
			path:'/fr/armes'}
	},
	melee:{
		navSegment:'weapon',
		navCategory:'melee',
		navPage:'',
		template:'category',
		en:{
			title:'Melee Weapons',
			desc:'Browse the extensive catalogue of high quality melee weapons available, on the official ' & dataSite.title.en & ' website.',
			path:'/en/melee-weapons'},
		fr:{
			title:'Armes de mêlée',
			desc:'Parcourez le vaste catalogue d\'armes de mêlée de haute qualité disponibles, sur le site officiel de ' & dataSite.title.fr & '.',
			path:'/fr/armes-de-melee'}
	},
	ranged:{
		navSegment:'weapon',
		navCategory:'ranged',
		navPage:'',
		template:'category',
		en:{
			title:'Ranged Weapons',
			desc:'Browse the extensive catalogue of high quality ranged weapons available, on the official ' & dataSite.title.en & ' website.',
			path:'/en/ranged-weapons'},
		fr:{
			title:'Armes à distance',
			desc:'Parcourez le vaste catalogue d\'armes à distance de haute qualité disponibles, sur le site officiel de ' & dataSite.title.fr & '.',
			path:'/fr/armes-a-distance'}
	},
	magic:{
		navSegment:'weapon',
		navCategory:'magic',
		navPage:'',
		template:'category',
		en:{
			title:'Magic Weapons',
			desc:'Browse the extensive catalogue of high quality magic weapons available, on the official ' & dataSite.title.en & ' website.',
			path:'/en/magic-weapons'},
		fr:{
			title:'Armes magiques',
			desc:'Parcourez le vaste catalogue d\'armes magiques de haute qualité disponibles sur le site officiel de ' & dataSite.title.fr & '.',
			path:'/fr/armes-magiques'}
	},

	armour:{
		navSegment:'armour',
		navCategory:'',
		navPage:'',
		template:'segment',
		en:{
			title:'Armour',
			desc:'Browse the extensive catalogue of high quality armour available, on the official ' & dataSite.title.en & ' website.',
			path:'/en/armour'},
		fr:{
			title:'Armure',
			desc:'Parcourez le vaste catalogue d\'armures de haute qualité disponibles, sur le site officiel de ' & dataSite.title.fr & '.',
			path:'/fr/armure'}
	},
	light:{
		navSegment:'armour',
		navCategory:'light',
		navPage:'',
		template:'category',
		en:{
			title:'Light Armour',
			desc:'Browse the extensive catalogue of high quality light armour available, on the official ' & dataSite.title.en & ' website.',
			path:'/en/light-armour'},
		fr:{
			title:'Armure légère',
			desc:'Parcourez le vaste catalogue d\'armures légères de haute qualité disponibles sur le site officiel de ' & dataSite.title.fr & '.',
			path:'/fr/armure-legere'}
	},
	medium:{
		navSegment:'armour',
		navCategory:'medium',
		navPage:'',
		template:'category',
		en:{
			title:'Medium Armour',
			desc:'Browse the extensive catalogue of high quality medium armour available, on the official ' & dataSite.title.en & ' website.',
			path:'/en/medium-armour'},
		fr:{
			title:'Armure moyenne',
			desc:'Parcourez le vaste catalogue d\'armures moyennes de haute qualité disponibles, sur le site officiel de ' & dataSite.title.fr & '.',
			path:'/fr/armure-moyenne'}
	},
	heavy:{
		navSegment:'armour',
		navCategory:'heavy',
		navPage:'',
		template:'category',
		en:{
			title:'Heavy Armour',
			desc:'Browse the extensive catalogue of high quality heavy armour available, on the official ' & dataSite.title.en & ' website.',
			path:'/en/heavy-armour'},
		fr:{
			title:'Armure lourde',
			desc:'Parcourez le vaste catalogue d\'armures lourdes de haute qualité disponibles, sur le site officiel de ' & dataSite.title.fr & '.',
			path:'/fr/armure-lourde'}
	},
	shield:{
		navSegment:'armour',
		navCategory:'shield',
		navPage:'',
		template:'category',
		en:{
			title:'Shields',
			desc:'Browse the extensive catalogue of high quality shields available, on the official ' & dataSite.title.en & ' website.',
			path:'/en/shields'},
		fr:{
			title:'Boucliers',
			desc:'Parcourez le vaste catalogue de boucliers de haute qualité disponibles, sur le site officiel de' & dataSite.title.fr & '.',
			path:'/fr/boucliers'}
	},
	
	tool:{
		navSegment:'tool',
		navCategory:'tool',
		navPage:'tool',
		template:'tool',
		en:{
			title:'Tools',
			desc:'DESCRIPTION_ENGLISH',
			path:'/en/tools'},
		fr:{
			title:'Outils',
			desc:'DESCRIPTION_FRENCH',
			path:'/fr/outils'}
	},
	warranty:{
		navSegment:'tools',
		navCategory:'tools',
		navPage:'warranty',
		template:'warranty',
		en:{
			title:'Warranty',
			desc:'Read all about the comprehensive warranty provided on all ' + dataSite.title.en + ' weapons.',
			path:'/en/warranty'},
		fr:{
			title:'Garantie',
			desc:'Lisez tout sur la garantie complète fournie sur toutes les armes ' + dataSite.title.fr + '.',
			path:'/fr/garantie'}
	},

	product:{
		template:'product',
		en:{
			desc:'Find out about the ' + dataSite.title.en + ' [PRODUCTNAME] [PRODUCTCLASS], on the official website.'},
		fr:{
			desc:'Renseignez-vous sur [PRODUCTCLASS] ' + dataSite.title.fr + ' [PRODUCTNAME], sur le site officiel.'}
	},
};

var dataWeapon = {
	gladius:{
		en:{
			prodClass:'Short Sword',
			prodUri:'gladius-short-sword',
			prodBlurb:'A true classic - its name literally meaning "sword" - this is a staple of Roman footsoldiers.'},
		fr:{
			prodClass:'Épée courte',
			prodUri:'gladius-epee-courte',
			prodBlurb:'Un vrai classique - son nom signifiant littéralement «épée» - c\'est une base de footsolders romains.'},
		attr:{
			name:'Gladius',
			skill:{en:'Sword',fr:'Épée'},
			category:['melee','sword'],
			range:1.1,
			price:32,
			damage:[1,6,0],
			speed:1.5,
			weight:1,
			dimMin:[60,45,5],
			dimMax:[85,68,7]}},
	xiphos:{
		en:{
			prodClass:'Short Sword',
			prodUri:'xiphos-short-sword',
			prodBlurb:'Hailing from the Greeks, this feisty beauty knows how to make its mark. Traditionally used as a secondary weapon once the enemy has closed in, it comes out of its scabbard ready to maim.'},
		fr:{
			prodClass:'Épée courte',
			prodUri:'xiphos-epee-courte',
			prodBlurb:'Originaire des Grecs, cette beauté fougueuse sait comment faire sa marque. Traditionnellement utilisé comme une arme secondaire une fois l\'ennemi fermé, il sort de son fourreau prêt à mutiler.'},
		attr:{
			name:'Xiphos',
			skill:{en:'Sword',fr:'Épée'},
			category:['melee','sword'],
			range:1,
			price:39,
			damage:[1,6,1],
			speed:1.7,
			weight:0,
			dimMin:[65,50,5],
			dimMax:[77,60,7]}},
	claymore:{
		en:{
			prodClass:'Heavy Long Sword',
			prodUri:'claymore-heavy-long-sword',
			prodBlurb:'Enemies will cower, when they glimpse this Highland beast being wielded. Boasting a heavy weight, and two handed grip it will slice the strongest armour in half.'},
		fr:{
			prodClass:'Lourde épée longue',
			prodUri:'claymore-lourde-epee-longue',
			prodBlurb:'Les ennemis se recroquevilleront lorsqu\'ils apercevront cette bête des Highlands qui est brandie. Bénéficiant d\'un poids lourd et d\'une prise à deux mains, il découpera l\'armure la plus solide en deux.'},
		attr:{
			name:'Claymore',
			skill:{en:'Sword',fr:'Épée'},
			category:['melee','sword'],
			range:1.8,
			price:46,
			damage:[1,10,0],
			speed:3.1,
			weight:2.8,
			dimMin:[120,100,4.8],
			dimMax:[140,120,5.1]}},
	scimitar:{
		en:{
			prodClass:'Exotic Eastern Sabre',
			prodUri:'scimitar-exotic-eastern-sabre',
			prodBlurb:'Be the star of your own Arabian Night, with this shining pinnacle of Middle Eastern combat. The exotic curve of the blade will be the talk of your enemies.'},
		fr:{
			prodClass:'Sabre de l\'est exotique',
			prodUri:'scimitar-sabre-de-lest-exotique',
			prodBlurb:'Soyez la star de votre propre nuit arabe, avec ce pinacle brillant du combat moyen-oriental. La courbe exotique de la lame sera le sujet de vos ennemis.'},
		attr:{
			name:'Scimitar',
			skill:{en:'Sword',fr:'Épée'},
			category:['melee','sword'],
			range:1.5,
			price:89,
			damage:[1,8,0],
			speed:2.1,
			weight:1.7,
			dimMin:[106,76,3],
			dimMax:[122,92,6]}},
	katana:{
		en:{
			prodClass:'Exotic Oriental Sword',
			prodUri:'katana-exotic-oriental-sword',
			prodBlurb:'A truly beautiful, and exotic sword straight from Japan. Now you too can be a samurai, and cut evil from the land.'},
		fr:{
			prodClass:'Épée orientale exotique',
			prodUri:'katana-epee-orientale-exotique',
			prodBlurb:'Une épée vraiment belle et exotique venant tout droit du Japon. Maintenant vous aussi pouvez être un samouraï et couper le mal de la terre.'},
		attr:{
			name:'Katana',
			skill:{en:'Sword',fr:'Épée'},
			category:['melee','sword'],
			range:1.2,
			price:102,
			damage:[2,8,0],
			speed:1.9,
			weight:1.3,
			dimMin:[90,60,3],
			dimMax:[103,73,4]}},
	bo:{
		en:{
			prodClass:'Full Staff',
			prodUri:'bo-full-staff',
			prodBlurb:'An imposing staff from Japan, with proper training it\'ll have your enemies fleeing!'},
		fr:{
			prodClass:'Bâton complet',
			prodUri:'bo-baton-complet',
			prodBlurb:'Un bâton imposant en provenance du Japon, avec un entraînement approprié, fera fuir vos ennemis!'},
		attr:{
			name:'Bō',
			skill:{en:'Pole',fr:'Pôle'},
			category:['melee','pole'],
			range:3,
			price:54,
			damage:[1,8,-1],
			speed:1.5,
			weight:1,
			dimMin:[180,2.5],
			dimMax:[270,3]}},
	spear:{
		en:{
			prodClass:'long reach piercing pole',
			prodUri:'spear-long-reach-piercing-pole',
			prodBlurb:'Stick them with the pointy end.'},
		fr:{
			prodClass:'Perche longue portée',
			prodUri:'spear-perche-longue-portee',
			prodBlurb:'Collez-les avec l\'extrémité pointue.'},
		attr:{
			name:'Spear',
			skill:{en:'Pole',fr:'Pôle'},
			category:['melee','pole'],
			range:0,
			price:0,
			damage:[0,0,0],
			speed:0,
			weight:0,
			dimMin:[0,0],
			dimMax:[0,0]}},
	axe:{
		en:{
			prodClass:'Heavy Close Range Cleaver',
			prodUri:'axe-heavy-close-range-cleaver',
			prodBlurb:'Excellent for cleaving skulls in twain.'},
		fr:{
			prodClass:'Cleaver lourd à courte portée',
			prodUri:'axe-cleaver-lourd-a-courte-portee',
			prodBlurb:'Excellent pour cliver en deux crânes.'},
		attr:{
			name:'Axe',
			skill:{en:'Cleaver',fr:'Couperet'},
			category:['melee','axe'],
			range:0,
			price:0,
			damage:[0,0,0],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	shortbow:{
		en:{
			prodClass:'Short Distance Archery Bow',
			prodUri:'shortbow-short-distance-archery-bow',
			prodBlurb:'Small and lightweight bow, excellent for small game hunting.'},
		fr:{
			prodClass:'Arc de tir à courte distance',
			prodUri:'shortbow-arc-de-tir-a-courte-distance',
			prodBlurb:'Arc petit et léger, excellent pour la chasse au petit gibier.'},
		attr:{
			name:'Shortbow',
			skill:{en:'Archer',fr:'Arc'},
			category:['ranged','bow'],
			range:70,
			price:32,
			damage:[1,4,1],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	longbow:{
		en:{
			prodClass:'Long Distance Archery Bow',
			prodUri:'longbow-long-distance-archery-bow',
			prodBlurb:'They will never know what hit them, literally.'},
		fr:{
			prodClass:'Arc de tir à longue distance',
			prodUri:'longbow-arc-de-tir-a-longue-distance',
			prodBlurb:'Ils ne sauront jamais ce qui les a frappés, littéralement.'},
		attr:{
			name:'Longbow',
			skill:{en:'Archer',fr:'Arc'},
			category:['ranged','bow'],
			range:200,
			price:78,
			damage:[1,8,0],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	crossbow:{
		en:{
			prodClass:'Powerful Mid-range Marksman Bow',
			prodUri:'crossbow-powerful-mid-range-marksman-bow',
			prodBlurb:'An imposing staff from Japan, with proper training it\'ll have your enemies fleeing!'},
		fr:{
			prodClass:'Puissant arc de tireur de milieu de gamme',
			prodUri:'crossbow-puissant-arc-de-tireur-de-milieu-de-gamme',
			prodBlurb:'Un bâton imposant en provenance du Japon, avec un entraînement approprié, fera fuir vos ennemis!'},
		attr:{
			name:'Crossbow',
			skill:{en:'Sniper',fr:'Buteur'},
			category:['ranged','bow'],
			range:100,
			price:120,
			damage:[1,10,1],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	slingshot:{
		en:{
			prodClass:'Powerful Short-range Pellet Sling',
			prodUri:'slingshot-powerful-short-range-pellet-sling',
			prodBlurb:'Don\'t have a cow, man!'},
		fr:{
			prodClass:'Élingue puissante de granule à courte portée',
			prodUri:'slingshot-elingue-puissante-de-granule-a-courte-portee',
			prodBlurb:'Je n\'ai pas de vache, mec.!'},
		attr:{
			name:'Slingshot',
			skill:{en:'Pellet',fr:'Pastille'},
			category:['ranged','sling'],
			range:0,
			price:0,
			damage:[1,4,0],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	flintlock:{
		en:{
			prodClass:'Powerful Short-range Flint Gun',
			prodUri:'flintlock-powerful-short-range-flint-gun',
			prodBlurb:'No duel is complete without a pair.'},
		fr:{
			prodClass:'Puissant pistolet à silex à courte portée',
			prodUri:'flintlock-puissant-pistolet-a-silex-a-courte-portee',
			prodBlurb:'Aucun duel n\'est complet sans une paire.'},
		attr:{
			name:'Flintlock Pistol',
			skill:{en:'Gun',fr:'Pistolet'},
			category:['ranged','gun'],
			range:0,
			price:0,
			damage:[1,8,1],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	hammer:{
		en:{
			prodClass:'Testing',
			prodUri:'hammer-testing',
			prodBlurb:'Bacon ipsum dolor amet buffalo veniam duis, ground round jowl bacon consectetur..'},
		fr:{
			prodClass:'Essai',
			prodUri:'hammer-essair',
			prodBlurb:'Bacon ipsum dolor amet buffalo veniam duis, ground round jowl bacon consectetur.'},
		attr:{
			name:'Hammer',
			skill:{en:'Wand',fr:'Baguettes magique'},
			category:['magic','wand'],
			range:0,
			price:0,
			damage:[0,0,0],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	shillelagh:{
		en:{
			prodClass:'Testing',
			prodUri:'shillelagh-testing',
			prodBlurb:'Bacon ipsum dolor amet buffalo veniam duis, ground round jowl bacon consectetur..'},
		fr:{
			prodClass:'Essai',
			prodUri:'shillelagh-essair',
			prodBlurb:'Bacon ipsum dolor amet buffalo veniam duis, ground round jowl bacon consectetur.'},
		attr:{
			name:'Shillelagh',
			skill:{en:'Staff',fr:'Bâtons magique'},
			category:['magic','staff'],
			range:0,
			price:0,
			damage:[0,0,0],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	necronomicon:{
		en:{
			prodClass:'Testing',
			prodUri:'necronomicon-testing',
			prodBlurb:'Bacon ipsum dolor amet buffalo veniam duis, ground round jowl bacon consectetur..'},
		fr:{
			prodClass:'Essai',
			prodUri:'necronomicon-essair',
			prodBlurb:'Bacon ipsum dolor amet buffalo veniam duis, ground round jowl bacon consectetur.'},
		attr:{
			name:'Necronomicon',
			skill:{en:'Book',fr:'Grimoires'},
			category:['magic','book'],
			range:0,
			price:0,
			damage:[0,0,0],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}}
};

var dataArmour = {
	robe:{
		en:{
			prodClass:'Testing',
			prodUri:'robe-testing',
			prodBlurb:'Bacon ipsum dolor amet buffalo veniam duis, ground round jowl bacon consectetur..'},
		fr:{
			prodClass:'Essai',
			prodUri:'robe-essair',
			prodBlurb:'Bacon ipsum dolor amet buffalo veniam duis, ground round jowl bacon consectetur.'},
		attr:{
			name:'Robe',
			skill:{en:'Robe',fr:'Peignoir'},
			category:['light','robe'],
			range:0,
			price:0,
			damage:[0,0,0],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}}
};

dataWeapon.gladius.similar = [dataWeapon.xiphos,dataWeapon.axe];
dataWeapon.xiphos.similar = [dataWeapon.gladius,dataWeapon.axe];
dataWeapon.claymore.similar = [dataWeapon.scimitar,dataWeapon.katana];
dataWeapon.scimitar.similar = [dataWeapon.claymore,dataWeapon.katana];
dataWeapon.katana.similar = [dataWeapon.claymore,dataWeapon.scimitar];
dataWeapon.bo.similar = [dataWeapon.spear];
dataWeapon.spear.similar = [dataWeapon.bo];
dataWeapon.axe.similar = [dataWeapon.bo,dataWeapon.xiphos];
dataWeapon.shortbow.similar = [dataWeapon.longbow,dataWeapon.crossbow];
dataWeapon.longbow.similar = [dataWeapon.shortbow,dataWeapon.crossbow];
dataWeapon.crossbow.similar = [dataWeapon.shortbow,dataWeapon.longbow];
dataWeapon.slingshot.similar = [dataWeapon.shortbow,dataWeapon.flintlock];
dataWeapon.flintlock.similar = [dataWeapon.crossbow,dataWeapon.slingshot];
dataWeapon.hammer.similar = [dataWeapon.shillelagh,dataWeapon.necronomicon];
dataWeapon.shillelagh.similar = [dataWeapon.hammer,dataWeapon.necronomicon];
dataWeapon.necronomicon.similar = [dataWeapon.hammer,dataWeapon.shillelagh];

dataArmour.robe.similar = [dataArmour.robe,dataWeapon.shillelagh,dataWeapon.necronomicon]


var listCategory = {
	melee:[
		{
			en:['Sword','Swords'],
			fr:['Épée','Épées'],
			products:[
				dataWeapon.gladius,
				dataWeapon.xiphos,
				dataWeapon.claymore,
				dataWeapon.scimitar,
				dataWeapon.katana]},
		{
			en:['Axe','Axes'],
			fr:['Hache','Haches'],
			products:[
				dataWeapon.axe]},
		{
			en:['Pole','Poles'],
			fr:['Pôle','Pôles'],
			products:[
				dataWeapon.bo,
				dataWeapon.spear]}],
	ranged:[
		{
			en:['Bow','Bows'],
			fr:['Arc','Arcs'],
			products:[
				dataWeapon.shortbow,
				dataWeapon.longbow,
				dataWeapon.crossbow]},
		{
			en:['Sling','Slings'],
			fr:['Lance-pierres','frondes'],
			products:[
				dataWeapon.slingshot]},
		{
			en:['Gun','Guns'],
			fr:['Pistolet','Pistolets'],
			products:[
				dataWeapon.flintlock]}],
	magic:[
		{
			en:['Wand','Wands'],
			fr:['Baguette magique','Baguettes magique'],
			products:[
				dataWeapon.hammer]},
		{
			en:['Staff','Staves'],
			fr:['Bâton magique','Bâtons magique'],
			products:[
				dataWeapon.shillelagh]},
		{
			en:['Spell Book','Spell Books'],
			fr:['Grimoire','Grimoires'],
			products:[
				dataWeapon.necronomicon]}],
	light:[
		{
			en:['Robe','Robes'],
			fr:['Peignoir','Peignoirs'],
			products:[
				dataArmour.robe]}],
	medium:[
		{
			en:['Test','Tests'],
			fr:['Essai','Essais'],
			products:[
				]}],
	heavy:[
		{
			en:['Test','Tests'],
			fr:['Essai','Essais'],
			products:[
				]}],
	shield:[
		{
			en:['Test','Tests'],
			fr:['Essai','Essais'],
			products:[
				]}]
};

var listSegment = {
	weapon:[
		{
			dataPage:dataPage.melee,
			subcategory:listCategory.melee},
		{
			dataPage:dataPage.ranged,
			subcategory:listCategory.ranged},
		{
			dataPage:dataPage.magic,
			subcategory:listCategory.magic}],
	armour:[
		{
			dataPage:dataPage.light,
			subcategory:listCategory.light},
		{
			dataPage:dataPage.medium,
			subcategory:listCategory.medium},
		{
			dataPage:dataPage.heavy,
			subcategory:listCategory.heavy},
		{
			dataPage:dataPage.shield,
			subcategory:listCategory.shield}]
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
	'spear-long-reach-piercing-pole':dataWeapon.spear,
	'spear-perche-longue-portee':dataWeapon.spear,
	'axe-heavy-close-range-cleaver':dataWeapon.axe,
	'axe-cleaver-lourd-a-courte-portee':dataWeapon.axe,
	'shortbow-short-distance-archery-bow':dataWeapon.shortbow,
	'shortbow-arc-de-tir-a-courte-distance':dataWeapon.shortbow,
	'longbow-long-distance-archery-bow':dataWeapon.longbow,
	'longbow-arc-de-tir-a-longue-distance':dataWeapon.longbow,
	'crossbow-powerful-mid-range-marksman-bow':dataWeapon.crossbow,
	'slingshot-powerful-short-range-pellet-sling':dataWeapon.slingshot,
	'slingshot-elingue-puissante-de-granule-a-courte-portee':dataWeapon.slingshot,
	'flintlock-powerful-short-range-flint-gun':dataWeapon.flintlock,
	'flintlock-puissant-pistolet-a-silex-a-courte-portee':dataWeapon.flintlock,
	'hammer-testing':dataWeapon.hammer,
	'hammer-essair':dataWeapon.hammer,
	'shillelagh-testing':dataWeapon.shillelagh,
	'shillelagh-essair':dataWeapon.shillelagh,
	'necronomicon-testing':dataWeapon.necronomicon,
	'necronomicon-essair':dataWeapon.necronomicon,
	'robe-testing':dataArmour.robe,
	'robe-essair':dataArmour.robe
};



















app.get('/',function(request,response) {
	response.render('landing',{dataSite:dataSite});
});


app.get('/:langCode(en|fr)',function(request,response) {
	var detailsPage = dataPage.index;

	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = dataSite.title[detailsPage.langCode];
	detailsPage.metaDesc = detailsPage[detailsPage.langCode].desc;
	detailsPage.title = detailsPage[detailsPage.langCode].title;
	
	detailsPage.pathTemplate = detailsPage.template;
	
	detailsPage.en.pathCanon = detailsPage.en.path;
	detailsPage.fr.pathCanon = detailsPage.fr.path;

	response.render('template',{dataSite:dataSite,detailsPage:detailsPage});
});

/* ================================ PRODUCT PAGES */
/* ============================================== */
/* ============================================== PRODUCT : SEGMENT */
app.get('/:langCode(en|fr)/:segmentPage(weapons|armes|armour|armure)',function(request,response) {
	if (request.params.segmentPage == 'weapons' || request.params.segmentPage == 'armes') {
		var detailsPage = dataPage.weapon;
	} else {
		var detailsPage = dataPage.armour;
	} ;

	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsPage[detailsPage.langCode].title + ' | ' + dataSite.title[detailsPage.langCode];
	detailsPage.metaDesc = detailsPage[detailsPage.langCode].desc;
	detailsPage.title = detailsPage[detailsPage.langCode].title;
	
	detailsPage.pathTemplate = detailsPage.template;
	
	detailsPage.en.pathCanon = detailsPage.en.path;
	detailsPage.fr.pathCanon = detailsPage.fr.path;

	response.render('template',{dataSite:dataSite,detailsPage:detailsPage,detailsProducts:listSegment[detailsPage.navSegment]});
});

/* ============================================== PRODUCT : CATEGORY */
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee|ranged-weapons|armes-a-distance|magic-weapons|armes-magiques|light-armour|armure-legere|medium-armour|armure-moyenne|heavy-armour|armure-lourde|shields|boucliers)',function(request,response) {
	if (request.params.categoryPage == 'melee-weapons' || request.params.categoryPage == 'armes-de-melee') {
		var detailsPage = dataPage.melee;
	} else if (request.params.categoryPage == 'ranged-weapons' || request.params.categoryPage == 'armes-a-distance') {
		var detailsPage = dataPage.ranged;
	} else if (request.params.categoryPage == 'magic-weapons' || request.params.categoryPage == 'armes-magiques') {
		var detailsPage = dataPage.magic;
	} else if (request.params.categoryPage == 'light-armour' || request.params.categoryPage == 'armure-legere') {
		var detailsPage = dataPage.light;
	} else if (request.params.categoryPage == 'medium-armour' || request.params.categoryPage == 'armure-moyenne') {
		var detailsPage = dataPage.medium;
	} else if (request.params.categoryPage == 'heavy-armour' || request.params.categoryPage == 'armure-lourde') {
		var detailsPage = dataPage.heavy;
	} else if (request.params.categoryPage == 'shields' || request.params.categoryPage == 'boucliers') {
		var detailsPage = dataPage.shield;
	};
	
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsPage[detailsPage.langCode].title + ' | ' + dataSite.title[detailsPage.langCode];
	detailsPage.metaDesc = detailsPage[detailsPage.langCode].desc;
	detailsPage.title = detailsPage[detailsPage.langCode].title;
	
	detailsPage.pathTemplate = detailsPage.template;
	
	detailsPage.en.pathCanon = detailsPage.en.path;
	detailsPage.fr.pathCanon = detailsPage.fr.path;

	response.render('template',{dataSite:dataSite,detailsPage:detailsPage,detailsProducts:listCategory[detailsPage.navCategory]});
});








/* ============================================== PRODUCT : PRODUCT */
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee|ranged-weapons|armes-a-distance|magic-weapons|armes-magiques|light-armour|armure-legere|medium-armour|armure-moyenne|heavy-armour|armure-lourde|shields|boucliers)/:productUri',function(request,response) {
	
	var detailsProduct = listUri[request.params.productUri];
	
	var detailsPage = dataPage[detailsProduct.attr.category[0]];

	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsProduct.attr.name + ' | ' + detailsProduct[detailsPage.langCode].prodClass + ' | ' + dataSite.title[detailsPage.langCode];
	detailsPage.metaDesc = dataPage.product[detailsPage.langCode].desc.replace('[PRODUCTNAME]',detailsProduct.attr.name).replace('[PRODUCTCLASS]',detailsProduct[detailsPage.langCode].prodClass.toLowerCase());
	detailsPage.title = detailsProduct.attr.name;
	
	detailsPage.pathTemplate = dataPage.product.template;

	detailsPage.en.pathCanon = detailsPage.en.path + '/' + detailsProduct.en.prodUri;
	detailsPage.fr.pathCanon = detailsPage.fr.path + '/' + detailsProduct.fr.prodUri;

	response.render('template',{dataSite:dataSite,detailsPage:detailsPage,detailsProduct:detailsProduct});
});










/* ================================== TOOLS PAGES */
/* ============================================== */
/* ============================================== TOOLS : ROOT */
app.get('/:langCode(en|fr)/:toolsPage(tools|outils)',function(request,response) {
	var detailsPage = dataPage.tool;
	
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsPage[detailsPage.langCode].title + ' | ' + dataSite.title[detailsPage.langCode];
	detailsPage.metaDesc = detailsPage[detailsPage.langCode].desc;
	detailsPage.title = detailsPage[detailsPage.langCode].title;
	
	detailsPage.pathTemplate = detailsPage.template;
	
	detailsPage.en.pathCanon = detailsPage.en.path;
	detailsPage.fr.pathCanon = detailsPage.fr.path;

	response.render('template',{dataSite:dataSite,detailsPage:detailsPage});
});

/* ============================================== TOOLS : WARRANTY */
app.get('/:langCode(en|fr)/:warrantyPage(warranty|garantie)',function(request,response) {
	var detailsPage = dataPage.warranty;
	
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsPage[detailsPage.langCode].title + ' | ' + dataSite.title[detailsPage.langCode];
	detailsPage.metaDesc = detailsPage[detailsPage.langCode].desc;
	detailsPage.title = detailsPage[detailsPage.langCode].title;
	
	detailsPage.pathTemplate = detailsPage.template;
	
	detailsPage.en.pathCanon = detailsPage.en.path;
	detailsPage.fr.pathCanon = detailsPage.fr.path;

	response.render('template',{dataSite:dataSite,detailsPage:detailsPage});
});


/* =============== */
/* =============== */
/* PAGES TO DO */
/* =============== */
/* =============== */





























app.get('/:langCode(en|fr)/:categoryPage(ranged-weapons|armes-a-distance)/:weaponUri',function(request,response) {
	var detailsWeapon = listUri[request.params.weaponUri];
	
	var detailsPage = dataPage.ranged;
	detailsPage.langCode = request.params.langCode;
	detailsPage.metaTitle = detailsWeapon.attr.name + ' | ' + detailsWeapon[detailsPage.langCode].prodClass + ' | ' + dataSite.title[detailsPage.langCode];
	
	detailsPage.en.pathCanon = detailsPage.en.path + '/' + detailsWeapon.en.prodUri;
	detailsPage.fr.pathCanon = detailsPage.fr.path + '/' + detailsWeapon.fr.prodUri;
	
	
	
	response.render('weapon',{dataSite:dataSite,detailsPage:detailsPage,detailsWeapon:detailsWeapon});
});



/*
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee)/:weaponUri',function(request,response) {
	var weaponDetails;
	weaponData.melee.forEach(function(category) {
		var weaponFilter = category.weapons.filter(function (weapon) {return weapon.en.prodUri == request.params.weaponUri});
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
					prodClass:'Short Sword',
					prodUri:'gladius-short-sword',
					prodBlurb:'A true classic - its name literally meaning "sword" - this is a staple of Roman footsoldiers.'},
				fr:{
					prodClass:'Épée courte',
					prodUri:'gladius-epee-courte',
					prodBlurb:'Un vrai classique - son nom signifiant littéralement «épée» - c\'est une base de footsolders romains.'},
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
					prodClass:'Short Sword',
					prodUri:'xiphos-short-sword',
					prodBlurb:'Hailing from the Greeks, this feisty beauty knows how to make its mark. Traditionally used as a secondary weapon once the enemy has closed in, it comes out of its scabbard ready to maim.'},
				fr:{
					prodClass:'Épée courte',
					prodUri:'xiphos-epee-courte',
					prodBlurb:'Originaire des Grecs, cette beauté fougueuse sait comment faire sa marque. Traditionnellement utilisé comme une arme secondaire une fois l\'ennemi fermé, il sort de son fourreau prêt à mutiler.'},
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