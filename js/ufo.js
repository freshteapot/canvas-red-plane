function UFO(ctx,x,y) {
	this.ctx=ctx;
	this.x=x;
	this.y=y;
	this.path='r';
	this.multiplier = 1;
	this.moved = 0;
}


UFO.prototype = {
	setPath: function(path) {
		this.moved =1;
		this.pathBefore=this.path;
		this.path = path;
		
		if ( this.path === this.pathBefore) {
			this.multiplier+=1;
		} else {
			this.multiplier-=1;
			if (this.multiplier <= 2 ) {
				this.multiplier = 2;
			}
		}
		switch(this.path)
		{
			case 'u':
				this.y+=this.multiplier;
				break;
			case 'd':
				this.y-=this.multiplier;
				break;
			case 'l':
				this.x-=this.multiplier;
				break;		
			case 'r':
				this.x+=this.multiplier;
				break;
			default:
				break;
		}
	},
	update: function() {
		if (this.moved === 1 ) {
			this.moved =0;
		} else {
			this.multiplier-=1;
			this.setPath(this.path);
		}
	},
	draw: function() {
		this.ctx.save();
		this.ctx.translate(this.x,this.ctx.canvas.height-this.y);
		
		this.ctx.beginPath();
		
/*
Use Inkscape, set the co-ordinates then - the x axis.
*/
//		var poly=[ 0,0, 0,-40, 30,-15, 110,-15, 130,0];
		var poly=[ 0,0, 0,40, 30,15, 110,15, 130,0];
		
		this.ctx.fillStyle = '#f00';

		this.ctx.beginPath();
		
		var offSet=0;
		if (this.path === 'l') {
/*
 * This accounts for the length of the plane.
 */
			offSet+=130;	
			this.ctx.scale(-1,-1);
		} else {
			this.ctx.scale(1,-1);
		}
		
		this.ctx.moveTo(poly[0]-offSet, poly[1]);
		for( item=2 ; item < poly.length-1 ; item+=2 ){this.ctx.lineTo( poly[item]-offSet, poly[item+1] )}
		
		this.ctx.closePath();
		this.ctx.fill();

		this.ctx.restore();
		
		
	},
	fire: function() {
		console.log('fire');
	}
};