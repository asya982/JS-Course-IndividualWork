"use strict";

function Calculator(name, icon) {
    Apps.call(this, name, icon);
    this.__x = 0;
    this.__y = 0;
    this.htmlTemplate = " <h1>Calculator</h1><p id='result'></p><div class='inputs'><input type='number' id='x' value='x' placeholder=" + this.__x + "><input type='number' id='y' value='y' placeholder=" + this.__y + "></div><div class='operations'><button id='sum'>+</button><button id='minus'>-</button><button id='mul'>x</button><button id='divide'>/</button></div>"
}

Calculator.prototype = Object.create(Apps.prototype);
Calculator.prototype.constructor = Calculator;

Calculator.prototype.getNumbers = function () {
    return [this.__x, this.__y];
}

Calculator.prototype.setX = function (x) {
    console.log(x);
    if (this.__validNUmber(x)) {
        this.__x = +x;
    }
};

Calculator.prototype.setY = function (y) {
    console.log(y);
    if (this.__validNUmber(y)) {
        this.__y = +y;
        console.log(this.getNumbers());
    }
};

Calculator.prototype.__validNUmber = function (num) {
    return !isNaN(num);
}

Calculator.prototype.operations = function () {
    var x = this.__x;
    var y = this.__y;
    var functions = {};

    functions.sum = function () {
        return x + y;
    };

    functions.minus = function () {
        return x - y;
    }

    functions.mul = function () {
        return x * y;
    }

    functions.divide = function () {
        return (x / y).toFixed(2);
    }

    return functions;
};

Calculator.prototype.handlerFunction = function () {
    var savedThis = this;
    var x = document.querySelector("#x");
    var y = document.querySelector("#y");
    var operations;
    x.addEventListener("input", function () {
        savedThis.setX(x.value);
        console.log(savedThis.getNumbers());
        operations = savedThis.operations();
    });
    y.addEventListener("input", function () {
        savedThis.setY(y.value);
        operations = savedThis.operations();
    });
    document.querySelector("#sum").addEventListener("click", function () {
        document.querySelector("#result").innerText =  operations.sum();
    });
    document.querySelector("#minus").addEventListener("click", function () {
        document.querySelector("#result").innerText =  operations.minus();
    });
    document.querySelector("#mul").addEventListener("click", function () {
        document.querySelector("#result").innerText =  operations.mul();
    });
    document.querySelector("#divide").addEventListener("click", function () {
        document.querySelector("#result").innerText =  operations.divide();
    });
}