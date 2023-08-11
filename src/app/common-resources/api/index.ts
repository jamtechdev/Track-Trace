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
};
