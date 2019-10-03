import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';

const changePasswordStyleAccordingToInput = (password) => {
  const passwordRegex = /^(?=.{6,})(?!.*\s).*$/g;

  if (password === '') {
    return styles.InputFieldStyle;
  } else if (passwordRegex.test(password)) {
    return [styles.InputFieldStyle, { borderColor: '#80FF80', borderWidth: 2 }];
  }
  return [styles.InputFieldStyle, { borderColor: '#FF9999', borderWidth: 2 }];
};

const changeStyleIfPasswordsMatch = (password, passwordCompared) => {
  if (passwordCompared === '') {
    return styles.InputFieldStyle;
  } else if (password === passwordCompared) {
    return [styles.InputFieldStyle, { borderColor: '#80FF80', borderWidth: 2 }];
  }
  return [styles.InputFieldStyle, { borderColor: '#FF9999', borderWidth: 2 }];
};

const PasswordField = props => (
  <View
    style={
      props.isPassword ?
        changePasswordStyleAccordingToInput(props.password) :
        changeStyleIfPasswordsMatch(props.password, props.passwordCompared)}
  >
    <TextInput
      style={styles.InputStyle}
      placeholder={props.placeholder}
      placeholderTextColor="#95a5a6"
      underlineColorAndroid="transparent"
      returnKeyLabel={'next'}
      maxLength={30}
      keyboardType={'default'}
      onChangeText={password => props.callback(password)}
      secureTextEntry
      focus={props.focus}
    />
  </View>
);

const styles = StyleSheet.create({
  InputFieldStyle: {
    padding: 15,
    marginTop: 0,
    paddingLeft: 15,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  InputStyle: {
    flex: 1,
  },
});

PasswordField.propTypes = {
  callback: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordCompared: PropTypes.string,
  isPassword: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  focus: PropTypes.bool,
};

PasswordField.defaultProps = {
  passwordCompared: '',
  width: '',
  focus: false,
};

export default PasswordField;
