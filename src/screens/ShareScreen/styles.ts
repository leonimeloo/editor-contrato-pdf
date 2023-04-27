import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  actions: {
    padding: 20
  },
  button: {
    height: 50,
    backgroundColor: '#167db5',
    justifyContent: 'center',
    marginTop: 10
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  pdfViewer: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  }
});