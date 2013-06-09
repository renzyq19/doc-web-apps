/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var config = _default;

function Gunship(_x,_y,playerNum) {
    this.gunEnabled   = config.gunEnabled;
    this.fireRate     = config.fireRate;
    this.timeToFire   = config.fireRate;
    this.lives        = config.lives;
    this.bulletSpeed  = config.bulletSpeed;
    var model = new Kinetic.Polygon({
        points:[_x,_y,
        _x+56,_y,
        _x+56,_y+8,
        _x+40,_y+8,
        _x+40,_y+13,
        _x+68,_y+13,
        _x+68,_y+27,
        _x+40,_y+27,
        _x+40,_y+32,
        _x+56,_y+32,
        _x+56,_y+40,
        _x,_y+40],
        x: _x,
        y: _y,
        fill: colourMappings[playerNum-1],
        strokeWidth:0,
        offsetX: _x+20,
        offsetY: _y+20,
        width: 68,
        height:40
    });

    this.model = model;

    layer.add(model);
    layer.draw();
};