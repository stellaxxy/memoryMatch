var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 0;
var match_counter = 0;

$(document).ready(initialize_game);

function initialize_game() {
    $("div.card").on("click", card_clicked);
    total_possible_matches = $(".card").length;
    console.log('total_possible_matches : ', total_possible_matches);
}

function card_clicked() {
    var the_card = $(this);
    the_card.find(".back").hide();
    the_card.off("click");
    if (first_card_clicked == null) {
        first_card_clicked = the_card;
        return;
    }
    else {
        second_card_clicked = the_card;
    }
    if (first_card_clicked.find(".cardFront").attr("src") == second_card_clicked.find(".cardFront").attr("src")) {
        first_card_clicked.addClass("matched");
        second_card_clicked.addClass("matched");
        match_counter++;
        first_card_clicked = null;
        second_card_clicked = null;

        if (match_counter == total_possible_matches) {
            $("#game-area").text("Cheers, mate. You've won the game!")
        }
        else {
            return;
        }
    }
    else {
        setTimeout(showBack, 2000);
        function showBack() {
            first_card_clicked.find('.back').show();
            second_card_clicked.find('.back').show();
            first_card_clicked.off("click").on("click", card_clicked);
            second_card_clicked.off("click").on("click", card_clicked);
            first_card_clicked = null;
            second_card_clicked = null;
        }
        return;
    }
}