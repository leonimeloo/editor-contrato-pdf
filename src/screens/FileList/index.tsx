import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

import { styles } from './styles';
import FileContext from '../../contexts/file';
import { useNavigation } from '@react-navigation/native';

const PDFIcon = require('../../assets/pdficon.png');

export default function FileList() {
  const [ message, setMessage ] = useState<string>('');

  const [ filesResult, setFilesResult ] = useState<string[]>([]);

  const { setPdfUri } = useContext(FileContext);

  const navigation = useNavigation();

  useEffect(() => {
    onSearchList();
  
    const backAct = () => {
      navigation.goBack();
      return true;
    }

    BackHandler.addEventListener('hardwareBackPress', backAct);
  }, [])

  const onSearchList = async() => {
    setMessage('Carregando arquivos...')
    await RNFetchBlob.fs.ls(`${RNFS.ExternalStorageDirectoryPath}/Documents/Contratos`)
    .then((files) => {
      files.length > 0 ? setFilesResult(files) : setMessage('Experimente criar o seu primeiro contrato com a nossa ferramenta!');
    }).catch(() => {
      setMessage('Nenhum contrato foi criado ainda.\nExperimente criar o seu primeiro.');
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Lista de Contratos</Text>
      </View>

      <ScrollView>
        <View style={styles.content}>
          { filesResult.length > 0 ? 
          filesResult.map((file, index) => {
            return <TouchableOpacity 
            style={styles.filesContent} 
            key={index}
            activeOpacity={1}
            onPress={() => {
              setPdfUri(`${RNFS.ExternalStorageDirectoryPath}/Documents/Contratos/${file}`);
              navigation.navigate('Share' as never);
            }}
            >
              <Image source={PDFIcon} style={styles.iconImg} />
              <Text style={styles.filesContentTxt}>{file}</Text>
            </TouchableOpacity>
          })
          : 
          <View>
            <Text style={styles.loadingTxt}>
              {message}
            </Text>
          </View>
          }
        </View>
      </ScrollView>
    </View>
  );
}