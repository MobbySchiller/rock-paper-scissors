class Rules {
    openBtn: HTMLButtonElement | null
    closeBtn: HTMLButtonElement | null
    info: HTMLElement | null


    constructor() {
        this.openBtn = document.querySelector('#rules-open')
        this.closeBtn = document.querySelector('#rules-close')
        this.info = document.querySelector('#rules-info')
    }

    init() {
        this.openBtn?.addEventListener('click', () => this.openRules())
        this.closeBtn?.addEventListener('click', () => this.closeRules())
    }

    openRules() {
        this.info?.classList.add('rules__info--active')
    }

    closeRules() {
        this.info?.classList.remove('rules__info--active')
    }
}

export const rules = new Rules()