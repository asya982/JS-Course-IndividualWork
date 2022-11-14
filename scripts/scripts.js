"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var smartphone = new Smartphone();

    var calendar = smartphone.installApp(new Calendar("Calendar", "./static/icons/calendar.png"));
    var phone = smartphone.installApp(new Phone("Phone", "./static/icons/contacts.png", contactBook));
    var calculator = smartphone.installApp(new Calculator("Calculator", "./static/icons/calculator.png"));
    var hangman = smartphone.installApp(new Hangman ("Hangman", "./static/icons/game.png"));
    var charger = document.getElementById("charger");
     
    charger.addEventListener("click", function () {
        if (smartphone.isCharging()) {
           smartphone.charge();
           charger.classList.remove("clicked");
           document.getElementById("battery").classList.remove("charged");
           return;
        }
        charger.classList.add("clicked");
        document.getElementById("battery").classList.add("charged");
        smartphone.charge();
    })
    calendar.time();
    document.querySelector(".time").innerText = calendar.getTime();
    document.querySelector(".date").innerText = calendar.todayIs();

    smartphone.apps().forEach( function(item) {
        document.querySelector(".grid").innerHTML += "<button id=" + item.getName() + "><img src=" + item.getIcon() + "><p>" + item.getName();
    });

    var homeBtn = document.querySelector(".lock-btn");
    homeBtn.addEventListener("click", function () {
        if (smartphone.state()) {
            document.querySelector(".locked-screen").style.display = "none";
            document.querySelector(".home-screen").style.display = "flex";
            document.querySelector("#time").innerHTML = calendar.getTime();
            smartphone.blockButton();
            return;
        }

        document.querySelector(".home-screen").style.display = "none";
        document.querySelector(".locked-screen").style.display = "flex";
        document.querySelector("#time").innerHTML = "";
        smartphone.blockButton();
    })

    document.getElementById("Calendar").addEventListener("click", open.bind(this, "Calendar"));
    document.getElementById("Calculator").addEventListener("click", open.bind(this, "Calculator"));
    document.getElementById("Phone").addEventListener("click", open.bind(this, "Phone"));
    document.getElementById("Hangman").addEventListener("click", open.bind(this, "Hangman"));

    var battery = document.querySelector(".battery");
    battery.innerHTML = smartphone.battery();

    function open (appName) {
        var app = smartphone.getAppByName(appName);
        document.querySelector(".grid").style.display = "none";
        document.querySelector(".app").style.display = "flex";
        document.querySelector(".app").innerHTML += app.htmlTemplate;
        smartphone.openApp(app);
        app.handlerFunction();
    }

    var close = document.querySelector(".home");
    close.addEventListener("click", function () {
        document.querySelector(".app").style.display = "none";
        document.querySelector(".app").innerHTML = "";
        document.querySelector(".grid").style.display = "grid";
        smartphone.isOpen.onOff();
    })
})
  

