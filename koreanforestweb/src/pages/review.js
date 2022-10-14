import React, { useEffect, useRef, useState } from 'react'
import DarkModeToggleButton from '../components/DarkModeToggleButton'
import LearningWordDisplay from '../components/LearningWordDisplay'
import InputForm from '../components/InputForm'
import topik from '../assets/topik.json'
import '../common/utils/scheduler'

class Card {
  constructor(card) {
    this.card = card
    this.partOfSpeech = card['Classification']
    this.complexity = card['Complexity']
    this.translation = card['English']
    this.frequencyRank = card['Frequecy Rank']
    this.romanised = card['Romanised']
    this.wiktionaryLink = card['Wiktionary Link']
    this.word = card['Word']
    this.wordReferenceLink = card['Wordreference Link']
    this.id = card['hidden numbering']
    this.partOfSpeechKorean = card['품사']
  }
}

export default function review() {
  const userid = 'abc'

  const inputRef = useRef()
  const [currentCardDeck, setCurrentCards] = useState(topik.cards)
  const currentCard = new Card(currentCardDeck[0])

  function handleInput(e) {
    const input = inputRef.current.value

    if (input === '') return
    if (e.key === 'Enter') {

      if (input === currentCard.translation) {
        setCurrentCards((prevState) => {
          let cards = [...prevState]
          cards.shift()
          return cards
        })
      }
      inputRef.current.value = null

    }
  }
  return (
      <>
      <DarkModeToggleButton />
      <LearningWordDisplay card={currentCard} />
      <InputForm ref={inputRef} callbackFn={handleInput} />
    </>
  )
}
