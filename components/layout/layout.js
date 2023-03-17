import { Fragment } from 'react';

import MainNavigation from './main-navigation';

function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <main className="mt-5">{props.children}</main>
    </Fragment>
  );
}

export default Layout;
