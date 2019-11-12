import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import styles from '../Styles/InputFieldStyles';

const validateName = (name, callback) => {
  const validName = name.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, '');
  callback(validName);
};

const NameField = props => (
  <View style={styles.InputFieldStyle}>
    <TextInput
      style={styles.InputStyle}
      placeholder="Digite o seu nome completo"
      placeholderTextColor="#95a5a6"
      underlineColorAndroid="transparent"
      returnKeyLabel={'next'}
      maxLength={60}
      keyboardType={'default'}
      autoCapitalize={'words'}
      onChangeText={name => validateName(name, props.callback)}
      value={props.value}
    />
  </View>
);

NameField.propTypes = {
  value: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default NameField;
