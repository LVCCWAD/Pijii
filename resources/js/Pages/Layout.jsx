import { Link } from '@inertiajs/react';
import '../../css/app.css';

export default function Layout({children}){
    return <>
        <header>
            <nav className="header-content justify-between flex ">
                <Link href="/" class="header-content text-white" >home</Link>
                
                <Link href="/Dashboard"  class="header-content text-white">create</Link>
                
            </nav>
        </header>

        <main>
            {children}
        </main>

        </>

}
