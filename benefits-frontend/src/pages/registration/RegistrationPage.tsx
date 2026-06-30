import { useState } from 'react'
import { BusinessInfoBlock } from './BusinessInfoBlock'
import { ContactsBlock } from './ContactsBlock'

export default function RegistrationPage() {
  const [draftId, setDraftId] = useState<string>()

  return (
    <div style={{ padding: 24, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <BusinessInfoBlock draftId={draftId} onDraftIdChange={setDraftId} />
      <ContactsBlock draftId={draftId} onDraftIdChange={setDraftId} />
    </div>
  )
}
