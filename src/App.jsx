import React from 'react';
import { PortfolioProvider } from './context';
import { PortfolioTemplate } from '@components/templates';

function App() {
    return (
        <PortfolioProvider>
            <PortfolioTemplate />
        </PortfolioProvider>
    );
}

export default App;
