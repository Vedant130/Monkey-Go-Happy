var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground


function preload(){

  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
    createCanvas(400,400);
    
    monkey = createSprite(80,315,10,10);
    monkey.addAnimation("run", monkey_running);
    monkey.scale = 0.1;
  
    ground = createSprite(400,350,900,10);
    ground.velocityX = -5;
    ground.x=ground.width/2;
  
    score = 0;
  
    FoodGroup = new Group();
    obstacleGroup = new Group();
}


function draw() {
    background("white");
  
    if (ground.x < 0){
       ground.x = ground.width/2;
    }
  
    if (keyDown("space") && monkey.y >= 280) {
        monkey.velocityY=-12;
    }
  
  
    monkey.velocityY = monkey.velocityY+0.8;
  
    monkey.collide(ground);
  
    SpawnObstacles();
    SpawnBanana();
  
    drawSprites();
  
    if(monkey.isTouching(FoodGroup)) {
         FoodGroup.destroyEach();
    }

  
    stroke("black");
    fill("black");
    text("Survival Time: "+score,300,50);
  
  score = score + Math.round(frameCount/30);
  
  
}

function SpawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(400,327,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle)
  }
}

function SpawnBanana() {
  if(frameCount % 80 === 0) {
    banana = createSprite(400,Math.round(random(120,200)),10,10)
    banana.velocityX = -5; 
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    FoodGroup.add(banana)
  }
  
}
