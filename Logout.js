import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Logout() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
