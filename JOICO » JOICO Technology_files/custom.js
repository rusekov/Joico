 /* CUSTOM JS DEVELOPMENT BY ONMEDIA Internet */



// MENU OPEN CLOSE
$(document).ready(function() {
    $('.topmenuclicktoopen').click(function() {
        $('.topmenuclicktoclose').show();
        $('.slideopenfromleft').animate( {
            left: 0 
        }, {
            duration: 'normal',
            easing: 'linear' 
        });
    });

    $('.topmenuclicktoclose').click(function() {
        $('.slideopenfromleft').animate( {
            left: - 250 
        }, {
            duration: 'normal',
            easing: 'linear',
            complete: function() {
                $('.topmenuclicktoclose').hide();
            }
        });
    });

    $("slideopenfromleft").on("swiperight", function(event) {
        alert('nee');
        $('.slideopenfromleft').animate( {
            left: 0 
        }, {
            duration: 'normal',
            easing: 'linear' 
        });
    });
});

$(function() {
    $( "div.slideopenfromleft" ).on( "swipeleft", swipeHandler );
    $( "div.topmenuclicktoopen" ).on( "swiperight", swipeHandlerOpen );

    function swipeHandlerOpen( event ) {
        $('.topmenuclicktoclose').show();
        $('.slideopenfromleft').animate( {
            left: 0 
        }, {
            duration: 'normal',
            easing: 'linear' 
        });
    }

    function swipeHandler( event ) {
        $('.slideopenfromleft').animate( {
            left: - 250 
        }, {
            duration: 'normal',
            easing: 'linear',
            complete: function() {
                $('.topmenuclicktoclose').hide();
            }
        });
    }
});

var length = $(document).height();

$(document).scroll(function () {

    var scroll = $(this).scrollTop();
    var height = $('.topmenuclicktoopen').height() + 'px';

    if (scroll < 30) {

        $('.slideopenfromleft').css({
            'position': 'absolute'
        });
        $('.topmenuclicktoopen').css({
            'position': 'absolute'
        });

    } else if (scroll > length) {

        $('.slideopenfromleft').css({
            'position': 'absolute'
        });
        $('.topmenuclicktoopen').css({
            'position': 'absolute'
        });

    } else {

        $('.slideopenfromleft').css({
            'position': 'fixed'
        });
        $('.topmenuclicktoopen').css({
            'position': 'fixed',
            'top': '20'
        });
    }
});


$(document).ready(function() {
	$('.menu A').click(function () {
		if($(this).parent("LI.menu-item-has-children").find('UL.sub-menu').length != 0){
		$(this).parent("LI.menu-item-has-children").find('UL.sub-menu').toggle();
		return false;
		}
	});
});
    


// END MENU OPEN CLOSE


$(document).ready(function() {
	$('select').on('click',function(e) {
	   $(this).focus();
	});
	$('input:text').on('click',function(e) {
	   $(this).focus();
	});
	$('textarea').on('click',function(e) {
	   $(this).focus();
	});
});

/* Gallery */
$(document).ready(function() {
  $('.image-link').magnificPopup({type:'image'});
  $('.newsimage-link').magnificPopup({type:'image'});
});

$(document).ready(function(){
  $('.carroussel').bxSlider({
    slideWidth: 370,
    minSlides: 2,
    maxSlides: 2,
    slideMargin: 20,
    nextText: 'Next',
	pager:false
  });
});

$(document).ready(function(){
  $('.educatorscarroussel').bxSlider({
    minSlides: 2,
    maxSlides: 2,
    slideWidth: 400,
    slideMargin: 20,
    nextText: 'Next',
	pager:false
  });
});

$(document).ready(function(){
  $('.educarroussel').bxSlider({
    minSlides: 1,
    maxSlides: 1,
    nextText: 'Next',
	pager:false
  });
});


/* Contact form */
function submitForm() {
   if (ContactForm.name.value==""){
      alert("Field name is required.");
      return false;
   }
   else if (ContactForm.email.value==""){
      alert("Field email is required.");
      return false;
   }
	
	$.ajax({type:'POST', url:'http://www.joicoeurope.com/professional/wp-content/themes/joico/mailhandler-contact.php', data:$('#ContactForm').serialize(), success: function(response) {
		$('#ContactForm').find('.form_result').html(response);
	}});
	
	return false;
}

// REGISTRATION
function submitFormReg() {
	
	if ($('#choosetraining').val() == "") { 
	  alert('Please select a training.'); 
	  return false; 	
	} else if ($('#trainingdate').val() == "") { 
	  alert('Please select a date.'); 
	  return false; 
	} else if (registerforatrainingform.registrationfullname.value==""){
      alert("Field name is required.");
      return false;
    } else if (registerforatrainingform.registrationphonenumber.value=="") {
      alert("Field Your phonenumber is required.");
      return false;
    } else if (registerforatrainingform.registrationmail.value=="") {
      alert("Field Your e-mail is required.");
      return false;
    } else if (registerforatrainingform.registrationcountry.value=="") {
      alert("Field Country where you live is required.");
      return false;
   }
   else if(!$('.gender').is(':checked'))
   {
      alert("Input gender is required.");
      return false;
   }
   else if(!$('.room').is(':checked'))
   {
      alert("Input roomtype is required.");
      return false;
   }
   else if(!$('.smoke').is(':checked'))
   {
      alert("Input smoking is required.");
      return false;
   }
	
	$.ajax({type:'POST', url:'http://www.joicoeurope.com/professional/wp-content/themes/joico/mailhandler-education.php', data:$('#registerforatrainingform').serialize(), success: function(response) {
		$('#registerforatrainingform').find('.form_result').html(response);
	}});
	
	return false;
}
// END REGISTRATION



// Swiper

	var Browser = {
        IsIe: function () {
            return navigator.appVersion.indexOf("MSIE") != -1;
        },
        Navigator: navigator.appVersion,
        Version: function() {
            var version = 999; // we assume a sane browser
            if (navigator.appVersion.indexOf("MSIE") != -1)
                version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            return version;
        }
    };

	var mySwiper = new Swiper('.swiper-container',{
	    loop:false,
	    grabCursor: false,
	    mousewheelControl: true,
	    paginationClickable: true,
	    keyboardControl:true,
	    slidesPerView:1,
	    watchActiveIndex:true,
	    onInit: function () {
	      var active = mySwiper.activeIndex;
	      var last = mySwiper.slides.length-1; 
	      //alert(last);
		    if(active == 0){ $('.arrow-left').hide(); } else { $('.arrow-left').show(); }
		    if(last != active){ $('.arrow-right').show(); } else { $('.arrow-right').hide(); }
	    },
	    onSlideChangeEnd: function () {
	 	  
		    $('.sheet1').animate({ marginTop: '0' }, 0);
	      	if (Browser.IsIe && Browser.Version() <= 9) {
	      		// NO IE9 SUPPORT
	      	} else {
		      	window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	      	}
	      	ga('send', 'pageview', {
			 'page': location.pathname + location.search  + location.hash
			});
	       if(mySwiper.activeIndex==0){
	       	$('.arrow-left').hide()
	       } else if(mySwiper.activeIndex==mySwiper.slides.length-1){
	       	$('.arrow-right').hide()
	       } else {
	       	 $('.arrow-left').show()
		     $('.arrow-right').show()
	       }
	    }
	});	
	
	
  var swiperNested1 = new Swiper('.swiper-nested-1',{
    mode: 'vertical',
    slidesPerView: 1
  });
  var swiperNested2 = new Swiper('.swiper-nested-2',{
    mode: 'vertical',
    slidesPerView: 1
  });
  var swiperNested3 = new Swiper('.swiper-nested-3',{
    mode: 'vertical',
    slidesPerView: 1
  });
  var swiperNested4 = new Swiper('.swiper-nested-4',{
    mode: 'vertical',
    slidesPerView: 1
  });
  var swiperNested5 = new Swiper('.swiper-nested-5',{
    mode: 'vertical',
    slidesPerView: 1
  });
	
	
		$('.newsreadmore1').on('click', function(e){
			e.preventDefault();
			swiperNested1.swipeNext();
		});
		
		$('.newsreadmoreback1').on('click', function(e){
			e.preventDefault();
			swiperNested1.swipePrev();
		});
		
		$('.newsgallery1').on('click', function(e){
			e.preventDefault();
			swiperNested1.swipeNext();
		});
		
		$('.swatchone').on('click', function(e){
			e.preventDefault()
			swiperNested1.swipeNext()
		});
		
		$('.swatchoneup').on('click', function(e){
			e.preventDefault()
			swiperNested1.swipeTo( '0',300,false );
		});
		
			$('.newsreadmore2').on('click', function(e){
				e.preventDefault()
				swiperNested2.swipeNext()
			});
			
			$('.newsreadmoreback2').on('click', function(e){
				e.preventDefault()
				swiperNested2.swipePrev()
			});
			
			$('.newsgallery2').on('click', function(e){
				e.preventDefault()
				swiperNested2.swipeNext()
			});
			
			$('.swatchtwo').on('click', function(e){
				e.preventDefault()
				swiperNested2.swipeNext()
			});
			
			$('.swatchtwoeup').on('click', function(e){
				e.preventDefault()
				swiperNested2.swipePrev()
			});
		
		
		$('.newsreadmore3').on('click', function(e){
			e.preventDefault()
			swiperNested3.swipeNext()
		});
		
		$('.newsreadmoreback3').on('click', function(e){
			e.preventDefault()
			swiperNested3.swipePrev()
		});
		
		$('.newsgallery3').on('click', function(e){
			e.preventDefault()
			swiperNested3.swipeNext()
		});
		
		$('.swatchtree').on('click', function(e){
			e.preventDefault()
			swiperNested3.swipeNext()
		});
		
		$('.swatchtreeup').on('click', function(e){
			e.preventDefault()
			swiperNested3.swipePrev()
		});
		
			$('.newsreadmore4').on('click', function(e){
				e.preventDefault()
				swiperNested4.swipeNext()
			});
			
			$('.newsreadmoreback4').on('click', function(e){
				e.preventDefault()
				swiperNested4.swipePrev()
			});
			
			$('.newsgallery4').on('click', function(e){
				e.preventDefault()
				swiperNested4.swipeNext()
			});
			
			$('.swatchfour').on('click', function(e){
				e.preventDefault()
				swiperNested4.swipeNext()
			});
			
			$('.swatchfourrup').on('click', function(e){
				e.preventDefault()
				swiperNested4.swipePrev()
			});
		
		$('.newsreadmore5').on('click', function(e){
			e.preventDefault()
			swiperNested5.swipeNext()
		});
		
		$('.newsreadmoreback5').on('click', function(e){
			e.preventDefault()
			swiperNested5.swipePrev()
		});
		
		$('.newsgallery5').on('click', function(e){
			e.preventDefault()
			swiperNested5.swipeNext()
		});
		
		$('.swatchfive').on('click', function(e){
			e.preventDefault()
			swiperNested5.swipeNext()
		});
		
		$('.swatchfiverup').on('click', function(e){
			e.preventDefault()
			swiperNested5.swipePrev()
		});

		
		$('.newsmorenews').on('click', function(e){
			e.preventDefault()
			mySwiper.swipeNext()
		});
		
		$('.joicopeople').on('click', function(e){
			e.preventDefault()
			mySwiper.swipeTo( 4,300,false );
		});
		
	$('.arrow-left').on('click', function(e){
		e.preventDefault();
		mySwiper.swipePrev();
	});
	
	$('.arrow-right').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeNext();
	});
	
	$('.productdetaillink').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeNext();
	});
	
	$('.gotonewsitem').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeNext();
	});
	
	$('.nextlink').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeNext();
	});
	
	$('.gotoeducators').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeNext();
	});
	
	$('.gotodesignteam').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '6',300,false );
	});
	
	$('.subscribelink').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( 0,300,false );
		if($(this).attr('id')=='optjcutandcolor'){
			$('#choosetraining').val('jcutandcolor');
		} else if($(this).attr('id')=='optsalonideas'){
			$('#choosetraining').val('salonideas');
		} else if($(this).attr('id')=='opttrendcollection'){
			$('#choosetraining').val('trendcollection');
		}
		function showsubscribeform() {
			swiperNested1.swipeNext();
 		}
 		setTimeout(showsubscribeform, 600)
	});
	
	$('.productlineitem.dailycare IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '1',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.colorendure IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '6',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.bodyluxe IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '12',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.moisturerecovery IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '18',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.smoothcure IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '23',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.curl IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '28',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('IMG.kpakfirt').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '36',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('IMG.kpaksecond').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '42',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('IMG.kpakthird').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '47',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.kpakcolor IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '52',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.stylenfinishfirst IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '57',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.stylenfinishsecond IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '64',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.stylenfinishthird IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '71',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	$('.productlineitem.stylenfinishfourth IMG').on('click', function(e){
		e.preventDefault();
		mySwiper.swipeTo( '78',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	
	
	$('.kpakproditemlink').on('click', function(e){
		e.preventDefault();
		var myClass = $(this).attr("id");
		mySwiper.swipeTo( $('.slide'+myClass).index(),300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	})


  

  
// Fullscreen
$(window).resize(function(){
    //var height = ($(window).height() - $('.topmobilemenu').height());
    var height = $(window).height();
    var menu = $('.topmobilemenu').height();
    var width  = $(window).width();    
	    if(width < 860){
	    	var newheight = (height-menu);
	    } else {
		    var newheight = (height);
	    }
    $('.swiper-container, .swiper-slide').height(newheight);
    $('.swiper-container, .swiper-slide').width(width);
    $('.sheet1').height(newheight);
	$('.sheet2').height(newheight);    
	$('.technologyrightcolumn').height(newheight);
    $('.joicocolorrightcontentbox, .joicocolorleftcontentbox, .joicoplanetrightcontentbox').height(newheight);
    $('.leftnewsimage').height(newheight);
    $('.joicopeopleleft').height(newheight);
    $('.profhomeleftimagebox').height(newheight);
    
    var leftHeight = $('.commentbox45.one').height();
    $('.commentbox45.two').css({'height':leftHeight});
    
    var leftHeight2 = $('.commentbox45.tree').height();
    $('.commentbox45.four').css({'height':leftHeight2});
    
    var newrightimgheight = $('.swiper-slide').height();
    $('.rightcontentimagefullheight').css({'height':newrightimgheight});

    mySwiper.reInit();
})
	$(window).resize();

$( document ).ready(function() {
	$(window).resize();
});



$( document ).ready(function() {
	$('.childproductlink').on('click', function(e){
		e.preventDefault()
		var ahref = ($(this).attr('href')-1);
		mySwiper.swipeTo( ahref,300,false );
	});
	
	$('.colorconsumerlink1').on('click', function(e){
		e.preventDefault()
		mySwiper.swipeTo( '1',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	$('.colorconsumerlink2').on('click', function(e){
		e.preventDefault()
		mySwiper.swipeTo( '2',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
	$('.colorconsumerlink3').on('click', function(e){
		e.preventDefault()
		mySwiper.swipeTo( '3',300,false );
		window.history.replaceState("stateObj", "Slide", "http://"+window.location.hostname + window.location.pathname+"?slide="+(mySwiper.activeIndex+1));
	});
});



$( document ).ready(function() {
	$("div.productexcerpt ul>li").wrapInner("<span></span>");
});

$( document ).ready(function() {
	$("div.productgroupcontent ul>li").wrapInner("<span></span>");
});



$( document ).ready(function() {
	$('.scrolltobottomsheet').on('click', function(e){
   	 e.preventDefault()
   	 var height = $(window).height();
   	 $('.sheet1').animate({ marginTop: '-'+height }, 300);
   	 })

	$('.scrolltotopsheet').on('click', function(e){
	    e.preventDefault()
	    var height = $(window).height();
	    $('.sheet1').animate({ marginTop: '0' }, 300);
	})
})


// PRELOADER
$( document ).ready(function() {
setTimeout( function() {
    $("#cj-preloader").hide();
  }, 3800);
})
// END PRELOADER


// GOOGLE MAP
var markersarray,infowindowcontentarray,infoWindow,map,marker,i;
var gmarkers = [[]];
function initializeMap()
{
var bounds = new google.maps.LatLngBounds();
var centerpoint = new google.maps.LatLng(52.080336, 5.556741);
infoWindow = new google.maps.InfoWindow(), marker, i;
var mapProp = {
	center:centerpoint,
	zoom:3,
	mapTypeId:google.maps.MapTypeId.ROADMAP
	};
map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	if(markersarray==undefined){
	  markersarray=[["marker","51.508742,-0.120850"]];
	}
	for( i = 0; i < markersarray.length; i++ ) {
        var position = new google.maps.LatLng(markersarray[i][1], markersarray[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,           
            title: markersarray[i][0]
        });
        gmarkers.push(marker);                  
        // Allow each marker to have an info window    
        bounds.extend(marker.getPosition());
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
            	//map.setZoom(15);
				//map.setCenter(marker.getPosition());
				
                infoWindow.setContent(infowindowcontentarray[i][0]);
				infoWindow.open(map, marker);
				infoWindow.open(map, marker);
            }                
        })(marker, i));      
        google.maps.event.addListener(infoWindow,'closeclick',function(){
        //map.setZoom(7);     
	    //map.setCenter(centerpoint);
	    infoWindow.close();                 
        });          
    }
}

//google.maps.event.addDomListener(window, 'ready', initialize);
$(document).ready(function(){
	if ($("#googleMap").length > 0){
		initializeMap();
	}
});

// Google maps functions
$(document).ready(function(){
	$('#distributorfinder').change(function(){
		var valueselect = $('#country').val();
		$.ajax({
			type:'POST', 
			url:'http://www.joicoeurope.com/professional/wp-content/themes/joico/googlemapsfunctions.php', 
			data: {country:valueselect}, 
			success: function(response) {
				$('#distributors').html(response);
				initializeMap();
			}
		});
	});
	$(document).on("click",".findonmap",function(){
		var clickedid = $(this).attr("id").substring(10);
		google.maps.event.trigger(gmarkers[clickedid], 'click');  
	}); 
});
$(window).resize(function(){
	$('#googleMap').css('height',($(".joicocolorleftcontentbox").height()));
	//$('#googleMap').css('width',($(".joicocolorleftcontentbox").width()));
	//google.maps.event.trigger(map, 'resize');
})
// END GOOGLE MAPS


// Scale fonts
$('.videolineone').flowtype({ fontRatio : 9.6, minFont : 42, maxFont : 120 });
$('.videolinetwo').flowtype({ fontRatio : 9.6, minFont : 42, maxFont : 120 });


$('.positionstructuretext P').flowtype({ fontRatio : 23, minFont : 12, maxFont : 23 });
$('.positionstructuretext H1').flowtype({ fontRatio : 15, minFont : 20, maxFont : 52 });


$('.joicocolorcontentbox .lineone').flowtype({ fontRatio : 9.6, minFont : 28, maxFont : 120  });
$('.joicocolorcontentbox .linetwo').flowtype({ fontRatio : 9.6, minFont : 28, maxFont : 120 });
$('.joicocolorcontentbox .linetree').flowtype({ fontRatio : 24, minFont : 10, maxFont : 68 });


$('.joicoplanetcontentbox .lineone').flowtype({ fontRatio : 8.5 });
$('.joicoplanetcontentbox .linetwo').flowtype({ fontRatio : 7 });
$('.joicoplanetcontentbox .linetree').flowtype({ fontRatio : 6 });


$('.joicocolorcontentbox.technology .lineone').flowtype({ fontRatio : 8, minFont : 48, maxFont : 120 });
$('.joicocolorcontentbox.technology .linetwo').flowtype({ fontRatio : 8, minFont : 48, maxFont : 120 });
$('.joicocolorcontentbox.technology .linetree').flowtype({ fontRatio : 24, minFont : 16, maxFont : 80 });


