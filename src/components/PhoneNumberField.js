import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import styles from '../Styles/InputFieldStyles';

const validatePhoneNumber = (phone, callback) => {
  const validPhoneNumber = phone
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/^(\d\d)(\d)/g, '($1) $2') //Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
  callback(validPhoneNumber);
};

const PhoneNumberField = props => (
  <View style={styles.InputFieldStyle}>
    <TextInput
      style={styles.InputStyle}
      placeholder="Digite o seu número de telefone"
      placeholderTextColor="#95a5a6"
      underlineColorAndroid="transparent"
      returnKeyLabel={'next'}
      maxLength={15}
      keyboardType={'phone-pad'}
      onChangeText={phone => validatePhoneNumber(phone, props.callback)}
      value={props.value}
    />
  </View>
);

PhoneNumberField.propTypes = {
  value: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export default PhoneNumberField;
