import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import styles from '../Styles/InputFieldStyles';

const validateCpf = (cpf, callback) => {
  console.log(cpf)
  const validCpf = cpf
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  callback(validCpf);
};

const CpfField = props => (
  <View style={styles.InputFieldStyle}>
    <TextInput
      style={styles.InputStyle}
      placeholder="Digite o seu CPF"
      placeholderTextColor="#95a5a6"
      underlineColorAndroid="transparent"
      returnKeyLabel={'next'}
      maxLength={14}
      keyboardType={'numeric'}
      onChangeText={cpf => validateCpf(cpf, props.callback)}
      value={props.value}
    />
  </View>
);

CpfField.propTypes = {
  value: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default CpfField;
