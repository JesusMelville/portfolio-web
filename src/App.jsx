import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { PortfolioProvider } from './context';
import { PortfolioTemplate } from '@components/templates';

function App() {
    return (
        <PortfolioProvider>
            <PortfolioTemplate />
            <SpeedInsights />
        </PortfolioProvider>
    );
}

export default App;
