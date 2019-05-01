import React, { useState } from 'react'
import { isEqual } from 'lodash'
import './App.css'

const getRandomArrayMember = (array: any[]): string =>
  array[Math.floor(Math.random() * array.length)]

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

const getWeirdnessStatement = (
  result: string,
  leftValue: string,
  rightValue: string,
  operator: string
) => {
  if (
    weirdEqualities.includes(`${leftValue} ${operator} ${rightValue}`) ||
    weirdEqualities.includes(`${rightValue} ${operator} ${leftValue}`)
  ) {
    return (
      <div className={result === 'true' ? 'Slots-line-results-true' : 'Slots-line-results-false'}>
        {result} AND FKEN WEIRD
      </div>
    )
  } else {
    return (
      <div className={result === 'true' ? 'Slots-line-results-true' : 'Slots-line-results-false'}>
        {result}
      </div>
    )
  }
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

const operatorSubtitles: { [index: string]: string } = {
  '==': 'is equal to',
  '===': 'is strictly equal to',
  '!=': 'is not equal to',
  '!==': 'is not strictly equal to',
}

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
              const nextOperator = getRandomArrayMember(operators) as Operator
              setValues({
                left: nextLeftValue,
                right: nextRightValue,
              })
              setOperator(nextOperator)
              setResult(getResult(nextLeftValue, nextRightValue, nextOperator).toString())
            }}
          >
            {getStringifiedValue(values.left)}
          </div>
          <div className='Slots-line-slot-withSubtitle'>
            <div
              className={`Slots-line-slot ${rotate ? 'rotate' : ''}`}
              onAnimationEnd={() => setRotate(false)}
            >
              {operator}
            </div>
            <div className='Slots-line-slot-subtitle'>{operatorSubtitles[operator]}</div>
          </div>
          <div
            className={`Slots-line-slot ${rotate ? 'rotate' : ''}`}
            onAnimationEnd={() => setRotate(false)}
          >
            {getStringifiedValue(values.right)}
          </div>
        </div>
        {getWeirdnessStatement(result, values.left, values.right, operator)}
        <button
          className='Slots-button'
          onClick={() => {
            setRotate(true)
          }}
        >
          Roll
        </button>
      </section>
    </div>
  )
}

export default App
