import { rules } from './Rules'
import { options } from './options'

class Game {
    selectSection: HTMLElement | null
    duelSection: HTMLElement | null
    options: NodeListOf<HTMLElement>
    playerPick: HTMLElement | null
    playerPickInside: HTMLElement | null

    constructor() {
        this.selectSection = document.querySelector('#select-section')
        this.duelSection = document.querySelector('#duel-section')
        this.options = document.querySelectorAll('[data-option]')
        this.playerPick = document.querySelector('#player-pick')
        this.playerPickInside = document.querySelector('#player-pick-inside')
    }

    init() {
        rules.init()
        this.options.forEach(option => option.addEventListener('click', (e) => this.selectOption(e)))
    }

    selectOption(e) {
        const id: number = Number(e.target.dataset.option)
        const userPick: string = options[id].name
        const aiPick: string = this.aiPick()
        this.selectSection?.classList.remove('select--active')
        this.duelSection?.classList.add('duel--active')
        this.playerPick?.classList.add(`pick__option--${userPick}`)
        this.playerPickInside?.classList.add(`pick__option-inside--${userPick}`)
        console.log(userPick, aiPick)
        this.checkResult(userPick, aiPick)
    }

    aiPick() {
        const id: number = Math.floor(Math.random() * options.length)
        const pick: string = options[id].name
        return pick
    }

    checkResult(userPick: string, aiPick: string) {
        if ((userPick === 'paper' && aiPick === 'rock') || (userPick === 'rock' && aiPick === 'scissors') || (userPick === 'scissors' && aiPick === 'paper')) {
            console.log('win')
        } else if (userPick === aiPick) {
            console.log('draw')
        } else {
            console.log('lose')
        }
    }
}

export const game = new Game()