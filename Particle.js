class Particle{
  constructor(fixed, charge, position, resolutionConst){
    this.fixed = fixed;
    this.charge = charge;
    this.position = position;
    this.force = createVector(0,0);
    this.color = charge > 0? "#344ceb" : "#f03322";
    this.resolutionConst = resolutionConst;    
  }
  
  draw(){
    fill(this.color);
    circle(this.position.x, this.position.y, this.charge*this.resolutionConst)
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
  
  
  getForce(particle){
    return this.resolutionConst(this.charge*particle.charge)/(Math.pow(particle.position.dist(this.position), 2));
  }
}