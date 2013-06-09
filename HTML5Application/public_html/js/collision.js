/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function boundaryCheck(gunship){
    var gunEndCoordX = gunEndCoord(gunship)[0];
    var gunEndCoordY = gunEndCoord(gunship)[1];
    layer.draw();
    var rotation = gunship.model.getRotationDeg();
    if (gunEndCoordX < 0 || gunEndCoordY <0
        || gunEndCoordX >stage.getWidth() || gunEndCoordY >stage.getHeight())
              gunship.model.setRotationDeg((rotation + 180)%360);
}

function gunEndCoord (gunship) {
   var gunLength = 48;
   var x = gunship.model.getX();
   var y = gunship.model.getY();
   var rotation = gunship.model.getRotation();
   x += Math.round(Math.cos(rotation)) * gunLength;
   y += Math.round(Math.sin(rotation)) * gunLength;
   return [x,y];
}