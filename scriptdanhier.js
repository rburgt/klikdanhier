(function(){
    var klikDanHierElement = document.querySelector('.klikDanHier');
    var klikDanHierWrapper = document.querySelector('.wrapDanHier');

    var KlikDanHierManager = function(){
        if ( KlikDanHierManager._instance ){
            return KlikDanHierManager._instance;
        }

        KlikDanHierManager._instance = this;
        this._options = [];
    };

    KlikDanHierManager.prototype = {
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


    var KlikDanHierOption = function(){
        (new KlikDanHierManager()).registerOption(this);
    };

    KlikDanHierOption.prototype = {
        activate: function(){
            klikDanHierElement.classList.add('active');
        },
        deactivate: function(){
            klikDanHierElement.classList.remove('active');
        }
    };


    var KlikDanHierOptionText = function(text){
        this._text = text;
        KlikDanHierOption.apply(this,[]);
    };
    KlikDanHierOptionText.prototype = Object.create(KlikDanHierOption.prototype);

    KlikDanHierOptionText.prototype._getElement = function(){
        if ( !this._element ){
            this._element = document.createElement('div');
        }

        return this._element;
    };

    KlikDanHierOptionText.prototype.activate = function(){
        var element = this._getElement();
        element.innerHTML = this._text;
        klikDanHierWrapper.appendChild(element);
        KlikDanHierOption.prototype.activate.apply(this,[]);
    };

    KlikDanHierOptionText.prototype.deactivate = function(){
        var element = this._getElement();

        if ( element.parentNode ){
            klikDanHierWrapper.removeChild(element);
        }
        KlikDanHierOption.prototype.deactivate.apply(this,[]);
    };

    new KlikDanHierOptionText('Een tosti is eigenlijk een broodje kaassaus');
    new KlikDanHierOptionText('Mayo is eigenlijk ei saus');

    klikDanHierElement.addEventListener('click', function(){
        (new KlikDanHierManager()).activateRandomOption();
    });
})();