var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["26ffb0b9-791b-4132-9918-1b0685013089","0f7c1b25-301c-4245-b1c5-f1d178d2b36e"],"propsByKey":{"26ffb0b9-791b-4132-9918-1b0685013089":{"name":"alienBeige_walk_1","sourceUrl":"assets/api/v1/animation-library/gamelab/MZhVSafRZ0zTo.guoIWvBvcVN2sJteV_/category_fantasy/alienBeige_walk.png","frameSize":{"x":72,"y":98},"frameCount":2,"looping":true,"frameDelay":5,"version":"MZhVSafRZ0zTo.guoIWvBvcVN2sJteV_","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":144,"y":98},"rootRelativePath":"assets/api/v1/animation-library/gamelab/MZhVSafRZ0zTo.guoIWvBvcVN2sJteV_/category_fantasy/alienBeige_walk.png"},"0f7c1b25-301c-4245-b1c5-f1d178d2b36e":{"name":"alienBeige_2","sourceUrl":"assets/api/v1/animation-library/gamelab/qrCR7O.po3guKfxv7w7acFi8DkZt735X/category_fantasy/alienBeige.png","frameSize":{"x":66,"y":92},"frameCount":1,"looping":true,"frameDelay":2,"version":"qrCR7O.po3guKfxv7w7acFi8DkZt735X","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":66,"y":92},"rootRelativePath":"assets/api/v1/animation-library/gamelab/qrCR7O.po3guKfxv7w7acFi8DkZt735X/category_fantasy/alienBeige.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

 playSound("assets/category_background/progression.mp3",true);

//variables
var gameState = "start";
var lifesWasted = 0;
var car1, car2, car3, car4;
var bigCar;
var boundary1, boundary2;
var sam;
var fin;

//sprites de boundary, sam, car1-4, bigCar y fin
boundary1 = createSprite(190,120,420,3);
boundary2 = createSprite(190,260,420,3);

sam = createSprite(26, 200, 15, 15); 
sam.shapeColor = "blue"; 
sam.setAnimation("alienBeige_2");
sam.scale = 0.3;

car1 = createSprite(100, 135, 10, 10); 
car1.shapeColor = "red"; 
car2 = createSprite(150, 225, 10, 10); 
car2.shapeColor = "red"; 
car3 = createSprite(200, 135, 10, 10); 
car3.shapeColor = "red"; 
car4 = createSprite(250, 225, 10, 10); 
car4.shapeColor = "red"; 

bigCar = createSprite(300, 190, 20, 50);
bigCar.shapeColor = "red";

fin = createSprite(390, 190, 20, 130);
fin.shapeColor = "yellow";

function draw() {
  //background
  background("white");
  
  //vidas gastadas
  stroke("red");
  textSize(20);
  text("Lifes wasted: " + lifesWasted, 190, 48);
  
  fill("lightblue");
  rect(0, 120, 55, 140);
  
  fill("yellow");
  rect(350, 120, 55, 140);
  
  //edgeSprites
  createEdgeSprites();
  
  //bounceOff para los carros entre las paredes
  car1.bounceOff(boundary1);
  car1.bounceOff(boundary2);
  car2.bounceOff(boundary1);
  car2.bounceOff(boundary2);
  car3.bounceOff(boundary1);
  car3.bounceOff(boundary2);
  car4.bounceOff(boundary1);
  car4.bounceOff(boundary2);
  
  bigCar.bounceOff(boundary1);
  bigCar.bounceOff(boundary2);
  
  //collide para Sam entre las paredes y las paredes izquierda y derecha
  sam.collide(boundary1);
  sam.collide(boundary2);
  sam.collide(leftEdge);
  sam.collide(rightEdge);
  
  
  estadoDelJuego();
  samBeingHit();
 
  
 drawSprites(); 
}

function estadoDelJuego(){
 if(gameState == "start"){
   stroke("blue");
   textSize(10);
   text("Press space to start, press the key arrows to move", 60, 202);
   
   //mover a los carros
   if(keyDown("space")){
     car1.velocityX = 0;
     car1.velocityY = 6;
     
     car2.velocityX = 0;
     car2.velocityY = -6;
     
     car3.velocityX = 0;
     car3.velocityY = 6;
     
     car4.velocityX = 0;
     car4.velocityY = -6;
     
     bigCar.velocityX = 0;
     bigCar.velocityY = 3;
     
     gameState = "play";
   }
 }
 if(gameState == "play"){
   //movimiento Sam
   if(keyDown("LEFT_ARROW")){
     sam.velocityX = -5;
     sam.velocityY = 0;
     sam.setAnimation("alienBeige_walk_1");
     sam.scale = 0.3;
   }
   if(keyDown("RIGHT_ARROW")){
     sam.velocityX = 5;
     sam.velocityY = 0;
     sam.setAnimation("alienBeige_walk_1");
     sam.scale = 0.3;
   }
   if(keyDown("UP_ARROW")){
     sam.velocityX = 0;
     sam.velocityY = -5;
     sam.setAnimation("alienBeige_walk_1");
     sam.scale = 0.3;
   }
   if(keyDown("DOWN_ARROW")){
     sam.velocityX = 0;
     sam.velocityY = 5;
     sam.setAnimation("alienBeige_walk_1");
     sam.scale = 0.3;
   }
   
   if(keyWentUp("LEFT_ARROW")){
     sam.velocityX = 0;
     sam.velocityY = 0;
     sam.setAnimation("alienBeige_2");
     sam.scale = 0.3;
   }
   if(keyWentUp("RIGHT_ARROW")){
     sam.velocityX = 0;
     sam.velocityY = 0;
     sam.setAnimation("alienBeige_2");
     sam.scale = 0.3;
   }
   if(keyWentUp("UP_ARROW")){
     sam.velocityX = 0;
     sam.velocityY = 0;
     sam.setAnimation("alienBeige_2");
     sam.scale = 0.3;
   }
   if(keyWentUp("DOWN_ARROW")){
     sam.velocityX = 0;
     sam.velocityY = 0;
     sam.setAnimation("alienBeige_2");
     sam.scale = 0.3;
   }
   
 }
 if(sam.isTouching(fin)){
   gameState = "end";
 }
 if(gameState == "end"){
   stopSound("assets/category_background/progression.mp3");
   
   stroke("green");
   textSize(20);
   text("You win!", 195, 97);
   
   sam.velocityX = 0;
   sam.velocityY = 0;
   sam.pause();
   
   car1.velocityX = 0;
   car1.velocityY = 0;
   car2.velocityX = 0;
   car2.velocityY = 0;  
   car3.velocityX = 0;
   car3.velocityY = 0;
   car4.velocityX = 0;
   car4.velocityY = 0;
  
   bigCar.velocityX = 0;
   bigCar.velocityY = 0;
 }
}

function samBeingHit(){
  if(sam.isTouching(car1)){
    lifesWasted = lifesWasted + 1;
    sam.x = 26;
    sam.y = 200;
  }
  if(sam.isTouching(car2)){
    lifesWasted = lifesWasted + 1;
    sam.x = 26;
    sam.y = 200;
  }
  if(sam.isTouching(car3)){
    lifesWasted = lifesWasted + 1;
    sam.x = 26;
    sam.y = 200;
  }
  if(sam.isTouching(car4)){
    lifesWasted = lifesWasted + 1;
    sam.x = 26;
    sam.y = 200;
  }
  if(sam.isTouching(bigCar)){
    lifesWasted = lifesWasted + 1;
    sam.x = 26;
    sam.y = 200;
  }
}



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
