/* --------------------------------------------- */
/* Author: http://codecanyon.net/user/CodingJack */
/* --------------------------------------------- */

(function($) {
				
	var preloader, progress;
	
	// fires when the document has loaded
	$(document).ready(function() {
		
		if(typeof WebFont !== 'undefined') {
			
			// preload the Google Font before starting, see help document for more information
			WebFont.load({google: {families: ['Oswald::latin']}, active: init});
			
		}
		else {
		
			init();
			
		}
		
	});
	
	// fires when Google Font has loaded
	function init() {
	
		preloader = $('#cj-preloader');
		if(!preloader.length) return;
		
		progress = preloader.children('span');
		if(!progress.length) return;
		
		// kick off the preloader
		$.cjPreloader({
			
			// grab all images with a "data-cj-preload" attribute
			list: $('*[data-cj-preload]'), 
			
			// function to fire everytime the percentage updates
			onUpdate: updatePreloader
			
		});
		
	}
	
	// perc = the current percentage, 0-100
	function updatePreloader(perc) {
		
		// updates percentage text		
		progress.text(perc + '%');
		
		// if percentage equals 100, preloading has finished
		if(perc === 100) {
			
			// visual pause to show that preloading has finished
			setTimeout(function() {
				
				// hide the preloader
				preloader.addClass('cj-hide-preloader');
				
				// cleanup
				preloader = progress = null;
				
			}, 500);
			
		}
	}
	
})(jQuery);