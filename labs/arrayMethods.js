// arrow function 1
const add = (a,b) => a + b
console.log(add(2,2))
console.log(add(4,5))

//arrow function 2
const square = num => num * num
console.log(square(4))

//arrow function 3
const divide = (a,b) => {
    if (b === 0) return null;
    return a/b
}
console.log(divide(100,5))
console.log(divide(5,0))

//  no parameters - arrow function 4
const getRandom = () => Math.randomI()