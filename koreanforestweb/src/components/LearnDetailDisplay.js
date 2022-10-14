import React, { useEffect } from 'react'
import styles from '../styles/LearnDetail.module.scss'

export default function LearnDetailDisplay(props) {
    var card = props.card
    console.log(card.wiktionaryLink)
    return (
        <>
            <h4 className={styles.romanised}>{card.romanised}</h4>
            <h4 className={styles.partOfSpeech}>{card.partOfSpeech}<br />{card.partOfSpeechKorean}</h4>
            <h4 className={styles.complexity}>{card.complexity}</h4>
            <h4 className={styles.translation}>{card.translation}</h4>
            <h4 className={styles.frequencyRank}>{card.frequencyRank}</h4>
            <h4 className={styles.wiktionaryLink}>{card.wiktionaryLink}</h4>
        </>
    )
}
