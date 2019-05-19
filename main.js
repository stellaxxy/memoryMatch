$(document).ready(startApp);

function startApp(){
    clickable = false;
    assignFront();
    hideEnding();
    clickReset();
    display_stats();
    clickStart();
    clickCard();
    setInterval(addAnimationSully, 8000);
    setInterval(toggleBallon, 5000);
    setInterval(toggleBallon1, 6000);
    setInterval(toggleBallon2, 5000);
    setInterval(animateStartButton, 1000);
}

function animateStartButton(){
    var startButton = $('.startButton');
    if(startButton.is(':visible')){
        startButton.toggleClass('animationStartButton');
    }
}

function clickStart() {
    $('.startButton').click(startGame);
}

function startGame(){
    playBackgroundAudio();
    clickable = true;
    setTimeout(function(){
        $('.startButton').hide();
    }, 300);
    clickAudioButton();
}

function hideEnding(){
    $('.ending').hide();
}

function toggleBallon(){
    $('.ballon').toggleClass('movingBallon');
}

function toggleBallon1(){
    $('.ballon1').toggleClass('movingBallon');
}

function toggleBallon2(){
    $('.ballon2').toggleClass('movingBallon');
}

function addAnimationSully(){
    var sully = $('.sullyDecoration');
    sully.addClass('movingSully');
    setTimeout(function(){
        sully.removeClass('movingSully')
    }, 2000);
}

function assignFront(){

    var frontImageArray = ['front1', 'front2', 'front3', 'front4', 'front5', 'front6', 'front7', 'front8', 'front9'];
    var doubleFrontImageArray = frontImageArray.concat(frontImageArray);

    for(var frontImageIndex = doubleFrontImageArray.length-1; frontImageIndex >= 0; frontImageIndex--){
        var randomIndex = Math.floor(Math.random() * doubleFrontImageArray.length);
        const card = $('<div>').addClass(`card front back ${doubleFrontImageArray[randomIndex]}`);
        $('.gameContainer').append(card);
        doubleFrontImageArray.splice(randomIndex, 1);
    }
}


function clickCard(){
    $('.card').click(card_clicked);
}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var clickable = true;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function card_clicked(){
    if(clickable === false){
        return false;
    }
    if($(this).hasClass('disable')){
        return;
    }
    $(this).toggleClass('back disable');

    if(first_card_clicked === null){
        first_card_clicked = $(this);
        return;
    } else {
        second_card_clicked = $(this);
        attempts++;
        var firstImageURL = first_card_clicked.css('background-image');
        var secondImageURL = second_card_clicked.css('background-image');
        if(firstImageURL === secondImageURL){
            match_counter++;
            matches++;
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter === total_possible_matches){
                $('.ending').show();
            }
        } else {
            clickable = false;
            setTimeout(function(){
                first_card_clicked.toggleClass('back disable');
                second_card_clicked.toggleClass('back disable');
                first_card_clicked = null;
                second_card_clicked = null;
                clickable = true;
            }, 1000);
        }
        accuracy = ((matches / attempts)*100).toFixed(2);
        display_stats();
        return;
    }
}

function clickReset(){
    $('.reset').click(reset_clicked);
}

function reset_clicked(){
    games_played++;
    reset_stats();
    display_stats();
    hideEnding();
    //takeOffFront();
    $('.gameContainer').empty();
    assignFront();
    clickable = true;
    clickCard();
}

function display_stats(){
    $('.gamesPlayed .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy + '%');
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    match_counter = 0;
    attempts = 0;
    display_stats();
}

function takeOffFront(){
    var allCards = $('.card');
    for(var index = 0; index < allCards.length; index++){
        var allClasses = allCards[index].className;
        var startPosition = allClasses.indexOf(" ");
        var classesToBeRemoved = allClasses.substring(startPosition);
        $(allCards[index]).removeClass(classesToBeRemoved);
    }
}

var newAudio = new Audio('audio/BGM 011.mp3');

function playBackgroundAudio(){
    newAudio.play();
}

function clickAudioButton(){
    $('.audioButton').click(turnOffAudio);
}

function turnOffAudio(){
    if(newAudio.paused){
        newAudio.play();
    } else {
        newAudio.pause();
    }
}