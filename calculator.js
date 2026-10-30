// Function to add two numbers
function add(a, b) {
    return a + b;
}

// Function to subtract two numbers
function subtract(a, b) {
    return a - b;
}

// Function to multiply two numbers
function multiply(a, b) {
    return a * b;
}

// Function to divide two numbers (handles divide by zero)
function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero!";
    }
    return a / b;
}

// Test cases to verify the calculator works
console.log("=== Calculator Test Cases ===");
console.log("Addition (10 + 5) =", add(10, 5));
console.log("Subtraction (10 - 5) =", subtract(10, 5));
console.log("Multiplication (10 * 5) =", multiply(10, 5));
console.log("Division (10 / 2) =", divide(10, 2));
console.log("Divide by zero test (10 / 0) =", divide(10, 0));

