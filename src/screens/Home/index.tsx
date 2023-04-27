import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Editor de Contrato
                </Text>
                <Text style={styles.desc}>
                    Edite facilmente seus contratos e use ferramentas de edição de PDF 
                    da maneira mais simples possível.
                </Text>
            </View>
            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Create' as never)}
            >
                <Text style={styles.btnText}>CRIAR NOVO CONTRATO</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FileList' as never)}
            >
                <Text style={styles.btnText}>VISUALIZAR CONTRATOS</Text>
            </TouchableOpacity>

            <Text 
            style={styles.creatorTxt} 
            onPress={async() => await Linking.openURL('https://github.com/leonimeloo')}
            >
                Created by <Text style={{ color: '#167db5' }}>@leonimeloo</Text>
            </Text>
        </View>
    );
}