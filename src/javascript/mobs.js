var gamejs = require('gamejs');
var objects = require('gamejs/utils/objects');
var mask = require('gamejs/mask');
var vectors = require('gamejs/utils/vectors');

var Bird = exports.Bird = function (pos, images, player, fps, hitPoints) {
    Bird.superConstructor.apply(this, arguments);

    this.fps = fps || 6;
    this.frameDuration = 10000 / this.fps;
    this.currentFrameDuration = 0;

    this.currentFrame = 0;
    this.framesum = 2;
    this.frames = 2;
    this.origImage = [];
    this.image = [];
    var imgSize = 0;
    for (var i = 0; i < this.framesum; i++) {
        if (typeof images[i] == 'undefined') continue;
        this.origImage[i] = images[i];
        if (!imgSize) imgSize = this.origImage[i].getSize();
        this.image[i] = new gamejs.Surface(imgSize);
        this.image[i].blit(this.origImage[i]);
    }
    this.rect = new gamejs.Rect(pos, imgSize);
    this.mask = mask.fromSurface(this.image[0]);

    this.player = player;
    this.isHighlighted = false;
    this.highlightDuration = 0;
    this.isHit = false;
    this.hitCount = 0;
    this.hitDuration = 0;
    this.speed = 80;
    this.levelspeed = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };
    this.hitPoints = hitPoints || 0;
    this.screen = gamejs.display.getSurface();
    return this;
};
objects.extend(Bird, gamejs.sprite.Sprite);

Bird.prototype.update = function (msDuration) {

    if (this.isHit) {
        return;
    }

    // Simple Animation - better this.startframe[sequence], this.endframe[sequence]
    this.currentFrameDuration += msDuration;
    if (this.currentFrameDuration >= this.frameDuration) {
        if (this.currentFrame < this.frames - 1) {
            this.currentFrame++;
        } else {
            this.currentFrame = 0;
        }
        this.currentFrameDuration = 0;
    }

    if (this.player.level > 2) {
        if (!this.levelspeed[this.player.level]) {
            this.levelspeed[this.player.level] = this.speed;
        }
        (this.speed < this.levelspeed[this.player.level] + 50) && this.speed++;
    } else if (this.player.level > 1) {
        if (!this.levelspeed[this.player.level]) {
            this.levelspeed[this.player.level] = this.speed;
        }
        (this.speed < this.levelspeed[this.player.level] + 100) && this.speed++;
    }

    //  if (this.hitCount > this.hitPoints) {

    // if isRunning move in place
    this.rect.moveIp(this.speed * (msDuration / 1000), 0);

    if (this.rect.right > this.screen.getSize()[0]) {
        this.rect.moveIp(-(this.screen.getSize()[0] - 10), 0);
    }

    if (this.rect.collideRect(this.player.rect)) {
        this.isHit = true;
        this.player.addHit();
    }
    return;
};

Bird.prototype.draw = function (display) {
    if (this.isHit) {
        // reset();
        return;
    }
    var rect = this.rect.clone();
    display.blit(this.image[this.currentFrame], rect.center);
};

// -------------------------------------------------------------------
// TODO Bird,Fork extends Enemy

var Fork = exports.Fork = function (pos, images, player, fps, hitPoints) {
    Fork.superConstructor.apply(this, arguments);

    this.fps = fps || 6;
    this.frameDuration = 10000 / this.fps;
    this.currentFrameDuration = 0;

    this.currentFrame = 0;
    this.framesum = 2;
    this.frames = 2;
    this.origImage = [];
    this.image = [];
    var imgSize = 0;
    for (var i = 0; i < this.framesum; i++) {
        if (typeof images[i] == 'undefined') continue;
        this.origImage[i] = images[i];
        if (!imgSize) imgSize = this.origImage[i].getSize();
        this.image[i] = new gamejs.Surface(imgSize);
        this.image[i].blit(this.origImage[i]);
    }
    this.rect = new gamejs.Rect(pos, imgSize);
    this.mask = mask.fromSurface(this.image[0]);

    this.player = player;
    this.isHighlighted = false;
    this.highlightDuration = 0;
    this.isHit = false;
    this.hitCount = 0;
    this.hitDuration = 0;
    this.speed = 80;
    this.levelspeed = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };
    this.hitPoints = hitPoints || 0;
    this.screen = gamejs.display.getSurface();
    return this;
};
objects.extend(Fork, gamejs.sprite.Sprite);

Fork.prototype.update = function (msDuration) {

    if (this.isHit) {
        return;
    }

    // Simple Animation - better this.startframe[sequence], this.endframe[sequence]
    this.currentFrameDuration += msDuration;
    if (this.currentFrameDuration >= this.frameDuration) {
        if (this.currentFrame < this.frames - 1) {
            this.currentFrame++;
        } else {
            this.currentFrame = 0;
        }
        this.currentFrameDuration = 0;
    }

    if (this.player.level > 2) {
        if (!this.levelspeed[this.player.level]) {
            this.levelspeed[this.player.level] = this.speed;
        }
        (this.speed < this.levelspeed[this.player.level] + 50) && this.speed++;
    } else if (this.player.level > 1) {
        if (!this.levelspeed[this.player.level]) {
            this.levelspeed[this.player.level] = this.speed;
        }
        (this.speed < this.levelspeed[this.player.level] + 100) && this.speed++;
    }

    //  if (this.hitCount > this.hitPoints) {

    // if isRunning move in place
    this.rect.moveIp(this.speed * (msDuration / 1000), 0);

    if (this.rect.right > this.screen.getSize()[0]) {
        this.rect.moveIp(-(this.screen.getSize()[0] - 10), 0);
    }

    if (this.rect.collideRect(this.player.rect)) {
        this.isHit = true;
        this.player.addHit();
    }
    return;
};

Fork.prototype.draw = function (display) {
    if (this.isHit) {
        // reset();
        return;
    }
    var rect = this.rect.clone();
    display.blit(this.image[this.currentFrame], rect.center);
};


// -------------------------------------------------------------------


var Sheep = exports.Sheep = function (pos, image, player, startAtLevel, hitPoints) {
    Sheep.superConstructor.apply(this, arguments);

    this.origImage = image;
    this.startAtLevel = startAtLevel || 1;
    var imgSize = this.origImage.getSize();
    this.image = new gamejs.Surface(imgSize);
    this.image.blit(this.origImage);
    this.rect = new gamejs.Rect(pos, imgSize);
    this.mask = mask.fromSurface(this.image);

    this.player = player;
    this.isHighlighted = false;
    this.highlightDuration = 0;

    this.isHit = false;
    this.hitCount = 0;
    this.hitDuration = 0;

    this.speed = this.rnd(62, 92);
    this.levelspeed = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };
    this.hitPoints = hitPoints || 0;

    this.screen = gamejs.display.getSurface();

    return this;
};
objects.extend(Sheep, gamejs.sprite.Sprite);

Sheep.prototype.update = function (msDuration) {
    if (this.isHit) {
        return;
    }
    if (this.player.level < this.startAtLevel - 1) {
        return;
    }

    if (this.player.level > 2) {
        if (!this.levelspeed[this.player.level]) {
            this.levelspeed[this.player.level] = this.speed;
        }
        (this.speed < this.levelspeed[this.player.level] + 50) && this.speed++;
    } else if (this.player.level > 1) {
        if (!this.levelspeed[this.player.level]) {
            this.levelspeed[this.player.level] = this.speed;
        }
        (this.speed < this.levelspeed[this.player.level] + 100) && this.speed++;
    }

    // if isRunning move in place
    this.rect.moveIp(this.speed * (msDuration / 1000), 0);

    if (this.rect.right > this.screen.getSize()[0]) {
        this.rect.moveIp(-(this.screen.getSize()[0] - 10), 0);
    }
    if (this.rect.collideRect(this.player.rect)) {
        if (gamejs.sprite.collideMask(this, this.player)) {
            this.isHit = true;
            this.player.addSheepHit();
        }
    }
    return;
};

Sheep.prototype.rnd = function (min, max) {
    return Math.floor((Math.random() * max) + min);
};

Sheep.prototype.draw = function (display) {

    if (this.isHit) return;
    // if inGame
    var rect = this.rect.clone();
    display.blit(this.image, rect.center);
};

var Player = exports.Player = function (pos, image, soundmanager, score, hitPoints) {
    Player.superConstructor.apply(this, arguments);

    this.soundmanager = soundmanager;
    this.origImage = image;
    var imgSize = this.origImage.getSize();
    this.image = new gamejs.Surface(imgSize);
    this.image.blit(this.origImage);
    this.rect = new gamejs.Rect(pos, imgSize);
    this.mask = mask.fromSurface(this.image);

    this.velocity = 0;
    this.speed = 100;
    this.isHighlighted = false;
    this.highlightDuration = 0;

    this.score = score || 0;
    this.isHit = false;
    this.hitCount = 0;
    this.hitDuration = 0;
    this.sheepCount = 0;
    this.level = 1;

    this.hitPoints = hitPoints;
    this.keys = {
        keyDown: false,
        keyUp: false
    };
    return this;
};
objects.extend(Player, gamejs.sprite.Sprite);

Player.prototype.addHit = function () {
    this.hitCount += 1;
    this.score -= 1;
    this.soundmanager.play(2);
};

Player.prototype.addSheepHit = function () {
    this.score += 1;
    this.sheepCount += 1;
    this.soundmanager.play(1);
};

Player.prototype.update = function (msDuration) {

    if (this.sheepCount > 24) {
        // player holds his own level, this.world.level ?
        this.level = 3;
        if (this.speed < 150) this.speed++;
    } else if (this.sheepCount > 12 && this.sheepCount < 24) {
        this.level = 2;
    }

    // on Mouse Pos
    // this.rect = vectors.subtract(this.evtPos, this.image.getSize());
    var curMaxSpeed = 400;
    if (this.keys['keyDown']) {
        this.moveDown();
    } else if (this.keys['keyUp']) {
        this.moveUp();
    }
    this.dir = 0;
    /*
	if (this.keys['keyLeft']) {
		this.moveLeft();
	} else if (this.keys['keyRight']) {
		this.moveRight();
	} else {
		this.dir = 0;
	}
	*/

    /*
	 if (this.rect.top > 320) {
	 this.velocity *= -1 ;
	 } else if (this.rect.top < 30) {
	 // over the top of screen
	 this.velocity *= -1 ;
	 }
	 */
    this.rect.top += this.velocity * (msDuration / 1000);
    this.rect.left += this.dir * (msDuration / 1000);

};

Player.prototype.moveUp = function () {
    this.velocity = this.speed * -1;
};

Player.prototype.moveDown = function () {
    this.velocity = this.speed;
};

Player.prototype.moveRight = function () {
    this.dir = this.speed;
};

Player.prototype.moveLeft = function () {
    this.dir = this.speed * -1;
};

Player.prototype.draw = function (display) {
    // if inGame
    // var rect = this.rect.clone(); // .center
    display.blit(this.image, this.rect);
};

// -------------------------------------------------
// NPC's

// The "Hud" is a Sprite that represents the "Success" sleepyState 
var Hud = exports.Hud = function (pos, images) {
    Hud.superConstructor.apply(this, arguments);

    this.currentFrame = 0;
    this.framesum = images.length;
    // this.frameToLevel = {1:4, 2:2, 3:1, 4:0};
    this.frameToLevel = {
        1: 2,
        2: 1,
        3: 0
    };
    this.level = 1;
    this.origImage = [];
    this.image = [];
    var imgSize = 0;
    for (var i = 0; i < this.framesum; i++) {
        if (typeof images[i] == 'undefined') continue;
        this.origImage[i] = images[i];
        if (!imgSize) imgSize = this.origImage[i].getSize();
        this.image[i] = new gamejs.Surface(imgSize);
        this.image[i].blit(this.origImage[i]);
    }
    this.rect = new gamejs.Rect(pos, imgSize);
    this.screen = gamejs.display.getSurface();
    return this;
};
objects.extend(Hud, gamejs.sprite.Sprite);

Hud.prototype.update = function (msDuration) {
    this.currentFrame = this.frameToLevel[this.level];
    return;
};

Hud.prototype.draw = function (display) {
    display.blit(this.image[this.currentFrame], this.rect);
};

// ----------------------------------------------

var Bg = exports.Bg = function (pos, image) {
    Bg.superConstructor.apply(this, arguments);
    this.offset = 0;
    this.origImage = image;
    var imgSize = this.origImage.getSize();
    this.image = new gamejs.Surface(imgSize);
    this.image.blit(this.origImage);
    this.rect = new gamejs.Rect(pos, imgSize);
    this.screen = gamejs.display.getSurface();
    return this;
};
objects.extend(Bg, gamejs.sprite.Sprite);

Bg.prototype.update = function (msDuration) {
    if (this.offset < 10) {
        this.offset += 1;
        this.rect.left -= this.offset;
    }
    return;
};

Bg.prototype.draw = function (display) {
    // var rect = this.rect.clone(); display.blit(this.image, rect.left);
    display.blit(this.image, this.rect);
};