import $ from 'jquery'
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints'; //do this if no main file is present in npm install (like this one)
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        this.siteHeader = $('.site-header');
        this.headerTriggerElement = $('.large-hero__title');
        this.createHeaderWaypoint();
        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWaypoints();
        this.addSmoothScroll();
    }

    addSmoothScroll() {
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoint() {
        var that = this;
        new Waypoint({
            element: this.headerTriggerElement[0], //first item in an array (the jquery array like object is the native DOM element)
            handler: function(direction) {
                if (direction == "down") {
                    that.siteHeader.addClass('site-header--dark');
                } else {
                    that.siteHeader.removeClass('site-header--dark');
                }
            }
        });
    }
    createPageSectionWaypoints() {
        var that = this;
        this.pageSections.each(function() {
            var currentPageSection = this; //as this point towards each element accessed in each (jquery assign this to current element). Wayppint beneath will set this to its function
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction =="down") {
                        var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
                    that.headerLinks.removeClass('is-current-link');
                    $(matchingHeaderLink).addClass("is-current-link"); // need to add .is-current-link to id as it's a class
                    }   
                },
                offset: "18%"
            });
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction =="up") {
                        var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
                    that.headerLinks.removeClass('is-current-link');
                    $(matchingHeaderLink).addClass("is-current-link"); // need to add .is-current-link to id as it's a class
                    }   
                },
                offset: "-40%"
            });
        });
    }
}

export default StickyHeader;

