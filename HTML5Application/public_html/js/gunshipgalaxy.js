/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).ready(function(){
    controlInit(1);
    controlInit(2);
    
    layer.add(border);

    layer.add(debugText);
    layer.draw();
    
    anim.start();
});
var stage = new Kinetic.Stage({
    container: 'container',
    width: 800,
    height: 600
});

var layer = new Kinetic.Layer();
var border = new Kinetic.Rect({
    x:0,
    y:0,
    width:stage.getWidth(),
    height:stage.getHeight(),
    stroke:"black",
    strokeWidth:"1"
});

var spaceSpeed = 4;

//var pixel1 = debugPixel(0,0);
//var pixel2 = debugPixel(0,0);

//layer.add(pixel1);
//layer.add(pixel2);

var gunship1 = placeGunship(50,50,"red");
var gunship2 = placeGunship(200,200,"green");

var gunships = [gunship1,gunship2];
var debugText = new Kinetic.Text({
    x: stage.getWidth() / 2,
    y: 15,
    text: "NOTHING TO SHOW",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'green'
});

function goDirection(gunship){
    var rotation = gunship.getRotationDeg();
    var x = gunship.getX();
    var y = gunship.getY();
    switch (rotation){
        case 0:
            gunship.setX(x+spaceSpeed);
            break;
        case 90:
            gunship.setY(y+spaceSpeed);
            break;
        case 180:
            gunship.setX(x-spaceSpeed);
            break;
        case 270:
            gunship.setY(y-spaceSpeed);
            break;

    }

}
function placeGunship(_x,_y,colour) {
    var gHullSize = 40;

    var prongWidth = gHullSize*0.4;
    var prongHeight = gHullSize/5;
    var topProngX = _x+gHullSize;
    var topProngY = _y;
    var bottomProngX = _x+gHullSize;
    var bottomProngY = _y+gHullSize-prongHeight;

    var gunWidth = gHullSize*0.7;
    var gunHeight = gHullSize/3;
    var gunX = _x+gHullSize;
    var gunY = _y+gHullSize/3;

    function drawHull(){
        return new Kinetic.Rect({
            x:_x,
            y:_y,
            width:gHullSize,
            height:gHullSize,
            fill: colour,
            stroke:'none',
            strokeWidth: 0 
        });
    }
    function drawProng(mx,my){
        return new Kinetic.Rect({
            x:mx,
            y:my,
            width:prongWidth,
            height:prongHeight,
            fill: colour,
            stroke:'none',
            strokeWidth: 0 
        });
    }
    function drawGun(){
        return new Kinetic.Rect({
            x:gunX,
            y:gunY,
            width:gunWidth,
            height:gunHeight,
            fill: colour,
            stroke:'none',
            strokeWidth: 0 
        });
    }

    var hull = drawHull();
    var topProng = drawProng(topProngX,topProngY);
    var bottomProng = drawProng(bottomProngX,bottomProngY);
    var gun = drawGun();

    var gunship = new Kinetic.Group({
        x:_x,
        y:_y,
        rotationDeg: 0,
        offsetX: _x+gHullSize/2,
        offsetY: _y+gHullSize/2
    });

    gunship.add(hull);
    gunship.add(topProng);
    gunship.add(bottomProng);
    gunship.add(gun);


    layer.add(gunship);
    stage.add(layer);

    return gunship;

}

var anim = new Kinetic.Animation(function(frame) {
    //advanceShips(gunships);
    goDirection(gunship1);
    goDirection(gunship2);
    boundaryCheck(gunship1);
    boundaryCheck(gunship2);

},layer);


function advanceShips(gunships){
    for (var ship in gunships){
        goDirection(ship);
        boundaryCheck(ship);
    }
    //collisionCheck(gunships);
}
//
//function collisionCheck(gunships){
//    var coords = new Array();
//    for (var ship in gunships){
//        coords.push(getTopPoints(ship));
//    }
//}
//
//function debugPixel(_x,_y){
//    var pixel = new Kinetic.Rect({
//        x:_x,
//        y:_y,
//        width:1,
//        height:1,
//        fill:"black",
//        strokeWidth:1
//    });
//    
//    return pixel;
//}
//
//function getTopPoints(gunship){
//    var rotation = gunship.getRotationDeg();
//    var xcos = Math.round(Math.cos(rotation));
//    var ysin = Math.round(Math.sin(rotation));
//    var gunEndCoord = gunEndCoord(gunship);
//    var topLeftX = gunEndCoord[0]-(gHullSize/2)*ysin;
//    var topLeftY = gunEndCoord[1]-(gHullSize/2)*xcos;
//    var topRightX = gunEndCoord[0]+(gHullSize/2)*ysin;
//    var topRightY = gunEndCoord[1]+(gHullSize/2)*xcos;
//    pixel1 = debugPixel(topLeftX, topLeftY);
//    pixel2 = debugPixel(topRightX, topRightY);
//    layer.draw();
//    return [[topLeftX, topLeftY], [topRightX, topRightY]];
//}