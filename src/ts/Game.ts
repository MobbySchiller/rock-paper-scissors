import { rules } from './Rules'
import { options } from './options'

class Game {
    selectSection: HTMLElement | null
    duelSection: HTMLElement | null
    options: NodeListOf<HTMLElement>
    userPick: HTMLElement | null
    userPickInside: HTMLElement | null
    aiPick: HTMLElement | null
    aiPickInside: HTMLElement | null
    duelResult: HTMLElement | null
    duelResultSign: HTMLElement | null
    playAgainBtn: HTMLButtonElement | null
    picks: {
        user: string,
        ai: string
    }

    constructor() {
        this.selectSection = document.querySelector('#select-section')
        this.duelSection = document.querySelector('#duel-section')
        this.options = document.querySelectorAll('[data-option]')
        this.userPick = document.querySelector('#user-pick')
        this.userPickInside = document.querySelector('#user-pick-inside')
        this.aiPick = document.querySelector('#ai-pick')
        this.aiPickInside = document.querySelector('#ai-pick-inside')
        this.duelResult = document.querySelector('#duel-result')
        this.duelResultSign = document.querySelector('#duel-result-sign')
        this.playAgainBtn = document.querySelector('#play-again-btn')
        this.picks = {
            user: '',
            ai: ''
        }
    }

    init() {
        rules.init()
        this.options.forEach(option => option.addEventListener('click', (e) => this.selectOption(e)))
        this.playAgainBtn?.addEventListener('click', () => this.playAgain())
    }

    selectOption(e) {
        const id: number = Number(e.target.dataset.option)
        this.picks.user = options[id].name
        this.contest()
    }

    contest() {
        if (!this.picks.user) return
        this.aiSelection()
        this.changeView()
        this.toggleUserPick()
        setTimeout(() => this.toggleAiPick(), 1200)
        setTimeout(() => this.displayResult(), 1800)
        this.checkResult(this.picks.user, this.picks.ai)
    }

    aiSelection() {
        const id: number = Math.floor(Math.random() * options.length)
        const pick: string = options[id].name
        this.picks.ai = pick
    }

    changeView() {
        this.selectSection?.classList.toggle('select--active')
        this.duelSection?.classList.toggle('duel--active')
    }

    toggleUserPick() {
        this.userPick?.classList.toggle(`pick__option--${this.picks.user}`)
        this.userPickInside?.classList.toggle(`pick__option-inside--${this.picks.user}`)
    }

    toggleAiPick() {
        this.aiPick?.classList.toggle(`pick__option--${this.picks.ai}`)
        this.aiPickInside?.classList.toggle(`pick__option-inside`)
        this.aiPickInside?.classList.toggle(`pick__option-inside--${this.picks.ai}`)
    }

    displayResult() {
        this.setResultSign()
        this.duelResult?.classList.toggle('duel__result--active')
    }

    setResultSign() {
        const result = this.checkResult(this.picks.user, this.picks.ai)
        this.duelResultSign.textContent = `you ${result}!`
    }

    checkResult(userPick: string, aiPick: string) {
        if ((userPick === 'paper' && aiPick === 'rock') || (userPick === 'rock' && aiPick === 'scissors') || (userPick === 'scissors' && aiPick === 'paper')) {
            return 'win'
        } else if (userPick === aiPick) {
            return 'tie'
        } else {
            return 'lose'
        }
    }

    playAgain() {
        this.changeView()
        this.toggleUserPick()
        this.toggleAiPick()
        this.displayResult()
        this.picks = {
            user: '',
            ai: ''
        }
    }
}

export const game = new Game()