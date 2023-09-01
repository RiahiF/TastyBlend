import '@styles/globals.css'
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Head from 'next/head';
export const metadata = {
  title: "KitchenFolio",
  description: "Discover a world of mouthwatering recipes on KitchenFolio. Join our culinary community to explore, create, and share delicious dishes!",
  siteUrl: "https://kitchen-folio-icav7pkth-riahif.vercel.app", // Replace with your site URL
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
