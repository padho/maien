"use strict";

var request = require('request');
var cheerio = require('cheerio');

/**
 * maien
 * A simple module to turn meta information of a website to a JavaScript object
 * 
 * 
 * Example:
 * var siteObject = maien('http://heise.de', function(data) {
 *	console.log(data);
 * });
 *
 * 
 * @param  {String}   url The page url
 * @param  {Function} cb  The callback function
 * @return {Tinyreq} The request object.
 */
function maien(url, cb) {

	var siteObj = {meta: {}};

	return request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var $ = cheerio.load(body,{ normalizeWhitespace: false, xmlMode: false, decodeEntities: true, lowerCaseAttributeNames : true });
	  	var headAttributes = ['name', 'http-equiv', 'rel', 'property', 'itemprop'];

	  	var head = $('head meta');
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
			    		val = val.replace(/[\s,]+/g, ',').split(',');
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

	  	// Invoke callback function
	  	cb(siteObj);

	  	// Request successful
	  }
	});
	// eof	
}