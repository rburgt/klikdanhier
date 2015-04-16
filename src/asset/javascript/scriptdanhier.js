var manager = require('./module/manager');
var OptionText = require('./module/option/text');

var klikDanHierElement = document.querySelector('.klikDanHier');


new OptionText('Een tosti is eigenlijk een broodje kaassaus');
new OptionText('Mayo is eigenlijk ei saus');

klikDanHierElement.addEventListener('click', function(){
    manager.activateRandomOption();
});
