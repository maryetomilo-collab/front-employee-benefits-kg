import { setupWorker } from 'msw/browser'
import {
  getPartnerRegistrationDraftsMock,
  getPartnerRegistrationMock,
  getPartnersMock,
} from '../endpoints/index.msw'

export const worker = setupWorker(
  ...getPartnerRegistrationMock(),
  ...getPartnerRegistrationDraftsMock(),
  ...getPartnersMock(),
)
