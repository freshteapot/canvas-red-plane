function Game(ctx) {
	this.ctx=ctx;
	this._objs = [];
	this.gameTimer=null;
	this.fps = 75; // frames per second
    this.timeInterval = null;
}

Game.prototype ={
	addObject: function(obj) {
		this._objs.push(obj);
	},
	start: function() {
		this.timeInterval = 1000 / this.fps;
		this.gameTimer = setInterval(function(){
			this.clearCanvas();
			this.updateObjects();
		}.bind(this),this.timeInterval);
	},
	pause: function() {
		if (this.gameTimer !== null )
		{
			clearInterval(this.gameTimer);
			this.gameTimer = null;
		} else {
			this.start();
		}
	},
	isPaused: function() {
		if (this.gameTimer !== null ) {
			return false;
		}
		return true;
	},
	clearCanvas: function() {
		this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
	},
	updateObjects: function() {
		for (var i = 0; i < this._objs.length; i++) {
			this._objs[ i ].update && this._objs[ i ].update();
			this._objs[ i ].draw && this._objs[ i ].draw();
		}
	},
	end: function() {
		this.isFinished = true;
	},
	finished: function() {
		return this.isFinished;
	}
};