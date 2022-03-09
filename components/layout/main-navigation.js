import Link from "next/link";
import {useSession,signOut} from 'next-auth/client';

function MainNavigation() {
  const [session, loading] = useSession()

  console.log('session', {session});
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link  href="/"><a className="navbar-brand">Auth Mongo</a></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link aria-current="page" href="/"><a  className="nav-link active">Home</a></Link>
          </li>
          {!session &&
          <li className="nav-item">
            <Link href="/login"><a className="nav-link">Login</a></Link>
          </li>
           }
           <li className="nav-item">
            <Link  href="/events"><a className="nav-link">Events</a></Link>
          </li>
          {session &&
          <li className="nav-item">
            <button className="nav-link" onClick={() => signOut()}>Logout</button>
          </li>
           }
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          
        </ul>
        
      </div>
    </div>
  </nav>
  );
}

export default MainNavigation;
