import { ReactNode } from 'react';

import Head from 'components/Head';

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head title={title} />

      {children}
    </>
  );
};

export default Layout;
