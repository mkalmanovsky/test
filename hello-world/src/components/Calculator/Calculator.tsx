import React, { useState } from 'react';
import styles from './Calculator.module.css';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDot = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clear = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplayValue((parseFloat(displayValue) * -1).toString());
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;

    setDisplayValue((currentValue / 100).toString());
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      if (waitingForSecondOperand) {
        setOperator(nextOperator);
        return;
      }

      const result = calculate(firstOperand, inputValue, operator);

      // Limit decimals to avoid long floating point numbers
      const formattedResult = String(parseFloat(result.toFixed(7)));

      setDisplayValue(formattedResult);
      setFirstOperand(parseFloat(formattedResult));
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleEqual = () => {
    if (!operator || firstOperand === null) return;

    const inputValue = parseFloat(displayValue);
    const result = calculate(firstOperand, inputValue, operator);

    const formattedResult = String(parseFloat(result.toFixed(7)));
    setDisplayValue(formattedResult);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  };

  // History logic: Show first operand and operator if they exist and we are waiting or entering second operand
  const getHistory = () => {
    if (firstOperand !== null && operator) {
      return `${firstOperand} ${operator}`;
    }
    return '';
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.displayContainer}>
        <div className={styles.history}>{getHistory()}</div>
        {/* Use key to trigger animation on value change */}
        <div key={displayValue} className={styles.display}>{displayValue}</div>
      </div>

      <div className={styles.keypad}>
        {/* Row 1 */}
        <button className={`${styles.button} ${styles.function}`} onClick={clear}>AC</button>
        <button className={`${styles.button} ${styles.function}`} onClick={toggleSign}>+/-</button>
        <button className={`${styles.button} ${styles.function}`} onClick={inputPercent}>%</button>
        <button className={`${styles.button} ${styles.operator}`} onClick={() => performOperation('/')}>÷</button>

        {/* Row 2 */}
        <button className={`${styles.button} ${styles.number}`} onClick={() => inputDigit('7')}>7</button>
        <button className={`${styles.button} ${styles.number}`} onClick={() => inputDigit('8')}>8</button>
        <button className={`${styles.button} ${styles.number}`} onClick={() => inputDigit('9')}>9</button>
        <button className={`${styles.button} ${styles.operator}`} onClick={() => performOperation('*')}>×</button>

        {/* Row 3 */}
        <button className={`${styles.button} ${styles.number}`} onClick={() => inputDigit('4')}>4</button>
        <button className={`${styles.button} ${styles.number}`} onClick={() => inputDigit('5')}>5</button>
        <button className={`${styles.button} ${styles.number}`} onClick={() => inputDigit('6')}>6</button>
        <button className={`${styles.button} ${styles.operator}`} onClick={() => performOperation('-')}>-</button>

        {/* Row 4 */}
        <button className={`${styles.button} ${styles.number}`} onClick={() => inputDigit('1')}>1</button>
        <button className={`${styles.button} ${styles.number}`} onClick={() => inputDigit('2')}>2</button>
        <button className={`${styles.button} ${styles.number}`} onClick={() => inputDigit('3')}>3</button>
        <button className={`${styles.button} ${styles.operator}`} onClick={() => performOperation('+')}>+</button>

        {/* Row 5 */}
        <button className={`${styles.button} ${styles.number} ${styles.zero}`} onClick={() => inputDigit('0')}>0</button>
        <button className={`${styles.button} ${styles.number}`} onClick={inputDot}>.</button>
        <button className={`${styles.button} ${styles.operator}`} onClick={handleEqual}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
