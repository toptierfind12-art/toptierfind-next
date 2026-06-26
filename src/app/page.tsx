import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import QuizHub from '@/components/sections/QuizHub';
import ShopCategories from '@/components/sections/ShopCategories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import BlogSection from '@/components/sections/BlogSection';
import Footer from '@/components/ui/Footer';
import PopupSequence from '@/components/ui/PopupSequence';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QuizHub />
      <ShopCategories />
      <FeaturedProducts />
      <BlogSection />
      <Footer />
      <PopupSequence />
    </main>
  );
}
