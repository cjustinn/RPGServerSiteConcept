import NavigationBar from '../components/NavigationBar'
import '../styles/globals.css'

import { Flowbite, DarkThemeToggle } from 'flowbite-react';

function MyApp({ Component, pageProps }) {
  return <Flowbite>
    <NavigationBar/>
    <Component {...pageProps} />
  </Flowbite>
}

export default MyApp
