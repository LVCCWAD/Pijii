import './bootstrap';
import { UserProvider } from './Pages/UserContext';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client';


createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) 
  { 
      const initialUser = props.initialPage.props.auth?.user;

     ReactDOM.createRoot(el).render(
      <UserProvider initialUser={initialUser}>
      <MantineProvider withNormalizeCSS withGlobalStyles >
         <App {...props} />
     </MantineProvider>
      </UserProvider>
)
  },
})


