import { View, Text, Image, Pressable, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const BASE_IMAGE_URL = 'https://reactnative.dev/docs/assets';

function Cat({ name, imageSrc }) {
  console.log({ name, imageSrc });

  const [isHungry, setIsHungry] = useState(true);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ flexDirection: 'row' }}>
        Cat 1<Text> Cat 2 </Text>
        <Text> Cat 3 </Text>
      </Text>

      <View>
        <Text style={{ fontSize: 20, color: 'red' }}>
          Hello, I am {name} {isHungry ? 'hungry' : 'full'}
        </Text>

        <Button
          disabled={!isHungry}
          title={isHungry ? 'Give me some food, please' : 'Thank you'}
          onPress={() => setIsHungry(!isHungry)}
        />
      </View>

      {imageSrc && (
        <Image
          source={{
            uri: `${BASE_IMAGE_URL}/${imageSrc}`,
          }}
          style={{ width: 100, height: 100 }}
        />
      )}
    </View>
  );
}

export default function Cafe() {
  return (
    <SafeAreaView>
      <Text style={{ textAlign: 'center', fontSize: 30 }}>Cafe</Text>

      <Cat name="maria" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
      <Cat imageSrc="p_cat1.png" />
    </SafeAreaView>
  );
}
