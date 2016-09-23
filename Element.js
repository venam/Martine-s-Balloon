function Element() {
	this.timer            =  0;
	this.maxTimer         = 6; //move 1 pixel every 10 frames
	this.augmenter        = 1;
	this.minX             = 30;
	this.maxX             = 240;
	this.minY             = 10;
	this.maxY             = 490;
	this.x                = specialRand(this.minX, this.maxX);
	this.y                = -specialRand(this.minY, this.maxY);
	this.reachedEnd       = false;
	this.alreadyReachedEnd= false;
}

Element.prototype.draw = function(ctx) {
}

Element.prototype.setSpeed = function(speed) {
	if (speed == 0) {
		this.maxTimer         = 6; 
		this.augmenter        = 1;
	}
	else if (speed == 1) {
		this.maxTimer         = 4; 
		this.augmenter        = 1;
	}
	else if (speed == 2) {
		this.maxTimer         = 4;
		this.augmenter        = 2;
	}
	else if (speed == 3) {
		this.maxTimer         = 3;
		this.augmenter        = 2;
	}
	else {
		this.maxTimer         = 3;
		this.augmenter        = 3;
	}
}

Element.prototype.update = function() {
	if (this.timer > this.maxTimer) {
		this.y    += this.augmenter;
		this.timer = 0;
	}

	if (this.y> 520) {
		this.reachedEnd = true;
	}
	else {
		this.timer++;
	}
}

Element.prototype.reset = function() {
	this.reachedEnd        = false;
	this.alreadyReachedEnd = false;
	this.maxTimer          = 6;
	this.augmenter         = 1 ;
	this.x                 = specialRand(this.minX, this.maxX);
	this.y                 = -specialRand(this.minY, this.maxY);
}



