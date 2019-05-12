import React, { useState } from 'react'
import { isEqual } from 'lodash'
import './App.css'

const getRandomArrayMember = (array: any[]) => array[Math.floor(Math.random() * array.length)]

const getStringifiedValue = (value: any): string => {
  if (isEqual(value, null)) {
    return 'null'
  } else if (isEqual(value, undefined)) {
    return 'undefined'
  } else if (isEqual(value, [])) {
    return '[]'
  } else if (isEqual(value, {})) {
    return '{}'
  } else if (isEqual(value, [[]])) {
    return '[[]]'
  } else if (isEqual(value, [0])) {
    return '[[]]'
  } else if (isEqual(value, [1])) {
    return '[[]]'
  } else if (isEqual(value, NaN)) {
    return 'NaN'
  } else if (isEqual(value, '0')) {
    return `"0"`
  } else if (isEqual(value, '1')) {
    return `"1"`
  } else if (isEqual(value, '-1')) {
    return `"-1"`
  } else if (isEqual(value, '')) {
    return `""`
  } else {
    return value.toString()
  }
}

const getResult = (leftValue: any, rightValue: any, operator: Operator): boolean => {
  if (isEqual(operator, '==')) {
    return leftValue == rightValue
  } else if (isEqual(operator, '===')) {
    return leftValue === rightValue
  } else if (isEqual(operator, '!=')) {
    return leftValue != rightValue
  } else {
    return leftValue !== rightValue
  }
}

// Write a test for this, it looks like it is not always getting it right
const checkExpressionForWeirdness = (leftValue: any, operator: Operator, rightValue: any) => {
  return (
    weirdEqualities.includes(
      `${getStringifiedValue(leftValue)} ${getStringifiedValue(operator)} ${getStringifiedValue(
        rightValue
      )}`
    ) ||
    weirdEqualities.includes(
      `${getStringifiedValue(rightValue)} ${getStringifiedValue(operator)} ${getStringifiedValue(
        leftValue
      )}`
    )
  )
}

const weirdEqualities = [
  'true == 1',
  'false == 0',
  'true == "1"',
  '1 == "1"',
  'false == "0"',
  '0 == "0"',
  'false == ""',
  '0 == ""',
  'undefined == null',
  'false == []',
  '0 == []',
  '"" == true',
  'false == [[]]',
  '0 == [[]]',
  '"" == [[]]',
  'false == [0]',
  '0 == [0]',
  '"0" == 0',
  'true == [1]',
  '1 == [1]',
]

// Haha first time the use of any might be justified in some code I wrote
const sourceValues: any[] = [
  true,
  false,
  1,
  0,
  -1,
  '1',
  '0',
  '-1',
  '',
  null,
  undefined,
  Infinity,
  -Infinity,
  [],
  {},
  [[]],
  [0],
  [1],
  NaN,
]

type Operator = '==' | '===' | '!=' | '!=='
const operators: Operator[] = ['==', '===', '!=', '!==']
const crazyOperators: Operator[] = ['==', '!=']

interface Values {
  left: any
  right: any
}

const App: React.FC = () => {
  const [values, setValues] = useState<Values>({
    left: getRandomArrayMember(sourceValues),
    right: getRandomArrayMember(sourceValues),
  })
  const [operator, setOperator] = useState(getRandomArrayMember(operators) as Operator)
  const [result, setResult] = useState(getResult(values.left, values.right, operator).toString())
  const [rotate, setRotate] = useState(false)
  const [crazyMode, setCrazyMode] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [answerGiven, setAnswerGiven] = useState<string>('')
  const [isWeird, setIsWeird] = useState(false)

  const handleClick = (value: string) => {
    setAnswerGiven(value)
    setShowAnswer(true)
  }

  const checkAnswer = (answer: string) => answer.toString() === result

  return (
    <div className='App'>
      <a
        href='https://github.com/mathieu-anderson/js-equality-jackpot/'
        className='github-corner'
        aria-label='View source on GitHub'
      >
        <svg width='80' height='80' viewBox='0 0 250 250' className='octo' aria-hidden='true'>
          <path d='M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z' />
          <path
            d='M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2'
            fill='currentColor'
            className='octo-arm'
          />
          <path
            d='M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z'
            fill='currentColor'
            className='octo-body'
          />
        </svg>
      </a>
      <header className='App-header'>JavaScript Equality Jackpot</header>
      <section className='Slots'>
        <div className='Slots-line'>
          <div
            className={`Slots-line-slot ${rotate ? 'rotate' : ''}`}
            onAnimationEnd={() => {
              setRotate(false)
              const nextLeftValue = getRandomArrayMember(sourceValues)
              const nextRightValue = getRandomArrayMember(sourceValues)
              const nextOperator = crazyMode
                ? (getRandomArrayMember(crazyOperators) as Operator)
                : (getRandomArrayMember(operators) as Operator)
              setValues({
                left: nextLeftValue,
                right: nextRightValue,
              })
              setOperator(nextOperator)
              setIsWeird(checkExpressionForWeirdness(nextLeftValue, operator, nextRightValue))
              setResult(getResult(nextLeftValue, nextRightValue, nextOperator).toString())
            }}
          >
            {getStringifiedValue(values.left)}
          </div>
          <div
            className={`Slots-line-slot ${rotate ? 'rotate' : ''}`}
            onAnimationEnd={() => setRotate(false)}
          >
            {operator}
          </div>
          <div
            className={`Slots-line-slot ${rotate ? 'rotate' : ''}`}
            onAnimationEnd={() => setRotate(false)}
          >
            {getStringifiedValue(values.right)}
          </div>
        </div>
        <div className='Slots-answer'>
          <div className='Slots-answer-text'>Evaluates to...</div>
          <button
            className={`Slots-answer-button button-true ${
              showAnswer && answerGiven === 'true' ? 'button-true-selected' : ''
            }`}
            onClick={() => handleClick('true')}
          >
            true
          </button>
          <button
            className={`Slots-answer-button button-false ${
              showAnswer && answerGiven === 'false' ? 'button-false-selected' : ''
            }`}
            onClick={() => handleClick('false')}
          >
            false
          </button>
        </div>
        {
          <div className='Slots-line-results'>
            {showAnswer && (
              <>
                {checkAnswer(answerGiven)
                  ? `⭐ Correct! It evaluates to `
                  : `❌ Nope, it evaluates to `}
                {result}
                {isWeird ? ` AND IT'S FKEN WEIRD` : null}
              </>
            )}
          </div>
        }
        <button
          className='Slots-button-roll'
          onClick={() => {
            setShowAnswer(false)
            setRotate(true)
          }}
        >
          Roll
        </button>{' '}
        <label className='Slots-checkbox'>
          <input
            className={crazyMode ? 'Slots-checkbox-input crazy' : 'Slots-checkbox-input'}
            type='checkbox'
            checked={crazyMode}
            onChange={() => setCrazyMode(!crazyMode)}
          />
          <div className={crazyMode ? 'Slots-checkbox-label crazy' : 'Slots-checkbox-label'}>
            Crazy mode (no strict equalities)
          </div>
        </label>
      </section>
    </div>
  )
}

export default App
