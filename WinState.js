function WinState(game) {
	State.call(this,game);
	this.precision       = 25;
	this.pointerIsDown = false;
	this.game = game;
	this.numberTaps = 0;

	this.size_balloon_text = 20;
	this.max_size_balloon_text = 40;
	this.position_balloon_text = 300;
	this.end_position_baloon_text = 50;

	this.counter = 0;
	this.end_counter = 300;

	this.draw_year = false;

	this.cake = new Cake(this.game);
	this.cake.x = 320/2;
	this.cake.y = 600;
	this.cake_come_up = false;

	this.joyeux = "";
	this.joyeux_index = 0;
	this.joyeux_text ="Joyeux Anniversaire Martine!";
}

//inheritance from State
WinState.prototype = new State();
WinState.prototype.constructor = WinState;


WinState.prototype.draw = function() {
	//clear screen
	this.game.ctx.clearRect(0,0,320, 480);
	this.game.ctx.fillStyle = "#1C728C";
	this.game.ctx.fillRect(0,0,320, 480);

	this.cake.draw(this.game.ctx);

	this.game.ctx.fillStyle = "#E1AA21";
	this.game.ctx.font = this.size_balloon_text+"px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText("7 ballons", 320/2, this.position_balloon_text);

	if (this.draw_year) {
		this.game.ctx.font = "30px bit";
		this.game.ctx.fillText("pour 7 ans", 320/2, 100);
	}

	this.game.ctx.shadowColor = '#212121';
	this.game.ctx.shadowBlur = 10;
	this.game.ctx.shadowOffsetX = 5;
	this.game.ctx.shadowOffsetY = 5;

	this.game.ctx.fillStyle = "#C33662";
	this.game.ctx.font = "15px bit";
	this.game.ctx.textAlign="center";
	this.game.ctx.fillText(this.joyeux, 320/2, 400);

	this.game.ctx.shadowBlur = 0;
	this.game.ctx.shadowOffsetX = 0;
	this.game.ctx.shadowOffsetY = 0;

	if (this.joyeux.length == this.joyeux_text.length) {
		this.game.ctx.fillStyle = "#E1AA21";
		this.game.ctx.font = "10px bit";
		this.game.ctx.fillText("Tape 3 fois pour rejouer", 320/2, 420);
	}
}


WinState.prototype.update = function() {
	if (this.counter < this.end_counter) {
		this.counter++;
	}

	if (this.cake_come_up && this.cake.y > 250) {
		this.cake.y-=10;
	}

	if (this.counter == 60) {
		this.draw_year = true;
		this.cake_come_up = true;
	}
	if (this.counter >= 110 && this.counter%4 == 0 && this.joyeux.length != this.joyeux_text.length) {
		this.joyeux = this.joyeux_text.substr(0,this.joyeux_index);
		this.joyeux_index++;
	}
	

	if (this.size_balloon_text < this.max_size_balloon_text) {
		this.size_balloon_text += 0.5;
	}
	if (this.position_balloon_text > this.end_position_baloon_text) {
		this.position_balloon_text -= 5;
	}
}

//handles events recorded in this.keysDown
WinState.prototype.eventsCallbacks = function() {
}

//Handle pointer events
WinState.prototype.pDown = function(evt) {
	// Calculate position based on offset and scale
	var pos = [
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale];
	this.pointerIsDown = true;
}

WinState.prototype.pUp = function(evt) {
	var pos = [
		(evt.pageX - this.game.offset[0]) / this.game.scale,
		(evt.pageY - this.game.offset[1]) / this.game.scale];
	// Draw image with rounded values
	if (this.pointerIsDown) {
		this.numberTaps++;
		this.pointerIsDown = false;
	}
	if (this.numberTaps == 3) {
		this.numberTaps = 0;
		this.pointerIsDown = false;
		this.size_balloon_text = 20;
		this.max_size_balloon_text = 40;
		this.position_balloon_text = 300;
		this.end_position_baloon_text = 50;
		this.counter = 0;
		this.end_counter = 300;
		this.draw_year = false;
		this.cake = new Cake(this.game);
		this.cake.x = 320/2;
		this.cake.y = 600;
		this.cake_come_up = false;
		this.joyeux = "";
		this.joyeux_index = 0;
		this.joyeux_text ="Joyeux Anniversaire Martine!";
		this.game.setState(this.game.playingState);
	}
}


WinState.prototype.pMove = function(evt) {
	if (this.pointerIsDown) {
		var pos = [
			(evt.pageX - this.game.offset[0]) / this.game.scale,
			(evt.pageY - this.game.offset[1]) / this.game.scale];
	}
}

