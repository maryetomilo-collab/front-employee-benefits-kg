import { Alert, Spin } from 'antd'
import { BusinessInfoBlock } from './BusinessInfoBlock'
import { ContactsBlock } from './ContactsBlock'
import { useRegistrationDraft } from './useRegistrationDraft'

export default function RegistrationPage() {
  const {
    draftId,
    isCompleted,
    draftLoaded,
    initialBusinessInfo,
    initialContacts,
    businessInfoSaved,
    contactsSaved,
    handleDraftIdChange,
  } = useRegistrationDraft()

  if (!draftLoaded) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div style={{ padding: 24, textAlign: 'left' }}>
        <Alert type="info" showIcon message="Ваша регистрация уже завершена" />
      </div>
    )
  }

  return (
    <div style={{ padding: 24, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <BusinessInfoBlock
        draftId={draftId}
        onDraftIdChange={handleDraftIdChange}
        initialValues={initialBusinessInfo}
        initialIsDone={businessInfoSaved}
      />

      <ContactsBlock
        draftId={draftId}
        onDraftIdChange={handleDraftIdChange}
        initialValues={initialContacts}
        initialIsDone={contactsSaved}
      />
    </div>
  )
}
