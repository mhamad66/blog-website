import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/pages/layouts/layout";
import DashboardLayout from "@/pages/layouts/dashboardLayout";
import { appWithTranslation } from 'next-i18next';


function App({ Component, pageProps, router }: AppProps) {
  if (router.pathname.startsWith("/dashboard")) {
    return (
      <Layout>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </Layout>
    );
  }
  return (
    <Layout >
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(App);
