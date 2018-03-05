jest.mock('NativeModules', () => ({
  RNVectorIconsManager: {
    getImageForFont: jest.fn(),
    loadFontWithFileName: jest.fn()
  },
  RNVectorIconsModule: {
    getImageForFont: jest.fn(),
    loadFontWithFileName: jest.fn()
  }
}));