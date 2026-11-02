import BottomSheet from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';

import { SettingProfileScreenProps } from './SettingProfileScreen';

export default function SettingProfileLogic({ navigation }: SettingProfileScreenProps) {
  const [activePersonal, setActivePersonal] = useState(false);
  const [activePassword, setActivePassword] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePersonalPress = () => {
    setActivePersonal(!activePersonal);
  };

  const handlePasswordPress = () => {
    setActivePassword(!activePassword);
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    const unsubcribe = navigation.addListener('blur', () => {
      handleCloseBottomSheet();
    });

    return unsubcribe;
  }, [navigation]);

  return {
    activePersonal,
    activePassword,
    handlePersonalPress,
    handlePasswordPress,
    handleBack,
    bottomSheetRef,
    handleOpenBottomSheet,
    handleCloseBottomSheet,
  };
}
