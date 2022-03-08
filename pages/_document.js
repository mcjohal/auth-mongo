import Document, {Html, Head, Main, NextScript} from 'next/document';
//This head component is different and should only be used in this document.


class MyDocument extends Document{
    render(){
        return (
          <Html lang="en">
            <Head>
         
             
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
    }
}

export default MyDocument;