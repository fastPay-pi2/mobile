import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';

const UsernameField = props => (
  <View style={styles.InputFieldStyle}>
    <TextInput
      width={300}
      style={styles.InputStyle}
      placeholder={props.placeholder}
      placeholderTextColor="#95a5a6"
      underlineColorAndroid="transparent"
      returnKeyLabel={'next'}
      maxLength={50}
      keyboardType={'default'}
      autoCapitalize={'none'}
      onChangeText={username => props.callback(username)}
      value={props.value}
      onSubmitEditing={() => props.onSubmitEditing()}
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

UsernameField.propTypes = {
  value: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSubmitEditing: PropTypes.func,
};

UsernameField.defaultProps = {
  width: null,
  onSubmitEditing: () => (() => ({})),
};

export default UsernameField;
