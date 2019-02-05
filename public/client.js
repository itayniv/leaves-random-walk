// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');




let leaves = [];
let leave = -1;
// let data = [];
let xoff = 0.0;
let yoff = 0.0;

let n;
let m;

let loaded = false;
let buttonToggle1 = false;
let buttonToggle2 = false;

// let sliderY;
// let sliderX;


let controllerSliderX = 0;
let controllerSliderY = 0;

let locationVector = [];


window.addEventListener('load', function() {
  fetch('/leaves_tsne.json')
  .then(function(response) {
    return response.json();
    // console.log(response);
  })
  .then(function(myJson) {
    for (var property1 in myJson) {
      leave ++
      // console.log(leave);
      leaves.push({
        x: myJson[property1].point[0],
        y: myJson[property1].point[1],
        leaveNumber: leave,
        path: myJson[property1].path
      });
    }
    // console.log(leaves);
    loaded = true;
  });
})


var sliderX = document.getElementById("rangeX");
var sliderY = document.getElementById("rangeY");
var toggle1 = document.getElementById("switch-1");
var toggle2 = document.getElementById("switch-2");



sliderX.oninput = function() {
  // console.log("sliderX", this.value);
  controllerSliderX = this.value;
  locationVector[0] = controllerSliderX;
  locationVector[1] = controllerSliderY;

  findClosestLeave(locationVector);

}

sliderY.oninput = function() {
  // console.log("slidery", this.value);
  // output.innerHTML = this.value;
  controllerSliderY = this.value;
  locationVector[0] = controllerSliderX;
  locationVector[1] = controllerSliderY;
  findClosestLeave(locationVector);

}



toggle1.oninput = function() {

  if (buttonToggle1){
    buttonToggle1 = false;
  } else{
    buttonToggle1 = true;
  }
  // console.log(buttonToggle);
}

toggle2.oninput = function() {

  if (buttonToggle2){
    buttonToggle2 = false;
  } else{
    buttonToggle2 = true;
  }
  // console.log(buttonToggle);
}


// function myFunction() {
//   var element = document.getElementById("myDIV");
//   element.classList.toggle("mystyle");
// }



function setup() {
  // background(200);
  frameRate(12); // Attempt to refresh at starting FPS
}

// let xoff = 0.0;

function draw() {
  if (loaded){

    if (buttonToggle1){
      xoff = xoff + 0.03;
      n = noise(xoff) * 1;
      locationVector[0] = n;
      let sliderX = document.getElementById("rangeX");
      sliderX.value = n;
    }

    if (buttonToggle2){
      yoff = yoff + 0.02;
      m = noise(yoff) * 1;
      locationVector[1] = m;
      let sliderY = document.getElementById("rangeY");
      sliderY.value = m;
    }

    document.getElementById("vector01").innerHTML = n;
    document.getElementById("vector02").innerHTML = m;

    findClosestLeave(locationVector);

  }
}




function findClosestLeave(currPositionVector){

  var nearest = findNearest(currPositionVector);
  document.getElementById("imageDiv").src = leaves[nearest[0].i].path;
}




var findNearest = d3.kNearestNeighbors()
// .extent([[-1, -1], [width + 1, height + 1]])
.extent([[-1, -1], [1, 1]])
.x(function(d) { return d.x; })
.y(function(d) { return d.y; })
.k(1)
.data(leaves);
