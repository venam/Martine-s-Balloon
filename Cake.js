function Cake(game) {
	Element.call(this);
	this.game             = game;
	this.media            = this.game.media;

	this.x = 320/2;
	this.y = 600;
	this.rotationAngle = 0;
	this.frame = 0;
	this.counter = 0;
}


Cake.prototype = new Element();
Cake.prototype.constructor = Cake;

Cake.prototype.draw = function(ctx) {
	ctx.translate(this.x,this.y);
	ctx.rotate(this.rotationAngle);
	ctx.shadowColor = '#212121';
	ctx.shadowBlur = 20;
	ctx.shadowOffsetX = 15;
	ctx.shadowOffsetY = 15;

	this.counter++;
	if (this.counter %10 == 0) {
		this.counter = 0;
		this.frame = (this.frame + 1) % 3;
	}

	ctx.drawImage( this.media.cakeSprites[this.frame].image,
			this.media.cakeSprites[this.frame].sx, //position on the image
			this.media.cakeSprites[this.frame].sy, //position on the image
			this.media.cakeSprites[this.frame].sw, //image width on the image
			this.media.cakeSprites[this.frame].sh, //image height on the image
			-Math.floor(this.media.cakeSprites[this.frame].sw/2), //position x on canvas
			-Math.floor(this.media.cakeSprites[this.frame].sh/2), //position y on canvas
			this.media.cakeSprites[this.frame].sw, //width on canvas
			this.media.cakeSprites[this.frame].sh //height on canvas
	);

	ctx.rotate(-this.rotationAngle);
	ctx.translate(-this.x, -this.y);
	ctx.shadowBlur = 0;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;

}


Cake.prototype.update = function() {
}
