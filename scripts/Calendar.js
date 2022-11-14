"use strict";

function Calendar(name, icon) {
    Apps.call(this, name, icon);
    this.__eventList = [];
    this.__date = new Date();
    this.__intervalId;
    this.__month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.htmlTemplate = "<h1>Today is " + this.todayIs() +"</h1><h2>Add event</h2><input type='date' value='date'><input type='text' value='description'> <button id='event'>Add event</button> <h3>Event List</h3><ul>";
}

Calendar.prototype = Object.create(Apps.prototype);
Calendar.prototype.constructor = Calendar;

Calendar.prototype.addEvent = function () {
    var date = document.querySelector("input").value;
    var descr = document.querySelectorAll("input")[1].value;
    var event = this.__validEvent(date, descr);
    this.__eventList.push(event);
    console.log(this.events());
};

Calendar.prototype.events = function () {
    return this.__eventList;
};

Calendar.prototype.todayIs = function () {
    return this.__date.getDate() + "  " + this.__month[this.__date.getMonth()] + "  " + this.__date.getFullYear();
};

Calendar.prototype.time = function () {
    var savedThis = this;
    clearInterval(this.__intervalId);
    this.__date = new Date();
    this.__intervalId = setInterval(function () {
        savedThis.__date = new Date();
        document.querySelector(".time").innerText = savedThis.getTime();
    }, 30000);
};

Calendar.prototype.getTime = function () {
    return this.__date.getHours() + ":" + this.__date.getMinutes();
}

Calendar.prototype.__validEvent = function (date, description) {
    var event = {};
    event.date = date.match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/) ? date : "Someday";
    event.description = description;
    return event;
};

Calendar.prototype.handlerFunction = function () {
    var savedThis = this;
    var event = document.querySelector("#event");
    event.addEventListener("click", function () {
        savedThis.addEvent();
        var justAdded = savedThis.events()[savedThis.events().length - 1];
        document.querySelector("ul").innerHTML += "<li>" + justAdded.date + "   " + justAdded.description;
    });
}

