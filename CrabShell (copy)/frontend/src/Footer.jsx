import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './styles/footer.module.css';

const Footer = () => {
  const navigate = useNavigate();

  const navigateTo = React.useCallback((url) => {
    navigate(url);
  }, [navigate]);

  return (
    <div className={styles.footer}>
      <div>Terms and Conditions</div>
      <div>Contact Us</div>
      <div>Help</div>
    </div>
  )
}

Footer.displayName = 'Footer';

export default React.memo(Footer);
