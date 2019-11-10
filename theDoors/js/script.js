//  Script for the doors web-page 
//  
//
$( document ).ready(function() {

	// it check if element is on screen
	function isInView(elem){
		// works only with elements with ID
   		if($(elem).attr("id")){	
   			// check if element is on screen
   			if( $(elem).offset().top - $(window).scrollTop() <= $(elem).outerHeight()*1.2 )
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
   			//alert($(elem).attr("id"));
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
   			//alert(id_card);
    		$("#"+id_card).css("animation-name", "wake_up" );
			$("#"+id_card).css("animation-duration", "3s");
			$("#"+id_card).css("animation-timing-function", "ease-in");
			$("#"+id_card).addClass("opacity-100");	
			// it removes class "show_animation" in order to avoid errors, and machining next element.
			// without this function will machining the same element over and over .
			$("#"+id_card).removeClass("show_animation");		
			$("#"+id_card).addClass("show_done");		
					
   		}	
	});
	// functions for photo gallery
	// it hides unused photos 
	function siblings_invissible(obj_id)
	{
		$(obj_id).parents().siblings().children(".set_background").addClass("opacity-0");
		$(obj_id).parents().siblings().children(".set_background").addClass("inactive");
	};
	//  it make photos vissible therefore user can hover another photo
	function siblings_vissible(obj_id)
	{
		$(obj_id).parents().siblings().children(".set_background").removeClass("opacity-0");
		$(obj_id).parents().siblings().children(".set_background").removeClass("inactive");
	};
	// it sets chosen photo as background
	function set_bg(obj_id){
		link_img =  "url('";
		link_img += $(obj_id).attr("src");
		link_img += "')";
		parent_bg = $(obj_id).parents("section").css("background-image");
		$(obj_id).parents("section").css("background-image" ,link_img);
	};
	// main function for photo's gallery
	// it works when user choses photo by moving mouse coursor (or finger on toutch screens) on photo.
	$(".set_background").mouseenter(function()
		{
			set_bg(this);
			siblings_invissible(this);
		});
	// make photo vissible again
  $(".set_background").mouseleave(function()
		{
			siblings_vissible(this);
		});
	$(".set_background").click(function() 
		{
		$(this).toggleClass("opacity-0");
		}
	);

  //  Set of 3d animations that affect siblings of hovered element
  	function un_rotated(elem)
  	{
  		if ($(elem).hasClass("rotated-10"))
  		{  		
  			$(elem).removeClass("rotated-10",5000, "linear");
		  }
  	}
  	function make_small(elem)
  	{	
			$(elem).addClass("smallable",5000, "linear");	
  	}
  	function make_small_most_left(elem)
  	{
  			$(elem).addClass("smallable_3d_most_left",5000, "linear");
  	}
  	function make_small_just_left(elem)
  	{
  			$(elem).addClass("smallable_3d_left",5000, "linear");
  	}
  	function make_small_just_right(elem)
  	{
			$(elem).addClass("smallable_3d_right",5000, "linear");
  	}
  	function make_small_most_right(elem)
  	{
			$(elem).addClass("smallable_3d_most_right",5000, "linear");
  	}

  	function un_make_small(elem)
  	{
  		if ($(elem).hasClass("rotated-10"))
  		{  		
  		$(elem).addClass("rotated-10",5000, "linear");	
  		}
  		$(elem).removeClass("smallable",6000, "linear");
  		
  	}
  	function un_make_small_most_left(elem)
  	{
  			$(elem).removeClass("smallable_3d_most_left",5000, "linear");
  	}
  	function un_make_small_just_left(elem)
  	{
  			$(elem).removeClass("smallable_3d_left",5000, "linear");
  	}
  	function un_make_small_just_right(elem)
  	{
			$(elem).removeClass("smallable_3d_right",5000, "linear");
  	}
  	function un_make_small_most_right(elem)
  	{
			$(elem).removeClass("smallable_3d_most_right",5000, "linear");
  	}
  	// main function for control hover animations (affect sibling of hovered animation)
  	$(".small_siblings").hover(
		function(){
			if ( $(this).hasClass("show_done") ) 
			{
				un_rotated($(this).siblings(".rotated-10"));
				make_small($(this).siblings(".no_3d"));
				make_small_most_left($(this).siblings(".most_left"));
				make_small_just_left($(this).siblings(".just_left"));
				make_small_just_right($(this).siblings(".just_right"));
				make_small_most_right($(this).siblings(".most_right"));
			}
			if(!$(this).hasClass("show_animation"))
			{
				un_rotated($(this).siblings(".rotated-10"));
				make_small($(this).siblings(".no_3d"));
				make_small_most_left($(this).siblings(".most_left"));
				make_small_just_left($(this).siblings(".just_left"));
				make_small_just_right($(this).siblings(".just_right"));
				make_small_most_right($(this).siblings(".most_right"));	
			}
		},
		function(){
			if ( $(this).hasClass("show_done") ) 
			{
				un_make_small($(this).siblings(".no_3d"));
				un_make_small_most_left($(this).siblings(".most_left"));
				un_make_small_just_left($(this).siblings(".just_left"));
				un_make_small_just_right($(this).siblings(".just_right"));
				un_make_small_most_right($(this).siblings(".most_right"));
			}

			if(!$(this).hasClass("show_animation"))
			{
				un_make_small($(this).siblings(".no_3d"));
				un_make_small_most_left($(this).siblings(".most_left"));
				un_make_small_just_left($(this).siblings(".just_left"));
				un_make_small_just_right($(this).siblings(".just_right"));
				un_make_small_most_right($(this).siblings(".most_right"));
			}
		});
    // Temporaly function for control history section -
    // will be replace 
    // when joomla back end will be ready.
    // Likely I will use some api function for read data from Joomla instead of reading text from .js file.
  	
    function history_menu(id)
  	{
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").removeClass("bg-burn_sienna");
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").siblings().addClass("bg-burn_sienna");
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").siblings().removeClass("bg-harvest_gold");
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").addClass("bg-harvest_gold");

			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").removeClass("text-harvest_gold");
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").siblings().addClass("text-harvest_gold");
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").siblings().removeClass("text-burn_sienna");
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").addClass("text-burn_sienna");	

			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").removeClass("border-harvest_gold");
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").siblings().addClass("border-harvest_gold");
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").siblings().removeClass("border-burn_sienna");
			$("[ref="+id+"_his]").not("#previous_year,#next_year,#history_text,#history_title").addClass("border-burn_sienna");	
					
  		switch(id) {
  			case 1:
  				$("#next_year").attr("ref",1);
  				$("#previous_year").attr("ref",9);
    			$(".history_title").text("Origins (July 1965 - August 1966)");
				  text="The Doors began with a meeting between acquaintances Jim Morrison and Ray Manzarek, ";
				  text+="both of whom had attended the UCLA School of Theater, Film and Television, on Venice Beach in July 1965."
				  text+="Morrison told Manzarek he had been writing songs "
				  text+='(Morrison said "I was taking notes at a fantastic rock\'n\'roll concert going on in my head")'
				  text+='and with Manzarek\'s encouragement sang "Moonlight Drive". '
				  text+="The members came from a varied musical background of jazz, rock, blues, and folk idioms."
  				$(".history_text").html(text);
    		break;	
  			case 2:
  				$("#next_year").attr("ref",2);
  				$("#previous_year").attr("ref",2);
    			$(".history_title").text("The Doors and Strange Days (August 1966 - December 1967)");
					text='The band recorded their first album from August 24 to 31, 1966,'
 					text+='at Sunset Sound Recording Studios.'
  					text+='The debut album, The Doors, was released in the first week of January 1967.'
   					text+='It included most of the major songs from their set, including the nearly 12-minute musical drama '
   					text+='"The End". In November 1966, '
  					text+=' Mark Abramson directed a promotional film for the lead single "Break On Through (To the Other Side)".'
   					text+=' To promote the single, the Doors made several television appearances such as on Shebang, a Los Angeles TV show,'
    				text+=' miming to "Break On Through". In early 1967, the Doors appeared on The Clay Cole Show '
     				text+='(which aired on Saturday evenings at 6 pm on WPIX Channel 11 out of NYC) where they performed their single' 
     				text+='"Break On Through". Since "Break on Through" was not very successful on the radio, the band turned to '
    				text+=' "Light My Fire". "Light My Fire" became the first single from Elektra Records to reach number one on the '
    				text+=' Billboard Hot 100 singles chart, selling over one million copies.'
      				$(".history_text").html(text);
    		break;
  			case 3:
  				$("#next_year").attr("ref",3);
  				$("#previous_year").attr("ref",3);
    			$(".history_title").text("New Haven incident (December 1967)");
					text="On December 9, 1967, the Doors performed a now infamous concert at New Haven Arena in New Haven, "
					text+="Connecticut, which ended abruptly when Morrison was arrested by local police."
					text+="Morrison became the first rock artist to be arrested onstage during a concert performance."
					text+="Morrison had been kissing a female fan backstage in a bathroom shower stall prior to the start of "
					text+="the concert when a police officer happened upon them. Unaware that he was the lead singer of the "
					text+="band about to perform, the officer told Morrison and the female to leave, to which Morrison said,"
					text+='"Eat it." The policeman took out a can of mace and warned Morrison, "Last chance", '
					text+='to which Morrison replied, "Last chance to eat it."'
					text+="There is some discrepancy as to what happened next: according to No One Here Gets Out Alive, "
					text+="the female ran away and Morrison was maced; but Manzarek recounts in his book that both Jim and"
					text+="the fan were sprayed."
      				$(".history_text").html(text);
    		break;	
  			case 4:
  				$("#next_year").attr("ref",4);
  				$("#previous_year").attr("ref",4);
    			$(".history_title").text("Waiting for the Sun (April-December 1968)");
    				text="Recording of the group's third album in April 1968 "; 
    				text+=" was marred by tension as a result of Morrison's increasing "; 
    				text+=' dependence on alcohol and the rejection of the 17 minute "Celebration of the Lizard" ';
    				text+=' by band producer Paul Rothchild, who considered the work was not commercial enough. ';
    				text+=' Approaching the height of their popularity, ';
    				text+=' The Doors played a series of outdoor shows that led to frenzied scenes between fans and police, ';
    				text+=' particularly at Chicago Coliseum on May . ';
    			$(".history_text").html(text);
    		break;
  			case 5:
  				$("#next_year").attr("ref",5);
  				$("#previous_year").attr("ref",5);
    			$(".history_title").text("Miami incident (March 1969)");
    				text='On March 1, 1969, at the Dinner Key Auditorium in the Coconut Grove neighborhood of Miami,';
    				text+='the Doors gave the most controversial performance of their career, one that nearly "derailed the band".';
    				text+='The auditorium was a converted seaplane hangar that had no air conditioning on that hot night, and the seats had been removed by the promoter to boost ticket sales.';
    			$(".history_text").html(text);
    		break;	
  			case 6:
  				$("#next_year").attr("ref",6);
  				$("#previous_year").attr("ref",6);
    			$(".history_title").text("The Soft Parade (May-July 1969)");
    				text="The Doors' fourth album, The Soft Parade, released in July 1969, ";
    				text+=" contained brass and string arrangements.";
    				text+=' The lead single, "Touch Me", featured saxophonist Curtis Amy. ';
					text+='While the band was trying to maintain their previous momentum, ';
					text+='efforts to expand their sound gave the album an experimental feel, ';
					text+='causing critics to attack their musical integrity. ';
					text+='According to John Densmore in his biography ';
					text+="Riders On The Storm individual writing credits were noted for the first time because of Morrison's ";
					text+="reluctance to sing the lyrics of Robby Krieger's ";
					text+=' song "Tell All the People". ';
					text+=" Morrison's drinking made him difficult and unreliable, ";
					text+=" and the recording sessions dragged on for months. ";
					text+="  Studio costs piled up, and the Doors came close to disintegrating. ";
					text+="Despite all this, the album was immensely successful, becoming the band's fourth hit album.";
    			$(".history_text").html(text);
    		break;
  			case 7:
  				$("#next_year").attr("ref",7);
  				$("#previous_year").attr("ref",7);
    			$(".history_title").text("Morrison Hotel and Absolutely Live (November 1969 - December 1970)");
    				text='During the recording of their next album, Morrison Hotel, in November 1969,';
    				text+='Morrison again found himself';
    				text+='in trouble with the law after harassing airline staff during a flight to Phoenix,';
    				text+='Arizona to see the Rolling Stones in concert.';
    				text+='Both Morrison and his friend and traveling companion Tom Baker were charged with ';
    				text+='"interfering with the flight of an intercontinental aircraft and public drunkenness".';
    				text+='If convicted of the most serious charge, ';
    				text+='Morrison could have faced a ten-year federal prison sentence for the incident. ';
    				text+='The charges were dropped in April 1970 after an airline stewardess reversed ';
    				text+='her testimony to say she mistakenly identified Morrison as Baker.';
    			$(".history_text").html(text);
    		break;	
  			case 8:
  				$("#next_year").attr("ref",8);
  				$("#previous_year").attr("ref",8);
    			$(".history_title").text("L.A. Woman and Morrison's death (December 1970 - July 1971)");
					text= " Despite Morrison's conviction and the fallout from their appearance in New Orleans,";
 					text+=" The Doors set out to reclaim their status as a premier act with L.A. Woman in 1971.";
  					text+=" The album included rhythm guitarist Marc Benno on several tracks and prominently featured bassist Jerry Scheff,";
  					text+=" best known for his work in Elvis Presley's TCB Band. Despite a comparatively low Billboard chart peak at No. 9,";
   					text+=" L.A. Woman contained two Top 20 hits and went on to be their second best-selling studio album, ";
   					text+=" surpassed in sales only by their debut. ";
   					text+=" The album explored their R&B roots, although during rehearsals they had a falling-out with Paul Rothchild,";
   					text+=" who was dissatisfied with the band's ";
    				text+=' effort. Denouncing "Love Her Madly" as "cocktail lounge music", ';
					text+=' he quit and handed the production to Bruce Botnick and the Doors.';
    			$(".history_text").html(text);
    		break;
  			default:
  				$("#next_year").attr("ref",0);
  				$("#previous_year").attr("ref",9);
  				$(".history_title").text("History of The Doors");
  					text= " The Doors were an American rock band formed in Los Angeles in 1965, ";
  					text+= " with vocalist Jim Morrison, keyboardist Ray Manzarek, guitarist Robby Krieger,";
  					text+= " and drummer John Densmore. They were among the most controversial and influentia";
  					text+= " rock acts of the 1960s, ";
  					text+= " mostly because of Morrison's lyrics and his erratic stage persona, ";
  					text+= " and the group was widely regarded as representative of the era's counterculture.";
    			$(".history_text").html(text);
	} 
  	}
// read id from button and run history_menu that change text in card
	$(".his_menu").click(
		function(){
			id=$(this).attr("ref").split("_")
			history_menu(parseInt(id[0]));
		});
// load next year
	$("#next_year").click(function(){
			history_menu(1+parseInt($(this).attr("ref")));
			$("#previous_year").click(function(){
			history_menu(parseInt($(this).attr("ref")) -1);
		  });
  });
// change photo in video card
		$(".video_table_photo_triger").hover(function(){
			if ($(this).attr("ref")!="") {
				$(".video_table_photo").attr("src",$(this).attr("ref"));
			}
			if ($(this).attr("ref2")!="") {
				$(".video_table_photo_desc").text($(this).attr("ref2"));
			}
		});
// Function for control video section -
// will be replace 
// when joomla back end will be ready.
// Likely I will use some api function for read data from Joomla instead of reading text from .js file
	function video_menu(id)
  	{
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").removeClass("bg-burn_sienna");
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").siblings().addClass("bg-burn_sienna");
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").siblings().removeClass("bg-harvest_gold");
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").addClass("bg-harvest_gold");

			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").removeClass("text-harvest_gold");
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").siblings().addClass("text-harvest_gold");
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").siblings().removeClass("text-burn_sienna");
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").addClass("text-burn_sienna");	

			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").removeClass("border-harvest_gold");
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").siblings().addClass("border-harvest_gold");
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").siblings().removeClass("border-burn_sienna");
			$("[ref="+id+"_video]").not("#previous_year,#next_year,.history_text,#history_title").addClass("border-burn_sienna");	
					
  		switch(id) {
  			case 1:
  				$("#next_video").attr("ref",1);
  				$("#previous_video").attr("ref",1);
    			//alert("I am");
    			$("#movie_screen").attr("src","https://www.youtube.com/embed/g0_2il2lwgk?list=OLAK5uy_ndD6m5r4rIP9imgsmVVUcspmSHV7BxG5o");
 				$("#movie_wiki_link").attr('href',"https://en.wikipedia.org/wiki/Back_Door_Man");   			
 				$("#movie_text_link").attr('href',"https://www.songfacts.com/facts/the-doors/back-door-man");
    			$("#video_title").text("02.The Doors - Back Door Man (Live)");
    			$("#video_table_title").text("02.The Doors - Back Door Man (Live)");
    			$("#video_table_title_col").attr("ref","https://img.discogs.com/FPjN5SnH3ju-p21j9MImCl7JnZs=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7924138-1451757123-5826.jpeg.jpg");
  				$("#video_table_title_col").attr("ref2","Cover for The Doors - Back Door Man");

				$(".video_table_photo").attr("src","https://img.discogs.com/FPjN5SnH3ju-p21j9MImCl7JnZs=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7924138-1451757123-5826.jpeg.jpg");
  				$(".video_table_photo_desc").text("Cover for The Doors - Back Door Man");

    			$("#f_1").attr("ref","https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Willie_Dixon_1979.jpg/1024px-Willie_Dixon_1979.jpg");
  				$("#f_1").attr("ref2","Photo of Willie Dixon");
  				$("#f_1").children().children().html('<a href="https://en.wikipedia.org/wiki/Willie_Dixon" target="_blank">Willie Dixon</a>');
  				

				$("#f_2").attr("ref","https://upload.wikimedia.org/wikipedia/en/9/98/TheDoorsTheDoorsalbumcover.jpg");
  				$("#f_2").attr("ref2","Cover of the album 'The Doors' by The Doors");
  				
  				f_2_html = '<th scope="row">2</th>';
  				f_2_html +='<td class="zoomable-125">';
        		f_2_html +='from the album:';
  				f_2_html +='</td>';
        		f_2_html +='<td class="zoomable-125">';
       			f_2_html +='<a href=';
       			/*link to wikipedia here:*/
       			f_2_html +='"https://en.wikipedia.org/wiki/The_Doors_(album)"'; 
       			f_2_html +='target="_blank">';
        		f_2_html +='The Doors';
               	f_2_html +='</a>';
    			f_2_html +='</td>';

  				$("#f_2").html(f_2_html);


  				$("#f_3").attr("ref","https://img.discogs.com/FPjN5SnH3ju-p21j9MImCl7JnZs=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7924138-1451757123-5826.jpeg.jpg");
  				$("#f_3").attr("ref2","Cover for The Doors - Back Door Man");
  				$("#f_3:last-child").text("January 4, 1967");
  
  				f_4_html='<th scope="row">4</th>';
		    	
		    	f_4_html+='<td colspan="2" class="zoomable-125">';
				f_4_html+="<span class='easy_read'>"
				f_4_html+="The Doors drummer";
				f_4_html+="<a href='https://en.wikipedia.org/wiki/John_Densmore' target='_blank'> ";
				f_4_html+="John Densmore";
				f_4_html+="</a>";
				f_4_html+=" described it as a song that is: ";
				f_4_html+="</span>";
				f_4_html+='<blockquote class="blockquote easy_read">';
  				f_4_html+='<p class="mb-0">';
    			f_4_html+="Deeply sexual and got everyone moving.";
  				f_4_html+='</p>';
				f_4_html+='</blockquote>';
        		f_4_html+='</td>';
  				$("#f_4").html(f_4_html);
				$("#f_4").attr("ref","img/hero4.png");
  				$("#f_4").attr("ref2","Photo of John Densmore");
  				
				f_5_html='<th scope="row">5</th>';
				f_5_html+='<td class="zoomable-125">';
        		f_5_html+='Producer';
				f_5_html+='</td>';
      			f_5_html+='<td class="zoomable-125">';
        		f_5_html+='<a href=';
        		f_5_html+='"https://en.wikipedia.org/wiki/Paul_A._Rothchild"';
        		f_5_html+=' target="_blank">';
          		f_5_html+='Paul A. Rothchild'; 
        		f_5_html+='</a>';  
      			f_5_html+='</td>';
				$("#f_5").html(f_5_html);
				$("#f_5").attr("ref","https://i6.lisimg.com/14028736/280full.jpg");
  				$("#f_5").attr("ref2","Photo of Paul A. Rothchild");
  				
    		break;	
  			case 2:
  				$("#next_video").attr("ref",2);
  				$("#previous_video").attr("ref",2);
    			$("#video_title").text("03.The Doors - Roadhouse Blues");
    			$("#movie_screen").attr("src","https://www.youtube.com/embed/BgQg3J7xU1k?list=PLe52M8z8EbA9hv-sYL8dcJmng_HBvtDvq");
 				$("#movie_wiki_link").attr('href',"https://en.wikipedia.org/wiki/Roadhouse_Blues");   			
 				$("#movie_text_link").attr('href',"https://www.songfacts.com/facts/the-doors/roadhouse-blues");
    			$("#video_title").text("03.The Doors - Roadhouse Blues");
    			$("#video_table_title").text("03.The Doors - Roadhouse Blues");
    			$("#video_table_title_col").attr("ref","https://upload.wikimedia.org/wikipedia/en/b/b3/Roadhouse_Blues.jpg");
  				$("#video_table_title_col").attr("ref2","Cover for The Doors - Roadhouse Blues");

				$(".video_table_photo").attr("src","https://upload.wikimedia.org/wikipedia/en/b/b3/Roadhouse_Blues.jpg");
  				$(".video_table_photo_desc").text("Cover for The Doors - Roadhouse Blues");

    			$("#f_1").attr("ref","https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/The_Doors_1968.JPG/750px-The_Doors_1968.JPG");
  				$("#f_1").attr("ref2","Photo of  John Densmore, Ray Manzarek, Robby Krieger & Jim Morrison ");
  				$("#f_1").children().children().html('<a href= "https://en.wikipedia.org/wiki/The_Doors" target="_blank">John Densmore, Ray Manzarek, Robby Krieger & Jim Morrison </a>');
  				

				$("#f_2").attr("ref","https://upload.wikimedia.org/wikipedia/en/c/cd/The_Doors_-_Morrison_Hotel.jpg");
  				$("#f_2").attr("ref2","Cover of the album 'Morrison Hotel' by The Doors");
  				
  				f_2_html = '<th scope="row">2</th>';
  				f_2_html +='<td class="zoomable-125">';
        		f_2_html +='from the album:';
  				f_2_html +='</td>';
        		f_2_html +='<td class="zoomable-125">';
       			f_2_html +='<a href=';
       			/*link to wikipedia here:*/
       			f_2_html +='"https://en.wikipedia.org/wiki/Morrison_Hotel"'; 
       			f_2_html +='target="_blank">';
        		f_2_html +='Morrison Hotel';
               	f_2_html +='</a>';
    			f_2_html +='</td>';

  				$("#f_2").html(f_2_html);


  				$("#f_3").attr("ref","https://upload.wikimedia.org/wikipedia/en/c/cd/The_Doors_-_Morrison_Hotel.jpg");
  				$("#f_3").attr("ref2","Cover of the album 'Morrison Hotel' by The Doors");
  				$("#f_3:last-child").text("February 1970");
  
  				f_4_html='<th scope="row">4</th>';
		    	
		    	f_4_html+='<td class="zoomable-125">';
				f_4_html+="Cover By";
				f_4_html+="</td>";
				f_4_html+='<td class="zoomable-125">';
				f_4_html+="<ul>";
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Creed_%28band%29_in_2002.jpg/800px-Creed_%28band%29_in_2002.jpg' ref2='Photo of Creed from 2002.'>";
				f_4_html+="<a href='https://genius.com/Creed-roadhouse-blues-lyrics'>";
				f_4_html+='Roadhouse Blues by Creed </a></li>';
    			f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/en/a/a0/Ministry_-_With_Sympathy_era_photoshoot.jpg' ref2='Al Jourgensen and Stevo of Ministry '>";
  				f_4_html+='<a href="https://genius.com/Ministry-roadhouse-blues-lyrics">Roadhouse Blues by Ministry </a>';
				f_4_html+='</li>';
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Blue_Oyster_Cult_1977_publicity_photo.jpg/800px-Blue_Oyster_Cult_1977_publicity_photo.jpg' ref2='photo of the band Blue Öyster Cult '>";
  				f_4_html+='<a href="https://genius.com/Blue-oyster-cult-roadhouse-blues-lyrics">Roadhouse Blues by Blue Öyster Cult </a>';
				f_4_html+='</li>';
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/commons/1/18/Deep_Purple_%281971%29.JPG' ref2='British rock band Deep Purple.'>";
  				f_4_html+='<a href="https://genius.com/Deep-purple-roadhouse-blues-lyrics">Roadhouse Blues by Deep Purple </a>';
				f_4_html+='</li>';       
				f_4_html+='</ul>';
        		f_4_html+='</td>';
  				$("#f_4").html(f_4_html);
				$("#f_4").attr("ref","");
  				$("#f_4").attr("ref2","");
  				$("#f_4").removeClass("video_table_photo_triger");
  				
  				/* Belowe I repead function  $(".video_table_photo_triger").hover(), because of bug.
					<Li> elements generated from $("#f_4").html(f_4_html) ware not working 
					despide of adding class  '.video_table_photo_triger'
					After coping and pasting fuction here it works corectly. 
					Tested on Mozilla and Google Crome at Linux Xubuntu
				*/

  				$("#f_4").children().children().children("li").hover(function(){
  					if ($(this).attr("ref")!="") {
						$(".video_table_photo").attr("src",$(this).attr("ref"));
					}
					if ($(this).attr("ref2")!="") {
						$(".video_table_photo_desc").text($(this).attr("ref2"));
					}
  				})
  				//
				f_5_html='<th scope="row">5</th>';
				f_5_html+='<td class="zoomable-125">';
        		f_5_html+='Producer';
				f_5_html+='</td>';
      			f_5_html+='<td class="zoomable-125">';
        		f_5_html+='<a href=';
        		f_5_html+='"https://en.wikipedia.org/wiki/Paul_A._Rothchild"';
        		f_5_html+=' target="_blank">';
          		f_5_html+='Paul A. Rothchild'; 
        		f_5_html+='</a>';  
      			f_5_html+='</td>';
				$("#f_5").html(f_5_html);
				$("#f_5").attr("ref","https://i6.lisimg.com/14028736/280full.jpg");
  				$("#f_5").attr("ref2","Photo of Paul A. Rothchild");
  				
    		break;
  			case 3:
  				$("#next_video").attr("ref",3);
  				$("#previous_video").attr("ref",3);
    			$("#video_title").text("04.The Doors - People Are Strange");
    			$("#movie_screen").attr("src","https://www.youtube.com/embed/GJY8jJkDoMY?list=PLe52M8z8EbA9hv-sYL8dcJmng_HBvtDvq");
 				$("#movie_wiki_link").attr('href',"https://en.wikipedia.org/wiki/People_Are_Strange");   			
 				$("#movie_text_link").attr('href',"https://www.songfacts.com/facts/the-doors/people-are-strange");
    			$("#video_title").text("04.The Doors - People Are Strange");
    			$("#video_table_title").text("04.The Doors - People Are Strange");
    			$("#video_table_title_col").attr("ref","https://upload.wikimedia.org/wikipedia/en/6/60/PeopleAreStrange.jpg");
  				$("#video_table_title_col").attr("ref2","Cover for The Doors - People Are Strange");

				$(".video_table_photo").attr("src","https://upload.wikimedia.org/wikipedia/en/6/60/PeopleAreStrange.jpg");
  				$(".video_table_photo_desc").text("Cover for The Doors - People Are Strange");

    			$("#f_1").attr("ref","http://mediad.publicbroadcasting.net/p/wlpr/files/styles/x_large/public/201802/24852672_10155310287334075_5822237916260318958_n.jpg");
  				$("#f_1").attr("ref2","Photo of  Robby Krieger & Jim Morrison ");
  				$("#f_1").children().children().html('<a href= "https://en.wikipedia.org/wiki/Robby_Krieger" target="_blank">Robby Krieger</a> and <a href= "https://en.wikipedia.org/wiki/Jim_Morrison" target="_blank">Jim Morrison </a>');
  				
				$("#f_2").attr("ref","https://upload.wikimedia.org/wikipedia/en/f/fc/AlbumStrangeDays.jpg");
  				$("#f_2").attr("ref2","Cover of the album 'Strange Days' by The Doors");
  				
  				f_2_html = '<th scope="row">2</th>';
  				f_2_html +='<td class="zoomable-125">';
        		f_2_html +='from the album:';
  				f_2_html +='</td>';
        		f_2_html +='<td class="zoomable-125">';
       			f_2_html +='<a href=';
       			/*link to wikipedia here:*/
       			f_2_html +='"https://en.wikipedia.org/wiki/Strange_Days_(album)"'; 
       			f_2_html +='target="_blank">';
        		f_2_html +='Strange Days';
               	f_2_html +='</a>';
    			f_2_html +='</td>';

  				$("#f_2").html(f_2_html);


  				$("#f_3").attr("ref","https://upload.wikimedia.org/wikipedia/en/f/fc/AlbumStrangeDays.jpg");
  				$("#f_3").attr("ref2","Cover of the album 'Strange Days' by The Doors");
  				$("#f_3:last-child").text(" September 1, 1967");
  
  				f_4_html='<th scope="row">4</th>';
		    	
		    	f_4_html+='<td class="zoomable-125">';
				f_4_html+="Cover By";
				f_4_html+="</td>";
				f_4_html+='<td class="zoomable-125">';
				f_4_html+="<ul>";
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/en/8/8a/Twiztid_Freek_Show.JPG' ref2='Cover art for Freek Show by the artist Twiztid.'>";
				f_4_html+="<a href='https://genius.com/Twiztid-people-are-strange-lyrics'>";
				f_4_html+='People Are Strange by Twiztid</a></li>';
    			f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/en/d/de/Bunnymen_peoplearestrange.jpg' ref2='cover for the single People Are Strange by the artist Echo & the Bunnymen.'>";
  				f_4_html+='<a href="https://genius.com/Echo-and-the-bunnymen-people-are-strange-lyrics">People Are Strange by Echo & the Bunnymen</a>';
				f_4_html+='</li>';
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://i.dailymail.co.uk/i/pix/2013/02/28/article-2286172-0002CEFD000001F4-249_306x423.jpg' ref2='photo of Michael Ball '>";
  				f_4_html+='<a href="https://genius.com/Michael-ball-people-are-strange-lyrics">People Are Strange by Michael Ball</a>';
				f_4_html+='</li>';
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://lastfm-img2.akamaized.net/i/u/770x0/4fd5f7a694ed4361ad2239f3d0e1f696.jpg' ref2='American rock band Arson City from Nebraska USA.'>";
  				f_4_html+='<a href="https://genius.com/Arson-city-people-are-strange-the-doors-lyrics">People Are Strange (The Doors) by Arson City</a>';
				f_4_html+='</li>';
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/en/9/99/Stinanordenstam_peoplearestrangesingle.jpg' ref2='scan of single cover '>";
  				f_4_html+='<a href="https://genius.com/Stina-nordenstam-people-are-strange-unkle-remix-lyrics">People Are Strange (UNKLE Remix) by Stina Nordenstam </a>';
				f_4_html+='</li>';       
				f_4_html+='</ul>';
        		f_4_html+='</td>';
  				$("#f_4").html(f_4_html);
				$("#f_4").attr("ref","");
  				$("#f_4").attr("ref2","");
  				$("#f_4").removeClass("video_table_photo_triger");
  				
  				/* Belowe I repead function  $(".video_table_photo_triger").hover(), because of bug.
					<Li> elements generated from $("#f_4").html(f_4_html) ware not working 
					despide of adding class  '.video_table_photo_triger'
					After coping and pasting fuction here it works corectly. 
					Tested on Mozilla and Google Crome at Linux Xubuntu
				*/
				
  				$("#f_4").children().children().children("li").hover(function(){
  					if ($(this).attr("ref")!="") {
						$(".video_table_photo").attr("src",$(this).attr("ref"));
					}
					if ($(this).attr("ref2")!="") {
						$(".video_table_photo_desc").text($(this).attr("ref2"));
					}
  				})
  				//
				f_5_html='<th scope="row">5</th>';
				f_5_html+='<td class="zoomable-125">';
        		f_5_html+='Producer';
				f_5_html+='</td>';
      			f_5_html+='<td class="zoomable-125">';
        		f_5_html+='<a href=';
        		f_5_html+='"https://en.wikipedia.org/wiki/Paul_A._Rothchild"';
        		f_5_html+=' target="_blank">';
          		f_5_html+='Paul A. Rothchild'; 
        		f_5_html+='</a>';  
      			f_5_html+='</td>';
				$("#f_5").html(f_5_html);
				$("#f_5").attr("ref","https://i6.lisimg.com/14028736/280full.jpg");
  				$("#f_5").attr("ref2","Photo of Paul A. Rothchild");

    		break;	
  			case 4:
  				$("#next_video").attr("ref",4);
  				$("#previous_video").attr("ref",4);
				$("#video_title").text("05.The Doors - Love Me Two Times");
    			$("#movie_screen").attr("src","https://www.youtube.com/embed/QdCZR9M5EKY?list=PLe52M8z8EbA9hv-sYL8dcJmng_HBvtDvq");
 				$("#movie_wiki_link").attr('href',"https://en.wikipedia.org/wiki/Love_Me_Two_Times");   			
 				$("#movie_text_link").attr('href',"https://www.songfacts.com/facts/the-doors/love-me-two-times");
    			$("#video_title").text("05.The Doors - Love Me Two Times");
    			$("#video_table_title").text("05.The Doors - Love Me Two Times");
    			$("#video_table_title_col").attr("ref","https://upload.wikimedia.org/wikipedia/en/5/5b/LoveMeThreeTimes.jpeg");
  				$("#video_table_title_col").attr("ref2","Cover for The Doors - Love Me Two Times");

				$(".video_table_photo").attr("src","https://upload.wikimedia.org/wikipedia/en/5/5b/LoveMeThreeTimes.jpeg");
  				$(".video_table_photo_desc").text("Cover for The Doors - Love Me Two Times");

    			$("#f_1").attr("ref","https://upload.wikimedia.org/wikipedia/commons/e/e7/Robby_Krieger.JPG");
  				$("#f_1").attr("ref2","Photo of  Robby Krieger");
  				$("#f_1").children().children().html('<a href= "https://en.wikipedia.org/wiki/Robby_Krieger" target="_blank">Robby Krieger</a>');
  				
				$("#f_2").attr("ref","https://upload.wikimedia.org/wikipedia/en/f/fc/AlbumStrangeDays.jpg");
  				$("#f_2").attr("ref2","Cover of the album 'Strange Days' by The Doors");
  				
  				f_2_html = '<th scope="row">2</th>';
  				f_2_html +='<td class="zoomable-125">';
        		f_2_html +='from the album:';
  				f_2_html +='</td>';
        		f_2_html +='<td class="zoomable-125">';
       			f_2_html +='<a href=';
       			/*link to wikipedia here:*/
       			f_2_html +='"https://en.wikipedia.org/wiki/Strange_Days_(album)"'; 
       			f_2_html +='target="_blank">';
        		f_2_html +='Strange Days';
               	f_2_html +='</a>';
    			f_2_html +='</td>';
  				$("#f_2").html(f_2_html);


  				$("#f_3").attr("ref","https://upload.wikimedia.org/wikipedia/en/f/fc/AlbumStrangeDays.jpg");
  				$("#f_3").attr("ref2","Cover of the album 'Strange Days' by The Doors");
  				$("#f_3:last-child").text("September 25, 1967");
  
  				f_4_html='<th scope="row">4</th>';
		    	
		    	f_4_html+='<td class="zoomable-125">';
				f_4_html+="Cover By";
				f_4_html+="</td>";
				f_4_html+='<td class="zoomable-125">';
				f_4_html+="<ul>";
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Aerosmith2007.jpg/800px-Aerosmith2007.jpg' ref2='Aerosmith Live in Buenos Aires Elby 2007'>";
				f_4_html+="<a href='https://www.songfacts.com/facts/the-doors/love-me-two-times'>";
				f_4_html+='Love Me Two Times by Aerosmith (Ft. Ray Manzarek & Robby Krieger)</a></li>';
    			f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/en/d/de/Bunnymen_peoplearestrange.jpg' ref2='cover for the single People Are Strange by the artist Echo & the Bunnymen.'>";
  				f_4_html+='<a href="https://genius.com/Echo-and-the-bunnymen-people-are-strange-lyrics">People Are Strange by Echo & the Bunnymen</a>';
				f_4_html+='</li>';
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Joan_Jett_2013.jpg/400px-Joan_Jett_2013.jpg' ref2=' Joan Jett, Las Vegas, Nevada on September 21, 2013 - Photo by Glenn Francis of www.PacificProDigital.com'>";
  				f_4_html+='<a href="https://genius.com/Joan-jett-love-me-two-times-lyrics">Love Me Two Times by Joan Jett </a>';
				f_4_html+='</li>';    
				f_4_html+='</ul>';
        		f_4_html+='</td>';
  				$("#f_4").html(f_4_html);
				$("#f_4").attr("ref","");
  				$("#f_4").attr("ref2","");
  				$("#f_4").removeClass("video_table_photo_triger");
				
  				$("#f_4").children().children().children("li").hover(function(){
  					if ($(this).attr("ref")!="") {
						$(".video_table_photo").attr("src",$(this).attr("ref"));
					}
					if ($(this).attr("ref2")!="") {
						$(".video_table_photo_desc").text($(this).attr("ref2"));
					}
  				})
  				//
				f_5_html='<th scope="row">5</th>';
				f_5_html+='<td class="zoomable-125">';
        		f_5_html+='Producer';
				f_5_html+='</td>';
      			f_5_html+='<td class="zoomable-125">';
        		f_5_html+='<a href=';
        		f_5_html+='"https://en.wikipedia.org/wiki/Paul_A._Rothchild"';
        		f_5_html+=' target="_blank">';
          		f_5_html+='Paul A. Rothchild'; 
        		f_5_html+='</a>';  
      			f_5_html+='</td>';
				$("#f_5").html(f_5_html);
				$("#f_5").attr("ref","https://i6.lisimg.com/14028736/280full.jpg");
  				$("#f_5").attr("ref2","Photo of Paul A. Rothchild");
    		break;
  			case 5:
  				$("#next_video").attr("ref",-1);
  				$("#previous_video").attr("ref",5);
				$("#video_title").text("06.The Doors - Break on Through");
    			$("#movie_screen").attr("src","https://www.youtube.com/embed/YCohm_CilUY?list=PLe52M8z8EbA9hv-sYL8dcJmng_HBvtDvq");
 				$("#movie_wiki_link").attr('href',"https://en.wikipedia.org/wiki/Break_On_Through_(To_the_Other_Side)");   			
 				$("#movie_text_link").attr('href',"https://www.songfacts.com/facts/the-doors/break-on-through-to-the-other-side");
    			$("#video_title").text("06.The Doors - Break on Through");
    			$("#video_table_title").text("06.The Doors - Break on Through");
    			$("#video_table_title_col").attr("ref","https://upload.wikimedia.org/wikipedia/en/2/27/Break_On_Through_To_the_Other_Side.jpg");
  				$("#video_table_title_col").attr("ref2","Cover for The Doors - Break on Through");

				$(".video_table_photo").attr("src","https://upload.wikimedia.org/wikipedia/en/2/27/Break_On_Through_To_the_Other_Side.jpg");
  				$(".video_table_photo_desc").text("Cover for The Doors - Break on Through");

    			$("#f_1").attr("ref","https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/The_Doors_1968.JPG/750px-The_Doors_1968.JPG");
  				$("#f_1").attr("ref2","Photo of  The Doors");
  				$("#f_1").children().children().html('<a href= "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/The_Doors_1968.JPG/750px-The_Doors_1968.JPG" target="_blank">The Doors</a>');
  				
				$("#f_2").attr("ref","https://upload.wikimedia.org/wikipedia/en/9/98/TheDoorsTheDoorsalbumcover.jpg");
  				$("#f_2").attr("ref2","Cover of the album 'The Doors' by The Doors");
  				
  				f_2_html = '<th scope="row">2</th>';
  				f_2_html +='<td class="zoomable-125">';
        		f_2_html +='from the album:';
  				f_2_html +='</td>';
        		f_2_html +='<td class="zoomable-125">';
       			f_2_html +='<a href=';
       			/*link to wikipedia here:*/
       			f_2_html +='"https://en.wikipedia.org/wiki/The_Doors_(album)"'; 
       			f_2_html +='target="_blank">';
        		f_2_html +='The Doors';
               	f_2_html +='</a>';
    			f_2_html +='</td>';

  				$("#f_2").html(f_2_html);

  				$("#f_3").attr("ref","https://upload.wikimedia.org/wikipedia/en/2/27/Break_On_Through_To_the_Other_Side.jpg");
  				$("#f_3").attr("ref2","Cover for The Doors - Break on Through");
  				$("#f_3:last-child").text("January 1, 1967");
  
  				f_4_html='<th scope="row">4</th>';
		    	
		    	f_4_html+='<td class="zoomable-125">';
				f_4_html+="Cover By";
				f_4_html+="</td>";
				f_4_html+='<td class="zoomable-125">';
				f_4_html+="<ul>";
				f_4_html+="<li class='zoomable-125 video_table_photo_triger' ref='https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Symphony_x_10.jpg/450px-Symphony_x_10.jpg' ref2='Frontman Russell Allen performing in Novara, 2007'>";
				f_4_html+="<a href='https://genius.com/Adrenaline-mob-break-on-through-lyrics'>";
				f_4_html+='Break on Through by Adrenaline Mob </a></li>';
				f_4_html+='</ul>';
        		f_4_html+='</td>';
  				$("#f_4").html(f_4_html);
				$("#f_4").attr("ref","");
  				$("#f_4").attr("ref2","");
  				$("#f_4").removeClass("video_table_photo_triger");
				
  				$("#f_4").children().children().children("li").hover(function(){
  					if ($(this).attr("ref")!="") {
						$(".video_table_photo").attr("src",$(this).attr("ref"));
					}
					if ($(this).attr("ref2")!="") {
						$(".video_table_photo_desc").text($(this).attr("ref2"));
					}
  				})
  				//
				f_5_html='<th scope="row">5</th>';
				f_5_html+='<td class="zoomable-125">';
        		f_5_html+='Producer';
				f_5_html+='</td>';
      			f_5_html+='<td class="zoomable-125">';
        		f_5_html+='<a href=';
        		f_5_html+='"https://en.wikipedia.org/wiki/Paul_A._Rothchild"';
        		f_5_html+=' target="_blank">';
          		f_5_html+='Paul A. Rothchild'; 
        		f_5_html+='</a>';  
      			f_5_html+='</td>';
				$("#f_5").html(f_5_html);
				$("#f_5").attr("ref","https://i6.lisimg.com/14028736/280full.jpg");
  				$("#f_5").attr("ref2","Photo of Paul A. Rothchild");

    		break;	
  			default:


			
  				$("#next_video").attr("ref",0);
  				$("#previous_video").attr("ref",6);
  				$("#video_title").text("01.The Doors - Five to One");
    			$("#movie_screen").attr("src","https://www.youtube.com/embed/mVP8NVSGsnk");
 				$("#movie_wiki_link").attr('href',"https://en.wikipedia.org/wiki/Five_to_One");   			
 				$("#movie_text_link").attr('href',"https://www.songfacts.com/lyrics/the-doors/five-to-one");
    			$("#video_title").text("01.The Doors - Five to One");
    			$("#video_table_title").text("01.The Doors - Five to One");
    			$("#video_table_title_col").attr("ref","img/five_to_one.jpg");
  				$("#video_table_title_col").attr("ref2","Cover of The Doors- Five to One");

				$(".video_table_photo").attr("src","img/five_to_one.jpg");
  				$(".video_table_photo_desc").text("Cover of The Doors- Five to One");

    			$("#f_1").attr("ref","img/morison_two.jpeg");
  				$("#f_1").attr("ref2","Photo of Jim Morrison");
  				$("#f_1").children().children().html('<a href= "https://en.wikipedia.org/wiki/Jim_Morrison" target="_blank">Jim Morrison</a>');
  				
				$("#f_2").attr("ref","img/robby krieger.jpg");
  				$("#f_2").attr("ref2","Photo of Robby Krieger");
  				
  				f_2_html = '<th scope="row">2</th>';
  				f_2_html +='<td class="zoomable-125">';
        		f_2_html +='Lead Guitarist:';
  				f_2_html +='</td>';
        		f_2_html +='<td class="zoomable-125">';
       			f_2_html +='<a href=';
       			/*link to wikipedia here:*/
       			f_2_html +='"https://en.wikipedia.org/wiki/Robby_Krieger"'; 
       			f_2_html +='target="_blank">';
        		f_2_html +='Robby Krieger';
               	f_2_html +='</a>';
    			f_2_html +='</td>';

 

  				$("#f_2").html(f_2_html);


  				$("#f_3").attr("ref","img/five_to_one.jpg");
  				$("#f_3").attr("ref2","Cover of The Doors- Five to One");
  				$("#f_3:last-child").text("July 3, 1968");
  
  				f_4_html='<th scope="row">4</th>';
		    	
		    	f_4_html+='<td class="zoomable-125">';
				f_4_html+='Sampled In:';
				f_4_html+='</td>';
				f_4_html+='<td class="zoomable-125">';
        		f_4_html+='<ul class="zoomable-125">';
          		f_4_html+='<li class="zoomable-125 video_table_photo_triger"  ref="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jay-Z_%40_Shawn_%27Jay-Z%27_Carter_Foundation_Carnival_%28crop_2%29.jpg/800px-Jay-Z_%40_Shawn_%27Jay-Z%27_Carter_Foundation_Carnival_%28crop_2%29.jpg" ref2="Photo of JAY-Z">';
                f_4_html+='<a href="https://en.wikipedia.org/wiki/Takeover_(song)" target="_blank">';
              	f_4_html+='Takeover by JAY-Z';
            	f_4_html+='</a>';
          		f_4_html+='</li>';
          		f_4_html+='<li class="zoomable-125 video_table_photo_triger"  ref="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg/220px-Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg" ref2="Photo of Kenye West">';
            	f_4_html+='<a href="https://en.wikipedia.org/wiki/The_Blueprint" target="_blank">';
              	f_4_html+='Blueprint Compilation by Kanye West';
            	f_4_html+='</a>';
          
          		f_4_html+='</li>';
          
          		f_4_html+='<li class="zoomable-125 video_table_photo_triger"  ref="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jay-Z_%40_Shawn_%27Jay-Z%27_Carter_Foundation_Carnival_%28crop_2%29.jpg/800px-Jay-Z_%40_Shawn_%27Jay-Z%27_Carter_Foundation_Carnival_%28crop_2%29.jpg" ref2="Photo of JAY-Z">';
            	f_4_html+='<a href="https://en.wikipedia.org/wiki/MTV_Unplugged_(Jay-Z_album)" target="_blank">';
             	f_4_html+=' Takeover (MTV Unplugged) by JAY-Z';
            	f_4_html+='</a>';
          		f_4_html+='</li>';
        		f_4_html+='</ul>';
      			f_4_html+='</td>';
    			f_4_html+='</tr>';
  				$("#f_4").html(f_4_html);
				$("#f_4").attr("ref","");
  				$("#f_4").attr("ref2","");
  				$("#f_4").removeClass("video_table_photo_triger");
				
  				$("#f_4").children().children().children("li").hover(function(){
  					if ($(this).attr("ref")!="") {
						$(".video_table_photo").attr("src",$(this).attr("ref"));
					}
					if ($(this).attr("ref2")!="") {
						$(".video_table_photo_desc").text($(this).attr("ref2"));
					}
  				})
  				//


				f_5_html='<th scope="row">5</th>';
				f_5_html+='<td class="zoomable-125">';
        		f_5_html+='Interpolated By';
				f_5_html+='</td>';
      			f_5_html+='<td class="zoomable-125">';
        		f_5_html+='<a href=';
        		f_5_html+='"https://en.wikipedia.org/wiki/Dig_Out_Your_Soul"';
        		f_5_html+=' target="_blank">';
          		f_5_html+='Waiting for the Rapture by Oasis'; 
        		f_5_html+='</a>';  
      			f_5_html+='</td>';
				$("#f_5").html(f_5_html);
				$("#f_5").attr("ref","https://upload.wikimedia.org/wikipedia/en/9/9d/Dig_out_your_soul.jpg");
  				$("#f_5").attr("ref2","Cover for Dig_Out_Your_Soul");
    // code block

	} 
  	}

// Load next video
  	$("#next_video").click(function(){	
				video_menu(1+parseInt($(this).attr("ref")));
		});
// Load previos video
		$("#previous_video").click(function(){
			video_menu(parseInt($(this).attr("ref")) -1);
		});
// video menu control
	$(".video_menu").click(
		function(){			
			id=$(this).attr("ref").split("_");
			video_menu(parseInt(id[0]));
		}
	);

});
// End of program