import styles from './index.module.scss';
import { type NextPage } from 'next';
import Head from 'next/head';

// Components
import Header from '~/components/Header';
import HeroSlideShow from '~/components/HomePage/HeroSlideShow';
import Availability from '~/components/HomePage/Availability';
import About from '~/components/HomePage/About';
import WhyChoose from '~/components/HomePage/WhyChoose';
import Villas from '~/components/HomePage/Villas';
import Dining from '~/components/HomePage/Dining';
import Amenities from '~/components/HomePage/Amenities';
import Location from '~/components/HomePage/Location';
import Footer from '~/components/Footer';

const Home: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <Head>
        <title>Masakali Retreat</title>
        <meta
          name="description"
          content="masakali retreat rewrite with nextjs"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className={styles.main}>
        <Header />
        <HeroSlideShow />
        <Availability />
        <About />
        <WhyChoose />
        <Villas />
        <Dining />
        <Amenities />
        <Location />
        <Footer />
      </main>
    </>
  );
};

export default Home;
