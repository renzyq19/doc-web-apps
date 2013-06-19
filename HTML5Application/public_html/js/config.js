/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var _default = {
spaceSpeed: 150, //pixels per second
bulletSpeed: 300, // pixels per second
fireRate: 500, //minimum ms between each shot
gunEnabled: true,
lives: 2,
minimumTimeBetweenBonuses: 6000 // minimum ms between 2 bonuses
};

var difficultyCheckTimes = [1500, 1000, 500];
var shootCheckTimes = [3000, 2500, 1800];
var gameDifficulty = 0;

var colourMappings = ["red", "#00FF00", "yellow", "blue"];
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
                   
var model1 = new Image();
var model2 = new Image();
var model3 = new Image();
var model4 = new Image();

model1.src = "graphics/model1.png";
model2.src = "graphics/model2.png";
model3.src = "graphics/model3.png";
model4.src = "graphics/model4.png";

var models = [model1,model2,model3,model4];

var numSprite = new Image();
numSprite.src = "graphics/text.png";

var numAnimations = {
        num: [{
          x: 0,
          y: 0,
          width: 10,
          height: 14
        }, {
          x: 10,
          y: 0,
          width: 10,
          height: 14
        }, {
          x: 20,
          y: 0,
          width: 10,
          height: 14
        }, {
          x: 30,
          y: 0,
          width: 10,
          height: 14
        }, {
          x: 40,
          y: 0,
          width: 10,
          height: 14
        }, {
          x: 50,
          y: 0,
          width: 10,
          height: 14
        }, {
          x: 60,
          y: 0,
          width: 10,
          height: 14
        }, {
          x: 70,
          y: 0,
          width: 10,
          height: 14
        }, {
          x: 80,
          y: 0,
          width: 10,
          height: 14
        }, {
          x: 90,
          y: 0,
          width: 10,
          height: 14
        }]
      };
