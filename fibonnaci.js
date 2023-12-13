const fibonacci = (length) => {
    let fibArray = [0, 1];
    for (i = 0; i < length; i++){
        let fibNum = fibArray[i];
        let fibNext = fibNum + fibArray[i + 1];
        fibArray.push(fibNext);
    }
    return fibArray.slice(0, length);
}

const fibonacciRecursion = (length) => {
    if (length < 2) return length;
    return fibonacciRecursion(length - 1) + fibonacciRecursion(length - 2);
}

console.log(fibonacci(50))
console.log(fibonacciRecursion(50))