import { ReactNode } from 'react';

import Footer from 'components/Footer';
import Head from 'components/Head';
import { Page } from 'styles/index';

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head title={title} />

      <Page>{children}</Page>

      <Footer />
    </>
  );
};

export default Layout;
