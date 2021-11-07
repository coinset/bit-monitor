import AsyncRoute from 'preact-async-route'
import Router from 'preact-router'
import DefaultLayout from '@/layouts/default'

const App = (): JSX.Element => {
  return (
    <DefaultLayout>
      <Router>
        <AsyncRoute
          path="/coincheck"
          getComponent={() =>
            import('@/pages/coincheck').then((module) => module.default)
          }
        />

        <AsyncRoute
          path="/"
          default
          getComponent={() =>
            import('@/pages').then((module) => module.default)
          }
        />
      </Router>
    </DefaultLayout>
  )
}

export default App
