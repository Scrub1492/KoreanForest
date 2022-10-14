// 5-box Leitner system
class QuizScheduler {
    boxAmount = 5

    constructor(deckSize, boxAmount) {
        this.boxAmount = boxAmount
        this.deckSize = deckSize
        this.boxes = []

        for (const i of Array(5).keys()) {
            let interval = Math.max(
                Math.min(
                    12 * (i + 1),
                    Math.floor(deckSize * (i + 1) / 12)
                ),
                5 * (i + 1))
            this.boxes.push(interval)
        }
    }

}

class FlashcardScheduler {
    boxAmount = 10
    constructor(boxAmount) {
        this.boxAmount = boxAmount
    }

    _originalBoxes = [600000, 5.4e+6, 2.88e+7, 8.64e+7, 2.592e+8, 6.912e+8, 1.814e+9, 5.256e+9, 2.365e+10]
    //'10min', '90min', '8h', '1d', '3d','8d', '21d', '2mo', '9mo'
    _addTime(length, date = new Date()) {
        date.setTime(
            date.getTime() + length
        )
        return date
    }
    getInterval(box) {
        return addTime(this._originalBoxes[box])
    }
}

async function waitingCardsCheck(userid) {
    const waitingCards = SaveData.findAll({ userid: userid })
    for await (const card of waitingCards) {
        if (Date.now() > card.waitEndTime) {
            return card
        }
    }
    return
}

export default {
    QuizScheduler,
    FlashcardScheduler,
    waitingCardsCheck,
}