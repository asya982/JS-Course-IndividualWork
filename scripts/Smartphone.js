"use strict";

function Smartphone() {
    this.__isLocked = true;
    this.__battery = 90;
    this.__isCharging = false;
    this.__appList = [];
}

Smartphone.prototype.apps = function () {
    return this.__appList;
};

Smartphone.prototype.state = function () {
    return this.__isLocked;
};

Smartphone.prototype.blockButton = function () {
    if (this.__battery > 0) {
        this.__isLocked = !this.__isLocked;
    } else {
        document.querySelector(".locked-screen").style.display = "flex";
        this.__isLocked = true;
    }
};

Smartphone.prototype.battery = function () {
    return this.__battery;
}

Smartphone.prototype.getAppByName = function (name) {
    var result = "This app is not on your smartphone";
    this.__appList.forEach(function (item) {
        if (item.getName() == name) {
            result = item;
        }
    });
    return result;
};

Smartphone.prototype.installApp = function (app) {
    this.apps().push(app);
    console.log(app.getName() + " is installed succesfully");
    return app;
};

Smartphone.prototype.deleteApp = function (app) {
    if (this.__isLocked) return;
    var savedThis = this;

    setTimeout(function () {
        for (var i = 0; i < savedThis.__appList.length; i++) {
            if (app == savedThis.__appList[i].getName()) {
                savedThis.__appList.splice(i, 1);
            }
        }
        console.log(app + " is deleted");
    }, 3000)

};

Smartphone.prototype.openApp = function (app) {
    if (this.__isLocked) return;
    var savedThis = this;
    app.onOff();
    this.isOpen = app;
    var intervalId = setInterval(function () {
        if (savedThis.__battery <= 0) {
            clearInterval(intervalId);
            savedThis.__isLocked = true;
            app.onOff();
            document.querySelector(".locked-screen").style.display = "flex";
            return;
        }
        if (savedThis.isCharging() || !app.state()){
            clearInterval(intervalId);
        }
        savedThis.__battery -= 1;
        document.querySelector(".battery").innerHTML = savedThis.battery();
    }, 5000);
};

Smartphone.prototype.charge = function () {
    this.__isCharging = !this.__isCharging;
    var savedThis = this;
    var intervalId = setInterval(function () {
        if (savedThis.__battery == 100 || !savedThis.isCharging()) {
            clearInterval(intervalId);
            return;
        }
        savedThis.__battery += 1;
        document.querySelector(".battery").innerHTML = savedThis.battery();
    }, 5000);
};

Smartphone.prototype.isCharging = function () {
    return this.__isCharging;
}

