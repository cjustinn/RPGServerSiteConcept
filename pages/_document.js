import Document, { Html, Head, Main, NextScript } from "next/document";

export default class EjogarDoc extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await (Document.getInitialProps(ctx));

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet"/>
                    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"></link>
                </Head>

                <body className="dark body-bg">
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}