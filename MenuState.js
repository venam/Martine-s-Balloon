function MenuState(game) {
	State.call(this,game);
	this.precision       = 25;
	this.pointerIsDown = false;
	this.game = game;
	this.numberTaps = 0;
}

//inheritance from State
MenuState.prototype = new State();
MenuState.prototype.constructor = MenuState;


MenuState.prototype.draw = function() {
	//clear screen
	this.game.ctx.clearRect(0,0,320, 480);
	this.game.ctx.fillStyle = "#1C728C";
	this.game.ctx.fillRect(0,0,320, 480);

	this.game.ctx.fillStyle = "#E1AA21";
	this.game.ctx.font = "40px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText("Martine", 320/2, 200);
	this.game.ctx.font = "20px bit";
	this.game.ctx.fillText("et les", 320/2, 240);
	this.game.ctx.font = "40px bit";
	this.game.ctx.fillText("ballons", 320/2, 300);

	this.game.ctx.font = "15px bit";
	this.game.ctx.fillText("Tape 3 fois pour jouer", 320/2, 400);
}


MenuState.prototype.update = function() {
}

//handles events recorded in this.keysDown
MenuState.prototype.eventsCallbacks = function() {
}

//Handle pointer events
MenuState.prototype.pDown = function(evt) {
	// Calculate position based on offset and scale
	var pos = [
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale];
	this.pointerIsDown = true;
}

MenuState.prototype.pUp = function(evt) {
	var pos = [
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale];
	// Draw image with rounded values
	if (this.pointerIsDown) {
		this.numberTaps++;
		this.pointerIsDown = false;
	}
	if (this.numberTaps == 3) {
		this.pointerIsDown = false;
		this.numberTaps = 0;
		this.game.setState(this.game.playingState);
	}
}


MenuState.prototype.pMove = function(evt) {
	if (this.pointerIsDown) {
		var pos = [
			(evt.pageX - this.game.offset[0]) / this.game.scale,
			(evt.pageY - this.game.offset[1]) / this.game.scale];
	}
}

