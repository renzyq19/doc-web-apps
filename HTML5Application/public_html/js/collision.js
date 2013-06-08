/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function boundaryCheck(model){
    var gunEndCoordX = gunEndCoord(model)[0];
    var gunEndCoordY = gunEndCoord(model)[1];
    layer.draw();
    var rotation = model.getRotationDeg();
    if (gunEndCoordX < 0 || gunEndCoordY <0
        || gunEndCoordX >stage.getWidth() || gunEndCoordY >stage.getHeight())
              model.setRotationDeg((rotation + 180)%360);
}

function gunEndCoord (model) {
   var gunLength = model.get('Rect')[3].getWidth();
   gunLength += model.get('Rect')[0].getWidth()/2;
   var x = model.getX();
   var y = model.getY();
   var rotation = model.getRotation();
   x += Math.round(Math.cos(rotation)) * gunLength;
   y += Math.round(Math.sin(rotation)) * gunLength;
   return [x,y];
}