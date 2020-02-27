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
	let height = 0; //given 0-50
	let xyProj = 0;
	let xzProj = 0;
	let yzProj = 0;

	//Create 2D matrix Representation of the input.
	//Initialize values.
	var repArr = zeros([n,grid[0].length]);

	//var repArr = new Array();
	//repArr[0] = new Array();
		
	// //Initialize array values to 0.
	// let i = 0;
	// let j = 0;
	// while (j < n-1) {
	// 	while (i < n-1) {
	// 		repArr[i][j]= 0;
	// 		i++
	// 	}
	// 	j++
	// }

	//Initialize Memo Array
	//Key - arr[x][y][z] = v; v = height of tower at position.

	//var memoArr = zeros([n,grid[0].length]);				//Recursive Initialization
	var memoArr = Array(n).fill().map(() 					//Using map & fill functions.
					=> Array(grid[0].length).fill(0));

	//Set the 'v' values in the memo array;
	let x = 0;
	let y = 0;
	let z = 0;
	while (z<n) {
		while (y<n) {
			while (x<n) {
				memoArray[x][y][z] = getTower();
				x++;
			}
			y++;
		}
		z++;
	}
	/* 
	[0][0][0] x++ 
	[1][0][0] y++
	[1][1][0] z++
	[1][1][1] x++
	[2][1][1]
	[2][2][1]
	[2][2][2]
	[3][2][2]
	[3][3][2]
	[3][3][3]
	*/
	//Lets think about this DP wise, now that we understand the problem a little better.
	//I'm starting to think that there is a relationship between the projections and n. where n is significant because each level adds another layer.
	//n = 1 is a single array, single value input
	//n = 2 is a double array, double value input
	//n = 3 is a triple array, tripple input.
	//Now I need to find the relationship between an xy, xz, yz projection and its n (magnitude?)... something like n(x) = greaterOf( n(x-1), n(x-2) )
	//


	return xyProj + xzProj + yzProj;

	
};

//Initialize an array with 'dimensions' [a,b] where a = number of sub arrays, b = number of elements in each sub array.
//Uses recursion, have not fully followed execution of this, code seems to obscure actual execution.
function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
};

/*
Lessons Learned:
	* Come up with a prepresentation of the problem, especially true with array manipulation problems. In this case we can create a 2D array to represent the block locations at (x,y) and store their height z.
	* Once I was able to look at the problem represented in 2D Array form, calculating the projection areas became very obvious.
	* The xyProjArea = count locations that have a value != 0
	* xzProj = sum max value for each column - or thinking about it from a more visual perspective, you know the highest value in each columnn will be the most 'significant'
	* yzProj = sum max value for each row - ""

Problem Discovery Notes / Workflow:

	Think of the values v = grid[i][j] or grid[i][j][z] as the coordinates of the start of the block, centered on the point and alligned with axi
	Therefor, a grid with only x y values. will always have all its towers starting at 0 on the z axis, because z = 0, assumed.
	If we add a z value, the tower will be shifted up, away from the x=y plane.

	Example 1
	 Input: [[2]]
	 Output: 5
	
	 [0][0]				//This grid represneation was added after 'breakthrouh' moment.
	 [2][0]
	
	 grid[1][0][0] = v = 2		
	 Block height = 2				
	Block location = [1][0][0]	
	xyProj = 1					
	xzProj = 2					
	yzProj = 2					
	area = 5						

	Example 2
	Input: [[1,2],[3,4]]
	Output: 17
	
	[2][4]				//This grid represnetation was added after 'breakthrouh' moment.
	[1][3]
	
	Blocks = 4 = n * n 			
    grid[1][1][0] = v = 1		
    grid[1][2][0] = v = 2		
    grid[2][1][0] = v = 3		
    grid[2][2][0] = v = 4		
    xyProj = n * n
  
	xzProj = 6 = z value (vertical?) dictates?
		width = x max
		height = z max
		projection area = tower1(greaterZOf([x1,z1],[x1,z2]) + tower2(greaterOf([x2,z1],[x2,z1]))
		Observation - projection of xz plane concerns only x and z values.
		Further - z seems to dictate tower height
	yzProj = 7 = z value (vertical?) dictates?
		width = 2 = n = y
		height = greaterOf([y1,z1],[y1,z2]

	Example 3
	Input: [[1,0],[0,2]]
	Output: 8
	
	[0][2]				//This grid represnetation was added after 'breakthrouh' moment.
	[1][0]
	
	xyProj = 2
	xzProj = 3
	yzProj = 3
	
	Blocks = 4 = n * n
	grid[1][1][0] = 1
	grid[1][2][0] = 0
	grid[2][1][0] = 0
	grid[2][2][0] = 2
	
	xyProj = area1(greaterYof([x1,y1],[x1,y2])) + area2(greaterYof([x2,y1],[x2,y2]) = 2 + 2 = 4
	xzProj = area1(greaterZof(0,0) + area2(greaterZof(0,0)) = 0
	yzProj = area1(greaterZof())

	 
	THE BREAKTHROUGH MOMENT ~4-5h into "discovery"
	 
	Towers at location
	0,0 - height 1
	0,1 - height 0
	1,0 - height 0 		[0][2]
	1,1 - height 2		[1][0]
	xyProjArea = straight on = count grid locations where value != 0;
	xzProjArea = bottom to top greaters = 3
	yzProjArea = left to right = 3
	I think we just had a breakthrough.

	If we build a matrix that represents the locations of the towers as x,y, then the value contained represents the height or z
	Still not sure how I'm going to use DP for this, but I think I'm getting closer.
*/

