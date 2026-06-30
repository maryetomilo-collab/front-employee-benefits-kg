import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form, Input, Select, Tag } from 'antd'
import { useSavePartnerRegistrationDraftBusinessInfo } from '../../api/endpoints/partner-registration/partner-registration'
import type { PartnerCategory } from '../../api/schemas/partnerCategory'
import { categoryOptions } from './constants'
import {
  normalizeOptionalText,
  validateOptionalText,
  validateRequiredText,
} from './validation'

type BusinessInfoFormValues = {
  businessName: string
  description?: string
  category?: PartnerCategory
}

type BusinessInfoBlockProps = {
  draftId?: string
  onDraftIdChange: (draftId: string) => void
}

export function BusinessInfoBlock({ draftId, onDraftIdChange }: BusinessInfoBlockProps) {
  const [isDone, setIsDone] = useState(false)

  const { control, handleSubmit } = useForm<BusinessInfoFormValues>({
    defaultValues: {
      businessName: '',
      description: '',
    },
  })

  const { mutate, isPending } = useSavePartnerRegistrationDraftBusinessInfo({
    mutation: {
      onSuccess: (response) => {
        setIsDone(true)
        onDraftIdChange(response.data.draftId)
      },
    },
  })

  const resetDoneStatus = () => {
    if (isDone) {
      setIsDone(false)
    }
  }

  const onSubmit = (values: BusinessInfoFormValues) => {
    if (!values.category) {
      return
    }

    mutate({
      data: {
        draftId: draftId ?? null,
        businessName: values.businessName.trim(),
        description: normalizeOptionalText(values.description),
        category: values.category,
      },
    })
  }

  return (
    <Card
      title="Информация о бизнесе"
      extra={isDone ? <Tag color="success">Сохранено</Tag> : undefined}
      style={{
        borderColor: isDone ? '#52c41a' : undefined,
        textAlign: 'left',
      }}
    >
      <Form layout="vertical" component="div">
        <Controller
          name="businessName"
          control={control}
          rules={{
            validate: (value) =>
              validateRequiredText(value, {
                minLength: 2,
                maxLength: 100,
                fieldLabel: 'Название бизнеса',
              }),
          }}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Название бизнеса"
              validateStatus={fieldState.error ? 'error' : undefined}
              help={fieldState.error?.message}
            >
              <Input
                {...field}
                placeholder="Введите название бизнеса"
                onChange={(event) => {
                  resetDoneStatus()
                  field.onChange(event)
                }}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            validate: (value) => validateOptionalText(value, 1000),
          }}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Описание"
              validateStatus={fieldState.error ? 'error' : undefined}
              help={fieldState.error?.message}
            >
              <Input.TextArea
                {...field}
                rows={3}
                value={field.value ?? ''}
                placeholder="Кратко опишите ваш бизнес"
                onChange={(event) => {
                  resetDoneStatus()
                  field.onChange(event)
                }}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: 'Выберите категорию' }}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Категория"
              validateStatus={fieldState.error ? 'error' : undefined}
              help={fieldState.error?.message}
            >
              <Select
                {...field}
                options={categoryOptions}
                placeholder="Выберите категорию"
                onChange={(value) => {
                  resetDoneStatus()
                  field.onChange(value)
                }}
              />
            </Form.Item>
          )}
        />
      </Form>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" onClick={handleSubmit(onSubmit)} loading={isPending}>
          Готово
        </Button>
      </div>
    </Card>
  )
}
