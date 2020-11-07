import { Head as BlitzHead } from 'blitz';

interface Props {
  title?: string;
}

const Head = ({ title }: Props) => (
  <BlitzHead>
    <title>{title || 'Eco Save'}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    <meta name="theme-color" content="#ffffff" />
    <link rel="icon" href="favicon.svg" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <link rel="manifest" href="manifest.json" />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
      rel="stylesheet"
    />
  </BlitzHead>
);

export default Head;
