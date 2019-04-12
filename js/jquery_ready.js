// j-query
$( document ).ready(function() {
//default data: api is false
api=false;
  
// it check if element is on screen
function isInView(elem)
{
  // works only with elements with ID
  if($(elem).attr("id"))
  { 
  // check if element is on screen
    if( $(elem).offset().top  - $(window).scrollTop()  <= screen.height*0.8)
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
$(window).scroll(function()
{
  // It gets ID of element by running isInView function 
  id_card = isInView($('.show_animation'));
  if ( id_card != false )
  {
    $("#"+id_card).css("animation-name", "apear_from_nowhere" );  
    $("#"+id_card).css("animation-duration", "2.5s");
    $("#"+id_card).css("animation-timing-function", "ease-in");
    $("#"+id_card).addClass("opacity-100"); 
    // it removes class "show_animation" in order to avoid errors, and machining next element.
    // without this function will machining the same element over and over .
    $("#"+id_card).removeClass("show_animation");   
    $("#"+id_card).addClass("show_done");   
    if ($("#"+id_card).hasClass("will_photo"))
    {
      $("#"+id_card).children("img").attr("src",$("#"+id_card).children("img").attr("x_src"));
    }
    if ($("#"+id_card).hasClass("link_loader"))
    {
      tmp_api=open_link($("#"+id_card).attr("link"));
      // It fix "fast mouse scrolling + hover" bug
      $("#"+id_card).removeClass("link_loader")
      if (tmp_api)
      {
        api=tmp_api;
        page++;
        make_galery(api,page);
      }
    }  
  }
})

// it removes elements of modal after we close it
// usefull especially by video and audio content
// because, with out this audio plays after modal is closed. 
$('#Photo_Modal').on('hidden.bs.modal', function (e) 
{
  $("#photo_modal_image").children().remove();
  $("#photo_modal_keywords").children().remove();  
})

// run search function
$('.searching_go').click(function()
{
  query=($(this).parent().siblings("input").val());
  search(query);
}); 

// hide and show pagination
$(".switch_pagination").click(function(){
  sub=$(this).attr("sub");
  $(sub).toggleClass("d-none"); 
  $(this).children("span").toggleClass("invisible");
  making_pagination();
});

// change options
// uses by media types switches in search section
$(".switch").click(function(){
  sub=$(this).attr("sub");
  $(sub).toggleClass("d-none");
  if ($(this).attr("active")=="true")
  {
    $(this).attr("active","false");
  }
  else if ($(this).attr("active")=="false") 
  {
    $(this).attr("active","true");
  }  
  $(this).siblings().not( $(this).attr("sub")).not($(this).attr("mumy") ).attr("active","false");
  $(this).children("span").removeClass("invisible");
  $(this).siblings().not( $(this).attr("sub")).not($(this).attr("mumy") ).children("span").addClass("invisible");
  $(this).siblings().not( $(this).attr("sub")).not($(this).attr("mumy") ).addClass("opacity-50");
  $(this).siblings().not( $(this).attr("sub")).not($(this).attr("mumy") ).addClass("small_0_9");
  $(this).removeClass("opacity-50");
  $(this).removeClass("small_0_9");
  $(this).siblings(".sub_switch").not( $(this).attr("sub")).not($(this).attr("mumy") ).addClass("d-none");
// filtering data after succesful searching
  if (api) 
  {
    query=api.collection.href;
    if (query.includes("keywords={"))
    {
      separator_l="{";
      separator_r="}";
      query=query.split("keywords={");
    }
    else if(query.includes("keywords=%7B"))
    {
      separator_l="%7B";
      separator_r="%7D";
      query=query.split("keywords=%7B");
    }
    query=query[1];
    query=query.split(separator_r);
    query=query[0];
    query=search(query);
  }
});

// uses for special switch - photo from "space only" or "space+earth"
$("#switch_from_space").click(function(){
  alternative=$(this).children("div").attr("alternative");
  value=$(this).children("div").html();
  $(this).children("div").attr("alternative",value);
  $(this).children("div").html(alternative);
});

// recomended links - in this case it is used by solar system section on top screen
$(".recomemnded_link").click(function()
{
  link_question=$(this).attr("link");
  search(link_question);
  $('html, body').animate({
        scrollTop: $("#search_input_card").offset().top-100
    }, "slow");
  $("#search_input").val(link_question);
});

// animation switch elements (eg near search section)
$(".switch , .switch_pagination").hover(function(){
  do_them_smaller($(this));
});

// acordion is used by modal, it shows and hides its siblings
$(".my_accordion").click(function(){
  $(this).siblings().toggleClass("d-none");
});

});