import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'column',
  },
  filesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
    height: 90,
    backgroundColor: '#111',
    marginBottom: 8,
  },
  filesContentTxt: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginRight: 120,
  },
  iconImg: {
    width: 44,
    height: 44,
    marginLeft: 12,
  },
  loadingTxt: {
    fontSize: 22,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 50,
    paddingHorizontal: 20
  },
});