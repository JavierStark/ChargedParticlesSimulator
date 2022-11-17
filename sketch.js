var particles = [];
var fixed = false;
var pause = true;

var menuPosition;
var menuHeight;
var toggleButtonPos;
var resolutionConst;
function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight); 
  frameRate(60);
  menuPosition = height-height/9;
  menuHeight = height/9;
  buttonSize = menuHeight*0.9;
  toggleButtonPos = createVector(width - buttonSize, menuPosition+menuHeight/2);
  pauseButtonPos = createVector(buttonSize, menuPosition+menuHeight/2);
  resolutionConst = height/200;
}

function draw() {
  background(100);
    
  drawMenu();
  updateParticles();  
  drawParticles();
}

function mouseClicked(){  
  if(mouseY > menuPosition){
    if(mouseX > toggleButtonPos.x-buttonSize/2 &&
       mouseX < toggleButtonPos.x+buttonSize/2 &&
       mouseY > toggleButtonPos.y-buttonSize/2 &&
       mouseY < toggleButtonPos.y+buttonSize/2){
      
      fixed = !fixed;
    }
    if(mouseX > pauseButtonPos.x-buttonSize/2 &&
       mouseX < pauseButtonPos.x+buttonSize/2 &&
       mouseY > pauseButtonPos.y-buttonSize/2 &&
       mouseY < pauseButtonPos.y+buttonSize/2){
      
      pause = !pause;
    }

    return;
  }

  let position = createVector(mouseX, mouseY);  
  let hasDelete = false;

  if (mouseButton === LEFT) {
    for(let i = particles.length-1; i >= 0; i--){
      if(particles[i].clicked(position)){
        particles.splice(i, 1);
        hasDelete = true;
        break;
      }
    }
    if(hasDelete) return false;

    let charge = prompt("Introduce la carga");
    if(charge == null || charge == 0) return false;
    particles.push(new Particle(fixed, charge, position, resolutionConst));
  }
  return false;
}

function drawParticles(){
  particles.forEach(p => {
    p.draw();
  })
}

function drawMenu(){
  push();
  noStroke();
  fill("#5886d6");
  rect(0, menuPosition, width, menuHeight);
  
  rectMode(CENTER);
  fill(pause ? "#db3055" : "#58d67a");
  rect(pauseButtonPos.x, pauseButtonPos.y, buttonSize, buttonSize, 5);

  fill(fixed? "#824de3" : "#d6cc58");
  rect(toggleButtonPos.x, toggleButtonPos.y, buttonSize, buttonSize, 5);

  pop();
}

// function setupSlider(x, y, width){
//   let newSlider;
//   newSlider = createSlider(0, 255, 100);
//   newSlider.position(10, 10);
//   newSlider.style('width', '80px');
//   newSlider.addClass("slider");
//   newSlider.position(x,y);
//   newSlider.style("width", width+"px");
//   return newSlider;
// }

function updateParticles(){
  if(pause) return;
  for(let i = 0; i < particles.length; i++){
    particles[i].update(particles[i], particles);
    garbageColector(i);
  }
}

function garbageColector(index){
  let pos = particles[index].position;
  if(pos.x > width  || pos.x < 0 || pos.y > height || pos.y < 0 || particles[index].charge == 0){
    particles.splice(index, 1);
  }
  
}