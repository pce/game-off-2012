var gamejs = require('gamejs');
var mask = require('gamejs/mask');
var vectors = require('gamejs/utils/vectors');

// var touch = require('./touch');
var mobs = require('./mobs');
var keys = require('./keys');
var snd = require('./snd');


var SCREEN_WIDTH = 500;
var SCREEN_HEIGHT = 350;
var BG_COLOR = "#33ff66";
var FPS = 60;

var IN_INTRO = 0;
var IN_GAME = 1;
var IN_GAMEOVER = 3;
var IN_FINAL = 4;


function rnd(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function main() {

    var gameState = 0;
    // touch.init();
    document.body.style.webkitUserSelect = 'none';
    document.body.oncontextmenu = function () {
        return false;
    };

    var controls = new keys.Controls();
    var display = gamejs.display.setMode([SCREEN_WIDTH, SCREEN_HEIGHT]);
    // sounds
    var sound = [];
    for (var s in sounds) {
        sound[s] = new gamejs.mixer.Sound(sounds[s]);
    }
    var soundmanager = new snd.SoundManager(sound);
    // images
    var image = {
        'player': gamejs.image.load('images/player-2.png'),
            'sheep': gamejs.image.load('images/sheep-s-1.png'),
            'sheep2': gamejs.image.load('images/sheep-s-2.png'),
            'bg': gamejs.image.load('images/bg-0.png'),
            'skyline': gamejs.image.load('images/skyline-800x350.png')
    };
    var birdImages = [
    	gamejs.image.load('images/bird-1As.png'),
    	gamejs.image.load('images/bird-1s.png')
    ];

    var forkImages = [
    	gamejs.image.load('images/fork-1.png'),
    	gamejs.image.load('images/fork-2.png')
    ];

    var sleepyImages = [
    gamejs.image.load('images/sleepy-1-s.png'),
    gamejs.image.load('images/sleepy-2-reading.png'),
    gamejs.image.load('images/sleepy-3-s-awake.png'),
    gamejs.image.load('images/sleepy-4-s-awake.png')];
    // create image masks from surface for collision detection
    var mUnit = mask.fromSurface(image['sheep']);
    var maskPlayer = mask.fromSurface(image['player']);

    var playerPosition = [SCREEN_WIDTH - 50, SCREEN_HEIGHT - 50];

    var font = new gamejs.font.Font('10px monospace');
    var hlfont = new gamejs.font.Font('20px monospace');

    var bg = new mobs.Bg([0, 0], image['skyline']);
    var hud = new mobs.Hud([10, SCREEN_HEIGHT - 47], sleepyImages);
    var player = new mobs.Player(playerPosition, image['player'], soundmanager, 0);
    var sheeps = new gamejs.sprite.Group();

    var sheepCount = 0;
    for (var i = 1; i < 6; i++) {
        sheeps.add(new mobs.Sheep([i * rnd(-20, -38), rnd(20, 40)], image['sheep2'], player, 1));
        sheeps.add(new mobs.Sheep([i * rnd(-32, -72), rnd(42, 62)], image['sheep'], player, 2));
        sheeps.add(new mobs.Sheep([i * rnd(-40, -92), rnd(38, 102)], image['sheep2'], player, 3));
        sheeps.add(new mobs.Sheep([i * rnd(-60, -142), rnd(38, 102)], image['sheep2'], player, 1));
        sheeps.add(new mobs.Sheep([i * rnd(-42, -112), rnd(82, 124)], image['sheep'], player, 2));
        sheeps.add(new mobs.Sheep([i * rnd(-72, -162), rnd(82, 124)], image['sheep'], player, 1));
        sheepCount += 6;
    }
    var birds = new gamejs.sprite.Group();
    birds.add(new mobs.Bird([rnd(-25, -32), rnd(68, 98)], birdImages, player, FPS));
    birds.add(new mobs.Bird([rnd(-32, -62), rnd(104, 168)], birdImages, player, FPS));
    birds.add(new mobs.Bird([rnd(-65, -122), rnd(68, 98)], birdImages, player, FPS));
    birds.add(new mobs.Bird([rnd(-155, -192), rnd(68, 98)], birdImages, player, FPS));
    birds.add(new mobs.Bird([rnd(-255, -292), rnd(68, 98)], birdImages, player, FPS));

    var forks = new gamejs.sprite.Group();
    forks.add(new mobs.Fork([rnd(-125, -182), rnd(68, 98)], forkImages, player, FPS));
    forks.add(new mobs.Fork([rnd(-192, -262), rnd(104, 168)], forkImages, player, FPS));
    forks.add(new mobs.Fork([rnd(-232, -362), rnd(104, 168)], forkImages, player, FPS));


    display.fill("#ffffff");

    function update(msDuration) {
        bg.update(msDuration);
        player.update(msDuration);
        sheeps.update(msDuration);
        birds.update(msDuration);
        forks.update(msDuration);
        hud.update(msDuration);
    }

    function draw() {
        display.clear();
        bg.draw(display);
        hud.draw(display);
        sheeps.draw(display);
        birds.draw(display);
        forks.draw(display);
        player.draw(display);
    }

    function tick(msDuration) {
        gamejs.event.get().forEach(function (event) {
            controls.handle(event);
        });
        if (controls.keys['keyStart']) {
            gameState = IN_GAME;
            soundmanager.play(0);
            controls.keys['keyStart'] = false;
        }
        var statusText = '';
        var blitStr = '';
        // replace gameState switch with scenemanager.update, scenemanager.draw
        switch (gameState) {
            case IN_GAME:
                player.keys = controls.keys;
                hud.level = player.level;
                if (player.hitCount > 1) {
                    soundmanager.play(3);
                    gameState = IN_GAMEOVER;
                }
                if (player.sheepCount == sheepCount) {
                    // soundmanager.play(4);
                    gameState = IN_FINAL;
                }
                update(msDuration);
                draw();

                statusText = 'level ' + player.level + ' | hits ' + player.hitCount + ' | score ' + player.score;
                display.blit(font.render(statusText), [SCREEN_WIDTH - 180, 10]);

                break;
            case IN_GAMEOVER:
                // draw
                display.clear();
                bg.update();
                bg.draw(display);
                blitStr = 'game over';
                display.blit(hlfont.render(blitStr), [SCREEN_WIDTH - (SCREEN_WIDTH / 2) - blitStr.length * 7, SCREEN_HEIGHT - (SCREEN_HEIGHT / 2) - 20]);
                // blitStr = 'press restart and watch out for the birds, branches and forks';
                blitStr = 'press restart and watch out for the birds and forks';
                display.blit(font.render(blitStr), [SCREEN_WIDTH - (SCREEN_WIDTH / 2) - blitStr.length * 3, SCREEN_HEIGHT - (SCREEN_HEIGHT / 2)]);
                break;
            case IN_FINAL:
                // draw
                display.clear();
                bg.update();
                bg.draw(display);
                // add time < x sec. to score
                statusText = 'level ' + player.level + ' | hits ' + player.hitCount + ' | score ' + player.score;
                display.blit(font.render(statusText), [SCREEN_WIDTH - 180, 10]);
                blitStr = 'congratulations';
                display.blit(hlfont.render('congratulations'), [SCREEN_WIDTH - (SCREEN_WIDTH / 2) - blitStr.length * 7, SCREEN_HEIGHT - (SCREEN_HEIGHT / 2) - 20]);
                blitStr = 'press restart';
                display.blit(font.render(blitStr), [SCREEN_WIDTH - (SCREEN_WIDTH / 2) - blitStr.length * 3, SCREEN_HEIGHT - (SCREEN_HEIGHT / 2)]);
                break;
            case IN_INTRO:
            default:
                // draw
                display.clear();
                bg.draw(display);
                blitStr = 'clonecatcher';
                display.blit(hlfont.render(blitStr), [SCREEN_WIDTH - (SCREEN_WIDTH / 2) - blitStr.length * 7, SCREEN_HEIGHT - (SCREEN_HEIGHT / 2) - 40]);
                blitStr = 'CLICK TO PLAY';
                display.blit(font.render(blitStr), [SCREEN_WIDTH - (SCREEN_WIDTH / 2) - blitStr.length * 4, SCREEN_HEIGHT - (SCREEN_HEIGHT / 2) - 20]);
                break;
        }
    };
    gamejs.time.fpsCallback(tick, this, FPS);
};


var sounds = ["start", "sheep", "hit", "last-hit", "sheep-1", "sheep-3"];
var extAudio = ".wav"; // || ".ogg"
for (var s in sounds) {
 	sounds[s] = 'data/' + sounds[s] + extAudio;
}

gamejs.preload(sounds);
gamejs.preload([
	'images/sheep-s-1.png'
	,'images/sheep-s-2.png'
	,'images/sleepy-1-s.png'
	,'images/sleepy-2-reading.png'
	,'images/sleepy-3-s-awake.png'
	,'images/sleepy-4-s-awake.png'
	// ,'images/house-2.png'
	,'images/player-2.png'
	,'images/bg-0.png'
	,'images/skyline-800x350.png'
	,'images/bird-1As.png'
  	,'images/bird-1s.png'
	// ,'images/fork-1.png'
]);

gamejs.ready(main);
