import Link from "next/link";
import classes from "./main-navigation.module.css";
import {useSession,signOut} from 'next-auth/client';

function MainNavigation() {
  const [session, loading] = useSession()

  console.log('session', {session});
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session &&
          <li>
            <Link href="/auth">Login</Link>
          </li> }
          <li>
            <Link href="/profile">Profile</Link>
          </li>

          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
         {session &&
          <li>
            <button onClick={() => signOut()}>Logout</button>
          </li>}
        </ul>
       
      </nav>
    </header>
  );
}

export default MainNavigation;
