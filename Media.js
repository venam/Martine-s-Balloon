var imgsReady = new Array();
var mobileAudioReady = false;
var click = document.ontouchstart === undefined ? 'click' : 'touchstart';

function Media(theGame) {
	//this.theGame        = theGame;
	this.totalMedia     = 2; //used to check when all the images are ready
	this.balloonSprites = new Array();
	this.sound          = null;
	this.cakeSprites = new Array();
	this.setupImages();
	this.setupSounds();
}

Media.prototype.setupImages = function() {
	var balImg = new Image();
	for (var i=0; i<3;i++) {
		this.balloonSprites[i] = {
			image: balImg,
			sx   : 70*i,
			sy   : 0,
			sw   : 70, 
			sh   : 99 
		}
	}
	balImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	balImg.src = "balloon.png";

	var cakImg = new Image();
	for (var i=0; i<3;i++) {
		this.cakeSprites[i] = {
			image: cakImg,
			sx   : 205*i,
			sy   : 0,
			sw   : 205,
			sh   : 240
		}
	}
	cakImg.onload = function() {
		imgsReady[imgsReady.length] = true;
	}
	cakImg.src = "cake.png";


}


Media.prototype.setupSounds = function() {
	this.sound = new Howl({
		src: ['sound_effects.ogg', 'sound_effects.mp3', 'sound_effects.wav'],
		sprite: {
			empty : [0, 500],
			pop : [500, 300],
			swoosh : [1300, 1400],
			tuturu : [3500, 2000]
		},
	});


}
