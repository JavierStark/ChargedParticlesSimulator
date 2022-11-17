class Particle{
  constructor(fixed, charge, position, resolutionConst){
    this.fixed = fixed;
    this.charge = charge;
    this.position = position;
    this.force = createVector(0,0);
    this.fillColor = charge > 0? "#344ceb" : "#f03322";
    this.strokeColor = fixed? "#824de3" : "#d6cc58";
    this.resolutionConst = resolutionConst;    
    this.diameter = charge*resolutionConst;
  }
  
  draw(){
    fill(this.fillColor);
    stroke(this.strokeColor);
    strokeWeight(this.resolutionConst*0.5);
    circle(this.position.x, this.position.y, this.diameter);
  }
  
  update(this_particle, particles){
    this.updateForce(this_particle, particles);
    this.updatePosition();
  }
  
  updateForce(this_particle, particles){
    if(this.fixed) return;
    for(let p of particles){    
      if(p === this_particle) continue;
      if(p5.Vector.dist(p.position, this.position) < 0.05){
        
      }
      let direction = p5.Vector.sub(this.position, p.position);
      direction.normalize();
      let newForce = p5.Vector.mult(direction, this.getForce(p));
      this.force = p5.Vector.add(newForce, this.force);    
    }
  }
  
  updatePosition(){
    if(this.fixed) return;
    this.position = p5.Vector.add(this.force, this.position);
  }  

  clicked(mousePosition){
    return p5.Vector.dist(mousePosition, this.position) <= (this.diameter/2);
  }
  
  
  getForce(particle){
    return this.resolutionConst * 3 * (this.charge*particle.charge)/(Math.pow(particle.position.dist(this.position), 2));
  }
}