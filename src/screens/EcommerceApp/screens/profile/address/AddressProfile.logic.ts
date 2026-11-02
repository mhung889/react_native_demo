import { useCallback } from 'react';
import { SCREENS } from '../../../navigation/SCREENS';
import { AddressProfileScreensProps } from './AddressProfileScreen';
import { AddressItem, useAddressStore } from '../../../store/profile/address.store';

export default function AddressProfileLogic({ navigation }: AddressProfileScreensProps) {
  const addressList = useAddressStore((state) => state.addressList);

  const handleBack = () => {
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
