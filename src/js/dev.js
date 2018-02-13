/* global module */

import '../scss/dev.scss';
import '../views/**/*.twig';
import '../components/**/*.twig';
import '../partials/**/*.twig';

// (function removeStylesheets() {
//     let stylesheet = document.querySelectorAll(`.webpack-remove-dev`);
//     if(stylesheet) {
//         for(let i = 0; i < stylesheet.length; i++) {
//             stylesheet[i].parentNode.removeChild(stylesheet[i]);
//         }
//     }
// })();
//

// ACCEPT HOT MODULE
if(module.hot) {
    module.hot.accept();
}
