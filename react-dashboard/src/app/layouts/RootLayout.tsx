import React, { Suspense, useEffect } from 'react';
import { useAppStore } from '@/store/store';
import { Toaster } from 'react-hot-toast';
import Header from "@/components/Header";
import Main from "@/components/Main";
import Body from "@/components/Body";
import ProductSkeleton from '@/components/ProductSkeleton';

const ControlPanel = React.lazy(() => import('@/features/controlPanel/ControlPanelSection'));
const LiveFeedSection = React.lazy(() => import('@/features/livefeed/LiveFeedSection'));
const PollingDasboard = React.lazy(() => import('@/features/pollingDashboard/PollingDasboard'));

export function RootLayout() {

    const fetchInitialFeed = useAppStore((state) => state.fetchInitialFeed);
    const initializeWebSocket = useAppStore((state) => state.initializeWebSocket);

    useEffect(() => {
        fetchInitialFeed();
        initializeWebSocket();
    }, [fetchInitialFeed, initializeWebSocket]);

    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                    },
                }}
            />
            <Body>
                <Header />
                <Main>
                    <Suspense fallback={<ProductSkeleton />}>
                        <ControlPanel />
                        <LiveFeedSection />
                        <PollingDasboard />
                    </Suspense>
                </Main>
            </Body>
        </>
    )
}