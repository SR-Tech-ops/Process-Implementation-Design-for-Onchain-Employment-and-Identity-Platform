// BiometricTest.js
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { registerUser, verifyUser } from '../utils/biometricUtils';

const BiometricTest = () => {
  const [biometricData, setBiometricData] = useState('');
  const [biometricHash, setBiometricHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  // Simulate capturing biometric data and hashing it
  const handleCapture = () => {
    const simulatedData = "user-fingerprint-or-retina-scan";  // Simulated biometric data
    const hash = CryptoJS.SHA256(simulatedData).toString();
    setBiometricData(simulatedData);
    setBiometricHash(hash);
  };

  const handleRegister = async () => {
    if (biometricHash) {
      await registerUser(biometricHash);
      alert('Biometric data registered on the blockchain.');
    }
  };

  const handleVerify = async () => {
    const isVerified = await verifyUser(biometricHash);
    setVerificationResult(isVerified ? 'Verified' : 'Not Verified');
  };

  return (
    <div>
      <button onClick={handleCapture}>Capture Biometric Data</button>
      {biometricData && <p>Biometric Data: {biometricData}</p>}
      {biometricHash && <p>Biometric Hash: {biometricHash}</p>}
      
      <button onClick={handleRegister}>Register Biometric Data</button>
      <button onClick={handleVerify}>Verify Biometric Data</button>
      
      {verificationResult && <p>Verification Result: {verificationResult}</p>}
    </div>
  );
};

export default BiometricTest;
