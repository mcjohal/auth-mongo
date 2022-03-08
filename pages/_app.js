import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { useEffect } from 'react';
import { Provider as NextAuthProvider} from "next-auth/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle');
    import("jquery");
    
    //added the line below so that tooltip works
    window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle');
    
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }, []);


  return (
    <NextAuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    
    </NextAuthProvider>
  );
}

export default MyApp;