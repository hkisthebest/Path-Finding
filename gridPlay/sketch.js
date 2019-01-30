var arr = []; //array for the whole grid
var mainList = [];
var workingList = [];
var startAlert = true;
var endAlert = true;
var he;
var counter = 0;
var startingPoint;
var path = [];
var bb = 0;
function setup(){
  createCanvas(399 + (10 * 21) ,399 + (10 * 21)); //399 + (10 * 21) ,399 + (10 * 21)
  background(255);
  stroke(250);
  he = ceil((height - 1) / 21);
  // making a Square every 20px and push it in to the array
  for(let i = 1; i< width; i+=20){
    for(let j = 1; j< height; j+=20){
      arr.push(new Square(i, j, 255))
      j+=1
    }
    i += 1;
  }
  for(let v = 0; v< arr.length; v++){
    arr[v].number = v;
  }
  for(let q = 0; q < he * he; q++){
    if(q % he == 0 || q % he == he - 1 || q >= he * (he -1) || q <= he){
      arr[q].color = '#000000';
      arr[q].wall = 0;
    }
  }
  console.log(arr.length);
}
function draw(){
  switch (key){
    case 'w': //w for wall
    // if mouse is dragged, built the black wall
    if(mouseIsPressed){
      arr[returnMouse()].color = '#000000';
      arr[returnMouse()].wall = 0;
    }
    break;
    case 'd': //d for delete
    // if mouse is dragged, delete the black wall
    if(mouseIsPressed){
      arr[returnMouse()].color = '#ffffff';
      arr[returnMouse()].wall = 3;
    }
    break;
    case 'e': //e for ending point
    if(startAlert){
      //placing the ending point
      if(mouseIsPressed){
        arr[returnMouse()].color = '#f90421';
        arr[returnMouse()].wall = 1;
        arr[returnMouse()].number = returnMouse();
        startingPoint = returnMouse();
        console.log(returnMouse());
        startAlert = false;
      }
    }else if(startAlert == false){
      break;
    }
    break;
    case 's': // s for starting point
    if(endAlert){
      // placing the starting point
      if(mouseIsPressed){
        let b = returnMouse();
        arr[returnMouse()].color = '#3bd94e';
        arr[returnMouse()].wall = 2;
        arr[returnMouse()].prior = 0;
        arr[returnMouse()].number = returnMouse();
        arr[returnMouse()].squareArrayMake();
        mainList.push(arr[returnMouse()].squareArray);
        console.log(returnMouse());
        endAlert = false;
      }
      else if(endAlert == false){
        break;
      }
    }
    break;
    case 'b':
    begin();
    if(bb <= mainList.length - 1 && frameCount % 1 == 0){
      arr[mainList[bb][0]].changeColor();
      bb++;
    }
  }
  //showing the grid
  for(let s = 0; s < arr.length; s++){
    arr[s].show();
  }
}
//if mouse clicked, return which Square it is touching
function returnMouse(){
  for(let a = 0; a< arr.length; a++){
    if(arr[a].x < mouseX && arr[a].x + 21.5 > mouseX && arr[a].y < mouseY && arr[a].y + 21.5 > mouseY){
      return a;
    }
  }
}

function begin(){
  for (let z = 0 ; z < mainList.length; z++){
    if(mainList[z][0] == startingPoint){
      break;
    }
    else{
      firstStep(mainList[z]);
    }
  }
  let pointer = find(mainList);
  mainList.splice(pointer + 1, mainList.length - (pointer + 1));
  console.log(JSON.stringify(mainList));
  // path = findPath(mainList);
  // console.log(JSON.stringify(path));

}
// [15,1]    he = 7
function firstStep(element){
  for(let h = 0; h <= arr.length - 1; h++){
    if(h === element[0] - he  || h === element[0] + he || h === element[0] + 1 || h === element[0] - 1){
      if(arr[h].wall != 0 && arr[h].wall != 2){
        for(let a = 0; a <= mainList.length - 1; a++){
          if(h == mainList[a][0]){
            counter++;
          }
        }
        if(counter == 0){
          arr[h].prior = element[1] + 1;
          arr[h].squareArrayMake();
          // console.log(JSON.stringify(arr[h].squareArray));
          workingList.push(arr[h].squareArray);
        }
        counter = 0;
      }
    }
  }
  workingList.forEach(element => mainList.push(element));
  workingList = [];
}
function find(theArray){
  for(let qq = 0; qq <= theArray.length ; qq++){
    if(theArray[qq][0] == startingPoint){
      return qq;
    }
  }
}
