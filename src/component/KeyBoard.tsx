import React, {useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  TextInput,
} from 'react-native';
import {buttonText} from '../data';

enum CALCULATOR {
  SUM = '+',
  SUBTRACTION = '-',
  MULTIPLICATION = '*',
  DIVISION = '/',
  MOD = '%',
}

export function KeyBoard() {
  const screenWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('window').height;
  const itemWidth = (screenWidth - 32 - 48) / 4;
  const itemHeight = (windowHeight - windowHeight / 3 - 137) / 5;

  const [result, setResult] = useState('');
  const [operator, setOperator] = useState('');
  const [currentOperator, setCurrentOperator] = useState<string | null>(null);

  const calculator = () => {
    let operatorLeft = parseFloat(operator);
    let operatorRight = parseFloat(result);
    let resultInTime = 0;

    switch (currentOperator) {
      case CALCULATOR.SUM:
        resultInTime = operatorLeft + operatorRight;
        break;
      case CALCULATOR.SUBTRACTION:
        resultInTime = operatorLeft - operatorRight;
        break;
      case CALCULATOR.MULTIPLICATION:
        resultInTime = operatorLeft * operatorRight;
        break;
      case CALCULATOR.DIVISION:
        resultInTime = operatorLeft / operatorRight;
        break;
      case CALCULATOR.MOD:
        resultInTime = operatorLeft % operatorRight;
        break;
      default:
        return;
    }

    setOperator(resultInTime.toFixed(2).toString());
    setResult('');
    setCurrentOperator(null);
  };

  const handleClick = (text: string) => {
    switch (text) {
      case 'C':
        setResult('');
        setOperator('');
        setCurrentOperator(null);
        break;

      case 'Xóa':
        if (result.length > 0) {
          setResult(result.slice(0, -1));
        } else if (operator.length > 0) {
          setOperator(operator.slice(0, -1));
        }
        break;

      case CALCULATOR.SUM:
      case CALCULATOR.SUBTRACTION:
      case CALCULATOR.MULTIPLICATION:
      case CALCULATOR.DIVISION:
      case CALCULATOR.MOD:
        if (operator && currentOperator) {
          calculator();
        } else if (!operator) {
          setOperator(result !== '' ? result : '0');
          setResult('');
        }
        setCurrentOperator(text);
        break;

      case '=':
        if (operator && result && currentOperator) {
          calculator();
        }
        break;

      default:
        setResult(prev => prev + text);
        break;
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: Dimensions.get('window').height / 3,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            color: 'grey',
            fontSize: 30,
            fontWeight: '400',
            marginBottom: 15,
            marginRight: 25,
          }}>
          {operator} {currentOperator !== null ? currentOperator : ''}
        </Text>
        <TextInput
          value={result}
          placeholderTextColor={'black'}
          placeholder="0"
          style={{
            color: 'black',
            fontSize: 40,
            fontWeight: '500',
            marginRight: 25,
            marginBottom: 25,
          }}
          editable={false}
        />
      </View>
      <FlatList
        numColumns={4}
        style={{
          flex: 1,
          marginHorizontal: 16,
          marginTop: 25,
        }}
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
        data={buttonText}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: itemWidth,
              height: itemHeight,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 24,
              backgroundColor: 'white',
              elevation: 1,
            }}
            onPress={() => handleClick(item)}>
            <Text style={{color: 'black', fontSize: 20}}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
