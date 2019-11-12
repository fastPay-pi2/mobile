import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

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

export default styles;
