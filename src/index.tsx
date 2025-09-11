import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'

import GlobalStyle from '../globalStyle'
import router from './router'

createRoot(document.getElementById('root')!).render(
    <Suspense>
        <GlobalStyle />
        <RouterProvider router={router} />
    </Suspense>
)
