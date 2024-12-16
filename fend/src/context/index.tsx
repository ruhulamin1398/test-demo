'use client'

import { config } from '@/config/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { RainbowKitProvider, darkTheme, lightTheme, Theme } from '@rainbow-me/rainbowkit';

const customTheme: Theme = {
  blurs: {
    modalOverlay: 'blur(10px)',
  },
  colors: {
    accentColor: '#4A90E2',
    accentColorForeground: '#FFFFFF',
    actionButtonBorder: '#4A90E2',
    actionButtonBorderMobile: '#4A90E2',
    actionButtonSecondaryBackground: '#2C2F60',
    closeButton: '#FFFFFF',
    closeButtonBackground: '#2C2F60',
    connectButtonBackground: '#1A1D46',
    connectButtonBackgroundError: '#FF4D4D',
    connectButtonInnerBackground: '#FFFFFF',
    connectButtonText: '#FFFFFF',
    connectButtonTextError: '#FFFFFF',
    connectionIndicator: '#4A90E2',
    downloadBottomCardBackground: '#1A1D46',
    downloadTopCardBackground: '#2C2F60',
    error: '#FF4D4D',
    generalBorder: '#4A90E2',
    generalBorderDim: '#2C2F60',
    menuItemBackground: '#1A1D46',
    modalBackdrop: 'rgba(0, 0, 0, 0.7)',
    modalBackground: '#1A1D46',
    modalBorder: '#4A90E2',
    modalText: '#FFFFFF',
    modalTextDim: '#A3A8C3',
    modalTextSecondary: '#A3A8C3',
    profileAction: '#4A90E2',
    profileActionHover: '#2C2F60',
    profileForeground: '#1A1D46',
    selectedOptionBorder: '#4A90E2',
    standby: '#FFA500',
  },
  fonts: {
    body: 'Arial, sans-serif',
  },
  radii: {
    actionButton: '12px',
    connectButton: '12px',
    menuButton: '8px',
    modal: '16px',
    modalMobile: '16px',
  },
  shadows: {
    connectButton: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    dialog: '0px 4px 16px rgba(0, 0, 0, 0.3)',
    profileDetailsAction: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    selectedOption: '0px 0px 0px 2px #4A90E2',
    selectedWallet: '0px 0px 0px 2px #4A90E2',
    walletLogo: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
};



const queryClient = new QueryClient()

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(config as Config, cookies)

  return (
    <WagmiProvider config={config as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={customTheme}
          modalSize="compact">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
