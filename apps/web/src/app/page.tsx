import { Footer } from '@/components/Footer/Footer';
import { FeaturedDestinationsContainer } from '@/features/homepage/FeaturedDestinationsContainer';
import { HeroSectionContainer } from '@/features/homepage/HeroSectionContainer';
import { HowItWorks } from '@/features/homepage/HowItWorks';
import { ProductBenefits } from '@/features/homepage/ProductBenefits';

export const revalidate = 60;

const Home = () => (
  <main>
    <HeroSectionContainer />
    <ProductBenefits />
    <HowItWorks />
    <FeaturedDestinationsContainer />
    <Footer />
  </main>
);

export default Home;
