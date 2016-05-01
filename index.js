var request = require('request');
var cheerio = require('cheerio');


request('http://www.gamestar.de/spiele/team-fortress-2/news/team_fortress_2,43542,3271824.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var $ = cheerio.load(body,{ normalizeWhitespace: false, xmlMode: false, decodeEntities: true, lowerCaseAttributeNames : true });
  	var headAttributes = ['name', 'http-equiv', 'rel', 'property', 'itemprop'];



  	var head = $('head meta');
  	var siteObj = {meta: {}, img: {}};

  	var index, len, attr, val;
  	$('head meta').each(function(index, elem) {

  		for (index = 0, len = headAttributes.length; index < len; ++index) {
		    attr = $(this).attr(headAttributes[index]);

		    if(typeof attr === 'undefined') {
		    	return true;
		    }

		    attr = String.prototype.toLowerCase.apply(attr);

		    switch(headAttributes[index]) {
		    	case 'rel':
		    		val = $(this).attr('href');
		    		break;
		    	case 'name':
		    		val = $(this).attr('content');
		    		break;
		    	case 'http-equiv':
		    		val = $(this).attr('content');
		    		break;
		    	case 'property':
		    		val = $(this).attr('content');
		    		break;
		    	case 'itemprop':
		    		val = $(this).attr('property');
		    		break;
		    	default:
		    		val = $(this).attr('content');
		    		break;
		    }

		    switch(attr) {
		    	case 'keywords':
		    		val = val.split(',');
		    		break;
		    	case 'date':
		    		val = new Date(val);
		    		if(val === 'Invalid Date') {
		    			val = val;
		    		}
		    		break;
		    	default:
		    		break;
		    }



		    siteObj['meta'][attr] = val;

		}

  	});


  	$('img').each(function(index, elem) {
  		// siteObj['img'][index] = $(this).attr('src');
  	});


  	var comment = $('#comment .commentText').text();

  	console.log(JSON.stringify(siteObj));
  	// console.log(comment);

  	//console.log(head);

  }
})