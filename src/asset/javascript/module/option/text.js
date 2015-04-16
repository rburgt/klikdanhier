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
