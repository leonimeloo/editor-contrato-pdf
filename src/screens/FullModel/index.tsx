import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  BackHandler,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { TextInputMask } from "react-native-masked-text";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

import fullModelHtml from "../../models/FullModel";

import FileContext from "../../contexts/file";

export default function FullModel() {
  const [date, setDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );

  //INFORMAÇÕES DO LOCADOR
  const [locatorName, setLocatorName] = useState<string>();
  const [locatorCpf, setLocatorCpf] = useState<string>();
  const [locatorAddress, setLocatorAddress] = useState<string>();

  //INFORMAÇÕES DO LOCATÁRIO
  const [tenantName, setTenantName] = useState<string>();
  const [tenantCpf, setTenantCpf] = useState<string>();
  const [tenantRg, setTenantRg] = useState<string>('');

  //INFORMAÇÕES DO IMÓVEL
  const [houseStreet, setHouseStreet] = useState<string>();
  const [houseNumber, setHouseNumber] = useState<string>();
  const [houseNeighborhood, setHouseNeighborhood] = useState<string>();
  const [houseCity, setHouseCity] = useState<string>();
  const [houseCep, setHouseCep] = useState<string>('');
  const [houseState, setHouseState] = useState<string>('mg');

  //INFORMAÇÕES DE VALOR DO ALUGUEL
  const [houseType, setHouseType] = useState<string>('casa');
  const [housePayment, setHousePayment] = useState<string>();
  const [housePaymentDay, setHousePaymentDay] = useState<number>(0);

  //INFORMAÇÕES DO TEMPO DE LOCAÇÃO
  const [monthTime, setMonthTime] = useState<number>(0);
  const [previewDate, setPreviewDate] = useState<string>();

  const [ isLoading, setIsLoading] = useState<boolean>(false);

  const { pdfUri, setPdfUri, setPdfName } = useContext(FileContext);

  const navigation = useNavigation();

  useEffect(() => {
    const backAct = () => {
      Alert.alert('Voltar', 'Tem certeza que deseja voltar? Você perderá as alterações feitas', [
        {
          text: 'Cancelar',
          onPress: () => null,
        },
        {
          text: 'Voltar',
          onPress: () => navigation.canGoBack() ? navigation.goBack() : null
        }
      ]);
      return true;
    };
    
    BackHandler.addEventListener('hardwareBackPress', backAct);
  }, []);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate as React.SetStateAction<Date>;
    setDate(currentDate);
    if (monthTime != undefined && monthTime > 0 && selectedDate != undefined) {
      setPreviewDate(
        new Date(
          new Date(selectedDate).setMonth(selectedDate.getMonth() + monthTime)
        ).toLocaleDateString("pt-BR")
      );
    }
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const onChangeMonthTime = (value: string) => {
    const numberValue = Number(value);
    setMonthTime(numberValue);
    setPreviewDate(
      new Date(new Date(date).setMonth(date.getMonth() + numberValue)).toLocaleDateString("pt-BR")
    );
  };

  async function handleCreatePDF() {
    setIsLoading(true);
    let options = {
      html: await fullModelHtml({
        data: {
          locatorName,
          locatorCpf,
          locatorAddress,
          tenantName,
          tenantCpf,
          tenantRg,
          houseStreet,
          houseNumber,
          houseNeighborhood,
          houseCity,
          houseCep,
          houseState,
          houseType,
          housePayment,
          housePaymentDay,
          startLocationDate: date.toString(),
          endLocationDate: previewDate,
          locationTimeMonth: monthTime,
        }
      }),
      fileName: `Contrato de ${tenantName}`,
      directory: 'Contratos',
    };
    
    let file = await RNHTMLtoPDF.convert(options);
    await setPdfUri(file.filePath as string);
    await setPdfName(`Contrato de ${tenantName}`);
    console.log('PDF URI: ' + pdfUri);
    ToastAndroid.show(`Seu contrato foi criado com sucesso em Documentos/Contratos`, ToastAndroid.LONG);
    navigation.navigate('Share' as never);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Contrato Completo</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.infoTxt}>Digite os dados requeridos:</Text>

          <SafeAreaView>
            <Text style={styles.label}>LOCADOR / DONO: </Text>
            <TextInput
              style={styles.input}
              value={locatorName}
              onChangeText={(txt) => setLocatorName(txt)}
            />

            <Text style={styles.label}>CPF DO LOCADOR / DONO: </Text>
            <TextInputMask
              type="cpf"
              style={styles.input}
              value={locatorCpf}
              onChangeText={(txt) => setLocatorCpf(txt)}
            />

            <Text style={styles.label}>ENDEREÇO DO LOCADOR: (coloque endereço completo)</Text>
            <TextInput
              style={styles.input}
              value={locatorAddress}
              onChangeText={(txt) => setLocatorAddress(txt)}
            />

            <View style={styles.divider} />

            <Text style={styles.label}>LOCATÁRIO / INQUILINO: </Text>
            <TextInput
              style={styles.input}
              value={tenantName}
              onChangeText={(txt) => setTenantName(txt)}
            />

            <Text style={styles.label}>CPF DO LOCATÁRIO / INQUILINO: </Text>
            <TextInputMask
              type="cpf"
              style={styles.input}
              value={tenantCpf}
              onChangeText={(txt) => setTenantCpf(txt)}
            />

            <Text style={styles.label}>
              N° IDENTIDADE DO LOCATÁRIO / INQUILINO:{" "}
            </Text>
            <TextInputMask
              type="custom"
              keyboardType="numeric"
              style={styles.input}
              options={{ 
                mask: '999999999' 
              }}
              value={tenantRg}
              onChangeText={(txt) => setTenantRg(txt)}
            />

            <View style={styles.divider} />

            <Text style={styles.label}>RUA DO IMÓVEL: </Text>
            <TextInput
              style={styles.input}
              value={houseStreet}
              onChangeText={(txt) => setHouseStreet(txt)}
            />

            <Text style={styles.label}>N° DO IMÓVEL: </Text>
            <TextInputMask
              type="only-numbers"
              style={styles.input}
              keyboardType="numeric"
              value={houseNumber}
              onChangeText={(txt) => setHouseNumber(txt)}
            />

            <Text style={styles.label}>BAIRRO DO IMÓVEL: </Text>
            <TextInput
              style={styles.input}
              value={houseNeighborhood}
              onChangeText={(txt) => setHouseNeighborhood(txt)}
            />

            <Text style={styles.label}>CEP DO IMÓVEL: </Text>
            <TextInputMask
              type="custom"
              options={{
                mask: '99999-999'
              }}
              style={styles.input}
              value={houseCep}
              onChangeText={(txt) => setHouseCep(txt)}
            />

            <Text style={styles.label}>CIDADE DO IMÓVEL: </Text>
            <TextInput
              style={styles.input}
              value={houseCity}
              onChangeText={(txt) => setHouseCity(txt)}
            />

            <Text style={styles.label}>UF DO IMÓVEL: </Text>
            <TouchableOpacity style={styles.picker} activeOpacity={1}>
              <Picker
                style={styles.picker}
                mode="dropdown"
                dropdownIconColor={"#fff"}
                itemStyle={styles.picker}
                selectedValue={houseState}
                onValueChange={(itemValue, itemIndex) => {
                  setHouseState(itemValue);
                }}
              >
                <Picker.Item label="Acre" value="ac" />
                <Picker.Item label="Alagoas" value="al" />
                <Picker.Item label="Amapá" value="ap" />
                <Picker.Item label="Amazonas" value="am" />
                <Picker.Item label="Bahia" value="ba" />
                <Picker.Item label="Ceará" value="ce" />
                <Picker.Item label="Distrito Federal" value="df" />
                <Picker.Item label="Espírito Santo" value="es" />
                <Picker.Item label="Goiás" value="go" />
                <Picker.Item label="Maranhão" value="ma" />
                <Picker.Item label="Mato Grosso" value="mt" />
                <Picker.Item label="Mato Grosso do Sul" value="ms" />
                <Picker.Item label="Minas Gerais" value="mg" />
                <Picker.Item label="Pará" value="pa" />
                <Picker.Item label="Paraíba" value="pb" />
                <Picker.Item label="Paraná" value="pr" />
                <Picker.Item label="Pernambuco" value="pe" />
                <Picker.Item label="Piauí" value="pi" />
                <Picker.Item label="Rio de Janeiro" value="rj" />
                <Picker.Item label="Rio Grande do Norte" value="rn" />
                <Picker.Item label="Rio Grande do Sul" value="rs" />
                <Picker.Item label="Rondônia" value="ro" />
                <Picker.Item label="Roraima" value="rr" />
                <Picker.Item label="Santa Catarina" value="sc" />
                <Picker.Item label="São Paulo" value="sp" />
                <Picker.Item label="Sergipe" value="se" />
                <Picker.Item label="Tocantins" value="to" />
              </Picker>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.label}>TIPO DO IMÓVEL: </Text>
            <TouchableOpacity style={styles.picker} activeOpacity={1}>
              <Picker
                style={styles.picker}
                mode="dropdown"
                dropdownIconColor={"#fff"}
                itemStyle={styles.picker}
                selectedValue={houseType}
                onValueChange={(itemValue, itemIndex) => {
                  setHouseType(itemValue);
                }}
              >
                <Picker.Item label="Residencial" value="casa" />
                <Picker.Item label="Comercial" value="comercio" />
              </Picker>
            </TouchableOpacity>

            <Text style={styles.label}>VALOR MENSAL DO ALUGUEL: </Text>
            <TextInputMask
              type="money"
              options={{
                precision: 2,
                separator: ",",
                delimiter: ".",
                unit: "R$",
                suffixUnit: "",
              }}
              style={styles.input}
              value={housePayment}
              onChangeText={(txt) => setHousePayment(txt)}
            />

            <Text style={styles.label}>DIA DE PAGAMENTO DO ALUGUEL: </Text>
            <TextInputMask
              type="custom"
              options={{
                mask: "99",
              }}
              checkText={(previous, next) => {
                if (next.startsWith("0") || Number(next) >= 32) {
                  return false;
                } else {
                  return true;
                }
              }}
              keyboardType="numeric"
              style={styles.input}
              value={
                housePaymentDay <= 0 || housePaymentDay >= 32
                  ? ""
                  : housePaymentDay?.toString()
              }
              onChangeText={(txt) => setHousePaymentDay(Number(txt))}
            />

            <View style={styles.divider} />

            <Text style={styles.label}>INÍCIO DA LOCAÇÃO: </Text>
            <TouchableOpacity
              style={styles.input}
              activeOpacity={1}
              onPress={showDatePicker}
            >
              <Text style={styles.dateValueTxt}>
                {date.toLocaleDateString("pt-BR")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>TEMPO DE CONTRATO (em meses): </Text>
            <TextInputMask
              type="custom"
              options={{
                mask: "99",
              }}
              checkText={(previous, next) => {
                if (next.startsWith("0")) {
                  return false;
                } else {
                  return true;
                }
              }}
              style={styles.input}
              keyboardType="number-pad"
              editable
              value={monthTime <= 0 ? "" : monthTime?.toString()}
              onChangeText={(txt) => onChangeMonthTime(txt)}
            />

            <Text style={styles.datePreviewTxt}>
              {previewDate == null
                ? ""
                : `O término da locação será em ${previewDate}`}
            </Text>

            { 
            !isLoading ? 
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={handleCreatePDF}
            >
              <Text style={styles.btnText}>CRIAR CONTRATO</Text>
            </TouchableOpacity> 
            :
            <ActivityIndicator size="small" color="#1976d2" />
            }
          </SafeAreaView>
        </View>
      </View>
    </ScrollView>
  );
}
