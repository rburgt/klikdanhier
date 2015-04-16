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
