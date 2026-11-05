import { useCallback } from 'react';
import { SCREENS } from '../../../navigation/SCREENS';
import { AddressProfileScreensProps } from './AddressProfileScreen';
import { AddressItem, useAddressStore } from '../../../store/profile/address.store';

export default function AddressProfileLogic({ route, navigation }: AddressProfileScreensProps) {
  const addressList = useAddressStore((state) => state.addressList);

  const handleBack = () => {
    if (route.params?.fromCheckout) {
      console.log(navigation.getState());
      console.log(navigation.getParent()?.getState());
      console.log(navigation.getParent()?.getParent()?.getState());
      navigation.getParent()?.getParent()?.goBack();
      return;
    }
    navigation.goBack();
  };

  const handleNavigateToAddAddress = useCallback(() => {
    navigation.navigate(SCREENS.PROFILE_ADDRESS_ADD);
  }, [navigation]);

  const handleNavigateToUpdateAddress = useCallback(
    (item: AddressItem) => {
      navigation.navigate(SCREENS.PROFILE_ADDRESS_UPDATE, {
        item,
      });
    },
    [navigation],
  );

  return {
    handleBack,
    handleNavigateToAddAddress,
    handleNavigateToUpdateAddress,
    addressList,
  };
}
