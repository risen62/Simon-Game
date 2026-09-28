var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var waitingForNextSequence = false;
var level = 0;
var highestScore = Number(localStorage.getItem("highestScore")  || 0);
document.querySelector("#highest-score").textContent = "Your highest Score Was : " + highestScore;
function nextSequence(){
    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber =  Math.floor(randomNumber) ;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);

    if(level > highestScore){
    highestScore = level;
    localStorage.setItem("highestScore",highestScore);
    document.querySelector("#highest-score").textContent = "Your highest Score Was : " + highestScore;
 }
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.1;
    audio.play();

}

$(".btn").click(function(){
    if (!started || waitingForNextSequence) return;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length - 1);
 

});

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");    
    },100);
}

 function startGame(){
    if(started === false){
        startOver();
        started = true;
        $("#start-button").prop("disabled", true).text("Game in Progress");
        nextSequence();

    } 
 }
 $("#start-button").on("click", startGame);
 $(document).on("keydown", function(event){
    if (!event.repeat) startGame();
 });
 function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            waitingForNextSequence = true;
            setTimeout(function(){
                userClickedPattern = [];
                nextSequence();
                waitingForNextSequence = false;

            },1000);
        }
        console.log("Success");
    }else{
        console.log("wrong");
        playSound("wrong");
         $("body").addClass("game-over");
         setTimeout(function(){
            $("body").removeClass("game-over");
         },200);

         $("#level-title").text("Game Over! Tap Restart or Press Any Key");
         $("#start-button").prop("disabled", false).text("Restart Game");
         started = false;
         

    }
 }


 function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    waitingForNextSequence = false;

 }

 
 







