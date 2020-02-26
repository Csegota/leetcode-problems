/*

Link: https://leetcode.com/problems/projection-area-of-3d-shapes/

Description:

On a N * N grid, we place some 1 * 1 * 1 cubes that are axis-aligned with the x, y, and z axes.

Each value v = grid[i][j] represents a tower of v cubes placed on top of grid cell (i, j).

Now we view the projection of these cubes onto the xy, yz, and zx planes.

A projection is like a shadow, that maps our 3 dimensional figure to a 2 dimensional plane. 

Here, we are viewing the "shadow" when looking at the cubes from the top, the front, and the side.

Return the total area of all three projections.

Note:
    1 <= grid.length = grid[0].length <= 50 	//AKA 1-50 total grids, 1-50 grid params???
    0 <= grid[i][j] <= 50 						//AKA Height range 0-50

*/


/**
 * @param {number[][]} grid
 * @return {number}
 */
var projectionArea = function(grid) {

	//known
	const n = grid.length;
	const towers = n * n;

	//variables
	let x = 0;
	let y = 0;
	let z = 0;
	let height = 0; //given 0-50
	let xyProj = 0;
	let xzProj = 0;
	let yzProj = 0;

	var myArr = new Array();
	//memo
	// key x,y,z = height;
	switch(grid.length) {
		case 1:
			break;
		case 2:
			myArr[0] = new Array();
			break;
		case 3:
			myArr[0][0] = new Array();
			break;
		default:
	}
	// var myArr = new Array();
	// myArr[0] = new Array();
	// myArr[0][0] = new Array();

	while (x<n) {
		while (y<n) {
			while (z<n) {
				myArr[i][j][k] = grid[i][j][k];
				z++;
			}
			y++;
		}
		x++;
	}

	// state
	//myArr[x][y][z] = height

	//relation


	return xyProj + xzProj + yzProj;

	//High Level
	//

	//Think of the values v = grid[i][j] or grid[i][j][z] as the coordinates of the start of the block, centered on the point and alligned with axi
	//Therefor, a grid with only x y values. will always have all its towers starting at 0 on the z axis, because z = 0, assumed.
	//If we add a z value, the tower will be shifted up, away from the x=y plane.

	//Example 1
	// Input: [[2]]
	// Output: 5
	// grid[1][0][0] = v = 2
	// Block height = 2
	// Block location = [1][0][0]
	// xyProj = 1
	// xzProj = 2
	// yzProj = 2
	// area = 5

	//Example 2
	// Input: [[1,2],[3,4]]
	// Output: 17
    // grid[1][1][0] = v = 1
    // grid[1][2][0] = v = 2
    // grid[2][1][0] = v = 3
    // grid[2][2][0] = v = 4
};