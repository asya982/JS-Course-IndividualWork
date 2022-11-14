"use strict";

function Apps(name, icon) {
    this._name = name;
    this._icon = icon;
    this._isOn = false;
}

Apps.prototype.getName = function() {
    return this._name;
};

Apps.prototype.getIcon = function() {
    return this._icon;
};

Apps.prototype.state = function() {
    return this._isOn;
};

Apps.prototype.onOff = function() {
    this._isOn = !this._isOn;
};
