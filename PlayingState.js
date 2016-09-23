function PlayingState(game) {
	State.call(this,game);
	this.precision       = 25;
	this.pointerIsDown = false;
	this.game = game;
	this.numberOfBalloons = 7;
	this.balloons = new Array();
	this.initializeBalloons();

	this.constant_text = "tappe les ballons";

	this.popped_balloons = 0;

	this.balloon_sleep_counter = 0;
	this.max_balloon_sleep_counter = 70;
	this.number_of_activated_balloons = 0;
}

//inheritance from State
PlayingState.prototype = new State();
PlayingState.prototype.constructor = PlayingState;


PlayingState.prototype.reset = function() {
	this.precision       = 25;
	this.pointerIsDown = false;
	this.numberOfBalloons = 7;
	this.balloons = new Array();
	this.initializeBalloons();
	this.constant_text = "tappe les ballons";
	this.popped_balloons = 0;
	this.balloon_sleep_counter = 0;
	this.max_balloon_sleep_counter = 70;
	this.number_of_activated_balloons = 0;
}


//draw on this.game.ctx        (called 60/s)
PlayingState.prototype.draw = function() {
	//clear screen
	this.game.ctx.clearRect(0,0,320, 480);
	this.game.ctx.fillStyle = "#1C728C";
	this.game.ctx.fillRect(0,0,320, 480);

	this.game.ctx.fillStyle = "#E1AA21";
	this.game.ctx.font = "20px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText(this.constant_text, 320/2, 300);

	//need 7 balloons

	for (var i in this.balloons) {
		this.balloons[i].draw(this.game.ctx);
	}

	if (this.number_of_activated_balloons == 0) {
		this.game.ctx.shadowColor = '#212121';
		this.game.ctx.shadowBlur = 20;
		this.game.ctx.shadowOffsetX = 15;
		this.game.ctx.shadowOffsetY = 15;

		var text = "Prepares toi!";
		this.game.ctx.fillStyle = "#E1AA21";
		this.game.ctx.font = "30px bit";
		this.game.ctx.textAlign="center";
		this.game.ctx.fillText(text, 320/2, 400/2);

		this.game.ctx.shadowBlur = 0;
		this.game.ctx.shadowOffsetX = 0;
		this.game.ctx.shadowOffsetY = 0;
	}
}


//update all that is happening (called 60/s)
PlayingState.prototype.update = function(animStart) {

	for (var i in this.balloons) {
		this.balloons[i].update();
		if (this.balloons[i].outsideBound()) {
			this.reset();
			this.game.gameState = this.game.retryState;
		}
	}

	this.balloon_sleep_counter++;
	if (this.number_of_activated_balloons < this.numberOfBalloons) {
		if (this.balloon_sleep_counter >= this.max_balloon_sleep_counter) {
			this.balloon_sleep_counter = 0;
			this.balloons[this.number_of_activated_balloons].toggleActive();
			this.number_of_activated_balloons++;
		}
	}
	else {
		if (this.balloon_sleep_counter >= 200) {
			this.reset();
			this.game.media.sound.play('tuturu');
			this.game.gameState = this.game.winState;
		}
	}
}


//handles events recorded in this.keysDown
PlayingState.prototype.eventsCallbacks = function() {
}

//Handle pointer events
PlayingState.prototype.pDown = function(evt) {
	// Canvas clicked
	// Calculate position based on offset and scale
	var pos = [
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale];

	//only tap one balloon at a time
	if (!this.pointerIsDown) {
		for (var i in this.balloons) {
			if (Math.abs(this.balloons[i].x-pos[0]) < this.precision &&
				Math.abs(this.balloons[i].y-pos[1]) < this.precision ) {
				if (!this.balloons[i].popped) {
					this.balloons[i].pop();
					this.popped_balloons++;
					this.constant_text = this.popped_balloons+" ballon"+(this.popped_balloons>1?'s':'');
				}
			}
		}
	}
	// Draw image with rounded values
	this.pointerIsDown = true;
}

PlayingState.prototype.pUp = function(evt) {
	//if (!this.img) break;
	// Calculate position based on offset and scale
	var pos = [
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale];
	this.lastPoint ={
		x: pos[0]+0.5|0,
		y: pos[1]+0.5|0,
	};

	// Draw image with rounded values
	if (this.pointerIsDown) {
		this.pointerIsDown = false;
	}
}

PlayingState.prototype.pMove = function(evt) {
	//if (!this.img) break;
	// Calculate position based on offset and scale
	if (this.pointerIsDown) {
		var pos = [
			(evt.pageX - this.game.offset[0]) / this.game.scale,
			(evt.pageY - this.game.offset[1]) / this.game.scale];
	}
}

PlayingState.prototype.initializeBalloons = function() {
	for (var i=0; i< this.numberOfBalloons; i++) {
		this.balloons[this.balloons.length] =  new Balloon(this.game);
	}
}

