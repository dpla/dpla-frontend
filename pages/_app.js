import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import {gaTrackingId} from "constants/env";

import 'stylesheets/reset.scss'
import 'stylesheets/global.scss'

const App = ({ Component, pageProps }) => {
    // const router = useRouter()
    // useEffect(() => {
    //     const handleRouteChange = (url) => {
    //         gtag.pageview(url)
    //     }
    //     router.events.on('routeChangeComplete', handleRouteChange)
    //     return () => {
    //         router.events.off('routeChangeComplete', handleRouteChange)
    //     }
    // }, [router.events])

    function gaLoad() {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', gaTrackingId, {
            page_path: window.location.pathname
        });

    }

    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
                onLoad={
                    () => gaLoad()
                }
            />
            <Component {...pageProps} />
        </>
    )
}

export default App