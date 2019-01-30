function Square(x, y, color){
  this.x = x;
  this.y = y;
  this.color = color;
  this.wall = 3; // 0 is wall, 1 is ending point, 2 is start point, 3 is for path
  this.number;
  this.prior;
  this.squareArray = [];

  var colorArray = ['#CCFFFF','#CCCCFF','#CC66FF','#CC99FF','#CC33FF','#CC00FF','#6600FF','#6633FF','#6666FF','#6699FF','#66CCFF','#66FFFF','#00FFFF','#00CCFF'
    ,'#0099FF','#0066FF','#0033FF', '#0000FF']

  Square.prototype.show = function(){
    fill(this.color);
    rect(this.x, this.y, 20, 20);
  }

  Square.prototype.changeColor = function(){
    this.color =('#0066FF');
  }

  Square.prototype.squareArrayMake = function(){
    this.squareArray.push(this.number);
    this.squareArray.push(this.prior);
  }


}
