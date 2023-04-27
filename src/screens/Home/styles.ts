import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    position: 'absolute',
    top: 45,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12
  },
  desc: {
    fontSize: 16,
    color: '#a8a8a8',
    textAlign: 'center',
    paddingHorizontal: 18
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#167db5',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  creatorTxt: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    bottom: 18,
  }
});