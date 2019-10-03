import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const ButtonWithActivityIndicator = props => (
  <View>
    {props.isLoading ? (
      <ActivityIndicator
        style={props.activityIndicatorStyle}
        size="large"
        color="#FC1055"
      />
    ) :
      (
        <TouchableOpacity
          onPress={() => props.onPress()}
          style={props.buttonStyle}
          activeOpacity={0.7}
          key={props.buttonKey}
        >
          <Text style={styles.buttonText}>{props.buttonText}</Text>
        </TouchableOpacity>
      )}
  </View>
);

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },
});

// For some reason, the style elements are considered numbers.
ButtonWithActivityIndicator.propTypes = {
  activityIndicatorStyle: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonKey: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonStyle: PropTypes.object.isRequired,
};

export default ButtonWithActivityIndicator;
