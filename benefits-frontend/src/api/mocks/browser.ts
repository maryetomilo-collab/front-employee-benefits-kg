import { setupWorker } from 'msw/browser'
import {
  getPartnerOffersMock,
  getPartnerRegistrationDraftsMock,
  getPartnerRegistrationMock,
  getPartnersMock,
} from '../endpoints/index.msw'

export const worker = setupWorker(
  ...getPartnerOffersMock(),
  ...getPartnerRegistrationMock(),
  ...getPartnerRegistrationDraftsMock(),
  ...getPartnersMock(),
)
