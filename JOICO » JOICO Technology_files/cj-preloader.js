/* --------------------------------------------- */
/* Author: http://codecanyon.net/user/CodingJack */
/* --------------------------------------------- */

/* JSHINT */
/* global jQuery, console, alert */
/* jshint smarttabs:true */

(function($) {
	
	var defaults = {
		
		// set to false if not using preloader in fullscreen mode
		fullscreen: true,
		
		// the attribute to read for the image's url
		dataAttribute: 'data-cj-preload',
		
		// the frequency the preloader updates during the loading process
		updateInterval: 250,
		
		// force the browser to load an uncached image (for development purposes)
		disableCache: false,
		
		// when set to true, script will trace known errors in browser's debug panel
		debug: false
		
	},
	
	touch,
	html;
	
	function cjPreloader(settings) {
		
		// settings can be passed when the preloader is instantiated or in the preloader's "start" method (useful for when the instance is used more than once)
		if(settings) this.settings = $.extend($.extend({}, defaults), settings);
		
		this.start();
		
	}
	
	cjPreloader.prototype = {
		
		start: function(sets) {
			
			// reset preloader is already in use
			this.reset();
			
			// account for custom settings
			var settings = this.settings || {};
			if(sets) $.extend(settings, sets);
			
			var list = settings.list,
			callback = settings.onUpdate;
			
			// if developer has activated debugging option
			if(settings.debug) {
				
				defaults.debug = true;
				if(!('console' in window)) {window.console = {log: function(st) {alert(st);}};}
				
			}
			
			if(touch && settings.fullscreen) html.addClass('cj-fullscreen');
			if(settings.disableCache) defaults.disableCache = true;
			
			// bounce if asset list or "step/update" callback does not exist
			if(!list || !list.length || !callback) {
				
				if(defaults.debug) {
				
					if(!callback) {
					
						console.log('cjPreloader: an onUpdate callback is missing');
						
					}
					else {
					
						console.log('cjPreloader: the load list is missing');
						
					}
					
				}
				
				return;
				
			}
			
			var i, 
			j = 0,
			k = 0,
			assetUrl,
			assetTotal, 
			breakPoint, 
			assets = [], 
			$this = this,
			breakPoints = [],
			images = /jpg|png|gif/,
			dataAttr = this.dataAttr = settings.dataAttribute;
			
			// if load list is a jQuery Object
			if(list instanceof $) {
				
				list.each(itemEach, [$this, assets]);
				
			}
			// if load list is Array
			else {
			
				var len = list.length, itm, leg, st;
				
				for(i = 0; i < len; i++) {
					
					itm = list[i];
					if(!itm) continue;
					
					// if Array item is a simple url
					if(typeof itm === 'string') {
						
						st = itm.split('.');
						leg = st.length;
						
						if(leg > 1) {
							
							// if the Array item type is an image
							if(st[leg - 1].match(images)) {
								
								itemEach($this, assets, $('<img ' + dataAttr + '="' + itm + '" />'));
								
							}
							// if Array item type is unknown (js, css, iframe, xml, etc.)
							else {
								
								assets[assets.length] = itm;
								
							}

						}
						
					}
					// if Array item is a jQuery Object
					else if(itm instanceof $) {
						
						itm.each(itemEach, [$this, assets]);
						
					}
					// if Array item is a native Object
					else if(typeof itm === 'object' && 'url' in itm) {
						
						assetUrl = itm.url;
						
						if(typeof assetUrl === 'string') {
						
							assets[assets.length] = itm;
							
						}
						else if(assetUrl instanceof $) {
						
							assetUrl.each(itemEach, [$this, assets, false, itm.onLoad]);
							
						}
						else if(defaults.debug) {
						
							console.log('cjPreloader: ' + itm + ' is not a pre-loadable asset');
							
						}
						
					}
					// item could not be recognized
					else if(defaults.debug) {
						
						console.log('cjPreloader: ' + itm + ' is not a pre-loadable asset');
						
					}
					
				}
				
			}
			
			assetTotal = assets.length;
			
			if(!assetTotal) {
				
				if(defaults.debug) console.log('cjPreloader - the list contained no pre-loadable assets');	
				return;
			
			}
			
			breakPoint = (100 / assetTotal) | 0;
			
			for(i = 0; i < 100; i++) {
			
				if(j < breakPoint) {
				
					j++;
					
				}
				else {
					
					breakPoints[k] = i - k;
					j = 0;
					k++;
						
				}
				
			}
			
			breakPoints[breakPoints.length] = 100;
			
			this.assets = assets;
			this.callback = callback;
			this.settings = settings;
			this.breakPoints = breakPoints;
			this.breakPoint = breakPoints[0];
			this.assetTotal = assetTotal - 1;
			this.perc = this.assetsLoaded = 0;
			this.loaded = settings.onLoadEach;
			this.complete = settings.onComplete;
			
			this.ticker = setInterval(function() {
				
				if($this.perc < $this.breakPoint) callback(++$this.perc);
				
			}, settings.updateInterval);
			
			this.cancel = false;
			loadAsset(assets[0], dataAttr, this);
			
		},
		
		// fires each time an asset has loaded
		assetLoaded: function() {
			
			if(this.cancel) return;
			var loaded = this.assetsLoaded;
			
			// if there's another asset to load
			if(loaded < this.assetTotal) {
			
				var perc = this.perc,
				breakPoints = this.breakPoints,
				breakPoint = breakPoints[loaded],
				rand = ((Math.random() * 10) + (breakPoint - 5)) | 0;
				
				loaded = this.assetsLoaded = loaded + 1;
				this.breakPoint = breakPoints[loaded];
				
				this.perc = perc < rand ? rand : breakPoint;
				loadAsset(this.assets[loaded], this.dataAttr, this);
				
			}
			// if all assets have finished loading
			else {
				
				clearInterval(this.ticker);
				this.callback(100);
				
				if(this.complete) this.complete();
				if(touch && this.settings.fullscreen) setTimeout(removeFullscreen, 1200);
				
			}
			
		},
		
		// cancel preloader
		reset: function() {
		
			clearInterval(this.ticker);
			this.cancel = true;
			
			var assets = this.assets;
			
			if(assets) {
				
				var asset;
				while(assets.length) {
					
					asset = assets[0];
					
					if(asset instanceof $) {
						
						asset.removeData('cjInstance cjCallback').off('.cj-preloader');
						
					}
					
					assets.shift();
					
				}
				
			}
			
		},
		
		// kill preloader instance
		destroy: function() {
			
			this.reset();
			
			for(var prop in this) {
			
				if(this.hasOwnProperty(prop)) {
				
					delete this[prop];
					
				}
				
			}
			
		}
		
	};
	
	// function used to cycle through jQuery Objects
	function itemEach($this, assets, itm, onload) {
		
		if(!itm) itm = $(this);
		
		if(itm.is('img') || itm.is('iframe')) {
			
			assets[assets.length] = itm.data(
			
				'cjInstance', $this
				
			).on('load.cj-preloader', assetLoaded).on(
			
				'error.cj-preloader', !defaults.debug ? assetLoaded : loadError
				
			);
			
			if(onload) itm.data('cjCallback', onload);
			
		}
		else if(defaults.debug) {
		
			console.log('cjPreloader: jQuery Objects used in your list are reserved for images and iframes only');
			
		}
		
	}
	
	// fires when an image or iframe has loaded
	function assetLoaded() {
		
		var $this = $(this).off('.cj-preloader'),
		data = $this.data(),
		
		callback = data.cjCallback,
		instance = data.cjInstance,
		loaded = instance.loaded;
		
		if(callback) callback.call(this);
		if(loaded) loaded.call(this);
		
		instance.assetLoaded();
		$this.removeData('cjInstance cjCallback');
		
	}
	
	// loading error will trace an error if debug option is active
	function loadError() { 
	
		if(defaults.debug) console.log('cjPreloader: ' + this + ' could not be loaded');
	
	}
	
	// gets called every time an asset is to be loaded
	function loadAsset(asset, data, instance) {
	
		var src, passed;
		
		// if asset is a jQuery Object
		if(asset instanceof $) {
			
			src = asset.attr(data);
			
			if(src) {
				
				if(defaults.disableCache) src += '?cj=' + new Date().getTime();
				
				passed = true;
				asset.attr('src', src);
				
			}
		
		}
		else {
			
			var url, ext, len, callback;
			
			// if asset is a simple String
			if(typeof asset === 'string') {
				
				url = asset;
				ext = asset.split('.');
				
			}
			// if asset has an individual callback applied
			else {
				
				url = asset.url;
				ext = url.split('.');
				callback = asset.onLoad;
				
			}
			
			len = ext.length;
				
			if(len > 1) {
				
				ext = ext[len - 1];
				
				// if asset is a script
				if(ext === 'js') {
					
					// scripts get added to the page automatically
					$.getScript(url).always(function() {
					
						if(callback) callback(url);
						if(instance.loaded) instance.loaded(url);
						
						instance.assetLoaded(url);
						
					}).error(loadError);
					
					passed = true;
					
				}
				else {
					
					// if asset is not an image (i.e. css, html, xml, php)
					if(!ext.match(/jpg|png|gif/)) {
					
						$.get(url, null, null, {dataType: 'text'}).always(function(data) {
							
							if(typeof data === 'object' && 'responseText' in data) data = data.responseText;
							
							// CSS files get added to the page automatically
							if(ext === 'css') $('<style type="text/css" />').html(data).appendTo('head');
							
							if(callback) callback(data);
							if(instance.loaded) instance.loaded(url);
							
							instance.assetLoaded();
							
						}).error(loadError);
						
					}
					// if asset is an image
					else {
					
						var info = {cjInstance: instance}, img;
						if(callback) info.cjCallback = callback;
						
						img = $('<img />').data(info).on('load.cj-preloader', assetLoaded).on(
						
							'error.cj-preloader', !defaults.debug ? assetLoaded : loadError
							
						);
						
						if(defaults.disableCache) url += '?cj=' + new Date().getTime();
						img.attr('src', url);
						
					}
					
					passed = true;
					
				}
				
			}
			
		}
		
		// if we couldn't load the asset, trace message if debug option is active
		if(!passed) {
			
			if(defaults.debug) console.log('cjPreloader: ' + asset + ' - is not a loadable asset');
			instance.assetLoaded();
			
		}
		
	}
	
	function removeFullscreen() {
	
		html.removeClass('cj-fullscreen');
		
	}
	
	$.cjPreloader = function(settings) {
		
		if(!html) {
		
			touch = 'ontouchend' in document;
			html = $('html');
			
		}
		
		return new cjPreloader(settings);
		
	};
	
	
})(jQuery);