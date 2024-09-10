import HeroSection from "../components/HeroSection/HeroSection"
import OurService from "../components/OurService/OurService"
import PricingSection from "../components/Pricing/PricingSection"


const Home = () => {
  return (
    <div className="container mx-auto ">
      <HeroSection />
      <OurService />
      <PricingSection />
    </div>
  )
}

export default Home
