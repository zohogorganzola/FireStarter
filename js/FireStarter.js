/**
 * @author Zoho
 */

//Constructor!
function FireStarter(gridConfig) {
	if(gridConfig === undefined) {
		this.gridConfig = {
			blockSize: {
				x: 75,
				y: 75
			},
			gridSize: {
				x: 10,
				y: 10
			}
		};
	}
	else {
		this.gridConfig = gridConfig;
	}
	
	this.canvasSize = { x: this.gridConfig.gridSize.x * this.gridConfig.blockSize.x,
						y: this.gridConfig.gridSize.y * this.gridConfig.blockSize.y }
		
	this.canvas = document.getElementById("firestarter_canvas");
	this.canvas.width = this.canvasSize.x;
	this.canvas.height = this.canvasSize.y;
	this.cc = this.canvas.getContext("2d");
	this.grid = [];
	this._intervalId;
};


//Definitions
FireStarter.prototype = {
	init: function() {
		this.initGridData();		
	},
	
	initGridData: function() {
		var x = 0, y = 0, content = "*";
		var blockSize = {x:this.gridConfig.blockSize.x, y:this.gridConfig.blockSize.y};
		this.cc.font = "12px sans-serif";
		for(; x < this.gridConfig.gridSize.x; x += 1) {
			this.grid[x] = new Array(this.gridConfig.gridSize.y);
			for(; y < this.gridConfig.gridSize.y; y += 1) {
				var block = new FireStarterBlock(x, y);
				block.changeState(Math.round(Math.random()));
				block.drawPosition = {
					x: (x * blockSize.x) + (blockSize.x / 2),
					y: (y * blockSize.y) + (blockSize.y / 2) 
				}
				this.grid[x][y] = block;
			}
			y = 0;
		}
	},
	
	drawBlock: function(block) {
		this.cc.fillText(block.content, block.drawPosition.x, block.drawPosition.y);
	},
	
	drawGrid: function() {
		var top = ONE_PIXEL_OFFSET;
		var blockSize = this.gridConfig.blockSize;
		
		this.cc.beginPath();
		
		//draw grid outline
		this.drawLine(top, top, top, this.canvas.height);
		this.drawLine(top, this.canvas.height, this.canvas.width, this.canvas.height);
		this.drawLine(this.canvas.width, this.canvas.height, this.canvas.width, top);
		this.drawLine(this.canvas.width, top, top, top);
				
		for(var x = 0; x <= this.canvas.width; x += 1) {
			xCord = x * blockSize.x;
			this.drawLine(xCord, 0, xCord, this.canvas.height);
		}
		
		for(var y = 0; y <= this.canvas.height; y += 1) {
			yCord = y * blockSize.y;
			this.drawLine(0, yCord, this.canvas.width, yCord);
		}
		
		for(var x in this.grid) {
			for(var y in this.grid[x]) {
				this.grid[x][y].changeState(Math.round(Math.random()));
				this.drawBlock(this.grid[x][y]);
			}
		}
		
		this.cc.stroke();
	},
	
	drawLine: function(startX, startY, endX, endY, strokeStyle) {
		strokeStyle = strokeStyle ? strokeStyle : "#000";
		this.cc.strokeStyle = strokeStyle;
		this.cc.moveTo(startX, startY);
		this.cc.lineTo(endX, endY);
	},
	
	draw: function() {
		this.canvas.width = this.canvas.width;
		this.drawGrid();
	},
	
	update: function() {
		
	},
	
	begin: function(fps) {
		var self = this;
		if(fps === undefined) {
			fps = 60;
		}
		this._intervalId = setInterval(function() {self.run.call(self)}, (1000/fps));
	},
	run: function() {
		this.update();
		this.draw();
	},
	stop: function() {
		clearInterval(this._intervalId);
	}
};