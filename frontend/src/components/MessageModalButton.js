import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/Action/modalAction';
import styles from '../style/cssmodule/components/Header.module.css';
const MessageModalButton = () => {
  const dispatch = useDispatch();

  const handleMessageClick = () => {
    dispatch(openModal());
  };

  return (
      <Link to="#" onClick={handleMessageClick} className={styles.navLink}>
        메시지
      </Link>
  );
};

export default MessageModalButton;
