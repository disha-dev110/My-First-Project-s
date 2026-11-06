const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let score = 0;
let attempts = 0;

function startGame() {
    rl.question('Choose Difficulty: (1) Easy (1-50) or (2) Hard (1-200): ', (mode) => {
        let maxNumber = 50;
        
        // Challenge mode logic
        if (mode === '1') {
            maxNumber = 50;
            console.log('--- Easy Mode Selected (1-50) ---');
        } else if (mode === '2') {
            maxNumber = 200;
            console.log('--- Hard Mode Selected (1-200) ---');
        } else {
            console.log('Invalid choice. Defaulting to Easy Mode.');
        }

        const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
        console.log(`I have guessed a number between 1 and ${maxNumber}.`);
        
        attempts = 0;
        score = 100; // Starting score
        guessNumber(randomNumber);
    });
}

function guessNumber(target) {
    if (score <= 0) {
        console.log(`Game Over! The number was ${target}.`);
        return rl.close();
    }

    rl.question('Enter your guess: ', (input) => {
        const guess = parseInt(input);
        attempts++;

        if (isNaN(guess)) {
            console.log('Please enter a valid number!');
            return guessNumber(target);
        }

        // if/else logic for checking the guess
        if (guess === target) {
            console.log(`🎉 Correct! You guessed the number in ${attempts} attempts.`);
            console.log(`Your final score is: ${score}`);
            rl.close(); // End game
        } else {
            score -= 10; // Deduct score for wrong guess
            
            // Hint logic (Extra kaj)
            if (guess < target) {
                if (target - guess <= 5) {
                    console.log(`Too low, but you are very close! (Score: ${score})`);
                } else {
                    console.log(`Too low! (Score: ${score})`);
                }
            } else if (guess > target) {
                if (guess - target <= 5) {
                    console.log(`Too high, but you are very close! (Score: ${score})`);
                } else {
                    console.log(`Too high! (Score: ${score})`);
                }
            }
            guessNumber(target); // Loop back for next guess
        }
    });
}

// Start the game
startGame();