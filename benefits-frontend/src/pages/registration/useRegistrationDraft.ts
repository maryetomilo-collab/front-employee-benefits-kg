import { useCallback, useEffect, useState } from 'react'
import { useGetPartnerRegistrationDraft } from '../../api/endpoints/partner-registration/partner-registration'
import { PartnerRegistrationStep } from '../../api/schemas/partnerRegistrationStep'
import { getStoredDraftId, removeStoredDraftId, setStoredDraftId } from './draftStorage'
import type { BusinessInfoFormValues, ContactsFormValues } from './types'

type RegistrationDraftState = {
  draftId?: string
  isAlreadySubmitted: boolean
  isSubmitted: boolean
  draftLoaded: boolean
  initialBusinessInfo?: BusinessInfoFormValues
  initialContacts?: ContactsFormValues
  businessInfoSaved: boolean
  contactsSaved: boolean
  allBlocksSaved: boolean
  handleDraftIdChange: (draftId: string) => void
  setBusinessInfoSaved: (saved: boolean) => void
  setContactsSaved: (saved: boolean) => void
  markAsSubmitted: () => void
  markAsAlreadySubmitted: () => void
}

export function useRegistrationDraft(): RegistrationDraftState {
  const [storedDraftId] = useState(() => getStoredDraftId())
  const [draftId, setDraftId] = useState<string>()
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [initialBusinessInfo, setInitialBusinessInfo] = useState<BusinessInfoFormValues>()
  const [initialContacts, setInitialContacts] = useState<ContactsFormValues>()
  const [businessInfoSaved, setBusinessInfoSaved] = useState(false)
  const [contactsSaved, setContactsSaved] = useState(false)
  const [draftLoaded, setDraftLoaded] = useState(!storedDraftId)

  const draftQuery = useGetPartnerRegistrationDraft(storedDraftId ?? '', {
    query: {
      enabled: Boolean(storedDraftId),
      retry: false,
    },
  })

  useEffect(() => {
    if (!storedDraftId) {
      return
    }

    if (draftQuery.isLoading) {
      return
    }

    if (draftQuery.isError || !draftQuery.data || draftQuery.data.status !== 200) {
      removeStoredDraftId()
      setDraftLoaded(true)
      return
    }

    const draft = draftQuery.data.data

    if (draft.status !== 'DRAFT') {
      setIsAlreadySubmitted(true)
      setDraftLoaded(true)
      return
    }

    setDraftId(draft.draftId)
    setStoredDraftId(draft.draftId)

    if (draft.businessInfo) {
      setInitialBusinessInfo({
        businessName: draft.businessInfo.businessName ?? '',
        description: draft.businessInfo.description ?? '',
        category: draft.businessInfo.category,
      })
      setBusinessInfoSaved(
        draft.completedSteps.includes(PartnerRegistrationStep.BUSINESS_INFO),
      )
    }

    if (draft.contacts) {
      setInitialContacts({
        contactName: draft.contacts.contactName ?? '',
        contactPhone: draft.contacts.contactPhone ?? '',
        contactEmail: draft.contacts.contactEmail ?? '',
      })
      setContactsSaved(draft.completedSteps.includes(PartnerRegistrationStep.CONTACTS))
    }

    setDraftLoaded(true)
  }, [storedDraftId, draftQuery.isLoading, draftQuery.isError, draftQuery.data])

  const handleDraftIdChange = useCallback((id: string) => {
    setDraftId(id)
    setStoredDraftId(id)
  }, [])

  const markAsSubmitted = useCallback(() => {
    setIsSubmitted(true)
    removeStoredDraftId()
  }, [])

  const markAsAlreadySubmitted = useCallback(() => {
    setIsAlreadySubmitted(true)
    removeStoredDraftId()
  }, [])

  return {
    draftId,
    isAlreadySubmitted,
    isSubmitted,
    draftLoaded,
    initialBusinessInfo,
    initialContacts,
    businessInfoSaved,
    contactsSaved,
    allBlocksSaved: businessInfoSaved && contactsSaved,
    handleDraftIdChange,
    setBusinessInfoSaved,
    setContactsSaved,
    markAsSubmitted,
    markAsAlreadySubmitted,
  }
}
