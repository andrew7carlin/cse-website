import Hero from '../components/ui/Hero';
import TradeGrid from '../components/ui/TradeGrid';
import Accordion from '../components/ui/Accordion';
import PortfolioCarousel from '../components/ui/PortfolioCarousel';
import SocialSection from '../components/ui/SocialSection';
import ContactForm from '../components/ui/ContactForm';
import { LOBBY_VIDEO_URL, IS_YOUTUBE } from '../constants/media';

const Home = () => {
    return (
        <div className="home-page">
            <Hero
                headline="One Team, Multiple Trades."
                subheadline="Expertise. Experience. Small town, big aspirations."
                variant="video"
                videoUrl={LOBBY_VIDEO_URL}
                isYouTube={IS_YOUTUBE}
            />

            <TradeGrid />

            <Accordion />

            <PortfolioCarousel />

            <SocialSection />

            <ContactForm />
        </div>
    );
};

export default Home;
