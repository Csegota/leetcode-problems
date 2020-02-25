/**
 * @param {number} n
 * @return {number}
 */

var subtractProductAndSum = function(n) {
    
    const numbers = Array.from(String(n), Number);
    var prod = 1;
    var sum = 0;
    
    //base case
    if (numbers.length <= 1)
        return 0;
    
    numbers.forEach(findProd);
    numbers.forEach(findSum);
    
    function findProd(val, index, arr) {
        prod = prod * val;
    }
    
    function findSum(val, i, arr) {
        sum = sum + val;
    }
    
    return prod - sum;
};