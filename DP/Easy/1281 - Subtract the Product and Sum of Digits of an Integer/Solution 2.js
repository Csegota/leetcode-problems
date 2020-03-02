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
    
    for (i=0;i<numbers.length;i++) {
        prod = numbers[i] * prod;
    }
    
    for (i=0;i<numbers.length;i++) {
        sum = numbers[i] + sum;
    }
    
    return prod - sum;
};