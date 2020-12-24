import App from './App.svelte'
import 'bootswatch/dist/cosmo/bootstrap.min.css'

const app = new App({
  target: document.body,
  hydrate: true,
})

export default app
