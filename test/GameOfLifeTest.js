describe("game of life", function () {
	var grid = 		"....\n" +
					"..*.\n" +
					".*.*\n" +
					"....\n";
	
    it("should initialize a new game of life", function () {
		var game = new GameOfLife(4,4, grid);
		expect(game.nbRows).toBe(4);
		expect(game.nbCols).toBe(4);
		expect(game.grid.length).toBe(4);
		expect(game.grid[0].length).toBe(4);
    });
	
	it("should give number of alive neighbours", function(){
		var game = new GameOfLife(4,4, grid);
		var i = game.getNbAliveCells(0,1);
		expect(i).toBe(1);
	});
	
	it("cell should die if less than two neighbours", function(){
		var game = new GameOfLife(4,4, grid);
		var newCell = game.getNextGenCell(1,1);
		expect(newCell).toBe('.');
	});
	
	it("should create new cell if three neighbours", function(){
		var game = new GameOfLife(4,4, grid);
		var newCell = game.getNextGenCell(2,2);
		expect(newCell).toBe('*');
	});
	
	it("should keep cell alive if two neighbours", function(){
		var game = new GameOfLife(4,4, grid);
		var newCell = game.getNextGenCell(2,1);
		expect(newCell).toBe('*');
	});
	
	var grid2 = 	"....\n" +
					"..*.\n" +
					".***\n" +
					"....\n";
	
	it("should keep cell alive if three neighbours", function(){
		var game = new GameOfLife(4,4, grid2);
		var newCell = game.getNextGenCell(2,2);
		expect(newCell).toBe('*');
	});
	
	var grid3 = 	"....\n" +
					"..*.\n" +
					".***\n" +
					"..*.\n";
	
	it("cell should die if more than three neighbours", function(){
		var game = new GameOfLife(4,4, grid3);
		var newCell = game.getNextGenCell(2,2);
		expect(newCell).toBe('.');
	});
	
	var grid4 = 	"........\n"+
					"....*...\n"+
					"...**...\n"+
					"........";

	it("should return next generation", function(){
		var game = new GameOfLife(4, 8, grid4);
		var newg = game.getNextGeneration();
		var expected = 	"........\n"+
						"...**...\n"+
						"...**...\n"+
						"........\n"

		expect(newg).toBe(expected);
	});
	
	
});