var manager = require('../manager');

var OptionAbstract = function(){
    manager.registerOption(this);
};

OptionAbstract.prototype = {
    activate: function(){},
    deactivate: function(){}
};

module.exports = OptionAbstract;
