import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col mt-10'>
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Hundreds of Delicious Recipes</span>
    </h1>
    <p className='desc text-center'>
   Dive into a world of exquisite flavors and innovative recipes that will ignite your culinary creativity.
    Explore a diverse collection of dishes, from time-honored classics to cutting-edge creations.
    </p>
    <Feed />
  </section>
);

export default Home;
