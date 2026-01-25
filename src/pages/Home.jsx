import Hero from '../components/ui/Hero';
import TradeGrid from '../components/ui/TradeGrid';
import PartnersSection from '../components/ui/PartnersSection';
import Accordion from '../components/ui/Accordion';
import ProjectsShowcase from '../components/ui/ProjectsShowcase';
import SocialSection from '../components/ui/SocialSection';
import QuoteCTA from '../components/ui/QuoteCTA';

// Hero image
import heroImage from '../assets/projects/Aquila Place_ Apache Junction_(2).JPG';

const Home = () => {
    return (
        <div className="home-page">
            <Hero
                headline="One Team, Multiple Trades."
                subheadline=""
                variant="split"
                imageUrl={heroImage}
                primaryCtaText=""
            />

            <TradeGrid />

            <PartnersSection />

            <Accordion />

            <ProjectsShowcase />

            <SocialSection />

            <QuoteCTA />
        </div>
    );
};

export default Home;
