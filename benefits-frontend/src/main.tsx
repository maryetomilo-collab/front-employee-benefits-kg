import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import PartnerLayout from './app/router/PartnerLayout'
import CreateOfferPage from './pages/create-offer'
import PartnerOfferPage from './pages/partner-offer'
import PartnerOffersPage from './pages/partner-offers'
import PartnerPage from './pages/partner'
import RegistrationPage from './pages/registration'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/registration',
    Component: RegistrationPage,
  },
  {
    Component: PartnerLayout,
    children: [
      {
        path: '/partner/:partnerId',
        Component: PartnerPage,
      },
      {
        path: '/partner/offers',
        Component: PartnerOffersPage,
      },
      {
        path: '/partner/offers/new',
        Component: CreateOfferPage,
      },
      {
        path: '/partner/offers/:offersId',
        Component: PartnerOfferPage,
      },
    ],
  },
])

async function startApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./api/mocks/browser')

    await worker.start({
      onUnhandledRequest: 'error',
    })
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider locale={ruRU}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

void startApp()
