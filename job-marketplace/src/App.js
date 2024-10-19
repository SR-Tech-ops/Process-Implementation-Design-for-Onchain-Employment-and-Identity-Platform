import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WagmiConfig, createConfig, useAccount } from 'wagmi';
import { publicProvider } from '@wagmi/core/providers/public'; // Correct import for publicProvider
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, coinbaseWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import Navbar from './Navbar';
import './App.css';
import { configureChains, usePublicClient } from 'wagmi';
import { base, baseGoerli } from 'wagmi/chains'; // Ensure you're using valid chain imports


// Lazy loaded components
const JobListings = lazy(() => import('./pages/JobListings'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const Chat = lazy(() => import('./pages/Chat'));
const Register = lazy(() => import('./components/Register'));
const Verification = lazy(() => import('./components/Verification'));
const PreviousChats = lazy(() => import('./pages/PreviousChats'));
const Home = lazy(() => import('./pages/Home'));
const JobPosting = lazy(() => import('./JobPosting'));
const BiometricTest = lazy(() => import('./components/BiometricTest'));


// Configure chains using createConfig and publicProvider
const { chains, publicClient } = configureChains(
  [base, baseGoerli],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: 'Web3 Job Marketplace' }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { address, isConnected } = useAccount(); // Use wagmi's useAccount hook

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const renderWithRestriction = (Component, props) => {
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <div className="read-only-overlay">
        <p className="overlay-message">
          You are viewing the site in read-only mode. Please log in or sign up to interact.
        </p>
        <Component {...props} readOnly />
      </div>
    );
  };

  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Router>
          <Navbar
            address={address}
            isConnected={isConnected}
          />
          <div className="app-container">
            <h1>Web3 Job Marketplace</h1>

            {/* Lazy loading with suspense */}
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Main Landing Page */}
                <Route path="/" element={<Home />} />

                {/* Registration page */}
                <Route path="/register" element={<Register onLogin={handleLogin} />} />

                {/* Verification (Login) page */}
                <Route path="/verify" element={<Verification onLogin={handleLogin} />} />

                {/* Biometric Test page */}
                <Route path="/biometric-test" element={<BiometricTest />} />

                {/* Job posting page */}
                <Route
                  path="/post-job"
                  element={renderWithRestriction(JobPosting, {})}
                />

                {/* Job Listings page */}
                <Route
                  path="/job-listings"
                  element={renderWithRestriction(JobListings, {})}
                />

                {/* Job details, chat, and previous chats */}
                <Route path="/job/:jobId" element={renderWithRestriction(JobDetails)} />
                <Route path="/chat/:jobId" element={renderWithRestriction(Chat)} />
                <Route path="/previous-chats" element={renderWithRestriction(PreviousChats)} />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
