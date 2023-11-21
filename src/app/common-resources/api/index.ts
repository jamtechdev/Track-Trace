export const apiUrls = {
  authApi: {
    login: 'auth/signIn',
    signUp: 'auth/signUp',
    sendOtp: 'auth/send-and-verify-otp',
    changePassword: 'auth/change-password',
  },

  scanningApi: {
    chechisScan: 'scanner/chassis',
    RAW: 'scanner/raw-material',
    boxScanner: 'scanner/scan-packing',
    steps: 'scanner/product-component-details',
    validateChassis: 'scanner/validate-chassis',
    skipStep: 'scanner/skip-component-details',
  },
  productApi: 'product/get-all-product',
  getProductModel: 'product/get-model-number?product_name=',
  componentApi: 'product/get-specific-product-component',
  isScannedComponent: 'product/is-component-scanned',
  getBarCode : 'product/barcode-serial-no?product_uid='
};
