exports.Character = function (name) {
	this.name = name;
	this.x = 0;
	this.y = 0;
	this.getX = function (){ return this.x; };
	this.getY = function (){ return this.y; };
	this.hello = function (){ return "Hello!! I'm " + this.name + "!!"; };
	this.move = function (x,y){ this.x+=x; this.y+=y;};
}

