function Celula(x,y,radio){
  this.pos = createVector(x,y);
  this.radio = radio;

  this.r =random(0,255);
  this.g =random(0,255);
  this.b =random(0,255);
  var c = color(this.r,this.g,this.b);
  var darkC = color(this.r-40,this.g-40,this.b-40);
  var yoff = 0;

  this.show = function(){
    fill(c);
    noStroke();
    strokeWeight(10);
    stroke(darkC);
    ellipse(this.pos.x, this.pos.y, this.radio*2, this.radio * 2);



  }

  this.playerShow = function(){
        fill(c);
        noStroke();
        strokeWeight(10);
        stroke(darkC);
        push();
        translate(this.pos.x, this.pos.y);
        beginShape();
        for (var a = 0; a < TWO_PI; a += PI / 200) {
            var cos_a = cos(a),
            sin_a = sin(a),
            // noise is symmetric about origin (move to 1,1)
            noi = noise(cos_a + 1, sin_a + 1, yoff);
            d = this.radio + map(noi, -1, 1, -15, 15);
            vertex(d * cos_a, d * sin_a);
          // ellipse(d * cos_a, d * sin_a, 4, 4);
          }
        endShape();
        pop();
        yoff += 0.02;

       /*fill(c);
       noStroke();
       strokeWeight(10);
       stroke(darkC);
       push();
       translate(this.pos.x, this.pos.y);
       beginShape();
       var xoff = 0;
       for (var a = 0; a < TWO_PI; a+=0.1) {

        var offset = map(noise(xoff,yoff), 0,1,-15,15);
        var gelatina = this.radio + offset;
        var x  = gelatina * cos(a);
        var y  = gelatina * sin(a);
        vertex(x,y);
        xoff += 0.02;

      }
      endShape(CLOSE);
      pop();
      yoff += 0.01; */
  }

  this.update = function(){
    var vel = createVector(mouseX - width/2, mouseY-height/2);
    vel.setMag(3);
    this.pos.add(vel);
  }

  this.come = function(other){
    var d = p5.Vector.dist(this.pos, other.pos);
    if(d< this.radio + other.radio){
        var sumaArea= (PI * this.radio *  this.radio) + (PI * other.radio *  other.radio);
        var   nuevoRadio = sqrt(sumaArea/PI);
        this.radio = lerp(this.radio ,nuevoRadio,0.8);
        return true;
    }
    else{
        return false;
    }
  }

}
