import React, {useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
import {DATA_CALCULATOR} from '../data';
import {isFloat, hasDot, isOperator, isNumber} from './calculatorUtils';

enum CALCULATOR {
  SUM = '+',
  SUBTRACTION = '-',
  MULTIPLICATION = '*',
  DIVISION = '/',
  MOD = '%',
  DEL = 'Xóa',
  AC = 'C',
  RESULT = '=',
}

const screenWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;
const itemWidth = (screenWidth - 32 - 48) / 4;
const itemHeight = (windowHeight - windowHeight / 3 - 137) / 5;

export function Calculator() {
  const [operatorLeft, setOperatorLeft] = useState<string>('');
  const [operatorRight, setOperatorRight] = useState<string>('');
  const [operator, setOperator] = useState<string | null>(null);

  const calculator = () => {
    const firstOperator = parseFloat(operatorLeft);
    const secondOperator = parseFloat(operatorRight);
    let result = 0;

    switch (operator) {
      case CALCULATOR.SUM:
        result = firstOperator + secondOperator;
        break;
      case CALCULATOR.SUBTRACTION:
        result = firstOperator - secondOperator;
        break;
      case CALCULATOR.MULTIPLICATION:
        result = firstOperator * secondOperator;
        break;
      case CALCULATOR.DIVISION:
        if (secondOperator !== 0) {
          result = firstOperator / secondOperator;
        } else {
          setOperatorRight('');
          return;
        }
        break;
      case CALCULATOR.MOD:
        result = firstOperator % secondOperator;
        break;
      default:
        return;
    }

    const finalResult = result.toFixed(2);
    setOperatorRight(finalResult);
    setOperatorLeft('');
    setOperator(null);
  };

  const handleClick = (text: string) => {
    if (isOperator(text, CALCULATOR)) {
      if (operator && operatorLeft && operatorRight) {
        calculator();
      }
      if (operatorLeft && !operator) {
        setOperator(text);
      } else if (operatorRight) {
        setOperatorLeft(operatorRight);
        setOperator(text);
        setOperatorRight('');
      }
    } else {
      switch (text) {
        case CALCULATOR.AC:
          setOperatorLeft('');
          setOperatorRight('');
          setOperator(null);
          break;

        case CALCULATOR.DEL:
          if (operatorRight) {
            setOperatorRight(operatorRight.slice(0, -1));
          }
          if (operatorLeft && !operatorRight) {
            setOperatorLeft(operatorLeft.slice(0, -1));
          } else {
            setOperator(null);
          }
          break;

        case CALCULATOR.RESULT:
          if (isNumber(operatorLeft) || isNumber(operatorRight)) {
            return;
          }
          if (operatorRight && operatorLeft && operator) {
            calculator();
          }
          break;

        default:
          if (operator) {
            setOperatorRight(prev =>
              isFloat(prev) && hasDot(text) ? prev : prev + text,
            );
          } else {
            setOperatorLeft(prev =>
              isFloat(prev) && hasDot(text) ? prev : prev + text,
            );
            if (operatorLeft && operatorRight) {
              setOperatorRight('');
            }
          }
      }
    }
  };

  const renderItem = ({item}: {item: string}) => (
    <TouchableOpacity style={styles.button} onPress={() => handleClick(item)}>
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerCalculator}>
        <Text style={styles.firstOperatorRight}>
          {operatorLeft} {operator}
        </Text>
        <TextInput
          value={operatorRight}
          placeholderTextColor="black"
          placeholder="0"
          style={styles.textInput}
          editable={false}
        />
      </View>
      <FlatList
        numColumns={4}
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={styles.columnWrapper}
        data={DATA_CALCULATOR}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCalculator: {
    height: Dimensions.get('window').height / 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  firstOperatorRight: {
    color: 'grey',
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 15,
    marginRight: 25,
    flexDirection: 'row',
  },
  textInput: {
    color: 'black',
    fontSize: 40,
    fontWeight: '500',
    marginRight: 25,
    marginBottom: 25,
  },
  list: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 25,
  },
  listContentContainer: {
    justifyContent: 'space-between',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  button: {
    width: itemWidth,
    height: itemHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: 'white',
    elevation: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});
