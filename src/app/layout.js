import '@styles/globals.css'
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "KitchenFolio",
  description: "Explore, create & share mouthwatering recipes on our platform. Join now & savor the joy of cooking!",
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
