function Balloon(game) {
	Element.call(this);
	this.game             = game;
	this.media            = this.game.media;

	this.x = 320/2;
	this.y = 620;


	this.rotationAngle = 0;
	this.maxRotationAndle = 0.08;
	this.rotationAngleSide = false;

	this.percentBezier = 0.00001;
	this.bezierSpeed = 0.006;
	this.Bpath = {}
	this.setPath();

	this.popped = false;
	this.played_pop = false;
	this.side_of_theta = Math.random()>0.5;
	this.pop_theta_inc = Math.random()>0.5;
	this.pop_theta = 0;
	this.pop_radius = 100;
	this.fixed_pop_center = {
		x: 0,
		y: 0
	};
	this.activated = false;
}

Balloon.prototype = new Element();
Balloon.prototype.constructor = Balloon;

Balloon.prototype.outsideBound = function() {
	return (this.y < 0 && !this.popped);
}

Balloon.prototype.draw = function(ctx) {
	if (this.finished_popped || !this.activated) {
		return;
	}

	var img = 0;
	/*
	if (this.peeled && ! this.cut) {
		img = 1;
	}
	else if (this.peeled && this.cut) {
		img = 2;
	}

*/
	ctx.translate(this.x,this.y);
	ctx.rotate(this.rotationAngle);

	//DEBUG
	/*
	ctx.fillRect(
		-this.media.balloonSprites[img].sw/2,
		-this.media.balloonSprites[img].sh/2,
		this.media.balloonSprites[img].sw,
		this.media.balloonSprites[img].sh
	);
	*/


	ctx.shadowColor = '#212121';
	ctx.shadowBlur = 20;
	ctx.shadowOffsetX = 15;
	ctx.shadowOffsetY = 15;

	ctx.drawImage( this.media.balloonSprites[img].image,
			this.media.balloonSprites[img].sx, //position on the image
			this.media.balloonSprites[img].sy, //position on the image
			this.media.balloonSprites[img].sw, //image width on the image
			this.media.balloonSprites[img].sh, //image height on the image
			-Math.floor(this.media.balloonSprites[img].sw/2), //position x on canvas
			-Math.floor(this.media.balloonSprites[img].sh/2), //position y on canvas
			(this.pop_radius/100)*this.media.balloonSprites[img].sw, //width on canvas
			(this.pop_radius/100)*this.media.balloonSprites[img].sh //height on canvas
	);

	ctx.rotate(-this.rotationAngle);
	ctx.translate(-this.x, -this.y);
	ctx.shadowBlur = 0;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
}


Balloon.prototype.update = function() {
	if (!this.activated) {
		return;
	}

	if (this.popped && !this.finished_popped) {
		this.x = this.pop_radius*Math.cos(this.pop_theta) + this.fixed_pop_center.x;
		this.y = this.pop_radius*Math.sin(this.pop_theta) + this.fixed_pop_center.y;
		if (this.pop_theta_inc) {
			this.pop_theta -= 0.1;
		}
		else {
			this.pop_theta += 0.1;
		}
		this.pop_radius -= 1;
		if (this.pop_radius< 5) {
			this.media.sound.play('pop');
			this.finished_popped = true;
		}
		return;
	}

	this.percentBezier += this.bezierSpeed;
	var pos = getBezier(
		this.percentBezier,
		this.Bpath.C1,
		this.Bpath.C2,
		this.Bpath.C3,
		this.Bpath.C4
	);
	this.x = pos.x;
	this.y = pos.y;

	if (this.rotationAngleSide) {
		this.rotationAngle += 0.002;
	}
	else {
		this.rotationAngle -= 0.002;
	}
	if (Math.abs(this.rotationAngle)+0.01 > this.maxRotationAndle) {
		this.rotationAngleSide = !this.rotationAngleSide;
	}

	/*
	if ( (this.isPeeling && !this.peeled)|| (this.isCutting && !this.cut) ) {
		if (this.twoRotations==0) {
			this.rotationAngle+=this.plusRotation;
			if (this.rotationAngle>0.4) {
				this.twoRotations = 1;
			}
		}
		else if (this.twoRotations ==1) {
			this.rotationAngle-=this.plusRotation;
			if (this.rotationAngle<-0.4) {
				this.twoRotations = 2;
			}
		}
		else if (this.twoRotations==2) {
			this.rotationAngle+=this.plusRotation;
			if (this.rotationAngle>0.01) {
				this.twoRotations = 3;
			}
		}
		else {
			this.twoRotations = 0;
			this.rotationAngle = 0;
			if (this.isPeeling) {
				this.peeled = true;
				this.isPeeling = false;
			}
			else {
				this.cut = true;
				this.maxTimer = 2;
				this.augmenter = 16;
			}
		}
	}
	*/
	Element.prototype.update.call(this);
}

Balloon.prototype.reset = function() {
	Element.prototype.reset.call(this);
	this.rotationAngle = 0;
	this.maxRotationAndle = 0.08;
	this.rotationAngleSide = false;
	this.popped = false;
	this.finished_popped = false;
	this.side_of_theta = Math.random()>0.5;
	this.pop_theta_inc = Math.random()>0.5;
	this.pop_theta = 0;
	this.pop_radius = 100;
	this.fixed_pop_center = {
		x: 0,
		y: 0
	};
}

Balloon.prototype.setPath = function() {
	/* Example of usage:
	var data = [];
	var C1 = {x: 280,y: 66}; //start
	var C2 = {x: 170,y: 75}; //control
	var C3 = {x: 155,y: 100}; //control2
	var C4 = {x: 160,y: 150}; //end

	for (var i =0; i< 20; i++) {
		var pos = getBezier(i/20.0, C1, C2, C3, C4);
		data.push(
			{x: pos.x,  y: pos.y, w:4}
		);
	}
	data = data.reverse();
	*/

	this.Bpath = {
		C1 : {x: randInt(50,270),y: 0}, //start
		C2 : {x: randInt(100,200),y: 200}, //control
		C3 : {x: randInt(50,270),y: 300}, //control2
		C4 : {x: randInt(50,270),y: 600} //end
	}
}

Balloon.prototype.toggleActive = function() {
	this.activated = !this.activated;
}

Balloon.prototype.pop = function() {
	this.popped = true;
	if (this.side_of_theta) {
		this.fixed_pop_center.x = this.x - this.pop_radius;
	}
	else {
		this.fixed_pop_center.x = this.x + this.pop_radius;
		this.pop_theta = -2*1.570796326794895;
	}
	this.media.sound.play('swoosh');
	this.fixed_pop_center.y = this.y;
}


