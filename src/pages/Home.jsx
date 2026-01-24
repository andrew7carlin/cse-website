import Hero from '../components/ui/Hero';
import TradeGrid from '../components/ui/TradeGrid';
import Accordion from '../components/ui/Accordion';
import PortfolioCarousel from '../components/ui/PortfolioCarousel';
import ContactForm from '../components/ui/ContactForm';
import { LOBBY_VIDEO_URL } from '../constants/media';

const Home = () => {
    return (
        <div className="home-page">
            <Hero
                headline="One Team, Multiple Trades."
                subheadline="Expertise. Experience. Small town, big aspirations."
                variant="video"
                videoUrl={LOBBY_VIDEO_URL}
            />

            <TradeGrid />

            <Accordion />

            <PortfolioCarousel />

            <ContactForm />
        </div>
    );
};

export default Home;
