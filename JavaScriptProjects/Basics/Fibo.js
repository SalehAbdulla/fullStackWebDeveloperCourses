function fibonacciGenerator(n) {
    //Do NOT change any of the code above 👆
    if (n === 0){
        return [];
    } else if (n === 1){
        reutrn [0];
    } else if (n === 2){
        return [0, 1];
    } else {
        var output = [0, 1];
        
        for (var i = output.length; i < n; i++){
            output.push(output[output.length - 2] + output[output.length - 1]);
        }
        return output;
    }
}

console.log(fibonacciGenerator(5))
