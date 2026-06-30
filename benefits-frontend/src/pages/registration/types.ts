import type { PartnerCategory } from '../../api/schemas/partnerCategory'

export type BusinessInfoFormValues = {
  businessName: string
  description?: string
  category?: PartnerCategory
}

export type ContactsFormValues = {
  contactName: string
  contactPhone: string
  contactEmail?: string
}
