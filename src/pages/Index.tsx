import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedWorkers from "@/components/FeaturedWorkers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServiceCategories />
      <FeaturedWorkers />
      <Footer />
    </div>
  );
};

export default Index;
