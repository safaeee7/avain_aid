
import { useEffect } from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = ReactRouterDOM.useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
