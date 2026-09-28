import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';

export default function Hello() {
  const isLogined = true;

  const [name, setName] = useState('');

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ margin: 'auto' }}>
          <Text style={{ fontSize: 20, fontStyle: 'italic' }}>
            {isLogined ? 'Welcome, Hello world' : 'Please login'}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}
        >
          <Text> Some Text </Text>

          <View style={{ flexDirection: 'row' }}>
            <Text> Some more text </Text>

            <Image
              source={{ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </View>

        {name && <Text> {name} </Text>}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 5,
            margin: 20,
          }}
        >
          <TextInput
            style={{
              padding: 10,
              fontSize: 20,
              borderWidth: 1,
              flex: 1,
              borderColor: 'red',
            }}
            placeholder="Enter the test"
            value={name}
            onChange={event => setName(event.nativeEvent.text)}
          />

          <Pressable
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'green',
            }}
          >
            <Text style={{ color: 'white', padding: 5 }}>Add</Text>
          </Pressable>
        </View>

        <View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                backgroundColor: 'blue',
                width: 50,
                height: 50,
                flex: 1,
              }}
            ></View>

            <View
              style={{
                backgroundColor: 'red',
                width: 100,
                height: 100,
                flex: 2,
              }}
            ></View>

            <View
              style={{
                backgroundColor: 'yellow',
                width: 150,
                height: 150,
                flex: 3,
              }}
            ></View>
          </View>

          <View
            style={{ backgroundColor: 'gray', width: 150, height: 150 }}
          ></View>

          <View
            style={{ backgroundColor: 'red', width: 150, height: 150 }}
          ></View>

          <View
            style={{ backgroundColor: 'green', width: 150, height: 150 }}
          ></View>

          <View
            style={{ backgroundColor: 'yellow', width: 150, height: 150 }}
          ></View>

          <View
            style={{ backgroundColor: 'yellow', width: 150, height: 150 }}
          ></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
