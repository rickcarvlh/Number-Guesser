/**
 * GAME FUNCTION
 * Player must guess a number between a min and max
 * Player gets a certain amount of guesses
 * Notify player of guesses remaining
 * Notify the player of the correct answer if loose
 * Let player choose to play again
 */


// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;


// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max - so it becomes dynamic on the html
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function (e) {
    // only if click submit - reason for mousedown and not click
    if (e.target.className === 'play-again') {
        // reload the page
        window.location.reload();
    }

});

// Listen for guess - submit button
guessBtn.addEventListener('click', function () {
    // this starts as string needs to be converted
    let guess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`,
            'red');
    }

    // Check if won
    if (guess === winningNum) {
        // Game over Won

        // // Disable input - disabled is a reserved keyword
        // guessInput.disabled = true;
        // // Change border color
        // guessInput.style.borderColor = 'green';
        // // Set message
        // setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
        // Wrong Number = guessesLeft = guessesLeft -1;
        guessesLeft -= -1;

        if (guessesLeft === 0) {
            // Game over lost

            // // Disable input - disabled is a reserved keyword
            // guessInput.disabled = true;
            // // Change border color
            // guessInput.style.borderColor = 'red';
            // // Set message
            // setMessage(`Game over, you lost. The correct number was ${winningNum}`, 'red');
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);


        } else {
            // Game continues - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guessLeft`, 'red');
        }

    }

});

// Game Over
function gameOver(won, msg) {

    let color;
    won = true ? color = 'green' : color = 'red';

    // Disable input - disabled is a reserved keyword
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = 'color';
    //  Set text color
    message.style.color = 'color';
    // Set message
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

// Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg
}