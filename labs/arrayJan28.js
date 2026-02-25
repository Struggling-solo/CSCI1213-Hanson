//const numbers = [1,2,3,4]
//function doubleNumber(number){
   // return number * 2
//}
//const doubleArray = numbers.map(doubleNumber) *** here is call-back, old style

//const doubleArray = numbers.map(n => n * 2)

//console.log(numbers)
//console.log(doubleArray)

//const classMembers = ['Scott', 'Zana', 'Deborah', "Lei Hala"]
//const upperNames = classMembers.map(m => m.toUpperCase())
//console.log(upperNames)

const numbers = [1,2,3,4,5,6,7,8,9,10]
const evenNumbers = numbers.filter(num => (num %2) === 0)
const oddNumbers = numbers.filter(num => (num %2) === 1)
console.log(evenNumbers)
console.log(oddNumbers)

const classMembers = ['Scott', 'Zana', 'Deborah', "Lei Hala"]
const shortName = classMembers.filter(m => m.length < 6)
console.log(shortName)

