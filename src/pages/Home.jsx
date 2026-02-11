import Hero from '../components/ui/Hero';
import TradeGrid from '../components/ui/TradeGrid';
import PartnersSection from '../components/ui/PartnersSection';
import Accordion from '../components/ui/Accordion';
import ProjectsShowcase from '../components/ui/ProjectsShowcase';
import SafetyStats from '../components/ui/SafetyStats';
import SocialSection from '../components/ui/SocialSection';
import QuoteCTA from '../components/ui/QuoteCTA';
import SEO from '../components/common/SEO';
import { LOBBY_VIDEO_URL, LOBBY_VIDEO_MOBILE_URL, IS_YOUTUBE } from '../constants/media';

const Home = () => {
    return (
        <div className="home-page">
            <SEO
                title="Canyon State Enterprises"
                description="Arizona's trusted multi-trade construction company. Roofing, stucco, HVAC, plumbing, masonry and more across Arizona, Nevada, and the Southwest."
            />
            <Hero
                headline="One Team, Multiple Trades."
                subheadline=""
                variant="video"
                videoUrl={LOBBY_VIDEO_URL}
                mobileVideoUrl={LOBBY_VIDEO_MOBILE_URL}
                isYouTube={IS_YOUTUBE}
                primaryCtaText=""
            />

            <TradeGrid />

            <PartnersSection />

            <Accordion />

            <ProjectsShowcase />

            <SafetyStats />

            <SocialSection />

            <QuoteCTA />
        </div>
    );
};

export default Home;
