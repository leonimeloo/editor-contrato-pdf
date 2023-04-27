import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#383838'
  },
  headerTxt: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 14,
    color: '#fff'
  },
  content: {
    padding: 20
  },
  infoTxt: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20
  },
  model: {
    backgroundColor: '#1c1c1c',
    marginBottom: 50
  },
  modelImg: {
    width: '100%',
    height: 200,
    alignSelf: 'center'
  },
  modelTitle: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8
  },
  modelDesc: {
    fontSize: 18,
    color: '#767676',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 12,
    padding: 2
  },
  button: {
    height: 50,
    backgroundColor: '#167db5',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  }
});