import { Button, Card, Typography } from 'antd'
import { useSubmitPartnerRegistrationDraft } from '../../api/endpoints/partner-registration-drafts/partner-registration-drafts'

type SubmitRegistrationBlockProps = {
  draftId?: string
  allBlocksSaved: boolean
  onSubmitted: () => void
  onAlreadySubmitted: () => void
}

export function SubmitRegistrationBlock({
  draftId,
  allBlocksSaved,
  onSubmitted,
  onAlreadySubmitted,
}: SubmitRegistrationBlockProps) {
  const { mutate, isPending } = useSubmitPartnerRegistrationDraft()

  const handleSubmit = () => {
    if (!draftId || !allBlocksSaved) {
      return
    }

    mutate(
      { draftId },
      {
        onSuccess: (response) => {
          if (response.status === 200) {
            onSubmitted()
            return
          }

          if (response.status === 409 || response.data?.status === 'SUBMITTED') {
            onAlreadySubmitted()
          }
        },
      },
    )
  }

  return (
    <Card style={{ textAlign: 'left' }}>
      <Typography.Text>
        {allBlocksSaved ? 'Вся информация сохранена' : 'Сохраните все блоки'}
      </Typography.Text>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Button
          type="primary"
          disabled={!allBlocksSaved || !draftId}
          loading={isPending}
          onClick={handleSubmit}
        >
          Завершить регистрацию
        </Button>
      </div>
    </Card>
  )
}
