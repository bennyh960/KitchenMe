let text = "AAACaFD4";

// look for "Hello"
let pattern1 = /[a-z]/g;
let result1 = pattern1.test(text);

// look for "W3Schools"
let pattern2 = /^[^a-z]+$/g;
let result2 = pattern2.test(text);

console.log(result1);
console.log(result2);
