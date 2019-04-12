// it takes json file form api
// does not check anything, returns just json file
// function "f_do_you_mean" used this directly
function open_json(link)
{
          to_go = link; 
          query = $.ajax({
              type: "GET",
              url: to_go,
              dataType: "json",
              async: false
          })
          if (query.responseJSON)
          {
            return query.responseJSON;
          }
          else
          {
            return false;
          }

}

// updates  number of items- eg. used near title of search section
function update_total(total_hits)
{
  $("#photos_total").text(total_hits+" ");
};

// it takes json file from open_json and prepares to used
// used by every function that uses nasa api

function open_link(link)
{
          query=open_json(link);

          if(query && query.collection)
          {  
          update_total(query.collection.metadata.total_hits);          
          return query;
          }
          else
          {
            update_total(0);           
            return false;
          }
}
// it removes elements from side
function clear(screen)
{
  $( screen ).children().remove();
}
// it changes background
function bigImg(obj_id)
{
  if ($(obj_id).children("img")&&$(obj_id).children("img").attr("src"))
   {
    link_img =  "url('";
    link_img += $(obj_id).children("img").attr("src");
    link_img += "')";
    if ($(obj_id).attr("target"))
    {
      target= $(obj_id).attr("target");
    }
    else
    {
      target=$('body'); 
    }
    
    $(target).css("background-image" ,link_img);
   }
}
// it opens photo/video/audio in modal
function open_photo(elem)
{
  x_center=$(elem).attr("x_center");
  x_date_created=$(elem).attr("x_date_created");
  x_description=$(elem).attr("x_description");
  x_description_508=$(elem).attr("x_description_508");
  x_keywords=$(elem).attr("x_keywords");
  x_keywords=x_keywords.split(',');
  x_nasa_id=$(elem).attr("x_nasa_id");
  x_secondary_creator=$(elem).attr("x_secondary_creator");
  x_title=$(elem).attr("x_title");
  x_href=$(elem).attr("x_href");
  x_media_type=$(elem).attr("media_type");
  x_src=$(elem).children("img").attr("src");
  if(x_description)
  {      
    regex = /__quote__/gi; 
    x_description=x_description.replace(regex, ' " ');
    regex = /__apostrophe__/gi 
    x_description=x_description.replace(regex, "'");
    $("#photo_modal_desc").text(x_description);
    $("#photo_modal_desc").removeClass("d-none");
    $("#photo_modal_desc").siblings().removeClass("d-none");  
  }
  if(x_title)
  {      
    regex = /__quote__/gi; 
    x_title=x_title.replace(regex, ' " ');
    regex = /__apostrophe__/gi 
    x_title=x_title.replace(regex, "'");
    $("#photo_modal_title").text(x_title);
  }
  if (x_center)
  {
    $("#modal_center").text(x_center);
    $("#modal_center").parent().removeClass("d-none");    
    $("#modal_table").removeClass("d-none");
    $("#modal_info_button").removeClass("d-none");
  }
  else
  {
    $("#modal_center").text("");
    $("#modal_center").parent().addClass("d-none");
  }
  if (x_date_created)
  {
    $("#modal_date").text(x_date_created);
    $("#modal_date").parent().removeClass("d-none");
    $("#modal_table").removeClass("d-none");
    $("#modal_info_button").removeClass("d-none");
  }
  else
  {
    $("#modal_date").text("");
    $("#modal_date").parent().addClass("d-none");
  }
  if (x_nasa_id)
  {
    $("#modal_nasa_id").text(x_nasa_id);
    $("#modal_nasa_id").parent().removeClass("d-none");
    $("#modal_table").removeClass("d-none");
    $("#modal_info_button").removeClass("d-none");
  }
  else
  {
    $("#modal_nasa_id").text("");
    $("#modal_nasa_id").parent().addClass("d-none");
  }
  if (x_secondary_creator)
  {
    $("#modal_creator").text(x_secondary_creator);
    $("#modal_creator").parent().removeClass("d-none");
  }
  else
  {
    $("#modal_creator").text("");
    $("#modal_creator").parent().addClass("d-none");
  }
  if ((!x_secondary_creator)&&(!x_nasa_id)&&(!x_date_created)&&(!x_center)) 
  {
    $("#modal_table").addClass("d-none");
    $("#modal_info_button").addClass("d-none");
  }
  $("#photo_modal_image").children().remove();
  if (x_media_type =="image")
  {
    if(x_href)
    {     
      query = open_json(x_href);
      if(query)
      {
        $(".modal_alternative_files").removeClass("d-none");
        $(".modal_alternative_files").children(".list-group").children().remove();
        $("#modal_files_button").removeClass("d-none");
        for (key in query) 
        {
          if (query[key].includes('.jpg'))
          {
            html='<li class="list-group-item">';
            html+='<a href="';
            html+=query[key];
            html+='" target="blank">';
            html+=query[key];
            html+="</a>";
            html+="</li>";
            $(".modal_alternative_files").children(".list-group").append(html);
          }
          if (query[key].includes('~orig.jpg'))
          {
            html='<img src="'+ query[key] +'" class="col-12" >';
            $("#photo_modal_image").append(html);   
          }
        }
      }
    }
  }
  if (x_media_type =="video")
  {
    $(".modal_alternative_files").addClass("d-none");
    $(".modal_alternative_files").children(".list-group").children().remove();
    if(x_href)
    {     

      query = open_json(x_href);
      if (query)
      {

      html='<video class="col-sm-12" controls>'
      for (key in query) 
      {
        if (query[key].includes('.mp4'))
        {
          html+=  '<source src="'
          html+=  query[key]
          html+=  '" type="video/mp4">'
        }
        if (query[key].includes('.vtt')  || query[key].includes('.str'))
        {
          html+='<track src="';
          html+=  query[key];
          html+='" kind="captions" srclang="no" label="Subtitles"></track>';
        }
      }
      html+=  'Your browser does not support the video tag.'
      html+= '</video> '
      $("#photo_modal_image").append(html);   
      }
    }
  }
  if (x_media_type =="audio")
  {
    $(".modal_alternative_files").addClass("d-none");
    $(".modal_alternative_files").children(".list-group").children().remove();
        
    if(x_href)
    {     
      query = open_json(x_href);
      if (query)
      { 
      html='<audio class="col-sm-12" controls>'
      for (key in query) 
      {
        if (query[key].includes('.mp3'))
        {
          html+=  '<source src="'
          html+=  query[key]
          html+=  '" type="audio/mpeg">'
        }
      }
      }
      html+=  'Your browser does not support the video tag.'
      html+= '</audio>'
      $("#photo_modal_image").append(html);   
    }
  }
  $("#photo_modal_keywords").children().remove();
  for (key in x_keywords) 
  {
    $("#photo_modal_keywords"). append('<button type="button" class="btn btn-secondary my-2 mx-2" onclick="link_to_api(this)">'+x_keywords[key]+'</button>')
  }
  $("#Photo_Modal").modal('show');  
}
// it makes paginaton on page
function making_pagination()
{
  clear(".pagination_card");
  if (api.collection.metadata.total_hits>100) 
  { 
    pages_number = (api.collection.metadata.total_hits)/100;
    // I find out that there are some problems with pages >100
    // Indead of list of elements api answers :
    // 'reason  "Maximum number of search results have been displayed. Please refine your search."'
    // this is why here I put limit of pages to 100.
    if (pages_number>100)
    {
      pages_number=100; 
    }
    for (var i = 0; i <= pages_number; i+=10) 
    {
    // setting how many button in one row
      if (pages_number-i>10)
      {
      //for more than 10 button limit is 10
        limit=10;
      }
      else
      {
      //else- just but rest of buttons, it appies for last row.
      // eg can be row of 4 buttons instead of 10 when we have 14 elements
        limit=pages_number-i;
      }
      html='<div class="btn-group btn-group-sm px-0 mx-0 my-1" role="group" aria-label="Basic example">';
      //make row for button group
      for (var j = 0; j < limit; j++) 
      {       
        html+=' <button type="button" class="btn btn-secondary zoomable-125 ';
        if ((i+j)%2==0) 
        {
          html+= " bg-blue_sapphire ";
          html+= " text-gunmetal_gray ";
          html+= " border-gunmetal_gray ";
        }
        else
        {
          html+= " bg-gunmetal_gray ";
          html+= " text-blue_sapphire ";
          html+=" border-blue_sapphire ";
        }
        html+=' " ';
        html+=' x_question="'+"&page="+(j+i+1)+'" ';
        html+=' onclick="open_link_question( this )"';      
        html+=' >'; 
        html+= (i+j) ;
        html+='</button> ';
      }
      html+='</div>';
      $(".pagination_card").append(html);
    }
  }
} 

// it makes boodstrap cards with photos
function make_photo_row(i,api,page,link)
{
  if (api.collection && api.collection.items && api.collection.items[i]) 
  {
    html='<div class="card my-3 mb-5 px-1 col-sm-12 col-lg-4 float-left show_animation will_photo rounded py-1';
    if (i%2==0)
    {
      html+=" bg-blue_sapphire ";
      html+=" text-gunmetal_gray ";
    }
      else
      {
        html+=" bg-gunmetal_gray ";
        html+=" text-blue_sapphire ";
      }
    if(link)
    {
      html+=" link_loader "; 
    }
    html+=" zoomable";
    html+='" ';
    html+=' id="card_photo_';
    html+= page ;
    html+= "_" ;
    html+= i ;
    html+= '_" ';
    if(link)
    {
      html+=' link= "'; 
      html+= link;
      html+=' " '; 
    }
    html+=' onclick="open_photo(this)" onmouseover="bigImg(this)"';
    if (api.collection.items[i].data)
    {
      if (api.collection.items[i].href)
      { 
        x_href= api.collection.items[i].href;
        html+='x_href="';
        html+=x_href;
        html+='"';
      }
      if (api.collection.items[i].data[0].center) 
      {  
        x_center= api.collection.items[i].data[0].center ;
        regex = /"/gi; 
        x_center=x_center.replace(regex, " __quote__ ");
        regex = /'/gi; 
        x_center=x_center.replace(regex, "__apostrophe__");    
        html+='x_center="';
        html+=x_center;
        html+='"';
      }
      if (api.collection.items[i].data[0].date_created) 
      {
        x_date_created= api.collection.items[i].data[0].date_created ;
        regex = /"/gi; 
        x_date_created=x_date_created.replace(regex, " __quote__ ");
        regex = /'/gi; 
        x_date_created=x_date_created.replace(regex, "__apostrophe__");          
        html+='x_date_created="';
        html+=x_date_created;
        html+='"';
      }
      if (api.collection.items[i].data[0].description) 
      {
        x_description= api.collection.items[i].data[0].description ;
        regex = /"/gi; 
        x_description=x_description.replace(regex, " __quote__ ");
        regex = /'/gi; 
        x_description=x_description.replace(regex, "__apostrophe__");
        html+='x_description="';
        html+=x_description;
        html+='"';
      }
      if (api.collection.items[i].data[0].description_508)
      {
        x_description_508= api.collection.items[i].data[0].description_508 ;
        regex = /"/gi; 
        x_description_508=x_description_508.replace(regex, " __quote__ ");
        regex = /'/gi; 
        x_description_508=x_description_508.replace(regex, "__apostrophe__");
        html+='x_description_508="';
        html+=x_description_508;
        html+='" ';
      }
      if (api.collection.items[i].data[0].nasa_id) 
      {
        x_nasa_id= api.collection.items[i].data[0].nasa_id ;
        regex = /"/gi; 
        x_nasa_id=x_nasa_id.replace(regex, " __quote__ ");
        regex = /'/gi; 
        x_nasa_id=x_nasa_id.replace(regex, "__apostrophe__");
        html+='x_nasa_id="';
        html+=x_nasa_id;
        html+='"';
      }
      if (api.collection.items[i].data[0].secondary_creator) 
      {
        x_secondary_creator= api.collection.items[i].data[0].secondary_creator ;
        regex = /"/gi; 
        x_secondary_creator=x_secondary_creator.replace(regex, " __quote__ ");
        regex = /'/gi; 
        x_secondary_creator=x_secondary_creator.replace(regex, "__apostrophe__");
        html+='x_secondary_creator="';
        html+=x_secondary_creator;
        html+='"';
      }
      if (api.collection.items[i].data[0].title)
      {
        x_title= api.collection.items[i].data[0].title ;
        regex = /"/gi; 
        x_title=x_title.replace(regex, " __quote__ ");
        regex = /'/gi; 
        x_title=x_title.replace(regex, "__apostrophe__");
        html+='x_title="';
        html+=x_title;
        html+='"';
      }
      if (api.collection.items[i].data[0].keywords) 
      {
        x_keywords= api.collection.items[i].data[0].keywords ;
        html+='x_keywords="';
        html+=x_keywords;
        html+='"';
      }
      if (api.collection.items[i].data[0].media_type) 
      {
        x_media_type= api.collection.items[i].data[0].media_type ;
        x_media_type=x_media_type.replace('"', " __quote__ ");
        x_media_type=x_media_type.replace("'", "__apostrophe__");
        html+='media_type="';
        html+=x_media_type;
        html+='"';  
      }
    }
    html+='>';
    html+='<img class="card-img-top border-blue_sapphire modal_triger zoomable"  x_src="';
          // It prevent some bugs- some api elements have no links array[], or even no items array, script is crashing after face this problem, therefore I check if links array exists before runing fuction.  looks badly works well 
    if ( api.collection.items[i].links && api.collection.items[i].links[0].href)
    {
      html+=api.collection.items[i].links[0].href;
    }
    html+='" ';
    html+=' id="photo_img_';
    html+=((page*100)+1+i).toString();
    html+='"';
    html+=' alt="';
    html+=((page*100)+1+i).toString();
    html+='"';
    html+=' style=" max-height:';
    // some images are sooo long
    // eg. 5 * screen height 
    // here I limited image height to one window.height()
    html+= $(window).height();
    html+='px ;" ';
    html+='>';
    if (api.collection.items[i].data[0].title) 
    {
      html+='<p class="card-title easy_read"> ';
      html+=((page*100)+1+i).toString();
      html+='. ';
      html+=api.collection.items[i].data[0].title;      
      html+='</p>';
    }
    if (x_media_type=="video")
    {
      html+='<div class="card-img-overlay">';
      html+='<i class="far fa-5x zoomable fa-play-circle"></i>';
      html+='</div>';
    }
      else if(x_media_type=="image")
      {
        html+='<div class="card-img-overlay">';
        html+='<i class="fa-5x zoomable fas fa-camera-retro"></i>';
        html+='</div>';  
      }
      else if(x_media_type=="audio")
      {
        html+='<div class="card-img-overlay">';
        html+='<i class="fa-5x zoomable fas fa-headphones-alt"></i>';
        html+='</div>';  
      }
      html+='</div>';
    if(link)
    {
      html+='<div class="alert bg-transparent text-blue_sapphire text-center" role="alert">';        
      html+='<P >Time for page: <B>'+ (parseInt(page)+1) + "</B></P>";
      html+='<P ><B>';
      html+= parseInt(api.collection.metadata.total_hits)-((page+1)*100) ; 
      html+="</B> more photos to see </P>";
      html+='</div>';       
    }
    return html;
  }
}

// it shows you recomended keywords
// from  f_do_you_mean function
// so called "do you mean"
function render_do_you_mean(do_you_mean)
{
  html+= '<p class="text-center">';  
  html+= 'Do you mean:';
  html+= '</p>';
  for (key in do_you_mean) 
  { 
    html+= '<button type="button" class="btn btn-secondary mx-3" onclick="link_to_api(this)">';
    html+= do_you_mean[key].word;
    html+='</button>';
  }
} 

// if api answer with empty set - we try check if user made typo
// it asks api.datamuse.com for similar words
function f_do_you_mean(query)
{
  // Searching words that sound similar to query and have connection to nasa 
  html="<span></span>";
  question= 'https://api.datamuse.com/words?ml=nasa&sl=' ;
  question+=query;
  do_you_mean = open_link(question);
  html+= '<div class="text-center">';
  if (do_you_mean!="") 
  {
    // if there is something return this
    render_do_you_mean(do_you_mean);
  }
  else
  {
    // if not
    // Searching words with similar spelling - spelling mistake
    question= 'https://api.datamuse.com/words?ml=space&sl=' ;
    question+=query;
    do_you_mean = open_json(question);
    if (do_you_mean!="") 
    {
      // if yes - return
      render_do_you_mean(do_you_mean);
    }
    else
    {
      // if not - is nothing to show
      html+= '<P>';
      html+= "So sorry to say that, but:";
      html+='</P>'; 
      html+= '<P>';
      html+= "In NASA database is nothing about:<B>";
      html+= query;
      html+='</B></P>'; 
      html+= '<P>';
      html+= "and nothing about words that sound similar or has similar spelling to :<B>";
      html+= query;
      html+='</B></P>'; 
      html+= '<P>';
      html+= "Try again with other word";
      html+='</P>'; 
    }
  }
  return html;
}

// main function of gallery- 
// it runs function make_photo_row when api answer with collection
// ,so list of elements in json file 
// and f_do_you_mean when api answers with empty set
function make_galery(api,page,pagination_kill)
{
  link="";
  //  If api generates empty set :
  //  1.  Generate infor card
  //  2.  Looking for symilar words in other api - datamouse
  //      https://api.datamuse.com/words?ml=nasa&sl=kurwa
  if (api.collection.items.length<=0)
  {
    html='<div class="card">';
    html+='<div class="card-header bg-gunmetal_gray text-blue_sapphire">';
    html+='Empty Set';
    html+='</div>';
    html+='<div class="card-body border-blue_sapphire">';
    html+=' <blockquote class="blockquote mb-0">';
    html+='<p>Nothing to show, we do not have anything about: <span class="font-weight-bold border-blue_sapphire bg-gunmetal_gray">"';
    query=api.collection.href;
    query=query.split("keywords=");
    query=query[query.length-1];
    query=query.split("&");
    query=query[0];
    query=query.replace("{","");
    query=query.replace("}","");
    html+=query;
    html+='"</span></p>';
    html+= f_do_you_mean(query);  
    html+= '</div>';
    html+='</blockquote>';
    html+='</div>';
    html+='</div>';
    var div = document.createElement('div');
    $(div).html(html);
    $("#photo_table").append(div);
  }
  else
  {
    if(!pagination_kill)
    {
      if (api.collection.items.length>=100) 
      {
        clear(".pagination_card");
        $("#switch_pagination").removeClass("invisible");
      }
      else
      {
        clear(".pagination_card");
        $("#switch_pagination").addClass("invisible");
      }
    }
    for (var i = 0 ; i <= api.collection.items.length-1; i++) {
      if (api.collection.items[i]) 
      {
        html=''
        html+='';
        j=0;
        if (i == api.collection.items.length-1)
        {
          if (api.collection.links)
          {
            len= api.collection.links.length-1;
            if (api.collection.links[len].prompt=="Next")
            {
              link=api.collection.links[len].href;
            }
          }
          else
          {
            link="";
          }
        }
        else
        {
          link="";
        }  
        if(link=="")
        {
          html+=make_photo_row(i,api,page); 
        }
        else
        {
          html+=make_photo_row(i,api,page,link);
        }
      }
      var div = document.createElement('div');
      $(div).html(html);
      $("#photo_table").append(div);
    }       
  }    
}

// it runs search engine  
// -it makes query(so keywords,media_type and so on) and sends this to api. 
function search(obj)
{
  clear("#photo_table");
  section_title="";
  query="https://images-api.nasa.gov/search?keywords={";
  query+=obj;
  query+="}";
  if($("#switch_photo").attr("active")=="true") 
  {
    query+="&media_type=image";
    section_title+="Photos ";
    if ($("#switch_from_space").attr("jpl")=='1') 
    {
      query+="&center=JPL";
      section_title+="from space ";
    }
  }
  if($("#switch_audio").attr("active")=="true") 
  {
    query+="&media_type=audio";
    section_title+="Audios ";
  }
  if($("#switch_video").attr("active")=="true") 
  {
    query+="&media_type=video";
    section_title+="Videos ";
  }
  section_title+="about "+obj;
  section_title
  regex = /%20/gi; 
  section_title=section_title.replace(regex, ' ');  
  $("#section_title").text(section_title);
  api=open_link(query);
  if (api)
  {
    page=0;
    make_galery(api,page);
  }
}

// some buttons have text with keywords, when you clikc on them it search for keywords
// eg : keywords buttons in modal
function link_to_api(el_link)
{
  clear("#photo_table");
  query=($(el_link).text());
  search(query);
};

// function uses by pagination links
function open_link_question(obj)
{
  link= api.collection.href;
  question=$(obj).attr("x_question");
  page=$(obj).text();
  clear("#photo_table");
  api=open_link(link+question);
  if (api)
  {
    make_galery(api,page,"no");
  }
}

// makes siblings elements smaller
function do_them_smaller(obj)
{
  $(obj).siblings().toggleClass("smallable_3d_left");
}
