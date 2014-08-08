(function(){

	var gameOfLife = function(nbRows, nbCols, gridStr){
		this.nbRows = nbRows;
		this.nbCols = nbCols;
		this.grid = {};
		var lines = gridStr.split(/\r?\n/g);
		for (var i=0; i<nbRows; i++){
			if (lines[i].length > 0){
				for(var j=0; j<nbCols; j++){
					if (lines[i][j] === '*'){
						this.grid[j + "," + i] = '*';
					}
				}
			}
		}
	};

	var hasAliveCell = function(game, x, y) 
	{
		if (x >= 0 && y >=0 && x < game.nbCols && y < game.nbRows)
		{
			return game.grid[x + ',' + y] === '*';
		}
		return false;
	}
	
	gameOfLife.prototype.getNbAliveCells = function(x, y){
		var nbCellsAlive = 0;
		if (hasAliveCell(this, x-1, y-1))  nbCellsAlive ++;
		if (hasAliveCell(this, x, y-1))  nbCellsAlive ++;
		if (hasAliveCell(this, x+1, y-1))  nbCellsAlive ++;
		if (hasAliveCell(this, x-1, y))  nbCellsAlive ++;
		if (hasAliveCell(this, x+1, y))  nbCellsAlive ++;
		if (hasAliveCell(this, x-1, y+1))  nbCellsAlive ++;
		if (hasAliveCell(this, x, y+1))  nbCellsAlive ++;
		if (hasAliveCell(this, x+1, y+1))  nbCellsAlive ++;
		return nbCellsAlive;
	};
	
	gameOfLife.prototype.hasAliveCell = function(x, y){
		return hasAliveCell(this,x,y);
	}
	
	gameOfLife.prototype.getNextGenCell = function(x, y){
		var nbNeighbourCellsAlive = this.getNbAliveCells(x, y);
		if (nbNeighbourCellsAlive > 3) return '.';
		if (nbNeighbourCellsAlive < 2 && hasAliveCell(this, x, y)) return '.';
		if ((nbNeighbourCellsAlive === 2 || nbNeighbourCellsAlive === 3) && hasAliveCell(this, x, y)) return '*';
		if (nbNeighbourCellsAlive === 3 && !hasAliveCell(this, x, y)) return '*';
		return hasAliveCell(this, x, y) ? '*' : '.';
	}
	
	gameOfLife.prototype.generateNextGeneration = function(){
		var grid = {};
		for (var i=0; i<this.nbRows; i++){
			for(var j=0; j<this.nbCols; j++){
				if (this.getNextGenCell(j,i) === '*') {
					grid[j + "," + i] = '*';
				}
			}
		}
		this.grid = grid;
	}
	
	gameOfLife.prototype.getNextGeneration = function(){
		this.generateNextGeneration();
		var grid = "";
		for (var i=0; i<this.nbRows; i++){
			for(var j=0; j<this.nbCols; j++){
				grid+=this.hasAliveCell(j,i) ? '*' : '.';
			}
			grid+="\n";
		}
		return grid;
	}
	
	window.GameOfLife = gameOfLife;
}());