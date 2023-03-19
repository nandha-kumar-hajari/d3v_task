jest.mock('react-native-screens', () => ({
    enableScreens: jest.fn(),
    useScreens: jest.fn(),
    screensEnabled: () => true,
  }));
  