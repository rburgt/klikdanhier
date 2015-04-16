(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Manager = function(){
    this._options = [];
};

Manager.prototype = {
    registerOption: function(option){
        this._options.push(option);
    },

    activateRandomOption: function(){
        var randomOptionIndex;
        var currentIndex = this._options.indexOf( this._activeOption );

        do {
            randomOptionIndex = Math.floor(Math.random()*this._options.length);
        } while (randomOptionIndex == currentIndex)

        this.activateOption(randomOptionIndex);
    },

    activateOption: function(optionIndex){
        var option = this._options[optionIndex];

        if ( option ){
            if ( this._activeOption ){
                this._activeOption.deactivate();
            }

            this._activeOption = option;
            option.activate();
        }
    }
};

module.exports = new Manager();

},{}],2:[function(require,module,exports){
var manager = require('../manager');

var OptionAbstract = function(){
    manager.registerOption(this);
};

OptionAbstract.prototype = {
    activate: function(){},
    deactivate: function(){}
};

module.exports = OptionAbstract;

},{"../manager":1}],3:[function(require,module,exports){
var OptionAbstract = require('./abstract');

var OptionText = function(text){
    this._text = text;
    OptionAbstract.apply(this,[]);
};

OptionText.prototype = Object.create(OptionAbstract.prototype);

OptionText.prototype._getElement = function(){
    if ( !this._element ){
        this._element = document.createElement('div');
    }

    return this._element;
};

OptionText.prototype.activate = function(){
    var element = this._getElement();
    element.innerHTML = this._text;
    document.body.appendChild(element);
    OptionAbstract.prototype.activate.apply(this,[]);
};

OptionText.prototype.deactivate = function(){
    var element = this._getElement();

    if ( element.parentNode ){
        document.body.removeChild(element);
    }
    OptionAbstract.prototype.deactivate.apply(this,[]);
};

module.exports = OptionText;

},{"./abstract":2}],4:[function(require,module,exports){
var manager = require('./module/manager');
var OptionText = require('./module/option/text');

var klikDanHierElement = document.querySelector('.klikDanHier');


new OptionText('Een tosti is eigenlijk een broodje kaassaus');
new OptionText('Mayo is eigenlijk ei saus');

klikDanHierElement.addEventListener('click', function(){
    manager.activateRandomOption();
});

},{"./module/manager":1,"./module/option/text":3}]},{},[4]);
