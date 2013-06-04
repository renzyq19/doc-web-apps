/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function boundaryCheck(gunship){
    var gunEndCoordX = gunEndCoord(gunship)[0];
    var gunEndCoordY = gunEndCoord(gunship)[1];
    layer.draw();
    var rotation = gunship.getRotationDeg();
    if (gunEndCoordX < 0 || gunEndCoordY <0
        || gunEndCoordX >stage.getWidth() || gunEndCoordY >stage.getHeight())
              gunship.setRotationDeg((rotation + 180)%360);
}

function gunEndCoord (gunship) {
   var gunLength = gunship.get('Rect')[3].getWidth();
   gunLength += gunship.get('Rect')[0].getWidth()/2;
   var x = gunship.getX();
   var y = gunship.getY();
   x += Math.round(Math.cos(gunship.getRotation())) * gunLength;
   y += Math.round(Math.sin(gunship.getRotation())) * gunLength;
   return [x,y];
}