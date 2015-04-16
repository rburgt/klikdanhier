(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Options = {
    text: require('./option/text')
};

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
    },

    createOption: function(optionName/*, optionconfiguration */){
        var Option = Options[optionName];

        if (Option){
            this.registerOption(new Option(Array.prototype.slice.call(arguments, 1)));
        }
    }
};

module.exports = new Manager();

},{"./option/text":3}],2:[function(require,module,exports){
var OptionAbstract = function(){};

OptionAbstract.prototype = {
    activate: function(){},
    deactivate: function(){}
};

module.exports = OptionAbstract;

},{}],3:[function(require,module,exports){
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
var klikDanHierElement = document.querySelector('.klikDanHier');

var manager = require('./module/manager');


manager.createOption('text', 'Mayonaise is eigenlijk eiersaus');
manager.createOption('text', 'Tosti is eigenlijk broodjekaassaus of, 5 minuten fondue');
manager.createOption('text', 'Alleen vrouwtjesmuggen steken, bitches.');
manager.createOption('text', 'Jumpsuit in het park. Slecht idee. Tenzij je graag je tieten in de bosjes hangt.');
manager.createOption('text', 'Sluit je rechter oog en je kijkt niet over je rechter schouder. Sluit je linker en je kijkt niet over je linker');
manager.createOption('text', 'Lik aan je elleboog. Toe dan.');
manager.createOption('text', 'Enkel een enkel is enkel. Meervoud is +s');
manager.createOption('text', 'De aansteker is  een jaar eerder uitgevonden dan de lucifer');
manager.createOption('text', 'Kolibries kunnen achter uit vliegen. *Tuut tuut tuut *vrachtwagen');
manager.createOption('text', 'Een kat heeft 32 oorspieren per oor');
manager.createOption('text', 'In geval van nood kan een slak 3 jaar zonder te eten slapen, wow');
manager.createOption('text', 'Olifanten kunnen niet springen, als enige diersoort');
manager.createOption('text', 'Gingers voelen minder pijn, oh, dus ze voelen wel…');
manager.createOption('text', 'Mensen die jongleren hebben grotere hersens');
manager.createOption('text', '50% van de wereldbevolking heeft nog nooit getelefoneerd');
manager.createOption('text', 'Wat heeft een rat met een paard gemeen? Ze kunnen beide niet kotsen.');
manager.createOption('text', 'Verveel je je? Heb je even 1700 jaar niks te doen? Kijk dan YouTube uit.');
manager.createOption('text', 'Je bent (met een gemiddeld brein) waarschijnlijk 40% van gister vergeten.');
manager.createOption('text', 'Zorg dat je je ei kwijt kan, wie klaagt, leeft langer');
manager.createOption('text', 'Frankrijk gebruikte de guillotine nog toen Star Wars uitkwam');
manager.createOption('text', 'Eerste foto, 1826!');
manager.createOption('text', 'Voor 1928 namen we nooit gesneden brood mee naar huis van de buurt super');
manager.createOption('text', 'Ouder dan 45? Dan is de wereldpopulatie in je leven verdubbeld');
manager.createOption('text', 'Er is geen reden waarom het alfabet in de volgorde staat zoals we het kennen');
manager.createOption('text', 'We beoordelen onszelf op intenties en anderen op hun daden. Dat is niet eerlijk!');
manager.createOption('text', 'We lopen in ons leven gemiddeld 4 keer rond de aarde');
manager.createOption('text', 'Gemiddeld ejaculeert een man 7200 keer in zijn leven');
manager.createOption('text', 'Veel stoplichtknoppen voor fietsers zijn nep zodat fietsers zich prettiger voelen');
manager.createOption('text', 'Er is een dag in je leven geweest dat je ouders je hebben neergezet en je nooit meer hebben opgepakt.');
manager.createOption('text', 'Vrouwen eten het grootste deel van hun lippenstift op. Is dat waarom vrouwen meestal ouder worden dan mannen?');
manager.createOption('text', 'Je kunt maar 4 dingen tegelijk onthouden');
manager.createOption('text', 'Nijlpaardenmelk is roze');
manager.createOption('text', '12% van alle zwangere vrouwen in Europa heeft seks gehad op een matras van IKEA.');
manager.createOption('text', 'Vrouwelijke apen en stekelvarkens gebruiken een stok als een soort van sextoy om zichzelf te bevredigen.');
manager.createOption('text', 'Klik nog eens');
manager.createOption('text', 'Dit kietelt');
manager.createOption('text', 'AUW!Haal 10 keer diep adem');
manager.createOption('text', 'Ga naar buiten');
manager.createOption('text', 'Zet muziek aan, of zet een ander nummer op.');
manager.createOption('text', 'Elkaar echt begrijpen is een illusie');
manager.createOption('text', 'Scheer je hoofd kaal');

klikDanHierElement.addEventListener('click', function(){
    manager.activateRandomOption();
});

},{"./module/manager":1}]},{},[4]);
