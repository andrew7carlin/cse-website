import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <SEO
                title="Page Not Found"
                description="The page you're looking for doesn't exist. Return to Canyon State Enterprises homepage."
            />
            <div className={styles.content}>
                <span className={styles.errorCode}>404</span>
                <h1 className={styles.headline}>Page Not Found</h1>
                <p className={styles.description}>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className={styles.actions}>
                    <Link to="/" className={styles.primaryBtn}>
                        Back to Home
                    </Link>
                    <Link to="/contact" className={styles.secondaryBtn}>
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
