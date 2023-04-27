import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ToastAndroid, ScrollView, BackHandler } from 'react-native';
import Share from 'react-native-share';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

import { styles } from './styles';

import FileContext from '../../contexts/file';
import { useNavigation } from '@react-navigation/native';

export default function ShareScreen() {
  const { pdfUri, pdfName } = useContext(FileContext);
  const navigation = useNavigation();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  const onShare = async() => {
    let pdfBase;
    await RNFetchBlob.fs.readFile(pdfUri, 'base64').then((data) => {
      pdfBase = data;
    });
    await Share.open({
      title: pdfName,
      message: 'Veja este contrato criado com Contrato Editor by @leonimeloo',
      url: `data:application/pdf;base64,${pdfBase}`,
      filename: pdfName,
      type: 'application/pdf',
      excludedActivityTypes: [ 'copyToPasteBoard', 'saveToCameraRoll', 'print' ],
      subject: `CONTRATO DE LOCAÇÃO`,
    }).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    });
  }

  const onDelete = async() => {
    Alert.alert('Excluir contrato', 'Deseja mesmo excluir o arquivo do contrato permanentemente?', [
      {
        text: 'Cancelar',
      }, {
        text: 'Excluir',
        onPress: () => {
          RNFS.exists(pdfUri).then((res) => {
            if(res) {
              return RNFS.unlink(pdfUri).then(() => {
                ToastAndroid.show('O contrato foi excluído do armazenamento', ToastAndroid.LONG);
                navigation.navigate('Home' as never);
              });
            } else {
              ToastAndroid.show('O contrato já foi excluído ou não existe mais', ToastAndroid.LONG);
              navigation.navigate('Home' as never);
            }
          }).catch((e) => {
            console.log(e);
          });
        }
      }
    ])
  }
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.actions}>
          <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onShare}
          >
            <Text style={styles.btnText}>COMPARTILHAR CONTRATO</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('FileList' as never)}
          >
            <Text style={styles.btnText}>VISUALIZAR CONTRATOS</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onDelete}
          >
            <Text style={styles.btnText}>EXCLUIR CONTRATO</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pdfViewer}>
          <Pdf
          source={{ uri: pdfUri, cache: false }}
          onError={() => {
            //Alert.alert('Erro:', 'Não foi possível carregar o PDF, tente novamente!');
            console.log('ERRO AO CARREHAR PDF')
          }}
          onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdfViewer}
          />
        </View>
      </View>
    </ScrollView>
  );
}