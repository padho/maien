# maien

A simple module to turn the meta information of a website into a JavaScript object. The properties of the resulting object refer directly to the values of the following attributes:

``` js
['name', 'http-equiv', 'rel', 'property', 'itemprop']
```

Here is a nice list of what you can expect as meta information in a website: https://github.com/joshbuchea/HEAD

#### Example
``` js
var siteObject = maien('https://www.sitepoint.com', function(data) {
 console.log(data);
});

// This will result in:
{ meta:
   { viewport: 'width=device-width, initial-scale=1.0',
     description: 'Learn Web Design & Development with SitePoint tutorials, courses and books - HTML5, CSS3, JavaScript, PHP, mobile app development, Responsive Web Design',
     robots: 'noodp',
     twitter:card: 'summary',
     twitter:description: 'Learn Web Design & Development with SitePoint tutorials, courses and books - HTML5, CSS3, JavaScript, PHP, mobile app development, Responsive Web Design',
     twitter:title: 'SitePoint – Learn HTML, CSS, JavaScript, PHP, Ruby & Responsive Design',
     twitter:site: '@sitepointdotcom',
     generator: 'WordPress 4.4.2',
     wp-parsely_version: '1.8' } }

```
