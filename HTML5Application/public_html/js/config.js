/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var _default = {
spaceSpeed: 1,
bulletSpeed: 4,
fireRate: 30,
gunEnabled: true,
lives: 5
};

//document.write(_default.bulletSpeed);

var suddenDeath = _default;
//suddenDeath.lives = 1;

var colourMappings = ["red","green","orange","blue"];

//var controlxMappings = [shoot,left,right,up,down];
var control1Mappings = [32,37,39,38,40];
var control2Mappings = [69,65,68,87,83];
var control3Mappings = [84,71,74,89,72];
var control4Mappings = [79,76,192,80,186];

var controlMappings = [control1Mappings,
                       control2Mappings,
                       control3Mappings,
                       control4Mappings];