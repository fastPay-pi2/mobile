import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import styles from '../Styles/InputFieldStyles';

const EmailField = props => (
  <View style={styles.InputFieldStyle}>
    <TextInput
      width={300}
      style={styles.InputStyle}
      placeholder={props.placeholder}
      placeholderTextColor="#95a5a6"
      underlineColorAndroid="transparent"
      returnKeyLabel={'next'}
      maxLength={50}
      keyboardType={'email-address'}
      autoCapitalize={'none'}
      onChangeText={email => props.callback(email)}
      value={props.value}
      onSubmitEditing={() => props.onSubmitEditing()}
    />
  </View>
);

EmailField.propTypes = {
  value: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSubmitEditing: PropTypes.func,
  size: PropTypes.number.isRequired,
};

EmailField.defaultProps = {
  width: null,
  onSubmitEditing: () => (() => ({})),
};

export default EmailField;
