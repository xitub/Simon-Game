const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var firstKeyPress = true;
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
    userClickedPattern.splice(0,userClickedPattern.length);
    console.log(gamePattern);
}
$("body").keypress(function(){
    if(firstKeyPress){
    setTimeout(function(){nextSequence();},700);
    firstKeyPress = false;
    }
});

$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
});

function playSound(name){
    $("#"+name).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("div."+currentColour).addClass("pressed");
    setTimeout(function(){$("div."+currentColour).removeClass("pressed");},100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1])
            {
                console.log("sucess!");
                if(currentLevel === gamePattern.length){
                    setTimeout(function(){nextSequence();},500);
                }
            }
    else{
        $("h1").text("Oops! Game Over, Press Any Key to Restart")
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        startOver();
        }
}


function startOver(){
    level = 0;
    userClickedPattern.splice(0,userClickedPattern.length);
    gamePattern.splice(0,gamePattern.length);
    firstKeyPress = true;
}