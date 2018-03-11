var express = require('express');
var mysql = require('mysql');
var app = express();

var dbSmithy = mysql.createConnection({host:process.env.DBSMITHY.split('|')[0],user:process.env.DBSMITHY.split('|')[1],password:process.env.DBSMITHY.split('|')[2],database:process.env.DBSMITHY.split('|')[3]});

dbSmithy.connect(function(err) {
	if (err) {
		console.error('Canbotics Smithy failed to connect to dbSmithy :');
		console.error(err.stack);
		console.error("=====");
		return;
	}
	console.log('Canbotics Smithy has connected to dbSmithy as id : ' + dbSmithy.threadId);
});

app.use(express.static(__dirname + '/public'));

app.set('port',(process.env.PORT || 5000));
app.set('views',__dirname + '/pages');
app.set('view engine', 'ejs');

var dataSite = {
	uri:{
		rootSite:'http://smithy.canbotics.ca',
		rootAsset:'http://asset.canbotics.ca/smithy/',
		rootAssetGlobal:'http://asset.canbotics.ca/global/'},
	title:{
		en:'Canbotics Smithy',
		fr:'Forge Canbotics'}
};

var dataPage = {
	index:{
		en:'Visit the ' + dataSite.title.en + ', for all your warfare needs.',
		fr:'Visitez la ' + dataSite.title.fr + ', pour tous vos besoins de guerre.'
	},
	
	weapon:{
		en:'Browse the extensive catalogue of high quality weapons available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armes de haute qualité disponibles sur le site officiel de ' + dataSite.title.fr + '.'
	},
	melee:{
		en:'Browse the extensive catalogue of high quality melee weapons available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armes de mêlée de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	ranged:{
		en:'Browse the extensive catalogue of high quality ranged weapons available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armes à distance de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	magic:{
		en:'Browse the extensive catalogue of high quality magic weapons available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armes magiques de haute qualité disponibles sur le site officiel de ' + dataSite.title.fr + '.'
	},

	armour:{
		en:'Browse the extensive catalogue of high quality clothing and armour available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue de vêtements et d\'armures de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	clothing:{
		en:'Browse the extensive catalogue of high quality clothing available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourir le vaste catalogue de vêtements de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	heavy:{
		en:'Browse the extensive catalogue of high quality heavy armour available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armures lourdes de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	guard:{
		en:'Browse the extensive catalogue of high quality personal guard equipment available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'équipements de protection personnelle de haute qualité disponibles, sur le site officiel de' + dataSite.title.fr + '.'
	},
	
	tool:{
		en:'DESCRIPTION_ENGLISH',
		fr:'DESCRIPTION_FRENCH'
	},
	warranty:{
		en:'Read all about the comprehensive warranty provided on all ' + dataSite.title.en + ' weapons.',
		fr:'Lisez tout sur la garantie complète fournie sur toutes les armes ' + dataSite.title.fr + '.'
	},

	product:{
		en:'Find out about the ' + dataSite.title.en + ' [PRODUCTNAME] [PRODUCTCLASS], on the official website.',
		fr:'Renseignez-vous sur [PRODUCTCLASS] ' + dataSite.title.fr + ' [PRODUCTNAME], sur le site officiel.'
	},
};

	










/* =================================== BASE PAGES */
/* ============================================== */
/* ============================================== ROOT LANDING PAGE */
app.get('/',function(request,response) {
	response.render('landing',{dataSite:dataSite});
});

/* ============================================== INDEX */
app.get('/:langCode(en|fr)',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'index',uri:{},canon:{},meta:{},nav:{},disc:[]};

	
var indexPromo = {
	banner:[
		{
			segment:"weapon",
			en: {
				title:"Gladius",
				uri:"/gladius-short-sword",
				uriCategory:"/melee-weapons"
			},
			fr: {
				title:"Gladius",
				uri:"/gladius-epee-courte",
				uriCategory:"/armes-de-melee"
			}
		},
		{
			segment:"weapon",
			en: {
				title:"Crossbow",
				uri:"/crossbow-powerful-mid-range-marksman-bow",
				uriCategory:"/ranged-weapons"
			},
			fr: {
				title:"Crossbow",
				uri:"/crossbow-puissant-arc-de-tireur-de-milieu-de-gamme",
				uriCategory:"/armes-a-distance"
			}
		},
		{
			segment:"armour",
			en: {
				title:"Corset",
				uri:"/corset-form-fitting-and-shaping-top",
				uriCategory:"/clothing"
			},
			fr: {
				title:"Corset",
				uri:"/corset-forme-de-montage-et-de-faconnage",
				uriCategory:"/vetements"
			}
		},
		{
			segment:"armour",
			en: {
				title:"Cuirass",
				uri:"/cuirass-heavy-body-armour",
				uriCategory:"/heavy-armour"
			},
			fr: {
				title:"Cuirass",
				uri:"/cuirass-armure-de-corps-lourde",
				uriCategory:"/armure-lourde"
			}
		}
	],
	badge:[
		{
			segment:"weapon",
			en: {
				title:"Flintlock",
				uri:"/flintlock-powerful-short-range-flint-gun",
				uriCategory:"/ranged-weapons"
			},
			fr: {
				title:"Flintlock",
				uri:"/flintlock-puissant-pistolet-a-silex-a-courte-portee",
				uriCategory:"/armes-a-distance"
			}
		},
		{
			segment:"armour",
			en: {
				title:"Targe",
				uri:"/targe-medium-personal-shield",
				uriCategory:"/guards"
			},
			fr: {
				title:"Targe",
				uri:"/targe-bouclier-personnel-moyen",
				uriCategory:"/gardes"
			}
		},
		{
			segment:"weapon",
			en: {
				title:"Necronomicon",
				uri:"/necronomicon-powerful-summoning-grimoire",
				uriCategory:"/magic-weapons"
			},
			fr: {
				title:"Necronomicon",
				uri:"/necronomicon-grimoire-puissant-d-invocation",
				uriCategory:"/armes-magiques"
			}
		}
	]
}	
	
	
	var langTitle = {en:"Home",fr:"Accueil"}

	detailPage.title = ""; //langTitle[detailPage.lang];
	detailPage.meta.title = dataSite.title[detailPage.lang];
	detailPage.nav = {segment:"index",category:"index",page:"index"};
	detailPage.meta.desc = dataPage.index[detailPage.lang];

	detailPage.uri.en =  "/en";
	detailPage.uri.fr =  "/fr";
	detailPage.canon =  {en:"",fr:""};

	response.render('template',{dataSite:dataSite,detailPage:detailPage,indexPromo:indexPromo});
});

/* ================================ PRODUCT PAGES */
/* ============================================== */
/* ============================================== PRODUCT : SEGMENT */
app.get('/:langCode(en|fr)/:uriSegment(weapons|armes|armour|armure)',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'segment',uri:{},canon:{},meta:{},nav:{},disc:[]};

	var detailSegment = {id:'',title:'',listCategory:[]};
	
	dbSmithy.query('SELECT lib_prod_segment.segment_id, lib_prod_segment.segment_name, lib_prod_segment_lang.segment_title, lib_prod_segment_lang.segment_uri, lib_prod_segment_lang.segment_lang FROM lib_prod_segment INNER JOIN lib_prod_segment_lang ON lib_prod_segment.segment_id = lib_prod_segment_lang.segment_id INNER JOIN lib_prod_segment_lang AS xref_prod_segment_lang ON lib_prod_segment.segment_id = xref_prod_segment_lang.segment_id AND xref_prod_segment_lang.segment_uri = ?',[request.params.uriSegment], function (error, results, fields) {
		if (error) throw error;
	
		results.forEach(function(rsDetailPage){
			if (rsDetailPage.segment_lang == detailPage.lang) {
				detailPage.title = rsDetailPage.segment_title;
				detailPage.meta.title = rsDetailPage.segment_title + " | " + dataSite.title[rsDetailPage.segment_lang];
				detailPage.nav = {segment:rsDetailPage.segment_name.toLowerCase(),category:'',page:''};
				detailPage.meta.desc = dataPage[detailPage.nav.segment][rsDetailPage.segment_lang];

				detailSegment.id = rsDetailPage.segment_id;
				detailSegment.title = rsDetailPage.segment_title;
			}
			detailPage.uri[rsDetailPage.segment_lang] =  "/" + rsDetailPage.segment_uri;
			detailPage.canon[rsDetailPage.segment_lang] =  "/" + rsDetailPage.segment_uri;
		});	
	
		dbSmithy.query('SELECT category_name, category_title, category_uri, subcat_name, subcat_title, lib_prod_lang.prod_title, lib_prod_lang.prod_uri, lib_prod_lang.prod_blurb, lib_prod_lang_asset.prod_uri AS asset_uri FROM lib_prod_category INNER JOIN lib_prod_category_lang ON lib_prod_category.category_id = lib_prod_category_lang.category_id AND lib_prod_category_lang.category_lang = ? INNER JOIN lib_prod_subcat ON lib_prod_category.category_id = lib_prod_subcat.category_id INNER JOIN lib_prod_subcat_lang ON lib_prod_subcat.subcat_id = lib_prod_subcat_lang.subcat_id AND lib_prod_subcat_lang.subcat_lang = lib_prod_category_lang.category_lang INNER JOIN lib_prod ON lib_prod_subcat.subcat_id = lib_prod.subcat_id INNER JOIN lib_prod_lang ON lib_prod.prod_id = lib_prod_lang.prod_id AND lib_prod_lang.prod_lang = lib_prod_category_lang.category_lang INNER JOIN lib_prod_lang AS lib_prod_lang_asset ON lib_prod.prod_id = lib_prod_lang_asset.prod_id AND lib_prod_lang_asset.prod_lang = "en" WHERE segment_id = ? ORDER BY category_order, subcat_order, prod_title',[detailPage.lang,detailSegment.id], function (error, results, fields) {
			if (error) throw error;

			results.forEach(function(rsListProd){
				if(!detailSegment.listCategory.filter(iCategory => (iCategory.name === rsListProd.category_name)).length) {
					detailSegment.listCategory.push({name:rsListProd.category_name,title:rsListProd.category_title,uri:"/" + rsListProd.category_uri,listSubcat:[]})
				};
				
				var tmpSubcat = detailSegment.listCategory.filter(iCategory => (iCategory.name === rsListProd.category_name))[0].listSubcat;
			
				if(!tmpSubcat.filter(iSubcat => (iSubcat.name === rsListProd.subcat_name)).length) {
					tmpSubcat.push({name:rsListProd.subcat_name,title:rsListProd.subcat_title,listProd:[]})
				};
				
				tmpSubcat.filter(iSubcat => (iSubcat.name === rsListProd.subcat_name))[0].listProd.push({title:rsListProd.prod_title,uri:"/" + rsListProd.prod_uri,uriAsset:"/" + rsListProd.asset_uri,blurb:rsListProd.prod_blurb})			
			});

			response.render('template',{dataSite:dataSite,detailPage:detailPage,detailSegment:detailSegment});
		});	
	});
});

/* ============================================== PRODUCT : CATEGORY */
app.get('/:langCode(en|fr)/:uriCategory(melee-weapons|armes-de-melee|ranged-weapons|armes-a-distance|magic-weapons|armes-magiques|clothing|vetements|heavy-armour|armure-lourde|guards|gardes)',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'category',uri:{},canon:{},meta:{},nav:{},disc:[]};

	var detailCategory = {id:'',title:'',listSubcat:[]};
	
	dbSmithy.query('SELECT lib_prod_category.category_id, lib_prod_category.category_name, lib_prod_category_lang.category_title, lib_prod_category_lang.category_uri, lib_prod_category_lang.category_lang, lib_prod_segment.segment_name FROM lib_prod_category INNER JOIN lib_prod_category_lang ON lib_prod_category.category_id = lib_prod_category_lang.category_id INNER JOIN lib_prod_category_lang AS xref_prod_category_lang ON lib_prod_category.category_id = xref_prod_category_lang.category_id AND xref_prod_category_lang.category_uri = ? INNER JOIN lib_prod_segment ON lib_prod_category.segment_id = lib_prod_segment.segment_id',[request.params.uriCategory], function (error, results, fields) {
		if (error) throw error;
		
		results.forEach(function(rsDetailPage){
			if (rsDetailPage.category_lang == detailPage.lang) {
				detailPage.title = rsDetailPage.category_title;
				detailPage.meta.title = rsDetailPage.category_title + " | " + dataSite.title[rsDetailPage.category_lang];
				detailPage.nav = {segment:rsDetailPage.segment_name.toLowerCase(),category:rsDetailPage.category_name.toLowerCase(),page:''};
				detailPage.meta.desc = dataPage[detailPage.nav.category][rsDetailPage.category_lang];

				detailCategory.id = rsDetailPage.category_id;
				detailCategory.title = rsDetailPage.category_title;
			}
			detailPage.uri[rsDetailPage.category_lang] =  "/" + rsDetailPage.category_uri;
			detailPage.canon[rsDetailPage.category_lang] =  "/" + rsDetailPage.category_uri;
		});	

		dbSmithy.query('SELECT subcat_name, subcat_title, lib_prod_lang.prod_title, lib_prod_lang.prod_uri, lib_prod_lang.prod_blurb, lib_prod_lang_asset.prod_uri AS asset_uri FROM lib_prod_subcat INNER JOIN lib_prod_subcat_lang ON lib_prod_subcat.subcat_id = lib_prod_subcat_lang.subcat_id AND lib_prod_subcat_lang.subcat_lang = ? INNER JOIN lib_prod ON lib_prod_subcat.subcat_id = lib_prod.subcat_id INNER JOIN lib_prod_lang ON lib_prod.prod_id = lib_prod_lang.prod_id AND lib_prod_lang.prod_lang = lib_prod_subcat_lang.subcat_lang INNER JOIN lib_prod_lang AS lib_prod_lang_asset ON lib_prod.prod_id = lib_prod_lang_asset.prod_id AND lib_prod_lang_asset.prod_lang = "en" WHERE category_id = ? ORDER BY subcat_order, prod_title',[detailPage.lang,detailCategory.id], function (error, results, fields) {
			if (error) throw error;

			results.forEach(function(rsListProd){
				if(!detailCategory.listSubcat.filter(iSubcat => (iSubcat.name === rsListProd.subcat_name)).length) {
					detailCategory.listSubcat.push({name:rsListProd.subcat_name,title:rsListProd.subcat_title,listProd:[]})
				};
				
				detailCategory.listSubcat.filter(iSubcat => (iSubcat.name === rsListProd.subcat_name))[0].listProd.push({title:rsListProd.prod_title,uri:"/" + rsListProd.prod_uri,uriAsset:"/" + rsListProd.asset_uri,blurb:rsListProd.prod_blurb})			
			});

			response.render('template',{dataSite:dataSite,detailPage:detailPage,detailCategory:detailCategory});
		});	
	});	
});

/* ============================================== PRODUCT : PRODUCT */
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee|ranged-weapons|armes-a-distance|magic-weapons|armes-magiques|clothing|vetements|heavy-armour|armure-lourde|guards|gardes)/:uriProd',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'product',uri:{},canon:{},meta:{},nav:{},disc:[]};
	var detailProduct = {id:'',title:'',group:{},attr:{order:[],value:{}},similar:[]};

	dbSmithy.query('SELECT lib_prod.prod_id, lib_prod.prod_name, lib_prod_lang.prod_lang, lib_prod_lang.prod_title, lib_prod_lang.prod_class, lib_prod_lang.prod_uri, lib_prod_subcat.subcat_id, lib_prod_category.category_name, lib_prod_category_lang.category_uri, lib_prod_segment.segment_name FROM lib_prod INNER JOIN lib_prod_lang ON lib_prod.prod_id = lib_prod_lang.prod_id INNER JOIN lib_prod_lang AS xref_prod_lang ON lib_prod_lang.prod_id = xref_prod_lang.prod_id AND xref_prod_lang.prod_uri = ? INNER JOIN lib_prod_subcat ON lib_prod.subcat_id = lib_prod_subcat.subcat_id INNER JOIN lib_prod_category ON lib_prod_subcat.category_id = lib_prod_category.category_id INNER JOIN lib_prod_category_lang ON lib_prod_category.category_id = lib_prod_category_lang.category_id AND lib_prod_category_lang.category_lang = lib_prod_lang.prod_lang INNER JOIN lib_prod_segment ON lib_prod_category.segment_id = lib_prod_segment.segment_id ORDER BY lib_prod_lang.prod_lang',[request.params.uriProd], function (error, results, fields) {
		if (error) throw error;
		
		results.forEach(function(rsDetailPage){
			if (rsDetailPage.prod_lang == detailPage.lang) {
				detailPage.title = rsDetailPage.prod_title;
				detailPage.meta.title = rsDetailPage.prod_title + " | " + rsDetailPage.prod_class + " | " + dataSite.title[rsDetailPage.prod_lang];
				detailPage.nav = {segment:rsDetailPage.segment_name.toLowerCase(),category:rsDetailPage.category_name.toLowerCase(),page:rsDetailPage.prod_name.toLowerCase()};
				detailPage.meta.desc = dataPage.product[rsDetailPage.prod_lang].replace('[PRODUCTNAME]',rsDetailPage.prod_title).replace('[PRODUCTCLASS]',rsDetailPage.prod_class.toLowerCase());

				detailProduct.id = rsDetailPage.prod_id;
				detailProduct.title = rsDetailPage.prod_title;
				detailProduct.group.idSubcat = rsDetailPage.subcat_id;
			}
			detailPage.uri[rsDetailPage.prod_lang] =  "/" + rsDetailPage.prod_uri;
			detailPage.canon[rsDetailPage.prod_lang] =  "/" + rsDetailPage.category_uri + detailPage.uri[rsDetailPage.prod_lang];
		});	
		
		dbSmithy.query('SELECT REPLACE(LOWER(attr_name)," ","") AS attr_name, xref_value AS attr_value, disclaimer_text FROM xref_subcat_attr INNER JOIN lib_attr ON lib_attr.attr_id IN (1,2,3,xref_subcat_attr.attr_id_1,xref_subcat_attr.attr_id_2) LEFT JOIN lib_disclaimer ON lib_attr.disclaimer_id = lib_disclaimer.disclaimer_id LEFT JOIN lib_disclaimer_lang ON lib_disclaimer.disclaimer_id = lib_disclaimer_lang.disclaimer_id AND lib_disclaimer_lang.disclaimer_lang = ? INNER JOIN xref_prod_attr ON lib_attr.attr_id = xref_prod_attr.attr_id AND xref_prod_attr.prod_id = ? WHERE subcat_id = ? ORDER BY CASE WHEN lib_attr.attr_id IN (1,2,3) THEN lib_attr.attr_id WHEN lib_attr.attr_id = xref_subcat_attr.attr_id_1 THEN 15 WHEN lib_attr.attr_id = xref_subcat_attr.attr_id_2 THEN 20 END;',[detailPage.lang,detailProduct.id,detailProduct.group.idSubcat], function (error, results, fields) {
			if (error) throw error;
			
			results.forEach(function(rsDetailProdAttr){
				if (rsDetailProdAttr.disclaimer_text) {
					detailPage.disc.push(rsDetailProdAttr.disclaimer_text);
				};
				detailProduct.attr.order.push(rsDetailProdAttr.attr_name);
				detailProduct.attr.value[rsDetailProdAttr.attr_name] = rsDetailProdAttr.attr_value;
			});	
			
			dbSmithy.query('SELECT lib_prod_lang.prod_title, lib_prod_lang.prod_blurb, lib_prod_lang.prod_uri, lib_prod_lang_asset.prod_uri AS asset_uri, category_uri FROM iref_prod_similar INNER JOIN lib_prod ON iref_prod_similar.iref_prod_id = lib_prod.prod_id INNER JOIN lib_prod_lang ON lib_prod.prod_id = lib_prod_lang.prod_id AND lib_prod_lang.prod_lang = ? INNER JOIN lib_prod_subcat ON lib_prod.subcat_id = lib_prod_subcat.subcat_id INNER JOIN lib_prod_category_lang ON lib_prod_subcat.category_id = lib_prod_category_lang.category_id AND lib_prod_category_lang.category_lang = lib_prod_lang.prod_lang INNER JOIN lib_prod_lang AS lib_prod_lang_asset ON lib_prod.prod_id = lib_prod_lang_asset.prod_id AND lib_prod_lang_asset.prod_lang = "en" WHERE iref_prod_similar.prod_id = ? ORDER BY iref_prod_similar.iref_order',[detailPage.lang,detailProduct.id], function (error, results, fields) {
				if (error) throw error;
				
				results.forEach(function(rsDetailProdSimilar){
					detailProduct.similar.push([rsDetailProdSimilar.prod_title,rsDetailProdSimilar.prod_blurb,"/" + rsDetailProdSimilar.prod_uri,"/" + rsDetailProdSimilar.category_uri,"/" + rsDetailProdSimilar.asset_uri]);
				});	

				response.render('template',{dataSite:dataSite,detailPage:detailPage,detailProduct:detailProduct});
			});	
		});	
	});
});

/* ============================== ANCILLARY PAGES */
/* ============================================== */
/* ============================================== TOOLS : ROOT */
app.get('/:langCode(en|fr)/:uriPage(tools|outils)',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'tool',uri:{},canon:{},meta:{},nav:{},disc:[]};

	var langTitle = {en:"Tools",fr:"Outils"}
	
	detailPage.title = langTitle[detailPage.lang];
	detailPage.meta.title = detailPage.title + ' | ' + dataSite.title[detailPage.lang];
	detailPage.nav = {segment:"tool",category:"",page:""};
	detailPage.meta.desc = dataPage.tool[detailPage.lang];

	detailPage.uri.en =  "/tools";
	detailPage.uri.fr =  "/outils";
	detailPage.canon =  detailPage.uri;

	response.render('template',{dataSite:dataSite,detailPage:detailPage});
});

/* ============================================== TOOLS : WARRANTY */
app.get('/:langCode(en|fr)/:uriPage(warranty|garantie)',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'warranty',uri:{},canon:{},meta:{},nav:{},disc:[]};

	var langTitle = {en:"Warranty",fr:"Garantie"}
	
	detailPage.title = langTitle[detailPage.lang];
	detailPage.meta.title = detailPage.title + ' | ' + dataSite.title[detailPage.lang];
	detailPage.nav = {segment:"tool",category:"owner",page:"warranty"};
	detailPage.meta.desc = dataPage.tool[detailPage.lang];

	detailPage.uri.en =  "/warranty";
	detailPage.uri.fr =  "/garantie";
	detailPage.canon =  detailPage.uri;

	response.render('template',{dataSite:dataSite,detailPage:detailPage});
});

/* ============================== TESTING */
/* ============================================== */


/* ================================== APP */
/* ============================================== */
/* ============================================== APP : REQUEST LISTENER */
app.listen(app.get('port'), function() {
	console.log('Canbotics Smithy is running on port : ', app.get('port'));
});