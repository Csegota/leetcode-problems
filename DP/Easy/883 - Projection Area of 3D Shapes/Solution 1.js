/**************************************************************************************************
PROBLEM

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

/**************************************************************************************************
EXAMPLE 2

GIVEN:

grid[[A,B],[C,D]]

WHERE:

[A,B] 
is a 'file' or 'record'

THEN:

[B][D]		//'Representation'
[A][C]

is a represnetation of grid[[A,B],[C,D]] as 4 block towers sitting on the xy plane
where A is positioned on (0,0), B is positioned on (0,1) ...

A = grid[0][0] = 1 = v = height
B = grid[0][1] = 2 = v
C = grid[1][0] = 3 = v
D = grid[1][1] = 4 = v

Think of the representation as looking 'down' over the top of the towers aka, viewing the xyShadow.
Then evaluating from bottom to top, would represent viewing the xzShadow.
And evaluating from left to right, would represent viewing the yzShadow.

Notice the 'records' from the original grid, which would/could typically be interpreted as a horizontal entity, are now viewed as columns of 'towers' in our representation.
*/

/**
 * 56 ms - faster than 87%
 * Space - O(N), better than 100%
 * @param {number[][]} grid
 * @return {number}
 */
var projectionArea = function(grid) {
	let xyShadow = 0;
	let xzShadow = 0;
	let yzShadow = 0;
    
    /***********************************
    * Evaluate COLUMNS in REPRESENTATION -  ('files' of original input)
    ***********************************/

    for( let i = 0; i < grid.length; i++ ){ //For each column in representation.
        let columnMax = 0;
        for( let j = 0; j < grid[i].length; j++  ){ //For each value in column...
            if( grid[i][j] > 0 ){ //Check for value existance at location.
                xyShadow++; //If a value exists at this location, we know it will result in 1 block of space on the xyShadow, simply count them as we iterate though each original 'file', now represented as columns.
                
                columnMax = Math.max(columnMax, grid[i][j]); //Store the max value of current 'column'
            }
        }
        xzShadow += columnMax; //Add up the max values from each 'column' in the representation.
    }
    //E.g. Example 2
    //max(A,B) = column 1 = max(1,2) = 2
    //			    +
    //max(C,D) = column 2 = max(3,4) = 4
    // 2 + 4 = 6 = xzShadow


    /********************************
    * Evaluate ROWS in REPRESENTATION
    ********************************/

    for( let j = 0; j < grid[0].length; j++ ){
        let RowMax = 0;
        for( let i = 0; i < grid.length; i++ ){
            if(grid[i][j] > 0  ){
                RowMax = Math.max(RowMax, grid[i][j]); //Store the max value of current 'row'
            }
        }
        yzShadow += RowMax; //Add up the max values from each 'row' in the representation.
    }
    //E.g. Example 2.
    //max(A,C) = row 1 = max(1,3) = 3
    //             +
    //max(B,D) = row 2 = max(2,4) = 4
    // 3 + 4 = 7 = yzShadow
    
    return xyShadow + xzShadow + yzShadow;
};

/**
Lessons Learned:
	* Come up with a prepresentation of the problem, especially true with array manipulation problems. In this case we can create a 2D array to represent the block locations at (x,y) and store their height z.
	* Once I was able to look at the problem represented in 2D Array form, calculating the projection areas became very obvious.
	* The xyProjArea = count locations that have a value != 0
	* xzProj = sum max value for each column - or thinking about it from a more visual perspective, you know the highest value in each columnn will be the most 'significant'
	* yzProj = sum max value for each row - ""
**/