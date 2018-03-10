var express = require('express');
var mysql = require('mysql');
var app = express();

var dbSmithy = mysql.createConnection({host:process.env.DBSMITHY.split('|')[0],user:process.env.DBSMITHY.split('|')[1],password:process.env.DBSMITHY.split('|')[2],database:process.env.DBSMITHY.split('|')[3]});

dbSmithy.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected to dbSmithy as id ' + dbSmithy.threadId);
});
//dbSmithy.end();



app.set('port',(process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
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
		template:'index',
		en:'Visit the ' + dataSite.title.en + ', for all your warfare needs.',
		fr:'Visitez la ' + dataSite.title.fr + ', pour tous vos besoins de guerre.'
	},
	
	weapon:{
		template:'segment',
		en:'Browse the extensive catalogue of high quality weapons available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armes de haute qualité disponibles sur le site officiel de ' + dataSite.title.fr + '.'
	},
	melee:{
		template:'category',
		en:'Browse the extensive catalogue of high quality melee weapons available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armes de mêlée de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	ranged:{
		template:'category',
		en:'Browse the extensive catalogue of high quality ranged weapons available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armes à distance de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	magic:{
		template:'category',
		en:'Browse the extensive catalogue of high quality magic weapons available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armes magiques de haute qualité disponibles sur le site officiel de ' + dataSite.title.fr + '.'
	},

	armour:{
		template:'segment',
		en:'Browse the extensive catalogue of high quality clothing and armour available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue de vêtements et d\'armures de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	clothing:{
		template:'category',
		en:'Browse the extensive catalogue of high quality clothing available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourir le vaste catalogue de vêtements de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	heavy:{
		template:'category',
		en:'Browse the extensive catalogue of high quality heavy armour available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'armures lourdes de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.'
	},
	guard:{
		template:'category',
		en:'Browse the extensive catalogue of high quality personal guard equipment available, on the official ' + dataSite.title.en + ' website.',
		fr:'Parcourez le vaste catalogue d\'équipements de protection personnelle de haute qualité disponibles, sur le site officiel de' + dataSite.title.fr + '.'
	},
	
	tool:{
		template:'tool',
		en:'DESCRIPTION_ENGLISH',
		fr:'DESCRIPTION_FRENCH'
	},
	warranty:{
		template:'warranty',
		en:'Read all about the comprehensive warranty provided on all ' + dataSite.title.en + ' weapons.',
		fr:'Lisez tout sur la garantie complète fournie sur toutes les armes ' + dataSite.title.fr + '.'
	},

	product:{
		template:'product',
		en:'Find out about the ' + dataSite.title.en + ' [PRODUCTNAME] [PRODUCTCLASS], on the official website.',
		fr:'Renseignez-vous sur [PRODUCTCLASS] ' + dataSite.title.fr + ' [PRODUCTNAME], sur le site officiel.'
	},
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
app.get('/:langCode(en|fr)/:uriSegment(weapons|armes|armour|armure)',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'segment',uri:{},canon:{},meta:{},nav:{},disc:[]};

	var detailSegment = {id:'',title:'',listCategory:{},orderCategory:[]};
	var detailCategory = {id:'',title:'',prod:{},subcat:[]};
	
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
			
			
			console.log("+++++++++++ ")
			
			results.forEach(function(rsListProd){
				if (!detailSegment.orderCategory.includes(rsListProd.category_name)) {
					detailSegment.orderCategory.push(rsListProd.category_name);
					detailSegment.listCategory[rsListProd.category_name] = {listSubcat:{},orderSubcat:[]};
				console.log("-------------- " + rsListProd.category_name)
				};
				if (!detailSegment.listCategory[rsListProd.category_name].orderSubcat.includes(rsListProd.subcat_name)) {
					detailSegment.listCategory[rsListProd.category_name].orderSubcat.push(rsListProd.subcat_name);
					detailSegment.listCategory[rsListProd.category_name].listSubcat[rsListProd.subcat_name] = []
				console.log("----------- " + rsListProd.subcat_name)
				}
				
				
				
/*				
				
				if (!detailSegment.subcat[rsListProd.category_name].subcat.includes(rsListProd.subcat_name + "|" + rsListProd.subcat_title)) {
					detailSegment.subcat[rsListProd.category_name].subcat.push(rsListProd.subcat_name + "|" + rsListProd.subcat_title);
					detailSegment.subcat[rsListProd.category_name].prod[] = {};
				}
				detailSegment.subcat[rsListProd.category_name].prod[rsListProd.subcat_name] = [ush({title:rsListProd.prod_title});
*/
			});
				console.log("===========")
				console.log(detailSegment.listCategory)
				console.log("===========")
				console.log(detailSegment.listCategory)
				console.log("///////////")
					
				
				
				
				
				
				/*
				if (!detailCategory.subcat.includes(rsListProd.subcat_name + "|" + rsListProd.subcat_title)) {
					detailCategory.subcat.push(rsListProd.subcat_name + "|" + rsListProd.subcat_title);
					detailCategory.prod[rsListProd.subcat_name] = [];
				};
				detailCategory.prod[rsListProd.subcat_name].push({title:rsListProd.prod_title,uri:"/" + rsListProd.prod_uri,uriAsset:"/" + rsListProd.asset_uri,blurb:rsListProd.prod_blurb});
				
			console.log(" ")
			console.log("+++++++++++")
			console.log(detailPage)
			console.log("-----------")
			console.log(detailSegment)
			console.log("===========")
				*/
		
	/*
			
			
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
						if (!detailCategory.subcat.includes(rsListProd.subcat_name + "|" + rsListProd.subcat_title)) {
							detailCategory.subcat.push(rsListProd.subcat_name + "|" + rsListProd.subcat_title);
							detailCategory.prod[rsListProd.subcat_name] = [];
						};
						detailCategory.prod[rsListProd.subcat_name].push({title:rsListProd.prod_title,uri:"/" + rsListProd.prod_uri,uriAsset:"/" + rsListProd.asset_uri,blurb:rsListProd.prod_blurb});
				});	
				response.render('template',{dataSite:dataSite,detailPage:detailPage,detailCategory:detailCategory});
			});	
		*/
		});	
	});
});





















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
app.get('/:langCode(en|fr)/:uriCategory(melee-weapons|armes-de-melee|ranged-weapons|armes-a-distance|magic-weapons|armes-magiques|clothing|vetements|heavy-armour|armure-lourde|guards|gardes)',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'category',uri:{},canon:{},meta:{},nav:{},disc:[]};


	var detailCategory = {id:'',title:'',prod:{},subcat:[]};
	
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
					if (!detailCategory.subcat.includes(rsListProd.subcat_name + "|" + rsListProd.subcat_title)) {
						detailCategory.subcat.push(rsListProd.subcat_name + "|" + rsListProd.subcat_title);
						detailCategory.prod[rsListProd.subcat_name] = [];
					};
					detailCategory.prod[rsListProd.subcat_name].push({title:rsListProd.prod_title,uri:"/" + rsListProd.prod_uri,uriAsset:"/" + rsListProd.asset_uri,blurb:rsListProd.prod_blurb});
			});	
			response.render('template',{dataSite:dataSite,detailPage:detailPage,detailCategory:detailCategory});
		});	
	});	
});







/* ============================================== PRODUCT : PRODUCT */
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee|ranged-weapons|armes-a-distance|magic-weapons|armes-magiques|clothing|vetements|heavy-armour|armure-lourde|guards|gardes)/:uriProd',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'product',uri:{},canon:{},meta:{},nav:{},disc:["Something","Also this","Darkside"]};
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
		
		dbSmithy.query('SELECT REPLACE(LOWER(attr_name)," ","") AS attr_name, xref_value AS attr_value FROM xref_subcat_attr INNER JOIN lib_attr ON lib_attr.attr_id IN (1,2,3,xref_subcat_attr.attr_id_1,xref_subcat_attr.attr_id_2) INNER JOIN xref_prod_attr ON lib_attr.attr_id = xref_prod_attr.attr_id AND xref_prod_attr.prod_id = ? WHERE subcat_id = ? ORDER BY CASE WHEN lib_attr.attr_id IN (1,2,3) THEN lib_attr.attr_id WHEN lib_attr.attr_id = xref_subcat_attr.attr_id_1 THEN 3 WHEN lib_attr.attr_id = xref_subcat_attr.attr_id_2 THEN 4 END;',[detailProduct.id,detailProduct.group.idSubcat], function (error, results, fields) {
			if (error) throw error;
			
			results.forEach(function(rsDetailProdAttr){
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














/* ============================================== TESTING */
app.get('/:langCode(en|fr)/test/:productURI',function(request,response) {
	var detailPage = {lang:request.params.langCode,title:'',template:'product',uri:{},canon:{},meta:{},nav:{},disc:["Something","Also this","Darkside"]};
	var detailProduct = {id:'',title:'',group:{},attr:{order:[],value:{}},similar:[]};

	dbSmithy.query('SELECT lib_prod.prod_id, lib_prod.prod_name, lib_prod_lang.prod_lang, lib_prod_lang.prod_title, lib_prod_lang.prod_class, lib_prod_lang.prod_uri, lib_prod_subcat.subcat_id, lib_prod_category.category_name, lib_prod_category_lang.category_uri, lib_prod_segment.segment_name FROM lib_prod INNER JOIN lib_prod_lang ON lib_prod.prod_id = lib_prod_lang.prod_id INNER JOIN lib_prod_lang AS xref_prod_lang ON lib_prod_lang.prod_id = xref_prod_lang.prod_id AND xref_prod_lang.prod_uri = ? INNER JOIN lib_prod_subcat ON lib_prod.subcat_id = lib_prod_subcat.subcat_id INNER JOIN lib_prod_category ON lib_prod_subcat.category_id = lib_prod_category.category_id INNER JOIN lib_prod_category_lang ON lib_prod_category.category_id = lib_prod_category_lang.category_id AND lib_prod_category_lang.category_lang = lib_prod_lang.prod_lang INNER JOIN lib_prod_segment ON lib_prod_category.segment_id = lib_prod_segment.segment_id ORDER BY lib_prod_lang.prod_lang',[request.params.productURI], function (error, results, fields) {
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
		
		dbSmithy.query('SELECT REPLACE(LOWER(attr_name)," ","") AS attr_name, xref_value AS attr_value FROM xref_subcat_attr INNER JOIN lib_attr ON lib_attr.attr_id IN (1,2,3,xref_subcat_attr.attr_id_1,xref_subcat_attr.attr_id_2) INNER JOIN xref_prod_attr ON lib_attr.attr_id = xref_prod_attr.attr_id AND xref_prod_attr.prod_id = ? WHERE subcat_id = ?',[detailProduct.id,detailProduct.group.idSubcat], function (error, results, fields) {
			if (error) throw error;
			
			results.forEach(function(rsDetailProdAttr){
				detailProduct.attr.order.push(rsDetailProdAttr.attr_name);
				detailProduct.attr.value[rsDetailProdAttr.attr_name] = rsDetailProdAttr.attr_value;
			});	
			
			dbSmithy.query('SELECT prod_title, prod_blurb, prod_uri, category_uri FROM iref_prod_similar INNER JOIN lib_prod ON iref_prod_similar.iref_prod_id = lib_prod.prod_id INNER JOIN lib_prod_lang ON lib_prod.prod_id = lib_prod_lang.prod_id AND lib_prod_lang.prod_lang = ? INNER JOIN lib_prod_subcat ON lib_prod.subcat_id = lib_prod_subcat.subcat_id INNER JOIN lib_prod_category_lang ON lib_prod_subcat.category_id = lib_prod_category_lang.category_id AND lib_prod_category_lang.category_lang = lib_prod_lang.prod_lang WHERE iref_prod_similar.prod_id = ? ORDER BY iref_prod_similar.iref_order',[detailPage.lang,detailProduct.id], function (error, results, fields) {
				if (error) throw error;
				
				results.forEach(function(rsDetailProdSimilar){
					detailProduct.similar.push([rsDetailProdSimilar.prod_title,rsDetailProdSimilar.prod_blurb,"/" + rsDetailProdSimilar.prod_uri,"/" + rsDetailProdSimilar.category_uri]);
				});	
				
				
				
				
				
				console.log("------- DETAILPAGE -------");
				console.log(detailPage);
				console.log("------- DETAILPRODUCT -------");
				console.log(detailProduct);
				console.log("===========================");
				console.log("===========================");

				response.render('template',{dataSite:dataSite,detailPage:detailPage,detailProduct:detailProduct});
			});	
		});	
	});
});



	

/* ============================================== TEMPORARY BACKUP */
/*
app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee|ranged-weapons|armes-a-distance|magic-weapons|armes-magiques|clothing|vetements|heavy-armour|armure-lourde|guards|gardes)/:productUri',function(request,response) {
	
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


app.get('/:langCode(en|fr)/:categoryPage(melee-weapons|armes-de-melee|ranged-weapons|armes-a-distance|magic-weapons|armes-magiques|clothing|vetements|heavy-armour|armure-lourde|guards|gardes)',function(request,response) {
	if (request.params.categoryPage == 'melee-weapons' || request.params.categoryPage == 'armes-de-melee') {
		var detailsPage = dataPage.melee;
	} else if (request.params.categoryPage == 'ranged-weapons' || request.params.categoryPage == 'armes-a-distance') {
		var detailsPage = dataPage.ranged;
	} else if (request.params.categoryPage == 'magic-weapons' || request.params.categoryPage == 'armes-magiques') {
		var detailsPage = dataPage.magic;
	} else if (request.params.categoryPage == 'clothing' || request.params.categoryPage == 'vetements') {
		var detailsPage = dataPage.clothes;
	} else if (request.params.categoryPage == 'heavy-armour' || request.params.categoryPage == 'armure-lourde') {
		var detailsPage = dataPage.heavy;
	} else if (request.params.categoryPage == 'plate-armour' || request.params.categoryPage == 'armure-de-plaque') {
		var detailsPage = dataPage.plate;
	} else if (request.params.categoryPage == 'guards' || request.params.categoryPage == 'gardes') {
		var detailsPage = dataPage.guard;
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






var dataPage = {
	index:{
		navSegment:'index',
		navCategory:'index',
		navPage:'index',
		template:'index',
		en:{
			title:'',
			desc:'Visit the ' + dataSite.title.en + ', for all your warfare needs.',
			path:'/en'},
		fr:{
			title:'',
			desc:'Visitez la ' + dataSite.title.fr + ', pour tous vos besoins de guerre.',
			path:'/fr'}
	},
	
	weapon:{
		navSegment:'weapon',
		navCategory:'',
		navPage:'',
		template:'segment',
		en:{
			title:'Weapons',
			desc:'Browse the extensive catalogue of high quality weapons available, on the official ' + dataSite.title.en + ' website.',
			path:'/en/weapons'},
		fr:{
			title:'Armes',
			desc:'Parcourez le vaste catalogue d\'armes de haute qualité disponibles sur le site officiel de ' + dataSite.title.fr + '.',
			path:'/fr/armes'}
	},
	melee:{
		navSegment:'weapon',
		navCategory:'melee',
		navPage:'',
		template:'category',
		en:{
			title:'Melee Weapons',
			desc:'Browse the extensive catalogue of high quality melee weapons available, on the official ' + dataSite.title.en + ' website.',
			path:'/en/melee-weapons'},
		fr:{
			title:'Armes de mêlée',
			desc:'Parcourez le vaste catalogue d\'armes de mêlée de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.',
			path:'/fr/armes-de-melee'}
	},
	ranged:{
		navSegment:'weapon',
		navCategory:'ranged',
		navPage:'',
		template:'category',
		en:{
			title:'Ranged Weapons',
			desc:'Browse the extensive catalogue of high quality ranged weapons available, on the official ' + dataSite.title.en + ' website.',
			path:'/en/ranged-weapons'},
		fr:{
			title:'Armes à distance',
			desc:'Parcourez le vaste catalogue d\'armes à distance de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.',
			path:'/fr/armes-a-distance'}
	},
	magic:{
		navSegment:'weapon',
		navCategory:'magic',
		navPage:'',
		template:'category',
		en:{
			title:'Magic Weapons',
			desc:'Browse the extensive catalogue of high quality magic weapons available, on the official ' + dataSite.title.en + ' website.',
			path:'/en/magic-weapons'},
		fr:{
			title:'Armes magiques',
			desc:'Parcourez le vaste catalogue d\'armes magiques de haute qualité disponibles sur le site officiel de ' + dataSite.title.fr + '.',
			path:'/fr/armes-magiques'}
	},

	armour:{
		navSegment:'armour',
		navCategory:'',
		navPage:'',
		template:'segment',
		en:{
			title:'Armour',
			desc:'Browse the extensive catalogue of high quality clothing and armour available, on the official ' + dataSite.title.en + ' website.',
			path:'/en/armour'},
		fr:{
			title:'Armure',
			desc:'Parcourez le vaste catalogue de vêtements et d\'armures de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.',
			path:'/fr/armure'}
	},
	clothes:{
		navSegment:'armour',
		navCategory:'clothes',
		navPage:'',
		template:'category',
		en:{
			title:'Clothing',
			desc:'Browse the extensive catalogue of high quality clothing available, on the official ' + dataSite.title.en + ' website.',
			path:'/en/clothing'},
		fr:{
			title:'Vêtements',
			desc:'Parcourir le vaste catalogue de vêtements de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.',
			path:'/fr/vetements'}
	},
	DELheavy:{
		navSegment:'armour',
		navCategory:'heavy',
		navPage:'',
		template:'category',
		en:{
			title:'Chainmail',
			desc:'Browse the extensive catalogue of high quality chainmail armour available, on the official ' + dataSite.title.en + ' website.',
			path:'/en/chainmail-armour'},
		fr:{
			title:'Armure de cotte de mailles',
			desc:'Passez en revue le catalogue étendu d\'armure de chainmail de haute qualité disponible, sur le site officiel de ' + dataSite.title.fr + '.',
			path:'/fr/armure-de-cotte-de-mailles'}
	},
	heavy:{
		navSegment:'armour',
		navCategory:'heavy',
		navPage:'',
		template:'category',
		en:{
			title:'Heavy Armour',
			desc:'Browse the extensive catalogue of high quality heavy armour available, on the official ' + dataSite.title.en + ' website.',
			path:'/en/heavy-armour'},
		fr:{
			title:'Armure lourde',
			desc:'Parcourez le vaste catalogue d\'armures lourdes de haute qualité disponibles, sur le site officiel de ' + dataSite.title.fr + '.',
			path:'/fr/armure-lourde'}
	},
	guard:{
		navSegment:'armour',
		navCategory:'guard',
		navPage:'',
		template:'category',
		en:{
			title:'Guards',
			desc:'Browse the extensive catalogue of high quality personal guard equipment available, on the official ' + dataSite.title.en + ' website.',
			path:'/en/guards'},
		fr:{
			title:'Gardes',
			desc:'Parcourez le vaste catalogue d\'équipements de protection personnelle de haute qualité disponibles, sur le site officiel de' + dataSite.title.fr + '.',
			path:'/fr/gardes'}
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
			prodBlurb:'A true classic, this is a staple of Roman footsoldiers.'},
		fr:{
			prodClass:'Épée courte',
			prodUri:'gladius-epee-courte',
			prodBlurb:'Un vrai classique, c\'est une base de footsolders romains.'},
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
			prodBlurb:'Hailing from the Greeks, this feisty beauty knows how to make its mark.'},
		fr:{
			prodClass:'Épée courte',
			prodUri:'xiphos-epee-courte',
			prodBlurb:'Originaire des Grecs, cette beauté fougueuse sait comment faire sa marque.'},
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
			prodBlurb:'Enemies will cower, when they glimpse this Highland beast being wielded.'},
		fr:{
			prodClass:'Lourde épée longue',
			prodUri:'claymore-lourde-epee-longue',
			prodBlurb:'Les ennemis se recroquevilleront lorsqu\'ils apercevront cette bête des Highlands qui est brandie.'},
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
			prodBlurb:'Be the star of your own Arabian Night, with this shining pinnacle of Middle Eastern combat.'},
		fr:{
			prodClass:'Sabre de l\'est exotique',
			prodUri:'scimitar-sabre-de-lest-exotique',
			prodBlurb:'Soyez la star de votre propre nuit arabe, avec ce pinacle brillant du combat moyen-oriental.'},
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
			prodBlurb:'A truly beautiful, and exotic sword straight from Japan.'},
		fr:{
			prodClass:'Épée orientale exotique',
			prodUri:'katana-epee-orientale-exotique',
			prodBlurb:'Une épée vraiment belle et exotique venant tout droit du Japon.'},
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
			prodBlurb:'An imposing staff from Japan, with proper training it\'ll have your enemies fleeing.'},
		fr:{
			prodClass:'Bâton complet',
			prodUri:'bo-baton-complet',
			prodBlurb:'Un bâton imposant en provenance du Japon, avec un entraînement approprié, fera fuir vos ennemis.'},
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
			prodBlurb:'Fire bolts accurately, through your enemies.'},
		fr:{
			prodClass:'Puissant arc de tireur de milieu de gamme',
			prodUri:'crossbow-puissant-arc-de-tireur-de-milieu-de-gamme',
			prodBlurb:'Les boulons de feu avec précision, à travers vos ennemis.'},
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
			prodClass:'Low-power Short-range Pellet Sling',
			prodUri:'slingshot-low-power-short-range-pellet-sling',
			prodBlurb:'Don\'t have a cow, man!'},
		fr:{
			prodClass:'Élingue à granules courte portée de faible puissance',
			prodUri:'slingshot-elingue-a-granules-courte-portee-de-faible-puissance',
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
	wand:{
		en:{
			prodClass:'Slim Magic Focus',
			prodUri:'wand-slim-magic-focus',
			prodBlurb:'Familiar not included.'},
		fr:{
			prodClass:'Focus magique mince',
			prodUri:'wand-focus-magique-mince',
			prodBlurb:'Familier non inclus.'},
		attr:{
			name:'Wand',
			skill:{en:'Magic Focus',fr:'Focus magique'},
			category:['magic','focus'],
			range:0,
			price:0,
			damage:[0,0,0],
			speed:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	shillelagh:{
		en:{
			prodClass:'Gaelic Magic Staff',
			prodUri:'shillelagh-gaelic-magic-staff',
			prodBlurb:'Both physically and magically daunting.'},
		fr:{
			prodClass:'Bâton magique gaélique',
			prodUri:'shillelagh-baton-magique-gaelique',
			prodBlurb:'À la fois physiquement et magiquement décourageant.'},
		attr:{
			name:'Shillelagh',
			skill:{en:'Staff',fr:'Bâton magique'},
			category:['magic','staff'],
			range:0,
			price:0,
			damage:[0,0,0],
			speed:1,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	necronomicon:{
		en:{
			prodClass:'Powerful Summoning Grimoire',
			prodUri:'necronomicon-powerful-summoning-grimoire',
			prodBlurb:'Now even you may summon everyone\'s favourite ancient one.'},
		fr:{
			prodClass:'Grimoire puissant d\'invocation',
			prodUri:'necronomicon-grimoire-puissant-d-invocation',
			prodBlurb:'Maintenant même vous pouvez invoquer l\'ancien préféré de tout le monde.'},
		attr:{
			name:'Necronomicon',
			skill:{en:'Book',fr:'Grimoire'},
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
			prodClass:'Light Full-body Clothing',
			prodUri:'robe-light-full-body-clothing',
			prodBlurb:'Essential for magic crafting.'},
		fr:{
			prodClass:'Vêtements légers complets',
			prodUri:'robe-vetements-legers-complets',
			prodBlurb:'Essentiel pour l\'artisanat magique.'},
		attr:{
			name:'Robe',
			skill:{en:'Robe',fr:'Peignoir'},
			category:['clothes','full'],
			price:27,
			armourClass:3,
			coverage:90,
			aetherConductivity:[76,4],
			bonusAgility:0,
			damageMitigation:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	corset:{
		en:{
			prodClass:'Form Fitting and Shaping Top',
			prodUri:'corset-form-fitting-and-shaping-top',
			prodBlurb:'Add a Victorian flare to your wardrobe.'},
		fr:{
			prodClass:'Forme de montage et de façonnage',
			prodUri:'corset-forme-de-montage-et-de-faconnage',
			prodBlurb:'Ajouter une fusée victorienne à votre garde-robe.'},
		attr:{
			name:'Corset',
			skill:{en:'Bodice',fr:'Corsage'},
			category:['clothes','top'],
			price:13,
			armourClass:1,
			coverage:30,
			aetherConductivity:[45,8],
			bonusAgility:0,
			damageMitigation:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	hakama:{
		en:{
			prodClass:'Exotic Oriental Pants',
			prodUri:'hakama-exotic-oriental-pants',
			prodBlurb:'Classic Japanese style, with high functionality.'},
		fr:{
			prodClass:'Pantalon oriental exotique',
			prodUri:'hakama-pantalon-oriental-exotique',
			prodBlurb:'Style japonais classique, avec des fonctionnalités élevées.'},
		attr:{
			name:'Hakama',
			skill:{en:'Pants',fr:'Peignoir'},
			category:['clothes','bottom'],
			price:15,
			armourClass:3,
			coverage:60,
			aetherConductivity:[53,19],
			bonusAgility:0,
			damageMitigation:0,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	hauberk:{
		en:{
			prodClass:'Heavy Chainmail Armour',
			prodUri:'hauberk-heavy-chainmail-armour',
			prodBlurb:'Strong and sturdy.'},
		fr:{
			prodClass:'Armure de cotte de mailles lourde',
			prodUri:'hauberk-armure-de-cotte-de-mailles-lourde',
			prodBlurb:'Solide et robuste.'},
		attr:{
			name:'Hauberk',
			skill:{en:'Heavy Armour',fr:'Armure lourde'},
			category:['heavy','top'],
			price:89,
			armourClass:10,
			coverage:60,
			aetherConductivity:[19,5],
			bonusAgility:0,
			damageMitigation:5,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	cuirass:{
		en:{
			prodClass:'Heavy Body Armour',
			prodUri:'cuirass-heavy-body-armour',
			prodBlurb:'Protection as impressive as it looks.'},
		fr:{
			prodClass:'Armure de corps lourde',
			prodUri:'cuirass-armure-de-corps-lourde',
			prodBlurb:'Une protection aussi impressionnante qu\'elle en a l\'air.'},
		attr:{
			name:'Cuirass',
			skill:{en:'Heavy Armour',fr:'Armure lourde'},
			category:['heavy','top'],
			price:109,
			armourClass:12,
			coverage:50,
			aetherConductivity:[12,3],
			bonusAgility:-2,
			damageMitigation:8,
			weight:0,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	targe:{
		en:{
			prodClass:'Medium Personal Shield',
			prodUri:'targe-medium-personal-shield',
			prodBlurb:'Formidable front-line shields.'},
		fr:{
			prodClass:'Bouclier personnel moyen',
			prodUri:'targe-bouclier-personnel-moyen',
			prodBlurb:'Boucliers de première ligne Formidable.'},
		attr:{
			name:'Targe',
			skill:{en:'Shield',fr:'Bouclier'},
			category:['guard','shield'],
			price:54,
			armourClass:2,
			coverage:0,
			aetherConductivity:[23,2],
			bonusAgility:0,
			damageMitigation:0,
			weight:2.6,
			dimMin:[0,0,0],
			dimMax:[0,0,0]}},
	TEMPLATE:{
		en:{
			prodClass:'CLASS',
			prodUri:'PRODUCT-CLASS',
			prodBlurb:'BLURB'},
		fr:{
			prodClass:'CLASS',
			prodUri:'PRODUCT-CLASS',
			prodBlurb:'BLURB'},
		attr:{
			name:'PRODUCT',
			skill:{en:'SKILL',fr:'SKILL'},
			category:['CATEGORY','SUBCATEGORY'],
			price:0,
			armourClass:0,
			coverage:[0,'LOCATION'],
			aetherConductivity:[0,0],
			bonusAgility:0,
			damageMitigation:0,
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
dataWeapon.shortbow.similar = [dataWeapon.longbow,dataWeapon.crossbow,dataWeapon.slingshot];
dataWeapon.longbow.similar = [dataWeapon.shortbow,dataWeapon.crossbow,dataWeapon.slingshot];
dataWeapon.crossbow.similar = [dataWeapon.shortbow,dataWeapon.longbow,dataWeapon.flintlock];
dataWeapon.slingshot.similar = [dataWeapon.shortbow,dataWeapon.longbow,dataWeapon.crossbow];
dataWeapon.flintlock.similar = [dataWeapon.crossbow,dataWeapon.shortbow,dataWeapon.slingshot];
dataWeapon.wand.similar = [dataWeapon.shillelagh,dataWeapon.necronomicon];
dataWeapon.shillelagh.similar = [dataWeapon.wand,dataWeapon.necronomicon];
dataWeapon.necronomicon.similar = [dataWeapon.wand,dataWeapon.shillelagh];

dataArmour.robe.similar = [dataArmour.corset,dataArmour.hakama]
dataArmour.corset.similar = [dataArmour.robe,dataArmour.hakama]
dataArmour.hakama.similar = [dataArmour.robe,dataArmour.corset]

dataArmour.hauberk.similar = [dataArmour.cuirass,dataArmour.targe]
dataArmour.cuirass.similar = [dataArmour.hauberk,dataArmour.targe]
dataArmour.targe.similar = [dataArmour.cuirass,dataArmour.hauberk]


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
			en:['Focus','Foci'],
			fr:['Concentrer','Concentrers'],
			products:[
				dataWeapon.wand]},
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
	clothes:[
		{
			en:['Robe','Robes'],
			fr:['Peignoir','Peignoirs'],
			products:[
				dataArmour.robe,
				dataArmour.corset,
				dataArmour.hakama]}],
	heavy:[
		{
			en:['Chainmail','Chainmail'],
			fr:['Armure lourde','Armures lourde'],
			products:[
				dataArmour.hauberk]},
		{
			en:['Plate Armour','Plate Armour'],
			fr:['Armure de plaque','Armures de plaque'],
			products:[
				dataArmour.cuirass]}],
	guard:[
		{
			en:['Shield','Shields'],
			fr:['Bouclier','Boucliers'],
			products:[
				dataArmour.targe]}]
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
			dataPage:dataPage.clothes,
			subcategory:listCategory.clothes},
		{
			dataPage:dataPage.heavy,
			subcategory:listCategory.heavy},
		{
			dataPage:dataPage.guard,
			subcategory:listCategory.guard}]
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
	'slingshot-low-power-short-range-pellet-sling':dataWeapon.slingshot,
	'slingshot-elingue-a-granules-courte-portee-de-faible-puissance':dataWeapon.slingshot,
	'flintlock-powerful-short-range-flint-gun':dataWeapon.flintlock,
	'flintlock-puissant-pistolet-a-silex-a-courte-portee':dataWeapon.flintlock,
	'wand-slim-magic-focus':dataWeapon.wand,
	'wand-focus-magique-mince':dataWeapon.wand,
	'shillelagh-gaelic-magic-staff':dataWeapon.shillelagh,
	'shillelagh-baton-magique-gaelique':dataWeapon.shillelagh,
	'necronomicon-powerful-summoning-grimoire':dataWeapon.necronomicon,
	'necronomicon-grimoire-puissant-d-invocation':dataWeapon.necronomicon,
	'robe-light-full-body-clothing':dataArmour.robe,
	'robe-vetements-legers-complets':dataArmour.robe,
	'corset-form-fitting-and-shaping-top':dataArmour.corset,
	'corset-forme-de-montage-et-de-faconnage':dataArmour.corset,
	'hakama-exotic-oriental-pants':dataArmour.hakama,
	'hakama-pantalon-oriental-exotique':dataArmour.hakama,
	'hauberk-heavy-chainmail-armour':dataArmour.hauberk,
	'hauberk-armure-de-cotte-de-mailles-lourde':dataArmour.hauberk,
	'cuirass-heavy-body-armour':dataArmour.cuirass,
	'cuirass-armure-de-corps-lourde':dataArmour.cuirass,
	'targe-medium-personal-shield':dataArmour.targe,
	'targe-bouclier-personnel-moyen':dataArmour.targe
};

*/







/* ================================== APP */
/* ============================================== */
/* ============================================== APP : REQUEST LISTENER */
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});