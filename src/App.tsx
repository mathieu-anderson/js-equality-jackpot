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
    if (result === value) {
      setAnswerGiven(value)
      setShowAnswer(true)
    } else {
      setAnswerGiven(value)
      setShowAnswer(true)
    }
  }

  const checkAnswer = (answer: string) => answer.toString() === result

  return (
    <div className='App'>
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
