import React from 'react';
import DefaultLayout from "../components/layouts/default";
import { NextComponentType, NextPageContext } from 'next'

export type AppProps = {
    pageProps: any
    Component: NextComponentType<NextPageContext, any, {}> & { layoutProps: any }
}

export default function MyApp({ Component, pageProps }: AppProps) {
    const Layout = Component.layoutProps?.Layout || DefaultLayout;

    return (
        <Layout>
            <Component { ...pageProps } />
        </Layout>
    )
}