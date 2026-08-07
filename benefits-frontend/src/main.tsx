import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import PartnerPage from './pages/partner/PartnerPage'
import RegistrationPage from './pages/registration/RegistrationPage'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/registration',
    Component: RegistrationPage,
  },
  {
    path: '/partner/:partnerId',
    Component: PartnerPage,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ruRU}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
