/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function controlInit(playerNum){
    var mapping = controlMappings[playerNum-1];
    var gunship = gunships[playerNum-1];
    window.addEventListener('keydown', function(e){
        switch(e.keyCode){
            case mapping[0]:
                if (gunship.gunEnabled && (gunship.timeToFire === 0)){
                    shootBullet(gunship);
                }
                break;
            case mapping[1]:
                gunship.model.setRotationDeg(180);
                break;
            case mapping[2]:
                gunship.model.setRotationDeg(0);
                break;
            case mapping[3]:
                gunship.model.setRotationDeg(270);
                break;
            case mapping[4]:
                gunship.model.setRotationDeg(90);
                break;
        }
        layer.draw();
    });
}      
