// web variables
var map;
var marker;
var disabled = true;


// load leaflet map
function loadMap(){
  map = L.map('map').setView([53.44705, 14.49235], 18);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}


// draw puzzle map background
function loadPuzzleMap(){
  var canvas = document.getElementById("puzzle");
	var ctx = canvas.getContext("2d");

  for (var i = 0; i < 4; i++){
    for (var j = 0; j < 4; j++){
      if ((i + j) % 2 == 0){
        ctx.fillStyle = "#232426";
      }else{
        ctx.fillStyle = "#292b2d";
      }
    	ctx.fillRect(i*115, j*115, 115, 115);
    }
  }
}


// get current geolocation
function geolocate(){
  if (playing == 1){
    if(confirm("Do you want to stop the game?")){
      playing = 0;
      loadPuzzleMap();
    }else{
      return;
    }
  }
  navigator.geolocation.getCurrentPosition(function success(pos){
    var x = pos.coords.latitude;
    var y = pos.coords.longitude;

    map.setView([x, y], 18);
    if (marker != undefined){
      map.removeLayer(marker);
    }
    marker = L.marker([x, y]).addTo(map);

    document.getElementById("coordinates").innerHTML = x + ', ' + y;
    document.getElementById("map").style.display = "block";
    document.getElementById("rasterMapDiv").style.display = "none";

    disabled = true;
    document.getElementById('play').disabled = true;
    document.getElementById("play").classList.add('buttonDisabled');
    document.getElementById("play").classList.remove('buttonActive');
  },function error(err) {
    alert("Couldn't get your coordinates!");
  });
}


// save map as raster image
function raster(){
  if (playing == 1){
    if(confirm("Do you want to stop the game?")){
      playing = 0;
      loadPuzzleMap();
    }else{
      return;
    }
  }
  document.getElementById("map").style.display = "block";
  document.getElementById("rasterMapDiv").style.display = "none";

  if (document.getElementById("rasterMap") != null){
    document.getElementById("rasterMap").remove();
  }

  var canvas = document.createElement("canvas");

  html2canvas(document.getElementById("map"), {
    allowTaint: true,
    width: 460,
    height: 460
  }).then(function(canvas){
    canvas.classList.add("map");
    canvas.setAttribute("id", "rasterMap");
    document.getElementById("rasterMapDiv").appendChild(canvas);
  });

  document.getElementById("map").style.display = "none";
  document.getElementById("rasterMapDiv").style.display = "block";

  disabled = false;
  document.getElementById('play').disabled = false;
  document.getElementById("play").classList.add('buttonActive');
  document.getElementById("play").classList.remove('buttonDisabled');
}


// game variables
var array;
var playing = 0;
var xStart;
var yStart;
var xStop;
var yStop;


// play puzzle game
function play(){

  if (disabled == false){
    if (playing == 1){
      if(confirm("Do you want to start again?")){
      }else{
        return;
      }
    }else{
      playing = 1;
    }

    //
    var canvas = document.getElementById("rasterMap");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("puzzle");
    var ctx2 = canvas2.getContext("2d");

    // make array of indexes of puzzle peaces
    array = Array.from(Array(16).keys())

    // shuffle puzzle peaces
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    // change shape of array to 2D
    var newArray = [];
    while(array.length) newArray.push(array.splice(0,4));
    array = newArray

    // draw puzzle peaces
    for (var i = 0; i < 4; i++){
      for (var j = 0; j < 4; j++){
        //console.log(array[i][j] + ", " + array[i][j]%4 * 115 + ", " + Math.floor(array[i][j]/4) * 115);
        ctx2.drawImage(canvas,
          array[i][j]%4 * 115, Math.floor(array[i][j]/4) * 115, 115, 115,
          i * 115, j * 115, 115, 115);
      }
    }
  }
}


// load event listeners for the game
function loadListeners(){
  document.getElementById('puzzle').addEventListener("mousedown", dragPuzzle);
  document.getElementById('body').addEventListener("mouseup", dropPuzzle);
}


// check if puzzle peace is being dragged
function dragPuzzle(e) {
  if (playing == 1){
    document.getElementById("body").style.cursor = "grab";
    var rect = document.getElementById('puzzle').getBoundingClientRect();
    xStart = e.clientX - rect.left;
    yStart = e.clientY - rect.top;
    //console.log(xStart + ", " + yStart);
  }
}


// check if puzzle peace is being dropped
function dropPuzzle(e) {
  if (playing == 1){
    document.getElementById("body").style.cursor = "auto";
    var rect = document.getElementById('puzzle').getBoundingClientRect();
    xStop = e.clientX - rect.left;
    yStop = e.clientY - rect.top;
    //console.log(xStop + ", " + yStop);

    // check if puzzle peace is being dropped onto canvas
    if ((xStop >= 0) && (xStop <= 460) && (yStop >= 0) && (yStop <= 460)){
      var canvas = document.getElementById("rasterMap");
      var ctx = canvas.getContext("2d");
      var canvas2 = document.getElementById("puzzle");
      var ctx2 = canvas2.getContext("2d");

      //
      xStart = Math.floor(xStart/115);
      yStart = Math.floor(yStart/115);
      xStop = Math.floor(xStop/115);
      yStop = Math.floor(yStop/115);
      var peaceStart = array[xStart][yStart];
      var peaceStop = array[xStop][yStop]

      // swap peaces
      ctx2.drawImage(canvas,
        peaceStart%4 * 115, Math.floor(peaceStart/4) * 115, 115, 115,
        xStop * 115, yStop * 115, 115, 115);
      ctx2.drawImage(canvas,
        peaceStop%4 * 115, Math.floor(peaceStop/4) * 115, 115, 115,
        xStart * 115, yStart * 115, 115, 115);
      array[xStart][yStart] = peaceStop;
      array[xStop][yStop] = peaceStart;


      // check if puzzle is completed
      var tester = 0;
      var finished = true;
      for (var j = 0; j < 4; j++){
        for (var i = 0; i < 4; i++){
          if (array[i][j] != tester){
              finished = false;
          }
          tester++;
        }
      }

      if (finished == true){
        setTimeout(function delay(){
          if(confirm("You won! Do you want to start again?")){
            playing = 0;
            play();
          }else{
            playing = 0;
            loadPuzzleMap();
          }
        }, 1);
      }

    }
  }
}
