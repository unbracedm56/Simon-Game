gamePattern = [];
userClickedPattern = [];
buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var count = -1;

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence(){
    var randomNumber = Math.random();
    randomNumber = (randomNumber*4);
    randomNumber = Math.floor(randomNumber);

    $("h1").text("Level "+level);

    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    randomChosenColor1 = "#" + randomChosenColor;
    $(randomChosenColor1).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);

    level++;
}

function startOver(){
    level=0;
    gamePattern= [];
    userClickedPattern= [];
    count = -1;
}

$(document).keypress(function(){
    nextSequence();
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(currentLevel==(gamePattern.length-1)){
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern = [];
            count = -1;
        }
    }else{
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$(".btn").click(function(){
    var userChosenColour = this.id;
    var userChosenColour1 = "#" + userChosenColour;
    $(userChosenColour1).addClass("pressed");
    setTimeout(function(){$(userChosenColour1).removeClass("pressed");} ,100);
    userClickedPattern.push(userChosenColour);
    count++;
    playSound(userChosenColour);
    checkAnswer(count);
});

