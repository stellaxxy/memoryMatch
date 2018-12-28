$(document).ready(startApp);

function startApp(){
    clickCard();
}

function clickCard(){
    $('.card').click(addFront);
}

function addFront(){
    var usedRandomIndex = [];
    var counter = 0;
    var characterArray = ['harry', 'hermione'];
    var randomIndex = Math.floor(Math.random() * characterArray.length);
    for(var usedIndex = 0; usedIndex < usedRandomIndex.length; usedIndex++){
        if(randomIndex === usedRandomIndex[usedIndex]){
            
        }
    }
    $(this).addClass('front ' + characterArray[randomIndex]);
    compareFront();
}

function compareFront(){

}


