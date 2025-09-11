import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const HelloWorld = lazy(() => import('@view/helloworld'))

const router = createBrowserRouter([
    { path: '/', element: <HelloWorld /> }
])

export default router
