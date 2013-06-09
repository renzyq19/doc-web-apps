/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).ready(function(){
    
    controlInit(1);
    controlInit(2);
    
    stage.add(layer);
    
    layer.add(border);
    border.moveToBottom();
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
    strokeWidth:"1",
    fill:"black"
});

var gunship1 = new Gunship(50,50,1);
var gunship2 = new Gunship(200,200,2);

var debugText = new Kinetic.Text({
    x: 200 / 2,
    y: 15,
    text: gunship1.model.getX(),
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'green'
});

var gunships = [gunship1,gunship2];



function goDirection(model){
    var rotation = model.getRotation();
    var x = model.getX();
    var y = model.getY();
    model.setX(x + Math.round(Math.cos(rotation)*config.spaceSpeed));
    model.setY(y + Math.round(Math.sin(rotation)*config.spaceSpeed));
}

var anim = new Kinetic.Animation(function(frame) {
    advanceShip(gunship1);
    advanceShip(gunship2);
},layer);


function advanceShip(gunship){
    if (gunship.timeToFire>0)
        gunship.timeToFire--;
    goDirection(gunship.model);
    boundaryCheck(gunship);
 }