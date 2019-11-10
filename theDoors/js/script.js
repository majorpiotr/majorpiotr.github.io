// 
// 
//
$( document ).ready(function() {
	// it check if element is on screen
	function isInView(elem){
		// works only with elements with ID
   		if($(elem).attr("id")){	
   			// check if element is on screen
   			if( $(elem).offset().top - $(window).scrollTop() < $(elem).height() )
   			{
				// if it is it returns its ID, to $(window).scroll()
				return $(elem).attr("id");
   			}
   			else
   			{
   				// if element is not on screen it stops function and returns FALSE
   				return false;
   			}
   		}
   		else
   		{
   			// if element has no id (likely null or undefinded) it returns FALSE and stops function
   		
   			return false;
   		}
   		
	}
	// Scroll event - during scrolling elements will apear on screen
	$(window).scroll(function(){
		// It gets ID of element by running isInView function 
   		id_card = isInView($('.show_animation'));
   		if ( id_card != false )
   		{
   			// if element is on screen and has own ID it starts animations (by adding css property to this)
   			// Animation mentioned above is in style.css file in css directory 
   			//  apear_from_nowhere in /css/style.css
    		$("#"+id_card).css("animation-name", "apear_from_nowhere" );
			$("#"+id_card).css("animation-duration", "3s");
			$("#"+id_card).css("animation-timing-function", "linear");
			$("#"+id_card).css("opacity", "1");
			// it removes class "show_animation" in order to avoid errors, and machining next element.
			// without this function will machining the same element over and over .
			$("#"+id_card).removeClass("show_animation");			
   		}
   		
	})
	// functions for photo gallery
	// it hides unused photos 
	function siblings_invissible(obj_id)
	{
		$(obj_id).parents().siblings().children(".set_background").addClass("opacity-0");
		$(obj_id).parents().siblings().children(".set_background").addClass("inactive");
	}
	//  it make photos vissible therefore user can hover another photo
	function siblings_vissible(obj_id)
	{
		$(obj_id).parents().siblings().children(".set_background").removeClass("opacity-0");
		$(obj_id).parents().siblings().children(".set_background").removeClass("inactive");
	}
	// it sets chosen photo as background
	function set_bg(obj_id){
		link_img =  "url('";
		link_img += $(obj_id).attr("src");
		link_img += "')";
		parent_bg = $(obj_id).parents("section").css("background-image");
		$(obj_id).parents("section").css("background-image" ,link_img);

	}
	// main function for photo's gallery
	// it works when user choses photo by moving mouse coursor (or finger on toutch screens) on photo.
	$(".set_background").mouseenter(function()
		{
			set_bg(this);
			siblings_invissible(this);
		});
	// 
	$(".set_background").mouseleave(function()
		{
			siblings_vissible(this);
		});
	// It makes buttons on navbar on the top on screen yellow (bg-warning), therefore buttons become more vissible.
	$(".nav-item").hover(
		function(){
			//	mouse enter - buttons are yellow
			$(this).addClass("bg-warning");
		},
		function(){
			// 	mouse leave- button are white
			$(this).removeClass("bg-warning");
		});


// test
	 
	// alert($('.carousel').carousel());
// 

	// 	About fuction $(".navbar").hover() showed  bellow :
	//	This code hides navbar competely in order to make easier to watch photos, and read webpage. In one word site looks more beautiful.
	// 	In order to make navbar vissably again you have to move mouse on top of page (hover navbar).
 	// 	However, it can be confusing, since user will be not ably to find navbar, what effects poor satisfaction from user interface.
	// 	It applies esspecially to old people and users without excellent computer literancy.
	// 	I daresay that at end of the day better solution is to just leave navbar on top on screen (fixed) and make it more transparent (opacity:0.5).
	// 	This allows us to read text , watch photos and use 100% of screen's height and makes interface more userfriendly
	//	Best regards	
	// 	Peter Major

	// $(".navbar").hover(
	// 	function()
	// 	{
	// 		$(this).addClass("opacity-100");
	// 		$(this).removeClass("opacity-0");
	// 				// mouse in
	// 	},
	// 	function()
	// 	{
	// 				// mouse out
	// 		$(this).addClass("opacity-0");
	// 		$(this).removeClass("opacity-100");
			
	// 	});

});

// End of program