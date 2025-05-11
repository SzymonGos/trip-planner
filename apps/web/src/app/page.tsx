import { Footer } from '@/components/Footer/Footer';
import { FeaturedDestinationsContainer } from '@/features/homepage/FeaturedDestinationsContainer';
import { HeroSection } from '@/features/homepage/HeroSection';
import { HowItWorks } from '@/features/homepage/HowItWorks';

const Home = () => (
  <div className="min-h-[calc(100vh-72px)]">
    <HeroSection />
    <HowItWorks />
    <FeaturedDestinationsContainer />
    <Footer />
  </div>
);

export default Home;
