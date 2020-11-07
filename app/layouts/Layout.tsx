import { ReactNode } from 'react';

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
    </>
  );
};

export default Layout;
