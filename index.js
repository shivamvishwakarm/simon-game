var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


// When keyboard key was pressed calling the nextSequence function
var started = false;
var level = 0;

// Start game with pressing a button in keyboard
document.addEventListener("keypress", function() {
    if (!started) {
        document.getElementById("level-title").innerText = "Level " + level;
        nextSequence();
        started = true;
    }
})

// Adding event listener in all color buttons and call checkAnswer function
for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function(event) {
        var userChosenColour = event.target.id; // Store id of the clicked button
        userClickedPattern.push(userChosenColour); // Adding id of the clicked button in userClickedPattern array
        press(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });
}

// Checking the answer against the user
function checkAnswer(currentLeve1) {
    if (userClickedPattern[currentLeve1] === gamePattern[currentLeve1]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {
        var wrongAudio = new Audio("/sounds/wrong.mp3");
        wrongAudio.play();
        document.querySelector("body").classList.add("game-over");
        setInterval(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 100);
        document.getElementById("level-title").innerText = "Game Over, Press Any Key To Restart";
        startOver();
    }
}



function nextSequence() {

    userClickedPattern = [];
    level++;
    document.getElementById("level-title").innerText = "Level " + level;


    var randomNumber = Math.floor(Math.random() * 4); // Generat random number 0 to 3

    var randomChosenColour = buttonColours[randomNumber]; // Chooseing the random colors from ButtonColours array

    gamePattern.push(randomChosenColour); // Adding the random color in gamePattern array

    // Blink the colors button
    blink(randomChosenColour);

    // Playing the sound of the color
    playSound(randomChosenColour);

}


// Retart 
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


// button pressed effect
function press(nameOfColor) {
    var colorClass = document.querySelector("#" + nameOfColor); // Selecting the random color class from html DOM


    //Blink the color box 
    colorClass.classList.add("pressed");
    setInterval(() => {
        colorClass.classList.remove("pressed");
    }, 10);
}


// Blink effect to the button
function blink(nameOfColor) {
    var colorClass = document.querySelector("#" + nameOfColor); // Selecting the random color class from html DOM


    //Blink the color box 
    colorClass.classList.add("fadeOut");
    setInterval(() => {
        colorClass.classList.remove("fadeOut");
    }, 570);
}

// This function play sound as it gets the input
function playSound(nameOfColor) {
    var audio = new Audio("/sounds/" + nameOfColor + ".mp3");
    audio.play();
}
