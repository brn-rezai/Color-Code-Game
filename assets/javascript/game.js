//random password colors

const colors = [ 'red', 'yellow', 'orange', 'green', 'purple', 'blue' ];

// Function to generate a random password based on the level
function generatePassword( level ) {
    let passwordLength;

    // Set password length based on difficulty
    switch ( level ) {
        case 'easy':
            passwordLength = 6;
            break;
        case 'medium':
            passwordLength = 8;
            break;
        case 'hard':
            passwordLength = 10;
            break;
        default:
            passwordLength = 6; // Default to easy if no valid level
            break;
    }

    let password = '';

    // Randomly select colors to form the password
    for ( let i = 0; i < passwordLength; i++ ) {
        let randomColor = colors[ Math.floor( Math.random() * colors.length ) ];
        password += randomColor + ' ';  // Add color to password (with a space for separation)
    }

    return password.trim();  // Remove the trailing space
}

// Example usage: Generate password based on selected level
let selectedLevel = 'medium';  // This would be based on user choice in your game
let generatedPassword = generatePassword( selectedLevel );
console.log( 'Generated Password:', generatedPassword );


//color choices

const colorButtons = document.querySelectorAll( ".color-btn" );

colorButtons.forEach( button => {
    button.addEventListener( "click", () => {
        let selectedColor = button.id; // Get the color name from the button's id
        console.log( "Selected color:", selectedColor );
        const choice = document.createElement( "button" );
        choice.classList.add( ".color-btn" );
        choice.style.backgroundColor = selectedColor;
        // Add logic for selecting colors in the game
    } );
} );


// gusses

let maxGuesses = 10;
let currentGuesses = 0;
let previousGuesses = [];
let generatedPassword = generatePassword( 'medium' ); // Example: Medium difficulty
let passwordArray = generatedPassword.split( " " );

function handleGuess( guess ) {
    if ( currentGuesses >= maxGuesses ) {
        gameOver( generatedPassword );
        return;
    }

    let guessArray = guess.split( " " );

    let correctPositions = 0;
    let correctColors = 0;
    let checkedColors = {}; // Track colors already counted

    // Check for correct positions first
    for ( let i = 0; i < passwordArray.length; i++ ) {
        if ( guessArray[ i ] === passwordArray[ i ] ) {
            correctPositions++;
        } else {
            checkedColors[ passwordArray[ i ] ] = ( checkedColors[ passwordArray[ i ] ] || 0 ) + 1;
        }
    }

    // Check for correct colors in wrong positions
    for ( let i = 0; i < passwordArray.length; i++ ) {
        if ( guessArray[ i ] !== passwordArray[ i ] && checkedColors[ guessArray[ i ] ] ) {
            correctColors++;
            checkedColors[ guessArray[ i ] ]--;
        }
    }

    previousGuesses.push( { guess, correctColors, correctPositions } );
    currentGuesses++;

    updatePreviousGuessesUI();

    if ( guess === generatedPassword ) {
        alert( `🎉 You won! The correct password was: ${ generatedPassword }` );
        updateScore();
    } else if ( currentGuesses >= maxGuesses ) {
        gameOver( generatedPassword );
    }
}

function updatePreviousGuessesUI() {
    let historyDiv = document.getElementById( "guessHistory" );
    historyDiv.innerHTML = "";

    previousGuesses.forEach( ( entry, index ) => {
        let guessElement = document.createElement( "p" );
        guessElement.innerHTML = `<strong>Guess ${ index + 1 }:</strong> ${ entry.guess }  
        <br> ✅ Correct Positions: ${ entry.correctPositions }  
        <br> 🔄 Correct Colors (Wrong Place): ${ entry.correctColors }`;
        historyDiv.appendChild( guessElement );
    } );
}

function gameOver( password ) {
    alert( `❌ Game Over! The correct password was: ${ password }` );
    document.getElementById( "tryAgainBtn" ).style.display = "block";
}

function restartGame() {
    window.location.reload();
}

document.getElementById( "tryAgainBtn" ).addEventListener( "click", restartGame );

