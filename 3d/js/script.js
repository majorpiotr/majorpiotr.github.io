$( document ).ready(function() {
  /*function for chart*/
  data_set=[];
  labels_set=[];
  labels_tmp=[];
  data_type=false;
  var cam_dir={x:0,y:0,z:0};
  var dir;
  $('.controls').hover(function(){
    dir=$(this).attr("dir");
    elem=$(this)[0];
    if ($(elem).attr("dir")=="ahead") 
    {
      setInterval(function(){
        if (dir=="ahead") 
        {
            ahead(2);
        }
      }, 50);
    }
    else if ($(elem).attr("dir")=="left") 
    {
      setInterval(function()
      {
        if (dir=="left") 
        {
          left(2);
        }
      }, 50);
    }
    else if ($(elem).attr("dir")=="right") 
    {
      setInterval(function()
      {
        if (dir=="right") 
        {
          right(2);
        }
      }, 50);
    }
    else if ($(elem).attr("dir")=="back") 
    {
      setInterval(function()
      {
        if (dir=="back") 
        {
          back(2);
        }
      }, 50);
    }
  },
  function()
  {
    dir=false;
  });
$("#myPhoto").click(function()
{
  if ($(this).attr("active")=="false")
  {
    $(this).addClass("bg-platinum");
    $(this).text("Space Background");
    const player = document.getElementById('player');
    const constraints = {
      video: true,
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        player.srcObject = stream;
    });
    var video = document.getElementById( 'player' );
    var reflectionCube = new THREE.VideoTexture( video );
    reflectionCube.minFilter = THREE.LinearFilter;
    reflectionCube.magFilter = THREE.LinearFilter;
    reflectionCube.format = THREE.RGBFormat;
    reflectionCube.format = THREE.RGBFormat;
    scene.background = reflectionCube;
    $(this).attr("active","true");
  }
  else
  {
    setBackground();
    $(this).attr("active","false");
    $(this).removeClass("bg-platinum");
    $(this).text("My Photo");
  }
});

$(".zoom").click(function(){
  target=$(this).attr("target");
  $(target).children("canvas").width($(target).children("canvas").width()*1.2);
  $(target).children("canvas").height($(target).children("canvas").height()*1.2);
});
$(".unzoom").click(function(){
  target=$(this).attr("target");
  $(target).children("canvas").width($(target).children("canvas").width()*0.8);
  $(target).children("canvas").height($(target).children("canvas").height()*0.8);
});
$(".remove").click(function(){
  target=$(this).attr("target");
  $(target).children("canvas").remove();
  $(target).parent().addClass("d-none");
});

$(".compare_it").click(function(){
  if(!($("#modal_title").text()=="Planets comparation")) 
  {
    $(this).parent().siblings().removeClass("d-none");
    $("#modal_title").attr("alternative",$("#modal_title").text());   
    $("#modal_title").text("Planets comparation");
    $(this).text($("#modal_title").attr("alternative")+" view");
  }
  else
  {
    $(this).parent().siblings().addClass("d-none");
    $("#modal_title").text($("#modal_title").attr("alternative"));  
    $(this).text("Comparation view");        
  }
  $("#div_compare").toggleClass("d-none");
  $("#one_planet_chart").toggleClass("d-none");

});

$('#myModal').on('hidden.bs.modal', function (e) {
  $(".tmp_bussy").not(".bussy").each(function() {
    $( this ).removeClass("tmp_bussy");
    $( this ).children("canvas").remove();
    $( this ).siblings(".btn-group").addClass("d-none");
  });
})

$(".reset_data").click(function(){
  data_set=[];
  labels_set=[];
  labels_tmp=[];
  data_type=false;
  $($(this).attr("target")).children("canvas").remove();
  $(".data_changer").each(function(){
    $(this).removeClass("bg-platinum");
  });
  $(".compare_link").each(function(){
    $(this).removeClass("bg-platinum");
  });
});

function add_to_compare(target)
{
  if (typeof (planets[target][data_type])=="object")
  {
    for (i =0; i<=planets[target][data_type].length-1;i++) 
    {
      data_set.push(planets[target][data_type][i]);
      if (planets[target][data_type].labels)
      {
        labels_set.push(planets[target].name+"-"+planets[target][data_type].labels[i]);
      }
      else
      {
          labels_set.push(planets[target].name);
      }
    }
  }
  else
  {
      data_set.push(planets[target][data_type]);
      if (planets[target][data_type].labels)
      {
        labels_set.push(planets[target].name+"-"+planets[target][data_type].labels);
      }
      else
      {
        labels_set.push(planets[target].name);
      }
  }

}
function add_all_to_compare(will_compare)
{
  data_set=[];
  labels_set=[];
  labels_tmp=[];

  for (j=0;j<=will_compare.length-1;j++) 
  { 
    if (typeof (will_compare[j][data_type])=="object")
    {
      for (i =0; i<=will_compare[j][data_type].length-1;i++) 
      {
        data_set.push(will_compare[j][data_type][i]);
        if (will_compare[j][data_type].labels)
        {
          labels_set.push(will_compare[j].name+"-"+will_compare[j][data_type].labels[i]);
        }
        else
        {
          labels_set.push(will_compare[j].name);
        }
    
      }
    }
    else
    {
      data_set.push(will_compare[j][data_type]);
      if (will_compare[j][data_type].labels)
      {
        labels_set.push(will_compare[j].name+"-"+will_compare[j][data_type].labels);
      }
      else
      {
        labels_set.push(will_compare[j].name);
      }
    }
  }
}

function f_will_compare()
{
  will_compare=[];
  $(".will_compare").each(function(){
    if ($(this).attr("target")!='all') 
    {
      will_compare.push(planets[$(this).attr("target")]);
    }
  });
  $("#chart_compare").parent().removeClass("d-none");
  if (data_type)
  {

    add_all_to_compare(will_compare); 
    render_chart("Comparation","Comparation",data_set,labels_set,"bar","compare");
  }
}

$(".data_changer").click(function(){
  data_type=$(this).attr("target");
  $(this).addClass("bg-platinum");
  $(this).siblings().removeClass("bg-platinum");
  if (!($("#div_compare").hasClass("d-none"))) 
  {
    f_will_compare();
  }
});


$(".compare_link").click(function(){
  $(this).removeClass("will_not_compare");  
  if($(this).hasClass("will_compare"))
  {
    $(this).addClass("will_not_compare");
    $(this).removeClass("will_compare");  
  }

  if ($(this).attr("target")=="all")
  {
    $(".compare_link").not(".will_not_compare").addClass("will_compare");
    $(this).removeClass("will_compare");  
    
  }
  else 
  {
    if (!$(this).hasClass("will_not_compare")) 
    {
      $(this).addClass("will_compare");
    }
  }
  f_will_compare();

});
$(".close_it").click(function(){
  $("#myModal").modal('hide');
});
$(".add").click(function(){
  target=$(this).attr("target");
  $(target).addClass("bussy");
});



function render_chart( name , subname , composition ,  labels , type , num) {
  // bar chart needs yAxes with begin at zero.
  // other charts do not need this
  bg_color=[];
  scales_option={};
  if (type=="bar")
  {
scales_option={yAxes: [{ticks: {beginAtZero: true}}],xAxes: [{ticks: {autoSkip: false}}]};
  }

  if (!num) 
  {
    for (var i = 1; i <=8; i++)
    {
      if (!$("#chart_"+i).hasClass("bussy")&& !$("#chart_"+i).hasClass("tmp_bussy")) 
      {
        $("#chart_"+i).addClass("tmp_bussy");
        $("#chart_"+i).siblings(".btn-group").removeClass("d-none");
        $("#chart_"+i).attr("data",composition);
        $("#chart_"+i).attr("labels",labels);
        $("#chart_"+i).attr("name",name);
        $("#chart_"+i).attr("subname",subname);
        num=i;
        break
      }
    }
  }
        $("#div_"+num).removeClass("d-none"); 
        $("#chart_"+num).children("canvas").remove(""); 
var element = document.createElement("canvas");
$("#chart_"+num).append(element);

if (num=="compare")
{
  $(element).width($("#myModal").width()*0.9);
  $(element).height($("#myModal").height()*0.9);
}
else
{
  $(element).width("350px");
  $(element).height("350px");
}


for(key in composition)
{
  color="rgba(";
  color+= Math.floor(Math.random() * Math.floor(255));
  color+= ",";
  color+= Math.floor(Math.random() * Math.floor(255));
  color+= ",";
  color+= Math.floor(Math.random() * Math.floor(255));
  color+= ",";
  color+= 0.2;
  bg_color.push(color);
}

var myChart = new Chart($(element), {
    type: type ,
    data: {
        labels: labels, 
        datasets: [{
            label: "Data",
            data: composition , //[42, 29, 22, 6, 0.5],
            backgroundColor: bg_color,
            borderColor: bg_color,
            borderWidth: 2,
            hoverRadius: 5,
        hoverBackgroundColor: 'white',
        hoverBorderWidth:5,
        hoverBorderColor:"red"
        }]
    },
    options: {
responsive: false,
maintainAspectRatio: false,
        title: {
            display: true,
            fontColor: "#FFFF00",
            text: name + '-'+ subname
        },
        legend: {
            display: true,
            labels: {
                fontSize:10  
            }
        },
        // scales_option - for bar chart it starts at zero
        scales: scales_option
    }
});
} 

// functions for 3d rendering
  var scene = new THREE.Scene();
  var standart_fov=50;
  var camera = new THREE.PerspectiveCamera(standart_fov,window.innerWidth/window.innerHeight,1,2000);
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth,window.innerHeight);
  var earth_v_y = 0.07;
  var AU=290;
  var v_max=200;
  var moving;
  var rocket_stop=true;
  var t = Math.PI;
  var t_delta= Math.PI/180;
  var camera_num=10;
  var planets=[];
  var gravity=false;
  var controls = new THREE.OrbitControls( camera );
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.screenSpacePanning=true;

// Function for Gyroscope- Cell phones and tablets only    
  if (window.Gyroscope) 
  {         
    let gyroscope = new Gyroscope({frequency: 60});
    var angle_v=controls.getPolarAngle();
    var angle_h=controls.getAzimuthalAngle();
    gyroscope.addEventListener('reading', e => {
      angle_v+= gyroscope.x/60;
      angle_h+= gyroscope.y/60;
      cam_dir.x = 100 * Math.sin(angle_h+angle_v);
      cam_dir.y = 100 * Math.sin(angle_v);
      cam_dir.z = 100 * Math.cos(angle_h);
      controls.target = new THREE.Vector3(cam_dir.x,cam_dir.y,cam_dir.z);
      camera.updateProjectionMatrix();
      controls.update();
    });
    gyroscope.start();
  }
// Rendering Function
  function createGlRenderer() 
  {
    var glRenderer = new THREE.WebGLRenderer({alpha:true});
    glRenderer.setClearColor(0xECF8FF);
    glRenderer.setPixelRatio(window.devicePixelRatio);
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    glRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.zIndex = 1;
    glRenderer.domElement.style.top = 0;
    return glRenderer;
  }

// Controls:
// Control Camera by keyboard   
  controls.keys = {
  LEFT: 37, //left arrow
  UP: 38, // up arrow
  RIGHT: 39, // right arrow
  BOTTOM: 40 // down arrow
  }
  
  function speed_up() 
  {
    chosen_planets=chose_to_render();
    rocket_stop=false;
    $("#nearest_planet").text(chosen_planets[0].name);
    earth_v_y=earth_v_y/(camera.fov/standart_fov);
    t_delta=t_delta/2;
    camera.updateProjectionMatrix();
    controls.update();
  }
  
  function speed_down() 
  {
    earth_v_y = 0.07;
    t_delta = Math.PI/180;
    rocket_stop=true;
    camera.updateProjectionMatrix();
    controls.update();
  }
  function ahead(speed)
  {
    if (!speed) 
    {
      speed=4;
    }
    speed_up();
    azimuth=controls.getAzimuthalAngle();
    polar=controls.getPolarAngle(); 
    scene.position.x+=speed*Math.sin(azimuth);
    scene.position.z+=speed*Math.cos(azimuth);
    scene.position.y+=speed*Math.cos(polar);      
  }
  function left(speed)
  {
    if (!speed) 
    {
      speed=4;
    }
    speed_up();
    controls.update();
    renderer.render(scene,camera);
    azimuth=controls.getAzimuthalAngle();
    polar=controls.getPolarAngle(); 
    scene.position.z-=speed*Math.sin(azimuth);
    scene.position.x+=speed*Math.cos(azimuth);
  }
  function back(speed)
  {
    if (!speed) 
    {
      speed=4;
    }
      speed_up();
      controls.update();
      renderer.render(scene,camera);
      azimuth=controls.getAzimuthalAngle();
      polar=controls.getPolarAngle(); 
      scene.position.x-=speed*Math.sin(azimuth);
      scene.position.z-=speed*Math.cos(azimuth);
      scene.position.y-=speed*Math.cos(polar);
    }
  
  function right(speed)
  {
    if (!speed) 
    {
      speed=4;
    }
    speed_up();
    controls.update();
    renderer.render(scene,camera);
    azimuth=controls.getAzimuthalAngle();
    polar=controls.getPolarAngle(); 
    scene.position.z+=speed*Math.sin(azimuth);
    scene.position.x-=speed*Math.cos(azimuth);
  }
  
  var onKeyDown = function ( event ) 
  {
    switch ( event.keyCode ) {
      case 87: // w
        ahead();
        break;
      case 65: // d
        left();
        break;
      case 83: // s
        back();
        break;
      case 68: // a
        right();
        break;
      case 81:
        speed_up();
        controls.update();
        renderer.render(scene,camera);
        scene.position.y-=10;
        break;
      case 69:
        speed_up();
        controls.update();
        renderer.render(scene,camera);
        scene.position.y+=10;
        break;
      case 32:
        if (moving==true)
        {
          moving=false;
        }
        else
        {
          moving=true;
        }
        break; 
      case 82:
        break;
      case 49:
        //camera_num=0;
        scene.position.x = -mercury.position.x +10 + mercury.r;
        scene.position.y = -mercury.position.y +10 ;
        scene.position.z = -mercury.position.z +10 + mercury.r;
        break;
      case 50:
        //camera_num=1;
        scene.position.x = -venus.position.x +10 + venus.r;
        scene.position.y = -venus.position.y +10 ;
        scene.position.z = -venus.position.z +10 + venus.r;
        break;
      case 51:
        //camera_num=2;
        scene.position.x = -earth.position.x +10 +earth.r;
        scene.position.y = -earth.position.y +10 ;
        scene.position.z = -earth.position.z +10 +earth.r; 
        break;
      case 52:
        //camera_num=3;
        scene.position.x = -mars.position.x +10 +mars.r;
        scene.position.y = -mars.position.y +10 ;
        scene.position.z = -mars.position.z +10 +mars.r; 
        break;
      case 53:
        //camera_num=4;
        scene.position.x = -jupiter.position.x +10 + jupiter.r;
        scene.position.y = -jupiter.position.y ;
        scene.position.z = -jupiter.position.z +10 + jupiter.r;
        break;
      case 54:
        //camera_num=5;
        scene.position.x = -saturn.position.x +10 + saturn.r;
        scene.position.y = -saturn.position.y ;
        scene.position.z = -saturn.position.z +10 + saturn.r; 
        break;
      case 55:
        //camera_num=6;
        scene.position.x = -neptune.position.x +10 + neptune.r;
        scene.position.y = -neptune.position.y ;
        scene.position.z = -neptune.position.z +10 + neptune.r; 
        break;
      case 56:
        //camera_num=7;
        scene.position.x = -uranus.position.x +10 + uranus.r;
        scene.position.y = -uranus.position.y ;
        scene.position.z = -uranus.position.z +10 + uranus.r;  
        break;
      case 57:
        //camera_num=8;
        break;
      case 71:
        gravity=!gravity;
        break;
      }
    };
    var onKeyUp = function ( event ) {
      switch ( event.keyCode ) {
        case 87: // w
          speed_down();
          break;
        case 65: // d
          speed_down();              
          break;
        case 83: // s
          speed_down();
          break;
        case 68: // a
          speed_down();
          break;
        case 81:
          speed_down();
          break;
        case 69:
          speed_down();
          break;
      }
    };
  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );
// Backgounds
function setBackground()
{
  var reflectionCube = new THREE.CubeTextureLoader()
    .setPath( 'textures/' )
    .load( [ '2k_stars_milky_way.jpg', '2k_stars_milky_way.jpg', '2k_stars_milky_way.jpg', '2k_stars_milky_way.jpg', '2k_stars_milky_way.jpg', '2k_stars_milky_way.jpg' ] );
  reflectionCube.format = THREE.RGBFormat;
  scene.background = reflectionCube;
}
       
$('#space').append(renderer.domElement);

var loader = new THREE.CubeTextureLoader();
loader.setPath( 'textures/' );
// Planets:

var earth_radio=4;
//Sun:
  var sun_geometry = new THREE.SphereBufferGeometry(60,60,60);
  var sun_texture = new THREE.TextureLoader().load( 'textures/sun2k.jpg' );
  var sun_material = new THREE.MeshBasicMaterial( { map: sun_texture } );
  var sun = new THREE.Mesh(sun_geometry,sun_material);
  sun.size = new THREE.Box3().setFromObject( sun );
  sun.position.set( 0, 0, 0 );
  sun.geometry.__dirtyElements = true;
  sun.geometry.__dirtyVertices = true;
  scene.add(sun);    
//Mercury 1
  var mercury_geometry = new THREE.SphereBufferGeometry(earth_radio*0.38,45,45);
  var mercury_texture = new THREE.TextureLoader().load( 'textures/mercury2k.jpg' );
  var mercury_material = new THREE.MeshBasicMaterial( { map: mercury_texture } );
  var mercury = new THREE.Mesh(mercury_geometry,mercury_material);
  mercury.ap=0.31 * AU;
  mercury.pe=0.47 * AU;
  mercury.r=earth_radio*0.38;
  mercury.rotation_v_y = 2;
//0.0065;
  mercury.position.set( mercury.ap * Math.cos(t), 0 , mercury.pe * Math.sin(t) );
  mercury.composition = [42, 29, 22, 6, 0.5];
  mercury.composition.labels = ["Molecular Oxygen: 42%", "Sodium: 29%", "Hydrogen: 22%", "Helium: 6%", "Potassium: 0.5%"];

  mercury.surface_temp = [ 100 , 300 , 700 ];
  mercury.surface_temp.labels = [ "min" , "mean" , "max" ];
  mercury.selected=false;
  mercury.callback = function() 
  { 
    $('#myModal').modal('show');
    $('#modal_title').text(this.name);
    render_chart(this.name , "Temperature" , this.surface_temp ,  this.surface_temp.labels , 'doughnut' );
    render_chart(this.name , "Composition" , this.composition ,  this.composition.labels , 'doughnut' );
    render_chart(this.name , "Radious" , [this.r,earth.r] ,  [this.name,"Earth"] , 'bar' );
  }
  mercury.moons=[];
  mercury.geometry.__dirtyElements = true;
  mercury.geometry.__dirtyVertices = true;
  scene.add(mercury);
// Distance Line between Sun and Mercury
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( mercury.position.x, mercury.position.y, mercury.position.z) );
  var mercury_line = new THREE.Line( geometry, material );
  scene.add( mercury_line );
  planets.push(mercury);
  mercury.line=mercury_line;
  mercury.name="Mercury";
  mercury.distance="35 million miles";


// Venus 2
  var venus_geometry = new THREE.SphereBufferGeometry(earth_radio*0.95,45,45);
  var venus_texture = new THREE.TextureLoader().load( 'textures/venus2k.jpg' );
  var venus_material = new THREE.MeshBasicMaterial( { map: venus_texture } );
  var venus = new THREE.Mesh(venus_geometry,venus_material);
  venus.ap=0.73 * AU;
  venus.pe=0.72 * AU;
  venus.r=earth_radio*0.95;
  venus.rotation_v_y = 0.0039;
  venus.position.set( venus.ap * Math.cos(t), 0 , venus.pe * Math.sin(t) );
  venus.name = "Venus";
  venus.composition = [ 96.5 , 3.5 , 0.015 , 0.007 , 0.002 ];
  venus.composition.labels = ["96.5% carbon dioxide", "3.5% nitrogen" , "0.015% sulfur dioxide" , "0.007% argon" , "0.002% water vapour"];
  venus.surface_temp = [ 737 ];
  venus.surface_temp.labels = [ "mean" ];
  venus.selected=false;
  venus.callback = function() { 
    $('#myModal').modal('show');
    $('#modal_title').text(this.name);
    render_chart(this.name , "Temperature" , this.surface_temp ,  this.surface_temp.labels , 'doughnut' );
    render_chart(this.name , "Composition" , this.composition ,  this.composition.labels , 'doughnut' );
    render_chart(this.name , "Radious" , [this.r,earth.r] ,  [this.name,"Earth"] , 'bar' );
  }
  venus.moons=[];
  venus.geometry.__dirtyElements = true;
  venus.geometry.__dirtyVertices = true;
  scene.add(venus);
  planets.push(venus);
// Distance Line between Sun and Venus
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( venus.position.x, venus.position.y, venus.position.z) );
  var venus_line = new THREE.Line( geometry, material );
  scene.add( venus_line );
  venus.line = venus_line;
  venus.distance = "67 million miles";
// 
  
//Earth 3
  var earth_geometry = new THREE.SphereBufferGeometry(earth_radio,45,45);
  var earth_texture = new THREE.TextureLoader().load( 'textures/earth2k.jpg' );
  var earth_material = new THREE.MeshBasicMaterial( { map: earth_texture } );
  var earth = new THREE.Mesh(earth_geometry,earth_material);
  earth.ap=1 * AU;
  earth.pe=1 * AU;
  earth.position.set( earth.ap * Math.cos(t), 0 , earth.pe * Math.sin(t) );
  earth.r=earth_radio;
  earth.rotation_v_y = 1;
  earth.composition = [ 78.08 , 20.95 , 0.934 , 0.0408 , 1 ];
  earth.composition.labels = ["78.08% nitrogen",  "20.95% oxygen", "0.934% argon", "0.0408% carbon dioxide", "1% water vapor (climate variable)"];
  earth.surface_temp = [ 184 , 288 , 330 ];
  earth.surface_temp.labels = [ "min" , "mean" , "max" ];
  earth.selected=false;
  earth.callback = function() { 
    $('#myModal').modal('show');
    $('#modal_title').text(this.name);
    render_chart(this.name , "Temperature" , this.surface_temp ,  this.surface_temp.labels , 'doughnut' );
    render_chart(this.name , "Composition" , this.composition ,  this.composition.labels , 'doughnut' );
    render_chart(this.name , "Radious" , [this.r,earth.r] ,  [this.name,"Earth"] , 'bar' );
  }
  earth.geometry.__dirtyElements = true;
  earth.geometry.__dirtyVertices = true;
  scene.add(earth);
  planets.push(earth);
// Moon
  var moon_geometry = new THREE.SphereBufferGeometry(earth_radio*0.27,45,45);
  var moon_texture = new THREE.TextureLoader().load( 'textures/moon_very_low.jpg' );
  var moon_material = new THREE.MeshBasicMaterial( { map: moon_texture } );
  var moon = new THREE.Mesh(moon_geometry,moon_material);
  moon.offset= 2*(earth_radio)+ 0.0024*AU;
  moon.position.set( earth.position.x, earth.position.y, earth.position.z + moon.offset );
  earth.moons=[];
  earth.moons.push(moon);
  scene.add(moon);
// Distance Line between Sun and Earth
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( earth.position.x, earth.position.y, earth.position.z) );
  var earth_line = new THREE.Line( geometry, material );
  scene.add( earth_line );
  earth.line = earth_line;
  earth.name = "Earth";
  earth.distance="93 million miles";
  var geometry = new THREE.PlaneBufferGeometry( 5 , 5 , 20, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );


//Mars 4
  var mars_geometry = new THREE.SphereBufferGeometry(earth_radio*0.53,45,45);
  var mars_texture = new THREE.TextureLoader().load( 'textures/mars2k.jpg' );
  var mars_material = new THREE.MeshBasicMaterial( { map: mars_texture } );
  var mars = new THREE.Mesh(mars_geometry,mars_material);
  mars.ap=1.666 * AU;
  mars.pe=1.382 * AU;
  mars.position.set( mars.ap * Math.cos(t), 0 , mars.pe * Math.sin(t) );
  mars.r=earth_radio*0.53;
  mars.rotation_v_y = 0.51;
  mars.moons=[];
  mars.composition = [ 95.97 , 1.93 , 1.89 , 0.146 , 0.0557 ];
  mars.composition.labels = [ "95.97% carbon dioxide" , "1.93% argon" , "1.89% nitrogen" , "0.146% oxygen" , "0.0557% carbon monoxide" ];
  mars.surface_temp = [ 130 , 210 , 308 ];
  mars.surface_temp.labels = ["min","mean", "max"];
  mars.selected=false;
  mars.callback = function() { 
    $('#myModal').modal('show');
    $('#modal_title').text(this.name);
    render_chart(this.name , "Temperature" , this.surface_temp ,  this.surface_temp.labels , 'doughnut' );
    render_chart(this.name , "Composition" , this.composition ,  this.composition.labels , 'doughnut' );
    render_chart(this.name , "Radious" , [this.r,earth.r] ,  [this.name,"Earth"] , 'bar' );
  }
  mars.geometry.__dirtyElements = true;
  mars.geometry.__dirtyVertices = true;
  scene.add(mars);
  planets.push(mars);
// Distance Line between Sun and mars
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( mars.position.x, mars.position.y, mars.position.z) );
  var mars_line = new THREE.Line( geometry, material );
  scene.add( mars_line );
  mars.line = mars_line;
  mars.name = "Mars";
  mars.distance = "142 million miles "
// 
  var geometry = new THREE.PlaneBufferGeometry( 5 , 5 , 20, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

// 
//Phobos moon of mars
  var phobos_geometry = new THREE.SphereBufferGeometry(earth_radio*0.18,45,45);
  var phobos_texture = new THREE.TextureLoader().load( 'textures/phobos.jpg' );
  var phobos_material = new THREE.MeshBasicMaterial( { map: phobos_texture } );
  var phobos = new THREE.Mesh(phobos_geometry,phobos_material);
  phobos.offset= 1*(mars.r) - 5;
  mars.moons.push(phobos);
  phobos.position.set( mars.position.x + phobos.offset, mars.position.y, mars.position.z + phobos.offset);
  phobos.geometry.__dirtyElements =true;
  phobos.geometry.__dirtyVertices = true;
  scene.add(phobos);
//Deimos 2nd moon of mars
  var deimos_geometry = new THREE.SphereBufferGeometry(earth_radio*0.1,20,20);
  var deimos_texture = new THREE.TextureLoader().load( 'textures/deimos.jpg' );
  var deimos_material = new THREE.MeshBasicMaterial( { map: deimos_texture } );
  var deimos = new THREE.Mesh(deimos_geometry,deimos_material);
  deimos.offset= 1*(mars.r) + 5;
  mars.moons.push(deimos);
  deimos.position.set( mars.position.x + deimos.offset, mars.position.y, mars.position.z + deimos.offset );
  deimos.geometry.__dirtyElements=true;
  deimos.geometry.__dirtyVertices = true;
  scene.add(deimos);
//Jupiter 5
  var jupiter_geometry = new THREE.SphereBufferGeometry(earth_radio*11.20,45,45);
  var jupiter_texture = new THREE.TextureLoader().load( 'textures/jupiter2k.jpg' );
  var jupiter_material = new THREE.MeshBasicMaterial( { map: jupiter_texture } );
  var jupiter = new THREE.Mesh(jupiter_geometry,jupiter_material);
  jupiter.ap=5.4588  * AU;
  jupiter.pe=4.9501 * AU;
  jupiter.position.set( jupiter.ap * Math.cos(t), 0 , jupiter.pe * Math.sin(t) );
  jupiter.r=earth_radio*11.20;
  jupiter.rotation_v_y = 27.24;
  jupiter.composition = [ 89 , 10 , 0.3 , 0.026 , 0.0028 ];
  jupiter.composition.labels = [ "89%  hydrogen" , "10%  helium" , "0.3% methane" , "0.026% ammonia" , "0.0028% hydrogen deuteride" ];
  jupiter.surface_temp =[ 112 , 165 ];
  jupiter.surface_temp.labels =[ "0.1 Bar" , "1 Bar" ];
  jupiter.selected=false;
  jupiter.callback = function() {
    $('#myModal').modal('show');
    $('#modal_title').text(this.name);
    render_chart(this.name , "Temperature" , this.surface_temp ,  this.surface_temp.labels , 'doughnut' );
    render_chart(this.name , "Composition" , this.composition ,  this.composition.labels , 'doughnut' );
    render_chart(this.name , "Radious" , [this.r,earth.r] ,  [this.name,"Earth"] , 'bar' );
  }
  jupiter.geometry.__dirtyElements=true;
  jupiter.geometry.__dirtyVertices = true;
  scene.add(jupiter);
  planets.push(jupiter);
// Distance Line between Sun and jupiter
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( jupiter.position.x, jupiter.position.y, jupiter.position.z) );
  var jupiter_line = new THREE.Line( geometry, material );
  scene.add( jupiter_line );
  jupiter.line = jupiter_line;
  jupiter.name = "Jupiter";
  jupiter.distance ="484 million miles" ;
// 

//Saturn 6
  var saturn_geometry = new THREE.SphereBufferGeometry(earth_radio*9.5,45,45);
  var saturn_texture = new THREE.TextureLoader().load( 'textures/saturn2k.jpg' );
  var saturn_material = new THREE.MeshBasicMaterial( { map: saturn_texture } );
  var saturn = new THREE.Mesh(saturn_geometry,saturn_material);
  saturn.ap=10.1238  * AU;
  saturn.pe=9.0412 * AU;
  saturn.position.set( saturn.ap * Math.cos(t), 0 , saturn.pe * Math.sin(t) );
  saturn.r=earth_radio*9.5;
  saturn.rotation_v_y = 22.01;
  saturn.composition = [ 96.3 , 3.25 , 0.3 , 0.45 , 0.0125 ];
  saturn.composition.labels = [ "96.3%±2.4%  hydrogen", "3.25%±2.4%  helium", "0.45%±0.2%  methane", "0.0125%±0.0075% ammonia" ];
  saturn.surface_temp = [ 84 , 134 ];
  saturn.surface_temp.labels = [ "0.1 Bar" , "1 Bar" ];
  saturn.selected=false;
  saturn.callback = function() { 
    $('#myModal').modal('show');
    $('#modal_title').text(this.name);
    render_chart(this.name , "Temperature" , this.surface_temp ,  this.surface_temp.labels , 'doughnut' );
    render_chart(this.name , "Composition" , this.composition ,  this.composition.labels , 'doughnut' );
    render_chart(this.name , "Radious" , [this.r,earth.r] ,  [this.name,"Earth"] , 'bar' );
  }
  saturn.geometry.__dirtyElements=true;
  saturn.geometry.__dirtyVertices = true;
  scene.add(saturn);
  planets.push(saturn);
// Distance Line between Sun and saturn
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( saturn.position.x, saturn.position.y, saturn.position.z) );
  var saturn_line = new THREE.Line( geometry, material );
  scene.add( saturn_line );
  saturn.line=saturn_line;
  saturn.name="Saturn";
  saturn.distance = "889 million miles";
  var geometry = new THREE.PlaneBufferGeometry( 5 , 5 , 20, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  var geometry = new THREE.RingBufferGeometry(earth_radio*9.5 + 50,earth_radio*9.5 + 90, 50, 50 );
  var satrurn_ring_material = new THREE.TextureLoader().load( 'textures/saturnringcolor_very_low.jpg' );
  var material = new THREE.MeshBasicMaterial( { map: satrurn_ring_material, side: THREE.DoubleSide } );
  var saturn_rings = new THREE.Mesh( geometry, material );
  scene.add( saturn_rings );
  saturn_rings.position.set( saturn.position.x , 0, saturn.position.z );
  saturn_rings.rotation.x=1.57;
  saturn_rings.offset=0;
  saturn.ring=saturn_rings;
//Uranus 7
  var uranus_geometry = new THREE.SphereBufferGeometry(earth_radio*4.100,45,45);
  var uranus_texture = new THREE.TextureLoader().load( 'textures/uranus2k.jpg' );
  var uranus_material = new THREE.MeshBasicMaterial( { map: uranus_texture } );
  var uranus = new THREE.Mesh(uranus_geometry,uranus_material);
  uranus.ap=20.11  * AU;
  uranus.pe=18.33 * AU;
  uranus.position.set( uranus.ap * Math.cos(t), 0 , uranus.pe * Math.sin(t) );
  uranus.r=earth_radio*4.100;
  uranus.rotation_v_y = 8.84;
  uranus.composition = [ 83 , 15 , 2.3 , 0.009 ];
  uranus.composition.labels = [ "83% hydrogen" , "15% helium" , "2.3% methane" , "0.009% hydrogen deuteride" ];
  uranus.surface_temp = [ 47 , 53 , 57 , 76 ];
  uranus.surface_temp.labels = [ "0.1 Bar min" , "0.1 Bar mean" , "0.1 Bar max" , "1 Bar mean" ];
  uranus.selected=false;
  uranus.callback = function() { 
    $('#myModal').modal('show');
    $('#modal_title').text(this.name);
    render_chart(this.name , "Temperature" , this.surface_temp ,  this.surface_temp.labels , 'doughnut' );
    render_chart(this.name , "Composition" , this.composition ,  this.composition.labels , 'doughnut' );
    render_chart(this.name , "Radious" , [this.r,earth.r] ,  [this.name,"Earth"] , 'bar' );
  }
  uranus.geometry.__dirtyElements=true;
  uranus.geometry.__dirtyVertices = true;
  scene.add(uranus);
  planets.push(uranus);
// Distance Line between Sun and uranus
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( uranus.position.x, uranus.position.y, uranus.position.z) );
  var uranus_line = new THREE.Line( geometry, material );
  scene.add( uranus_line );
  uranus.line = uranus_line;
  uranus.name = "Uranus";
  uranus.distance = "1.79 billion miles";
// 
//Neptune 8
  var neptune_geometry = new THREE.SphereBufferGeometry(earth_radio*3.88,45,45);
  var neptune_texture = new THREE.TextureLoader().load( 'textures/neptune2k.jpg' );
  var neptune_material = new THREE.MeshBasicMaterial( { map: neptune_texture } );
  var neptune = new THREE.Mesh(neptune_geometry,neptune_material);
  neptune.ap=30.33 * AU;
  neptune.pe=29.81 * AU;
  neptune.position.set( neptune.ap * Math.cos(t), 0 , neptune.pe * Math.sin(t) );
  neptune.r=earth_radio*3.88;
  neptune.rotation_v_y = 5.81;
  neptune.composition = [ 80 , 19 , 1.5 , 0.019, 0.00015 ];
  neptune.composition.labels = [ "80% hydrogen (H2)" , "19% helium (He)" , "1.5% methane (CH4)" , "0.019% hydrogen deuteride (HD)" , "0.00015% ethane (C2H6)" ];
  neptune.surface_temp = [ 55 , 72 ];
  neptune.surface_temp.labels = [ "0.1 Bar" , "1 Bar" ];
  neptune.selected=false;
  neptune.callback = function() { 
    $('#myModal').modal('show');
    $('#modal_title').text(this.name);
    render_chart(this.name , "Temperature" , this.surface_temp ,  this.surface_temp.labels , 'doughnut' );
    render_chart(this.name , "Composition" , this.composition ,  this.composition.labels , 'doughnut' );
    render_chart(this.name , "Radious" , [this.r,earth.r] ,  [this.name,"Earth"] , 'bar' );
  }
  neptune.geometry.__dirtyElements=true;
  neptune.geometry.__dirtyVertices = true;
  scene.add(neptune);
  planets.push(neptune);
// Distance Line between Sun and neptune
  var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( neptune.position.x, neptune.position.y, neptune.position.z) );
  var neptune_line = new THREE.Line( geometry, material );
  scene.add( neptune_line );
  neptune.line = neptune_line;
  neptune.name = "Neptune";
  neptune.distance = "2.8 billion miles";
  var geometry = new THREE.PlaneBufferGeometry( 5 , 5 , 20, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  // Turn off autoupdate
  mercury.matrixAutoUpdate = false;
  mercury.updateMatrix();
  venus.matrixAutoUpdate = false;
  venus.updateMatrix();
  earth.matrixAutoUpdate = false;
  earth.updateMatrix();
  moon.matrixAutoUpdate = false;
  moon.updateMatrix();
  mars.matrixAutoUpdate = false;
  mars.updateMatrix();  
  phobos.matrixAutoUpdate = false;
  phobos.updateMatrix();
  deimos.matrixAutoUpdate = false;
  deimos.updateMatrix();
  jupiter.matrixAutoUpdate = false;
  jupiter.updateMatrix();
  saturn.matrixAutoUpdate = false;  
  saturn.updateMatrix();
  uranus.matrixAutoUpdate = false;
  uranus.updateMatrix();
  neptune.matrixAutoUpdate = false;
  neptune.updateMatrix();
              
  function connect_to(planet)
  {
    scene.position.x= -planet.position.x;//+ distance_to_planet_x_no_abs;
    scene.position.y= -planet.position.y;//+ distance_to_planet_y_no_abs;
    scene.position.z= -planet.position.z;//+ distance_to_planet_z_no_abs;
  }
              
  // function for counting distance- 
  //!!! is turned off since it hams performance
  // par = "" returns array [distance,distance_x,distance_y,distance_z]
  // par = "all" returns int distance
  // par = "x" returns distance_x
  // par = "y" returns distance_y
  // par = "z" returns distance_z
  function count_distance(planet,par)
  {
    result = [];
    distance_to_planet_x= [];
    distance_to_planet_x.push(scene.position.x);
    distance_to_planet_x.push(planet.position.x);
    distance_to_planet_x.sort(function(a, b) {return a - b;});
    distance_to_planet_x= Math.abs(Math.abs(distance_to_planet_x[1])-Math.abs(distance_to_planet_x[0]));

    distance_to_planet_y= [];
    distance_to_planet_y.push(scene.position.y);
    distance_to_planet_y.push(planet.position.y);
    distance_to_planet_y.sort(function(a, b) {return a - b;});
    distance_to_planet_y= Math.abs(Math.abs(distance_to_planet_y[1])-Math.abs(distance_to_planet_y[0]));
   
    distance_to_planet_z= [];
    distance_to_planet_z.push(scene.position.z);
    distance_to_planet_z.push(planet.position.z);
    distance_to_planet_z.sort(function(a, b) {return a - b;});
    distance_to_planet_z= Math.abs(Math.abs(distance_to_planet_z[1])-Math.abs(distance_to_planet_z[0]));

    distance_to_planet_all=Math.pow(distance_to_planet_x, 2)+Math.pow(distance_to_planet_z, 2)
    distance_to_planet_all=Math.pow(distance_to_planet_all,0.5);
    distance_to_planet_all=Math.pow(distance_to_planet_all, 2)+Math.pow(distance_to_planet_y, 2)
    distance_to_planet_all=Math.pow(distance_to_planet_all,0.5);                

    distance_to_planet_x_no_abs= (scene.position.x-planet.position.x);
    distance_to_planet_y_no_abs= (scene.position.y-planet.position.y);
    distance_to_planet_z_no_abs= (scene.position.z-planet.position.z);
    if (!par) 
    {
      result.push(distance_to_planet_all);
      result.push(distance_to_planet_x);
      result.push(distance_to_planet_y);
      result.push(distance_to_planet_z);
      return result;      
    }
    else if (par="all") 
    {
      return distance_to_planet_all;
    }
    else if (par="x") 
    {
      return distance_to_planet_x;
    }          
    else if (par="y") 
    {
      return distance_to_planet_y;
    }
    else if (par="z") 
    {
      return distance_to_planet_z;
    }
  }
              
  function nearest_planet(num)
  {
    distance_table=[];
    planets.forEach(function(planet, index, array)
    {
      distance_table.push([planet.name,count_distance(planet,"all")]);
    });
    distance_table=distance_table.sort(function(a, b){return a[1]-b[1]});
    if (!num) 
    {
      return(distance_table[0]);
    }
    else if(num=="all")
    {
      return(distance_table); 
    }
    else
    {
      return(distance_table[num]);
    }
  }
// for improve performance  it will render only 2 nearest planets. 
  function chose_to_render()
  {
    distance_table=[];
    planets.forEach(function(planet, index, array)
    {
      distance_table.push([planet,count_distance(planet,"all")]);
    });
    distance_table=distance_table.sort(function(a, b){return a[1]-b[1]});
    return [distance_table[0][0],distance_table[1][0]];
  }

//Default data:
  chosen_planets=chose_to_render();         
  camera.position.set( 1, 0, 0 );
  controls.update();
  renderer.render(scene,camera);
//Main function
var animate = function(){
  setTimeout( function() 
  {
    requestAnimationFrame( animate );
  }, 1000/15 );

  sun.rotation.y +=earth_v_y*4.3;  
  chosen_planets.forEach(function(planet, index, array) 
  {    
    planet.rotation.y += earth_v_y * planet.rotation_v_y;
    planet.updateMatrix();
    if (planet.moons) 
      {
        planet.moons.forEach(function(moon, index, array) 
        {
                moon.position.x=planet.position.x+ moon.offset*Math.cos(t);
                moon.position.z=planet.position.z+ moon.offset*Math.sin(t);
                moon.updateMatrix();
        });
      }
  });
                
/*
sun.updateMatrix();
mercury.updateMatrix();
venus.updateMatrix();
earth.updateMatrix();
moon.updateMatrix();
mars.updateMatrix();
phobos.updateMatrix();
deimos.updateMatrix();
jupiter.updateMatrix();
//asteroids_belt.updateMatrix();
saturn.updateMatrix();
uranus.updateMatrix();
neptune.updateMatrix();
//asteroids_belt_two.updateMatrix();
//*/
  if(moving==true)
  {
    if(rocket_stop==true)
    {
      $("#nearest_planet").text(nearest_planet()[0]);
    }
    planets.forEach(function(planet, index, array) {
      planet.updateMatrix();
      if (rocket_stop==true && camera.fov > standart_fov) 
      {
        camera.fov-=0.5;
        camera.updateProjectionMatrix(); 
      }
      planet.position.x = planet.ap * Math.cos(t);
      planet.position.z = planet.pe * Math.sin(t); 
      if (planet.moons) 
      {
        planet.moons.forEach(function(moon, index, array) 
        {
                moon.position.x=planet.position.x+ moon.offset*Math.cos(t);
                moon.position.z=planet.position.z+ moon.offset*Math.sin(t);
                moon.updateMatrix();
        });
      }
      if (planet.ring)
      {
        planet.ring.position.x=planet.position.x+planet.ring.offset;
        planet.ring.position.z=planet.position.z+planet.ring.offset;
      }
      if (planet.line) 
      {
        planet.line.geometry.vertices[1].x=planet.position.x;
        planet.line.geometry.vertices[1].y=planet.position.y;
        planet.line.geometry.vertices[1].z=planet.position.z;
        planet.line.geometry.verticesNeedUpdate =true;
      }   
    });
  }
  t-=t_delta;
  renderer.render(scene,camera);   
  }

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
//Mouse 
  function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(planets);
    if (intersects.length) {
      intersects[0].object.callback();
    }
    }
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    window.addEventListener( 'resize', onWindowResize, false );
              
// Resize window
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

// And finaly:
setBackground();
animate();
});