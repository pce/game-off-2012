var gamejs = require('gamejs');

var SoundManager = exports.SoundManager = function(sound) {
	// SoundManager.superConstructor.apply(this, arguments);
	this.sound = sound;
};
// objects.extend(SoundManager, gamejs.);

SoundManager.prototype.play = function(index) {
	this.sound[index].play();
};
