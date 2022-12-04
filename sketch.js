var bg, bgAnimation;

var mario, marioAnimation, marioDead;

var monster, monstersGroup, mon1, mon2, mon3, mon4;

var invisibleGround;

var score = 0;

var gameState = "PLAY";

function preload() {
  bg = loadImage("assets/BG.png");

  marioAnimation = loadAnimation(
    "assets/Run (1).png",
    "assets/Run (2).png",
    "assets/Run (3).png",
    "assets/Run (4).png"
  );

  marioDead = loadAnimation("assets/Dead (1).png");

  mon1 = loadImage("./assets/Monster 1.png");
  mon2 = loadImage("./assets/Monster 3.png");
  mon3 = loadImage("./assets/Monster 4.png");
}

function setup() {
  createCanvas(600, 600);

  bgAnimation = createSprite(10, 10, 10, 10);
  bgAnimation.addImage(bg);
  bgAnimation.scale = 1.3;
  bgAnimation.velocityX = -6;

  score = score + Math.round(getFrameRate() / 60);

  mario = createSprite(29, 500, 10, 10);
  mario.addAnimation("marioRunning", marioAnimation);
  mario.addAnimation("dead", marioDead);
  mario.scale = 0.3;

  monstersGroup = createGroup();

  invisibleGround = createSprite(300, 590, 600, 10);
  invisibleGround.visible = false;

  // mario.debug = true;
  mario.setCollider("circle", 45, 0, 210);
}

function draw() {
  background("green");

  if (gameState === "PLAY") {
    if (bgAnimation.x < 0) {
      bgAnimation.x = 600;
    }
    text.size = 35;
    fill("Black");
    x = text("Score: ", score, 300, 300);

    if (keyDown("space") && mario.y >= 493) {
      mario.velocityY = -15.3;
    }

    spawnMonsters();

    if (mario.isTouching(monstersGroup)) {
      gameState = "END";
    }
  } else if (gameState === "END") {
    bgAnimation.velocityX = 0;
    mario.velocityX = 0;

    mario.changeAnimation("dead", marioDead);

    monstersGroup.setVelocityXEach(0);
    monstersGroup.setLifetimeEach(-1);
  }

  mario.velocityY = mario.velocityY + 0.6;

  mario.collide(invisibleGround);

  drawSprites();
}

function spawnMonsters() {
  if (frameCount % 80 == 0) {
    monster = createSprite(600, 530, 10, 10);
    monster.velocityX = -6;

    var randomNumber = Math.round(random(1, 3));

    // if (frameCount % 80 == 0) {
    //   if (randomNumber === 1) {
    //     monster.addImage("obs", mon1);
    //     monster.scale = 0.05;
    //   } else if (randomNumber === 2) {
    //     monster.addImage("obs", mon2);
    //     monster.scale = 0.5;
    //   } else {
    //     monster.addImage("obs", mon3);
    //     monster.scale = 0.08;
    //   }
    // }

    switch (randomNumber) {
      case 1:
        monster.addImage(mon1);
        monster.scale = 0.05;
        break;
      case 2:
        monster.addImage(mon2);
        monster.scale = 0.3;
        break;
      case 3:
        monster.addImage(mon3);
        monster.scale = 0.2;
        break;
      default:
        break;
    }

    monster.lifetime = 630;
    monstersGroup.add(monster);
  }
}
