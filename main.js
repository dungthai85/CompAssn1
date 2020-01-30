var AM = new AssetManager();
var reverse = false;

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    } 
    // else {
    //     return;
    // }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

// Animation.prototype.drawFrame = function (tick, ctx, x, y) {
//     // var scaleBy = scaleBy || 1;
//     this.elapsedTime += tick;
//     if (this.loop) {
//         if (this.isDone()) {
//             this.elapsedTime = 0;
//         }
//     }
//     //  else if (this.isDone()) {
//     //     return;
//     // }
//     this.reverse = false;
//     var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
//     var vindex = 0;
//     if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
//         index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
//         vindex++;
//     }
//     while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
//         index -= Math.floor(this.spriteSheet.width / this.frameWidth);
//         vindex++;
//     }

//     var locX = x;
//     var locY = y;
//     var offset = vindex === 0 ? this.startX : 0;
//     ctx.drawImage(this.spriteSheet,
//                   index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
//                   this.frameWidth, this.frameHeight,
//                   locX, locY,
//                   this.frameWidth * this.scale,
//                   this.frameHeight * this.scale);
// }

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
// https://img.pngio.com/game-android-wallpaper-video-games-video-game-backgrounds-png-3509_2070.jpg
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

// https://ya-webdesign.com/transparent250_/3d-sprite-png-2.png
function Sonic(game, spritesheet) {
    this.animation = new Animation(spritesheet, 102, 117, 10, 0.145, 23, true, 1);
    this.x = 0;
    this.y = 0;
    this.speed = 400;
    this.game = game;
    this.ctx = game.ctx;
}

Sonic.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Sonic.prototype.update = function () {
//    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
//       this.x += this.game.clockTick * this.speed;
//    if (this.x > 600) this.x = -230;
    this.x += this.game.clockTick * this.speed;
        if (this.x > 1169) this.x = -230;
    //Entity.prototype.update.call(this);
}


// inheritance 
// https://ancientbeast.com/viewer/
function Alien(game, spritesheet) {
    this.animation = new Animation(spritesheet, 262, 262, 8, 0.02, 24, true, .5);
    this.speed = -200;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 536);
}

Alien.prototype = new Entity();
Alien.prototype.constructor = Alien;

Alien.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x < -60) this.x = 1139;
    Entity.prototype.update.call(this);
}

Alien.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
// https://polycount.com/discussion/98407/spriteplane-a-sprite-sheet-generator-script-for-photoshop
function Guitar(game, spritesheet) {
    this.animation = new Animation(spritesheet, 100, 90, 3, 0.15, 6, true, .75);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 326, 233);
}

Guitar.prototype = new Entity();
Guitar.prototype.constructor = Guitar;

Guitar.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 327) this.x = 326;
    Entity.prototype.update.call(this);
}

Guitar.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// // new
// function Runner(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 168, 216, 5, 0.05, 4, true, .75);
//     this.speed = 150;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 200, 500);
// }

// Runner.prototype = new Entity();
// Runner.prototype.constructor = Runner;

// Runner.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -30;
//     Entity.prototype.update.call(this);
// }

// Runner.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }

function Runner(game) {
    this.animation = new Animation(AM.getAsset("./img/Runner.png"), 168, 216, 5, 0.05, 4, true, .75);
    this.jumpAnimation = new Animation(AM.getAsset("./img/Jump.png"), 250, 250, 4, 0.05, 8, true, .5);
    this.jumping = false;
    this.speed = 150;
    this.ctx = game.ctx;
    this.radius = 200;
    this.ground = 490;
    Entity.call(this, game, 0, 490);
}

Runner.prototype = new Entity();
Runner.prototype.constructor = Runner;

// Runner.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 500) this.jump = true;;
//     Entity.prototype.update.call(this);
// }
Runner.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 1169){
        this.x = 0;
        //this.speed = -150;
    } 
        // if (this.animation.elapsedTime < this.animation.totalTime * 500){
        //     this.jumping = true;
        // }
           
    if (this.game.space && !this.jumping) {
        this.jumping = true;
        this.jumpcount = 25;
    }
    if (this.jumping) {
        this.speed = 500;
        if (this.jumpAnimation.isDone() || this.jumpcount < 1) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
            this.speed = 150;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 1)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
    Entity.prototype.update.call(this);
}

Runner.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        this.jumpcount = this.jumpcount - 1;
        //this.jumping = false;
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}

// new
//function Fireball(game, spritesheet) {
////    this.animation = new Animation(spritesheet, 320, 320, 5, 0.10, 12, true, .75);
//     this.speed = 150;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 200, 500);
// }

// Fireball.prototype = new Entity();
// Fireball.prototype.constructor = Guitar;

// Fireball.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -30;
//     Entity.prototype.update.call(this);
// }

// Fireball.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }

// AM.queueDownload("./img/RobotRunner.png");
AM.queueDownload("./img/Guitar.png");
AM.queueDownload("./img/Sonic.png");
AM.queueDownload("./img/alien.png");
AM.queueDownload("./img/background.jpg");
AM.queueDownload("./img/Runner.png");
AM.queueDownload("./img/Jump.png");
// AM.queueDownload("./img/Fireball.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));
    gameEngine.addEntity(new Sonic(gameEngine, AM.getAsset("./img/Sonic.png")));
    gameEngine.addEntity(new Alien(gameEngine, AM.getAsset("./img/alien.png")));
    gameEngine.addEntity(new Guitar(gameEngine, AM.getAsset("./img/Guitar.png")));
   // gameEngine.addEntity(new Runner(gameEngine, AM.getAsset("./img/Runner.png")));
    gameEngine.addEntity(new Runner(gameEngine));
    // gameEngine.addEntity(new Fireball(gameEngine, AM.getAsset("./img/Fireball.png")));
    //gameEngine.addEntity(new Jump(gameEngine, AM.getAsset("./img/Jump.png")));

    console.log("All Done!");
});