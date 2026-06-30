const DRAFT_ID_STORAGE_KEY = 'partnerRegistrationDraftId'

export function getStoredDraftId(): string | null {
  return localStorage.getItem(DRAFT_ID_STORAGE_KEY)
}

export function setStoredDraftId(draftId: string): void {
  localStorage.setItem(DRAFT_ID_STORAGE_KEY, draftId)
}

export function removeStoredDraftId(): void {
  localStorage.removeItem(DRAFT_ID_STORAGE_KEY)
}
