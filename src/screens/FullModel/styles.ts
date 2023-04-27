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
  sectionTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 8
  },
  label: {
    fontSize: 18,
    color: '#767676',
    marginBottom: 8
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    fontSize: 18,
    color: '#fff',
    marginBottom: 10
  },
  divider: {
    borderWidth: 1,
    borderColor: '#383838',
    margin: 18
  },
  picker: {
    fontSize: 18,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 10
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
  dateValueTxt: {
    fontSize: 18,
    color: '#fff',
  },
  datePreviewTxt: {
    fontSize: 16,
    color: '#767676',
  }
});