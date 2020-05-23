import Document, { Head, Main, NextScript } from "next/document";
import React from "react";

export default class CustomDocument extends Document {

    render() {
        return (
            <html>
                <Head>

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}