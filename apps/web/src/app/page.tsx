import { Footer } from '@/components/Footer/Footer';
import { FeaturedDestinationsContainer } from '@/features/homepage/FeaturedDestinationsContainer';
import { HeroSectionContainer } from '@/features/homepage/HeroSectionContainer';
import { HowItWorks } from '@/features/homepage/HowItWorks';

const Home = () => (
  <div className="min-h-[calc(100vh-72px)]">
    <HeroSectionContainer />
    <HowItWorks />
    <FeaturedDestinationsContainer />
    <Footer />
  </div>
);

export default Home;
