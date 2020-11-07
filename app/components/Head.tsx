import { Head as BlitzHead } from 'blitz';

interface Props {
  title?: string;
}

const Head = ({ title }: Props) => (
  <BlitzHead>
    <title>{title || 'Timon kartta appis'}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
      rel="stylesheet"
    />
  </BlitzHead>
);

export default Head;
