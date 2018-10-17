import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints'; //do this if no main file is present in npm install (like this one)

class RevealOnScroll {
    constructor(els, offset) {
        this.itemsToReveal = els; // there are 4 of these as there are 4 features
        this.hideInitially();
        this.offsetPercentage = offset;
        this.createWaypoints();
        
    }
    hideInitially() {
        this.itemsToReveal.addClass('reveal-item');
    }

    createWaypoints() {
        var that = this;
        this.itemsToReveal.each(function() {
            var currentItem = this;    
            new Waypoint({
                    element: currentItem,
                    handler: function() {
                        $(currentItem).addClass('reveal-item--is-visible');
                    },
                    offset: that.offsetPercentage //default is 0% i.e top of the screen
                });
        });
    }
}

export default RevealOnScroll