import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { colors } from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Detail() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.card}>
        {/* Image */}
        <Image
          source={{
            uri: 'https://pic.la.lv/2025/08/kovids.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Category */}
        <Text style={styles.category}>Technology</Text>

        {/* Title */}
        <Text style={styles.title} numberOfLines={3}>
          Mēris atgriežas? Negadījums laboratorijā Sibīrijā izraisa paniku - Pēteris Apinis pasaka,
          vai mums par to jāsatraucas
        </Text>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.description}>
            Las listas de postulantes a suceder a Pablo Milad deben inscribirse hasta este martes de
            cara a las elecciones del 19 de noviembre. La decisión es fundamental ante la entrada en
            vigencia de la ley SADP. Mientras algunos buscan documentos para cumplir con los
            requisitos, otros evalúan incluso la posibilidad de fusionarse.", "content": "Noviembre
            será decisivo para el fútbol chileno. El jueves 19 de ese mes, el Consejo de Presidentes
            de la ANFP elegirá al reemplazante de Pablo Milad en la testera de la asociación. La
            determinación es crucial, por el contexto en que se da: la entrada...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',

    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,

    // Android
    elevation: 4,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  image: {
    width: '100%',
    height: 250,
  },

  content: {
    borderTopWidth: 1,
    marginVertical: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    color: '#222',
  },

  description: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    color: '#222',
  },

  category: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary.orange,
  },
});
