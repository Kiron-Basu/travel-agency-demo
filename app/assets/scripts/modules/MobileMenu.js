import $ from 'jquery';
class MobileMenu {
         constructor() {
            this.siteHeader = $('.site-header');
            this.menuIcon = $('.site-header__menu-icon');
            this.menuContent = $('.site-header__menu-content')
            this.events();
                    }
            events() {
                this.menuIcon.click(this.toggleTheMenu.bind(this)); //in other words - this.events = function() { content } so 'events()' is binded to class
            }
            toggleTheMenu() {
                this.menuContent.toggleClass('site-header__menu-content--is-visible');
                this.siteHeader.toggleClass('site-header--is-expanded');
                this.menuIcon.toggleClass('site-header__menu-icon--close-x');
            }
         }
        

export default MobileMenu





// import $ from 'jquery';

// class MobileMenu {
//     constructor() {
//             // $('site-header__menu-icon').click(function() {
//                console.log('nav button clicked');
//             // });
//                 // this.menuIcon = $('.site-header__menu-icon');
//                 // this.events();
//             //         }
//             // events() {
//             //     this.menuIcon.click(this.toggleTheMenu);
//             // }
//             // toggleTheMenu() {
//             //     console.log('nav button clicked');
//             }
//     }
