import "./layout.scss";

import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Titillium+Web:200,600"
          rel="stylesheet"
        />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
