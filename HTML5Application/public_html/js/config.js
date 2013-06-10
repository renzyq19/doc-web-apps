/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var _default = {
spaceSpeed: 2,
bulletSpeed: 4,
fireRate: 30,
gunEnabled: true,
lives: 5
};
//var suddenDeath = _default;
//suddenDeath.lives = 1;

var colourMappings = ["red","green","yellow","blue"];

//var controlxMappings = [shoot,left,right,up,down];
var control1Mappings = [32,37,39,38,40];
var control2Mappings = [81,65,68,87,83];
var control3Mappings = [84,71,74,89,72];
var control4Mappings = [79,76,192,80,186];

var controlMappings = [control1Mappings,
                       control2Mappings,
                       control3Mappings,
                       control4Mappings];