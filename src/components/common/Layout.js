import Head from 'next/head';

export default function Layout({ children, title = 'Expense Manager' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="আপনার খরচের হিসাব রাখুন" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}