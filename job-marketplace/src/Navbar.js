import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit'; // Import ConnectButton
import './Navbar.css';

function Navbar({ address, isConnected }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Job Marketplace</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/job-listings">Job Listings</Link></li>
        <li><Link to="/post-job">Post Job</Link></li>
        <li><Link to="/chat/1">Chats</Link></li>
        <li><Link to="/previous-chats">Previous Chats</Link></li>
        <li><Link to="/verify">Login</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
        <li><Link to="/biometric-test">Biometric Test</Link></li>
      </ul>

      {/* Wallet connection */}
      <div className="wallet-connect">
        {isConnected ? (
          <p>Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
        ) : (
          <ConnectButton />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
