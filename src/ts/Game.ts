import { rules } from './Rules'

class Game {
    constructor() {

    }

    init() {
        rules.init()
    }
}

export const game = new Game()