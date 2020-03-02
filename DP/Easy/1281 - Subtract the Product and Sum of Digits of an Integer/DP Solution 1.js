/**
 * @param {number} n
 * @return {number}
 */

var subtractProductAndSum = function(n) {
    
    let productOfDigits = 1;
    let sumOfDigits = 0;
    while(n >  0){
        productOfDigits *= n % 10; // 4 * 3 * 2
        sumOfDigits += n % 10;     // 4  + 3 + 2
        n = Math.floor(n / 10);    // 23 --> 2 --> 0
        
    }
    return (productOfDigits - sumOfDigits);
};