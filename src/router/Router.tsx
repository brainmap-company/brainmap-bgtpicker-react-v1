import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const Main = lazy(() => import('@view/main/index'))

function Router() {
    return createBrowserRouter([
        {
            path: '/',
            element: <Main />
        }
    ])
}

export default Router
