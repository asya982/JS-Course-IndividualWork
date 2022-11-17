"use strict";

function Phone(name, icon, contactList) {
    Apps.call(this, name, icon);
    this.__contactList = contactList;
    this.htmlTemplate = "<div class='contacts'><h1>Phone</h1><div class='header'><h2>Contact list</h2><button id='addContact'>+</button></div><ul></ul></div><div class='addContact' style='display:none'><label for='number'>+38</label><input name='number' type='number' required><label for='contact'>Name</label><input type='text' name='contact' required><button class='addBtn'>Add</button></div><div style='display:none' class='calling'></div><div class='end'><button class='endCall' style='display:none'><i class='fa-solid fa-phone-slash'></i></button></div>"
}

Phone.prototype = Object.create(Apps.prototype);
Phone.prototype.constructor = Phone;

Phone.prototype.contactBook = function () {
    return this.__contactList;
};

Phone.prototype.callContact = function (contact) {
    if (this.__contactList.indexOf(contact) == -1) return;
    var result = Math.round(Math.random());
    var calling = result ? "Hello?" : "Sorry, your call was left without an answer";

    setTimeout(function () {
        document.querySelector(".calling p").style.animation = "none";
        document.querySelector(".calling p").innerText = calling;
    }, 3000);
}

Phone.prototype.addContact = function () {
    var contact = {};
    contact.number = "+(38)";
    contact.number += document.querySelector("input").value;
    contact.name = document.querySelectorAll("input")[1].value;
    this.contactBook().push(contact);
}

Phone.prototype.handlerFunction = function () {
    var savedThis = this;
    document.querySelector("#addContact").addEventListener("click", function () {
        document.querySelector(".addContact").style.display = "flex";
        document.querySelector(".contacts").style.display = "none";
    });

    document.querySelector(".addBtn").addEventListener("click", function () {
        savedThis.addContact();
        document.querySelector(".addContact").style.display = "none";
        document.querySelector(".contacts").style.display = "flex";
        someFunc();
    });

    someFunc();

    function someFunc() {
        document.querySelector("ul").innerHTML = "";
        savedThis.contactBook().forEach(function (item) {
            document.querySelector("ul").innerHTML += "<li><p>" + item.name + "</p><button class='call' id=" + item.number + "><i class='fa-solid fa-phone'></i></button></li><br>";
        });
    
        var button = document.querySelectorAll(".call");
        button.forEach(function (item) {
            item.addEventListener("click", function () {
                var number = item.id;
                var contact = savedThis.contactBook().filter(function (contact) {
                    return contact["number"] == number;
                });
                document.querySelector(".contacts").style.display = "none";
                document.querySelector(".calling").style.display = "flex";
                document.querySelector(".calling").innerHTML = "<h2>" + contact[0].name + "</h2><h5>" + contact[0].number + "</h5><p>connection...</p>";
                var endCall = document.querySelector(".endCall")
                endCall.style.display = "flex";
                endCall.addEventListener("click", function () {
                    document.querySelector(".calling").innerHTML = "";
                    document.querySelector(".calling").style.display = "none";
                    document.querySelector(".contacts").style.display = "flex";
                    endCall.style.display = "none";
                })
                savedThis.callContact(contact[0]);
            })
        });
    }
    
    
}