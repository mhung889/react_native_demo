import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PizzaTranslator() {
  const [translate, setTranslate] = useState('');

  console.log(translate);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View>
        <Text style={{ fontSize: 30 }}>PizzaTranslator</Text>
      </View>

      <View style={{ marginBlock: 50, borderWidth: 1 }}>
        <TextInput
          style={{ width: 300 }}
          placeholder="Type here to translate"
          value={translate}
          onChangeText={setTranslate}
        />
      </View>

      <View style={{ width: 300, flexDirection: 'row', flexWrap: 'wrap' }}>
        {translate
          .split(' ')
          .map(tran => tran && <Text style={{ width: 60 }}> 🍕 </Text>)}
      </View>
    </SafeAreaView>
  );
}
