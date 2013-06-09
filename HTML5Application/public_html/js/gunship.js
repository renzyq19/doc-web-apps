/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Gunship(_x,_y,playerNum) {
        this.timeToFire = 0;
        this.fireRate = 5;
        this.lives = 5;
        this.bulletSpeed = spaceSpeed * 2;
        
        var model = new Kinetic.Polygon({
            points: [_x,_y,
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
            fill: colourMappings[playerNum-1],
            strokeWidth:0,
            offsetX: _x+20,
            offsetY: _y+20
        });
        
        this.model = model;
        
        layer.add(model);
        layer.draw();
    };
    
    
var colourMappings = ["red","green","yellow","blue"];