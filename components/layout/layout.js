import { Fragment } from 'react';

import MainNavigation from './main-navigation';

function Layout(props) {
  return (
    <div className="container-fluid" style={{marginTop:'7rem',}}>
      <MainNavigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
