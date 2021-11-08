import { render } from 'preact'

import App from '@/app'
// eslint-disable-next-line import/no-unresolved
import 'uno.css'
import '@unocss/reset/tailwind.css'

render(<App />, document.getElementById('app')!)
