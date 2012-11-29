var gamejs = require('gamejs');


var Controls = exports.Controls = function () {
    this.evtPos = [0, 0];
    this.keys = {
        start: false,
        keyUp: false,
        keyDown: false,
        keyLeft: false,
        keyRight: false,
        keyFire: false
    };
};

Controls.prototype.handle = function (event) {
    /*
	if (evt.type === gamejs.event.MOUSE_MOTION) {
		this.evtPos = evt.pos;
    }
    */
    if (event.type === gamejs.event.KEY_DOWN) {
        if (event.key === gamejs.event.K_UP) {
            this.keys['keyUp'] = true;
        } else if (event.key === gamejs.event.K_DOWN) {
            this.keys['keyDown'] = true;
        } else if (event.key === gamejs.event.K_LEFT) {
            this.keys['keyLeft'] = true;
        } else if (event.key === gamejs.event.K_RIGHT) {
            this.keys['keyRight'] = true;
        } else if (event.key === gamejs.event.K_SPACE) {
            this.keys['keyFire'] = true;
        } else if (event.key === gamejs.event.K_ESC) {
            this.keys['keyPause'] = !this.keyPause;
        } else {
            console.debug(event.key);
        }
    } else if (event.type === gamejs.event.KEY_UP) {
        if (event.key === gamejs.event.K_UP) {
            this.keys['keyUp'] = false;
        } else if (event.key === gamejs.event.K_DOWN) {
            this.keys['keyDown'] = false;
        } else if (event.key === gamejs.event.K_LEFT) {
            this.keys['keyLeft'] = false;
        } else if (event.key === gamejs.event.K_RIGHT) {
            this.keys['keyRight'] = false;
        } else if (event.key === gamejs.event.K_SPACE) {
            this.keys['keyFire'] = false;
        }
    } else if (event.type === gamejs.event.MOUSE_UP) {
        this.keys['keyStart'] = true;
        /*
         if ((event.pos[0] > 0 && event.pos[0] < this.size[0]) && (event.pos[1] > 0 && event.pos[1] < this.size[1])) {
            this.keys['keyStart'] = true;
         }
         */
    }

};