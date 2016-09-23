//wrapper for requestAnimFrame that works on multiple Browsers
//window.requestAnimFrame = (function(){
//	return  window.requestAnimationFrame       || 
//			window.webkitRequestAnimationFrame || 
//			window.mozRequestAnimationFrame    || 
//			window.oRequestAnimationFrame      || 
//			window.msRequestAnimationFrame     || 
//			function(/* function */ callback, /* DOMElement */ element){
//				window.setTimeout(callback, 1000 / 60);
//			};
//})();

'use strict';

// Adapted from https://gist.github.com/paulirish/1579671 which derived from 
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik MÃ¶ller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen SlaviÄ, Darius Bacon

// MIT license

if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());


/*---- MainGame Class ----*/
function MainGame() {
	this.load();
	//canvas used everywhere
	this.element = document.getElementById('game');
	this.canvas = this.element.firstElementChild;
	this.canvas.style.pointerEvents = "none";

	// Original content size
	this.content = [this.canvas.width, this.canvas.height];

	// Setting up the canvas
	this.ctx = this.canvas.getContext('2d');
	this.ctx.webkitImageSmoothingEnabled = false;
	this.ctx.mozImageSmoothingEnabled = false;
	this.ctx.imageSmoothingEnabled = false;
	this.canvasWidth        = this.ctx.canvas.width;
	this.canvasHeight       = this.ctx.canvas.height;

	this.element.addEventListener('pointerdown', this, false);
	this.element.addEventListener('pointerup', this, false);
	this.element.addEventListener('pointermove', this, false);

	// Reflow canvas size/margin on resize
	window.addEventListener('resize', this, false);
	this.reflow();
	this.reflow();

	this.mobile             = false;
	this.mobileCheck();

	this.media         = new Media(this);
	this.playingState  = new PlayingState(this);
	this.menuState     = new MenuState(this);
	this.winState      = new WinState(this);
	this.retryState    = new RetryState(this);
	this.gameState     = this.menuState;
}

MainGame.prototype.mobileCheck = function() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLocaleLowerCase()) ){
		this.mobile = true;
	}
}

MainGame.prototype.reflow = function() {
	// 2d vectors to store various sizes
	var browser = [
		window.innerWidth, 
		window.innerHeight
	];
	// Minimum scale to fit whole canvas
	var scale = this.scale = Math.min(
		browser[0] / this.content[0],
		browser[1] / this.content[1]);
	// Scaled content size
	var size = [
		this.content[0] * scale, this.content[1] * scale];
	// Offset from top/left
	var offset = this.offset = [
		(browser[0] - size[0]) / 2, (browser[1] - size[1]) / 2];

	// Apply CSS transform
	var rule = "translate(" + offset[0] + "px, " + offset[1] + "px) scale(" + scale + ")";
	this.element.style.transform = rule;
	this.element.style.webkitTransform = rule;
}

MainGame.prototype.handleEvent = function(evt) {
	switch (evt.type) {
		case 'resize':
			// Window resized
			this.reflow();
			break;
		case 'pointerdown':
			this.gameState.pDown(evt);
			break;
		case 'pointerup':
			this.gameState.pUp(evt);
			break;
		case 'pointermove':
			this.gameState.pMove(evt);
			break;
		case 'load':
			// Image loaded
			//this.img = this.loader;
			break;
	}
}

//change the game state
MainGame.prototype.setState = function (state) {
	if (state == this.playingState) {
		this.menuState = null;
	}
	this.gameState = state;
}

MainGame.prototype.load = function() {
	//if (localStorage){
	//	var saves = localStorage.getItem("bestTime");
	//	if (saves == null)  {
	//		return;
	//	}
	//	else {
	//		this.bestScore = saves;
	//	}
	//}
	return null;
}

MainGame.prototype.save = function() {
	//localStorage.setItem("bestTime", this.bestScore);
}


//the game loop that runs 60/s
MainGame.prototype.run = function () {
	requestAnimationFrame(this.loop.bind(this));
}

MainGame.prototype.loop = function(animStart) {
	this.gameState.update(animStart);
	this.gameState.draw();
	requestAnimationFrame(this.loop.bind(this));
}
/*---- End of MainGame ----*/

/*---- Global vars ----*/
var theGame   = new MainGame();

//all Events
var keysDown = {};
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

/*---- Make it run ----*/
//load media then run
function preLoadMedia() {
	if (theGame.media.totalMedia != imgsReady.length) {
		//loading
		setTimeout(preLoadMedia, 60);
	}
	else {
		theGame.ctx.clearRect(0,0, 320, 480);
		//start the game
		theGame.run();
	}
};
preLoadMedia();

//theGame.run();
/*---- ----*/

