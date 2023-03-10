import { rules } from './Rules'
import { options } from './options'

class Game {
    score: HTMLElement | null
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
        this.score = document.querySelector('#score')
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
        sessionStorage.setItem('score', '0')
    }

    selectOption(e: MouseEvent) {
        const id: number = Number((e.target as HTMLDivElement).dataset.option)
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
        setTimeout(() => this.changeScore(), 1800)

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
        const result = this.checkResult()
        this.setResultSign(result)
        this.setResultStatus(result)
        this.duelResult?.classList.add('duel__result--active')
    }

    changeScore() {
        const result = this.checkResult()
        if (result !== 'win') return
        const score = Number(sessionStorage.getItem('score'))
        const newScore = score + 1
        sessionStorage.setItem('score', String(newScore))
        if (this.score !== null) {
            this.score.textContent = String(newScore)
        }
    }

    hideResult() {
        const result = this.checkResult()
        this.removeResultStatus(result)
        this.duelResult?.classList.remove('duel__result--active')
    }

    setResultSign(result: string) {
        if (this.duelResultSign !== null) {
            if (result !== 'draw') {
                this.duelResultSign.textContent = `you ${result}`
            } else {
                this.duelResultSign.textContent = result
            }
        }
    }

    setResultStatus(result: string) {
        if (result === 'draw') return
        const status = document.createElement('div')
        status.classList.add('pick__option-outside')
        if (result === 'win') {
            this.userPick?.appendChild(status)
        } else {
            this.aiPick?.appendChild(status)
        }
    }

    removeResultStatus(result: string) {
        if (result === 'draw') return
        if (result === 'win') {
            if (this.userPick && this.userPick.lastChild) {
                this.userPick.removeChild(this.userPick.lastChild);
            }
        } else {
            if (this.aiPick && this.aiPick.lastChild) {
                this.aiPick.removeChild(this.aiPick.lastChild);
            }
        }
    }

    checkResult() {
        const { user, ai } = this.picks
        if ((user === 'paper' && ai === 'rock') || (user === 'rock' && ai === 'scissors') || (user === 'scissors' && ai === 'paper')) {
            return 'win'
        } else if (user === ai) {
            return 'draw'
        } else {
            return 'lose'
        }
    }

    playAgain() {
        this.changeView()
        this.toggleUserPick()
        this.toggleAiPick()
        this.hideResult()
        this.picks = {
            user: '',
            ai: ''
        }
    }
}

export const game = new Game()