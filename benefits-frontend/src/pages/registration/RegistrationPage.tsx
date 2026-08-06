import { Alert, Spin } from 'antd'
import { BusinessInfoBlock } from './BusinessInfoBlock'
import { ContactsBlock } from './ContactsBlock'
import { SubmitRegistrationBlock } from './SubmitRegistrationBlock'
import { useRegistrationDraft } from './useRegistrationDraft'

export default function RegistrationPage() {
  const {
    draftId,
    isAlreadySubmitted,
    isSubmitted,
    draftLoaded,
    initialBusinessInfo,
    initialContacts,
    businessInfoSaved,
    contactsSaved,
    allBlocksSaved,
    handleDraftIdChange,
    setBusinessInfoSaved,
    setContactsSaved,
    markAsSubmitted,
    markAsAlreadySubmitted,
  } = useRegistrationDraft()

  if (!draftLoaded) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div style={{ padding: 24, textAlign: 'left' }}>
        <Alert type="success" showIcon message="Заявка на регистрацию отправлена" />
      </div>
    )
  }

  if (isAlreadySubmitted) {
    return (
      <div style={{ padding: 24, textAlign: 'left' }}>
        <Alert type="info" showIcon message="Заявка на регистрацию уже была отправлена" />
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
        onSavedChange={setBusinessInfoSaved}
      />

      <ContactsBlock
        draftId={draftId}
        onDraftIdChange={handleDraftIdChange}
        initialValues={initialContacts}
        initialIsDone={contactsSaved}
        onSavedChange={setContactsSaved}
      />

      <SubmitRegistrationBlock
        draftId={draftId}
        allBlocksSaved={allBlocksSaved}
        onSubmitted={markAsSubmitted}
        onAlreadySubmitted={markAsAlreadySubmitted}
      />
    </div>
  )
}
