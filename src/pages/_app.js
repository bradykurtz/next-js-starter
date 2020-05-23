import React from 'react';
import App from 'next/app';
import DefaultLayout from "../components/layouts/default";

export default class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    getLayout(Component) {
        return Component.Layout || DefaultLayout;
    }

    render() {
        const { Component, pageProps } = this.props;
        const Layout = this.getLayout(Component);

        return (
            <Layout>
                <Component { ...pageProps } />
            </Layout>
        )
    }
}