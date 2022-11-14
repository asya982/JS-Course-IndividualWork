"use strict";

function Hangman(name, icon) {
    Apps.call(this, name, icon);
    this.__player = "John";
    this.__words = ["javascript", "frontend", "programming", "smartphone", "hangman", "capybara", "ferret", "kitty", "cat"];
    this.htmlTemplate = "<h1 class='title'>Hangman</h1><div class ='player'><label for='player'>Enter player name:</label><input type='text' name='player' id='player'><button id='addPlayer'>Save name</button></div><div class='game'><input type='text' autofocus name='letter'><button id='addLetter'>Check</button><p id='word'></p><div class='mistakes'><img></div></div>";
}

Hangman.prototype = Object.create(Apps.prototype);
Hangman.prototype.constructor = Hangman;

Hangman.prototype.getPlayer = function () {
    return this.__player;
};

Hangman.prototype.setPlayer = function (player) {
    this.__player = player;
};

Hangman.prototype.startGame = function () {
    var word = this.__words[Math.floor(Math.random() * this.__words.length)];
    var mistakesLeft = 7;
    var proccess = [];
    var savedThis = this;

    for (var i = 0; i < word.length; i++) {
        proccess[i] = "_ ";
    }
    function game() {
        var letter = document.querySelectorAll("input")[1].value[0].toLowerCase();
        var rightLetter = false;

        for (var i = 0; i < word.length; i++) {
            if (word.indexOf(letter, i) !== -1) {
                proccess[word.indexOf(letter, i)] = letter;
                rightLetter = true;
            }
        }

        if (!rightLetter) {
            mistakesLeft -= 1;
            document.querySelector(".mistakes img").src =  "./static/hangman-pic/" + mistakesLeft + ".png";
        }

        document.querySelector("#word").innerText = proccess.join("");

        if (proccess.join("") === word) {
            document.querySelector("#word").innerText = "Congratulations " + savedThis.__player + "! Word was: " + word;
            return;
        } else if (mistakesLeft <= 0) {
            document.querySelector("#word").innerText = savedThis.__player + " were Hanged!";
            return;
        }

        document.querySelectorAll("input")[1].value = "";
        document.querySelectorAll("input")[1].focus();
    }


    document.querySelector("#addLetter").addEventListener("click", game);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            game();
        }
    });

}

Hangman.prototype.handlerFunction = function () {
    var savedThis = this;
    document.querySelector(".player").style.display = "flex";
    document.querySelector(".game").style.display = "none";
    document.querySelector("#addPlayer").addEventListener("click", function () {
        savedThis.setPlayer(document.querySelector("input").value);
        document.querySelector(".player").style.display = "none";
        document.querySelector(".game").style.display = "flex";
        savedThis.startGame();
    });
}