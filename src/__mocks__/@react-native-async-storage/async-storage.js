jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

export default from '@react-native-async-storage/async-storage/jest/async-storage-mock';
