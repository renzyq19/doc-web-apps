/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var _default = {
spaceSpeed: 150, //pixels per second
bulletSpeed: 300, // pixels per second
fireRate: 500, //minimum ms between each shot
gunEnabled: true,
lives: 5,
minimumTimeBetweenBonuses: 1000 // minimum ms between 2 bonuses
};



var colourMappings = ["#FF0000", "#339933", "#FF9900", "#0000CC"];
var colourInvincibleMappings = ["#FF9999", "#00CC00", "#FFC266", "#6666E0"];

//var controlxMappings = [shoot,left,right,up,down];
var control1Mappings = [32,37,39,38,40];
var control2Mappings = [81,65,68,87,83];
var control3Mappings = [84,71,74,89,72];
var control4Mappings = [79,76,192,80,186];

var controlMappings = [control1Mappings,
                       control2Mappings,
                       control3Mappings,
                       control4Mappings];