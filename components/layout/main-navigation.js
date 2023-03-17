import Link from "next/link";
import classes from "./main-navigation.module.css";
import {useSession,signOut} from 'next-auth/client';
import Image from 'next/image';

function MainNavigation() {
  const [session, loading] = useSession()

  console.log('session', {session});
  return (
    <header className={classes.header}>
      <Link  href="/">
        <a>
          <div ><Image src="/j28.png" width={150} height={70} alt="logo"/></div>
        </a>
      </Link>
      <nav>
        <ul>
          {/*!session &&
         <li>
            <Link href="/auth">Login</Link>
          </li>*/}
          

         <li>
            <Link href="/events">
              <a>Cheat Sheets</a>
            </Link>
          </li>
         {/*session &&
          <li>
            <button onClick={() => signOut()}>Logout</button>
        </li>*/}
        </ul>
       
      </nav>
    </header>
  );
}

export default MainNavigation;
