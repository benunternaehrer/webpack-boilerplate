/* global module */
// import 'choices.js/assets/styles/scss/choices.scss';
// import './scss/main.scss';
// import './**/*.twig';
import { uiConfig } from './ui.config';
import '../scss/main.scss';

/*
 *  Import UI Config and additional UI libs
 */

console.log('xxx');


/**
 * Bootstrapping Class for the whole app
 */
class App {

    /**
     * Bootstrap User Interface
     * @param {Element | HTMLDocument} el - Container Element from where the UI should be bootstrapped
     */
    constructor(el = document){
        this._bootstrapUI(el);
    }

    /**
     * Creates new instance for UI Classes if selector is present
     * @param {Element |HTMLDocument} el - passed from constructor
     * @private
     */
    _bootstrapUI(el = document){

        for(let i = 0; i < uiConfig.length; i++) {
            const moduleEntity = uiConfig[i];

            let instanceName = moduleEntity.classReference.name;

            // Check for dom node selector
            const domNode = (typeof moduleEntity.selector === `string`)
                ? el.querySelector(moduleEntity.selector)
                : null;

            if(domNode) {
                if(moduleEntity.parameters instanceof Array) {
                    this[instanceName] = new moduleEntity[`classReference`](...moduleEntity.parameters);
                } else {
                    this[instanceName] = new moduleEntity[`classReference`]();
                }
            }
        }
    }
}

// initialize app bootstrapping
window.app = new App();

// ACCEPT HOT MODULE
if(module.hot) {
    module.hot.accept();
}
