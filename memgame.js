var app = angular.module("mmApp", []);

app.directive("card", function(){
    return {
        restrict:"E",
        templateUrl:"card.html",
        controller:function($element){
            console.log("$element : ", $element);
        },
        controllerAs:'cardCtrl'
    }
});

app.controller("appController", function ($timeout) {
    console.log("appController loaded");

    var self = this;
    self.cardBackSrc = "images/knot.png";
    self.cardArr = [];
    self.cardsClicked = [];
    self.cardsMatchArr = [];
    self.gamesPlayed = 0;
    self.attempts = 0;
    self.accuracy = "0%";
    self.numberOfCards = 18;

    self.createCards = function () {
        self.cardArr = [];
        for (var i = 0; i < self.numberOfCards; i++) {
            var cardObj = {};
            cardSrcNum = (Math.floor(i / 2)) + 1;
            cardObj.url = "images/" + cardSrcNum + ".jpg";
            cardObj.card_back_show = true;
            self.cardArr.push(cardObj);
        }

        self.cardArr = self.randomArray(self.cardArr);

    };

    self.randomArray = function (arr) {
        var randomArr = [];

        var counter = 0;
        while (arr.length > 0) {
            var randomIndex = Math.floor(Math.random() * arr.length);
            var item = arr.splice(randomIndex, 1);
            randomArr.push(item[0]);
            counter++;
            if (counter > 1000) {
                break;
            }
        };

        console.log("randomArr : ",randomArr);

        return randomArr;
    };

    self.card_clicked = function (card) {
        if (self.cardsClicked.length == 2) {
            return;
        }

        if (self.cardsClicked.indexOf(card) > -1) {
            return;
        }

        self.cardsClicked.push(card);

        if (self.cardsClicked.length <= 2) {
            card.card_back_show = false;
        }

        if (self.cardsClicked.length > 1) {
            self.attempts++;
            if (self.cardsClicked[0].url == self.cardsClicked[1].url) {

                self.cardsMatchArr.push(self.cardsClicked[0], self.cardsClicked[1]);
                self.cardsClicked = [];

                if (self.cardsMatchArr.length == self.cardArr.length) {
                    self.gameWon();
                }
            } else {
                console.log("no match turn back over");

                $timeout(function () {
                    console.log("self.cardsClicked : ", self.cardsClicked);
                    for (var index in self.cardsClicked) {
                        self.cardsClicked[index].card_back_show = true;
                    }

                    self.cardsClicked = [];
                }, 1400);
            }
        }

        self.calculateAccuracy();
    };

    self.gameWon = function () {
        self.gamesPlayed++;
        self.resetGame();
    };

    self.calculateAccuracy = function () {
        var accuracy = Math.floor((self.cardsMatchArr.length / 2) / self.attempts * 100);
        self.accuracy = (isNaN(accuracy)) ? "0%" : accuracy + "%";
    };

    self.resetBoard = function () {
        self.createCards();
    };

    self.resetGame = function () {
        self.cardsClicked = [];
        self.cardsMatchArr = [];
        self.attempts = 0;

        self.resetBoard();
    };

    self.createCards();
});

//var first_card_clicked = null;
//var second_card_clicked = null;
//var total_possible_matches = 0;
//var can_be_clicked = true;
//var matches = 0;
//var attempts = 0;
//var accuracy = 0;
//var games_played = 0;
//
//$(document).ready(initialize_game);
//
//// INITIALIZE GAME
//function initialize_game() {
//    $("div.card").click(card_clicked);
//    total_possible_matches = $(".card").length / 2;
//    $("button").click(reset);
//}
//
//// RESET BUTTON
//function reset() {
//    games_played++;
//    reset_stats();
//    display_stats();
//    reset_cards();
//}
//
//function reset_cards() {
//    $(".matched").find(".back").show();
//    $(".matched").off(card_clicked).click(card_clicked);
//}
//
//function display_stats() {
//    $(".games-played .value").text(games_played);
//    $(".attempts .value").text(attempts);
//    if (attempts == 0) {
//        accuracy = 0;
//    }
//    else {
//        accuracy = Math.round(matches / attempts * 100) + "%";
//    }
//    $(".accuracy .value").text(accuracy);
//}
//
//function reset_stats() {
//    accuracy = 0;
//    matches = 0;
//    attempts = 0;
//    display_stats();
//}
//
//// CARDS CLICKED
//function card_clicked() {
//    if (can_be_clicked == false) {
//        return;
//    }
//    // FIRST CARD
//    var the_card = $(this);
//    the_card.find(".back").hide();
//    the_card.off("click");
//    if (first_card_clicked == null) {
//        first_card_clicked = the_card;
//        return;
//    }
//    // SECOND CARD
//    else {
//        second_card_clicked = the_card;
//        attempts++;
//        display_stats();
//    }
//
//    // CHECK FOR MATCH
//    if (first_card_clicked.find(".cardFront").attr("src") == second_card_clicked.find(".cardFront").attr("src")) {
//        first_card_clicked.addClass("matched");
//        second_card_clicked.addClass("matched");
//        matches++;
//        display_stats();
//        first_card_clicked = null;
//        second_card_clicked = null;
//
//        // CHECK FOR WIN
//        if (matches == total_possible_matches) {
//            $("#game-area").text("Cheers, mate. You've won the game!")
//        }
//        else {
//            return;
//        }
//    }
//    // CARDS DONT MATCH
//    else {
//        can_be_clicked = false;
//        setTimeout(showBack, 1400);
//        function showBack() {
//            first_card_clicked.find('.back').show();
//            second_card_clicked.find('.back').show();
//            first_card_clicked.click(card_clicked);
//            second_card_clicked.click(card_clicked);
//            first_card_clicked = null;
//            second_card_clicked = null;
//            can_be_clicked = true;
//            display_stats();
//        }
//
//        return;
//    }
//}