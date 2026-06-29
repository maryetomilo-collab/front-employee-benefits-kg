import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form, Input, Select, Tag } from 'antd'
import { useCreatePartnerRegistrationDraftWithBusinessInfo } from '../../api/endpoints/partner-registration/partner-registration'
import type { CreatePartnerRegistrationDraftBusinessInfoRequest } from '../../api/schemas/createPartnerRegistrationDraftBusinessInfoRequest'
import { categoryOptions } from './constants'

export function BusinessInfoBlock() {
  const [isDone, setIsDone] = useState(false)

  const { control, handleSubmit } = useForm<CreatePartnerRegistrationDraftBusinessInfoRequest>({
    defaultValues: {
      businessName: '',
      description: '',
    },
  })

  const { mutate, isPending } = useCreatePartnerRegistrationDraftWithBusinessInfo({
    mutation: {
      onSuccess: () => setIsDone(true),
    },
  })

  const resetDoneStatus = () => {
    if (isDone) {
      setIsDone(false)
    }
  }

  const onSubmit = (values: CreatePartnerRegistrationDraftBusinessInfoRequest) => {
    mutate({ data: values })
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
          rules={{ required: 'Укажите название бизнеса' }}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Название бизнеса"
              validateStatus={fieldState.error ? 'error' : undefined}
              help={fieldState.error?.message}
            >
              <Input
                {...field}
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
          render={({ field }) => (
            <Form.Item label="Описание">
              <Input.TextArea
                {...field}
                rows={3}
                value={field.value ?? ''}
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
