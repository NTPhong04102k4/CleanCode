const isFloat = (value: string): boolean => {
  return value.includes('.') || value.includes(',');
};

const hasDot = (text: string): boolean => {
  return text === '.' || text === ',';
};

const isOperator = (text: string, CALCULATOR: any): boolean => {
  return (
    text === CALCULATOR.SUM ||
    text === CALCULATOR.SUBTRACTION ||
    text === CALCULATOR.MOD ||
    text === CALCULATOR.DIVISION ||
    text === CALCULATOR.MULTIPLICATION
  );
};

const isNumber = (value: string): boolean => isNaN(Number(value));

export {isFloat, isNumber, isOperator, hasDot};
