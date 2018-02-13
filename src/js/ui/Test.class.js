/** Test Component */
class Test {

    /**
     * Getting Elements and bind Events
     */
    constructor(selector){
        this.el = document.querySelector(selector);
        this._init();
    }

    _init(){
        this.el.innerHTML = `<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quanta sit alias, nunc tantum possitne esse tanta. 
            Pudebit te, inquam, illius tabulae, quam Cleanthes sane commode verbis depingere solebat. Nam ista vestra: Si gravis, brevis; Qualem 
            igitur hominem natura inchoavit? Qui autem de summo bono dissentit de tota philosophiae ratione dissentit. Duo Reges: constructio interrete. 
            Istam voluptatem perpetuam quis potest praestare sapienti? Ergo illi intellegunt quid Epicurus dicat, ego non intellego? Idem etiam 
            dolorem saepe perpetiuntur, ne, si id non faciant, incidant in maiorem.</span>`;
    }
}

export { Test };
