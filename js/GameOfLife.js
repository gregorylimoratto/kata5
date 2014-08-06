(function(){

	var gameOfLife = function(nbRows, nbCols, gridStr){
		this.nbRows = nbRows;
		this.nbCols = nbCols;
		this.grid = [];
		var lines = gridStr.split(/\r?\n/g);
		for (var i=0; i<lines.length; i++){
			if (lines[i].length > 0){
				this.grid.push([]);
				for(var j=0; j<lines[i].length; j++){
					this.grid[i].push(lines[i][j]);
				}
			}
		}
	};

	var hasAliveCell = function(game, x, y) 
	{
		if (x >= 0 && y >=0 && x < game.nbCols && y < game.nbRows)
		{
			return game.grid[y][x] === '*';
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
	
	gameOfLife.prototype.getNextGenCell = function(x, y){
		var nbNeighbourCellsAlive = this.getNbAliveCells(x, y);
		if (nbNeighbourCellsAlive < 2 && this.grid[y][x] === '*') return '.';
		if ((nbNeighbourCellsAlive === 2 || nbNeighbourCellsAlive === 3) && this.grid[y][x] === '*') return '*';
		if (nbNeighbourCellsAlive === 3 && this.grid[y][x] === '.') return '*';
		if (nbNeighbourCellsAlive > 3 && this.grid[y][x] === '*') return '.';
		return this.grid[y][x];
	}
	
	gameOfLife.prototype.getNextGeneration = function(){
		var grid = "";
		for (var i=0; i<this.grid.length; i++){
			for(var j=0; j<this.grid[i].length; j++){
				grid+=this.getNextGenCell(j,i);
			}
			grid+="\n";
		}
		return grid;
	}
	
	window.GameOfLife = gameOfLife;
}());