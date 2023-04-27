import { View, Text, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

const modelOneSrc = require('../../assets/model1.png');
const modelTwoSrc = require('../../assets/model2.png');

export default function Create() {
    const navigation = useNavigation();

    return (
        <ScrollView >
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerTxt}>Criar Contrato</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.infoTxt}>
                        Escolha um modelo de contrato:
                    </Text>
                
                    <View style={styles.model}>
                        <Image source={modelOneSrc} style={styles.modelImg} />
                        <Text style={styles.modelTitle}>Modelo Completo</Text>
                        <Text style={styles.modelDesc}>
                            Modelo completo composto por 4 páginas,
                            contendo todas as cláusulas 
                            e sendo o mais rigoroso.
                        </Text>
                        <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('FullModel' as never)}
                        >
                            <Text style={styles.btnText}>CRIAR CONTRATO</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.model}>
                        <Image source={modelTwoSrc} style={styles.modelImg} />
                        <Text style={styles.modelTitle}>Modelo Simples</Text>
                        <Text style={styles.modelDesc}>
                            Modelo simples composto por 1 página apenas,
                            contendo cláusulas simples 
                            e diretas ao mesmo tempo.
                        </Text>
                        <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('SimpleModel' as never)}
                        >
                            <Text style={styles.btnText}>CRIAR CONTRATO</Text>
                        </TouchableOpacity>
                    </View>
                
                </View>

            </View>
        </ScrollView>
    );
}