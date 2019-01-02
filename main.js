$(document).ready(startApp);

function startApp(){
    assignFront();
    clickCard();
    setInterval(addAnimationSully, 8000);
    setInterval(toggleBallon, 6000);
    setInterval(toggleBallon1, 7000);
    setInterval(toggleBallon2, 5000);
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
        var temp = doubleFrontImageArray[frontImageIndex];
        doubleFrontImageArray[frontImageIndex] = doubleFrontImageArray[randomIndex];
        doubleFrontImageArray[randomIndex] = temp;
    }

    var allCards = $('.row').find('.card');
    var randomizedArrayIndex = 0;
    for(var allCardsIndex = 0; allCardsIndex < allCards.length; allCardsIndex++){

        $(allCards[allCardsIndex]).addClass('front back ' + doubleFrontImageArray[randomizedArrayIndex]);
        randomizedArrayIndex++;
    }
}


function clickCard(){
    $('.card').click(card_clicked);
}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 4;
var match_counter = 0;
var clickable = true;

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
        var firstImageURL = first_card_clicked.css('background-image');
        var secondImageURL = second_card_clicked.css('background-image');
        if(firstImageURL === secondImageURL){
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter === total_possible_matches){
                $('.ending').text('You Won!').show();
            }
            return;
        } else {
            clickable = false;
            setTimeout(function(){
                first_card_clicked.toggleClass('back disable');
                second_card_clicked.toggleClass('back disable');
                first_card_clicked = null;
                second_card_clicked = null;
                clickable = true;
            }, 2000);
            return;
        }
    }
}




/*
function clickCard(){
    $('.card').click(addFront);
}

var usedRandomIndex = [];

function addFront(){
    //get the array of characters
    //get the random index
    //get empty used index array
    //check if the random index have been used twice
    //go through each element in the used index array
        //check if random index is equal to element in the used index array
            //yes: counter++
            //no: do nothing
    //repeat
    //check if counter equals to 2
        //yes: get another random index and check again
        //no: use the index to add class and add the index to used index array
    var characterArray = ['harry', 'hermione'];

    do {
        var randomIndex = Math.floor(Math.random() * characterArray.length);
        var counter = 0;

        for(var usedIndex = 0; usedIndex < usedRandomIndex.length; usedIndex++){
            if(randomIndex === usedRandomIndex[usedIndex]){
                counter++
            }
        }
    } while (counter === 2);

    $(this).addClass('front ' + characterArray[randomIndex]);
    usedRandomIndex.push(randomIndex);
    compareFront();
}


*/

