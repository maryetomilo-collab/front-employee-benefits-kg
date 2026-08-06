import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form, Input, Select, Tag } from 'antd'
import { useSavePartnerRegistrationDraftBusinessInfo } from '../../api/endpoints/partner-registration/partner-registration'
import { categoryOptions } from './constants'
import type { BusinessInfoFormValues } from './types'
import {
  normalizeOptionalText,
  validateOptionalText,
  validateRequiredText,
} from './validation'

type BusinessInfoBlockProps = {
  draftId?: string
  onDraftIdChange: (draftId: string) => void
  initialValues?: BusinessInfoFormValues
  initialIsDone?: boolean
  onSavedChange?: (saved: boolean) => void
}

export function BusinessInfoBlock({
  draftId,
  onDraftIdChange,
  initialValues,
  initialIsDone = false,
  onSavedChange,
}: BusinessInfoBlockProps) {
  const [isDone, setIsDone] = useState(initialIsDone)

  const { control, handleSubmit, reset } = useForm<BusinessInfoFormValues>({
    defaultValues: {
      businessName: '',
      description: '',
    },
  })

  const { mutate, isPending } = useSavePartnerRegistrationDraftBusinessInfo({
    mutation: {
      onSuccess: (response) => {
        if (response.status === 200) {
          setIsDone(true)
          onSavedChange?.(true)
          onDraftIdChange(response.data.draftId)
        }
      },
    },
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  useEffect(() => {
    setIsDone(initialIsDone)
  }, [initialIsDone])

  const resetDoneStatus = () => {
    if (isDone) {
      setIsDone(false)
      onSavedChange?.(false)
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
