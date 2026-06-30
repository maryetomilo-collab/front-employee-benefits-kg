import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Col, Form, Input, Row, Tag } from 'antd'
import { useSavePartnerRegistrationDraftContactInfo } from '../../api/endpoints/partner-registration/partner-registration'
import type { ContactsFormValues } from './types'
import {
  normalizeEmail,
  normalizeKgPhone,
  validateKgPhone,
  validateOptionalEmail,
  validateRequiredText,
} from './validation'

type ContactsBlockProps = {
  draftId?: string
  onDraftIdChange: (draftId: string) => void
  initialValues?: ContactsFormValues
  initialIsDone?: boolean
}

export function ContactsBlock({
  draftId,
  onDraftIdChange,
  initialValues,
  initialIsDone = false,
}: ContactsBlockProps) {
  const [isDone, setIsDone] = useState(initialIsDone)

  const { control, handleSubmit, reset } = useForm<ContactsFormValues>({
    defaultValues: {
      contactName: '',
      contactPhone: '',
      contactEmail: '',
    },
  })

  const { mutate, isPending } = useSavePartnerRegistrationDraftContactInfo({
    mutation: {
      onSuccess: (response) => {
        if (response.status === 200) {
          setIsDone(true)
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
    }
  }

  const onSubmit = (values: ContactsFormValues) => {
    mutate({
      data: {
        draftId: draftId ?? null,
        contactName: values.contactName.trim(),
        contactPhone: normalizeKgPhone(values.contactPhone),
        contactEmail: normalizeEmail(values.contactEmail),
      },
    })
  }

  return (
    <Card
      title="Контакты партнёра"
      extra={isDone ? <Tag color="success">Сохранено</Tag> : undefined}
      style={{
        borderColor: isDone ? '#52c41a' : undefined,
        textAlign: 'left',
      }}
    >
      <Form layout="vertical" component="div">
        <Row gutter={16}>
          <Col span={12}>
            <Controller
              name="contactName"
              control={control}
              rules={{
                validate: (value) =>
                  validateRequiredText(value, {
                    minLength: 2,
                    maxLength: 100,
                    fieldLabel: 'Контактное лицо',
                  }),
              }}
              render={({ field, fieldState }) => (
                <Form.Item
                  label="Контактное лицо"
                  validateStatus={fieldState.error ? 'error' : undefined}
                  help={fieldState.error?.message}
                >
                  <Input
                    {...field}
                    placeholder="Введите имя контактного лица"
                    onChange={(event) => {
                      resetDoneStatus()
                      field.onChange(event)
                    }}
                  />
                </Form.Item>
              )}
            />
          </Col>

          <Col span={12}>
            <Controller
              name="contactPhone"
              control={control}
              rules={{
                validate: validateKgPhone,
              }}
              render={({ field, fieldState }) => (
                <Form.Item
                  label="Телефон"
                  validateStatus={fieldState.error ? 'error' : undefined}
                  help={fieldState.error?.message}
                >
                  <Input
                    {...field}
                    placeholder="Введите номер в формате +996XXXXXXXXX"
                    onChange={(event) => {
                      resetDoneStatus()
                      field.onChange(event)
                    }}
                  />
                </Form.Item>
              )}
            />
          </Col>

          <Col span={12}>
            <Controller
              name="contactEmail"
              control={control}
              rules={{
                validate: validateOptionalEmail,
              }}
              render={({ field, fieldState }) => (
                <Form.Item
                  label="Email"
                  validateStatus={fieldState.error ? 'error' : undefined}
                  help={fieldState.error?.message}
                >
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Введите email"
                    onChange={(event) => {
                      resetDoneStatus()
                      field.onChange(event)
                    }}
                  />
                </Form.Item>
              )}
            />
          </Col>
        </Row>
      </Form>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" onClick={handleSubmit(onSubmit)} loading={isPending}>
          Готово
        </Button>
      </div>
    </Card>
  )
}
