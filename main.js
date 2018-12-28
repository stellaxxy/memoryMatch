$(document).ready(startApp);

function startApp(){
    clickCard();
}

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

function compareFront(){

}


