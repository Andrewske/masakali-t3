import styles from './index.module.scss';
import { type NextPage } from 'next';
import Head from 'next/head';

// Components
import Header from '~/components/Header';
import HeroSlideShow from '~/components/HeroSlideShow';
import Availability from '~/components/Availability';
import About from '~/components/About';
import WhyChoose from '~/components/WhyChoose';
import Villas from '~/components/Villas';
import Dining from '~/components/Dining';
import Amenities from '~/components/Amenities';
import Location from '~/components/Location';
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
