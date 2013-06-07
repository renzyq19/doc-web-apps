/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//var controlxMappings = [shoot,left,right,up,down];
var control1Mappings = [32,37,39,38,40];
var control2Mappings = [69,65,68,87,83];
var control3Mappings = [84,71,74,89,72];
var control4Mappings = [79,76,192,80,186];

var controlMappings = [control1Mappings, control2Mappings];

var maxWait = 30;

var waitTimes = [0, 0, 0, 0];

function controlInit(playerNum){
    var mapping = controlMappings[playerNum-1];
    var gunship = gunships[playerNum-1];
    window.addEventListener('keydown', function(e){
        switch(e.keyCode){
            case mapping[0]:
				if (waitTimes[playerNum - 1] == 0) {
					shootBullet(gunship);
					waitTimes[playerNum - 1] = maxWait;
				}
                break;
            case mapping[1]:
                gunship.setRotationDeg(180);
                break;
            case mapping[2]:
                gunship.setRotationDeg(0);
                break;
            case mapping[3]:
                gunship.setRotationDeg(270);
                break;
            case mapping[4]:
                gunship.setRotationDeg(90);
                break;
        }
        layer.draw();
    });
}      
