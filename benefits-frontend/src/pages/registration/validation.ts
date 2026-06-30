const HTML_TAG_REGEX = /<\/?[a-z][\s\S]*>/i
const KG_PHONE_REGEX = /^\+996\d{9}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeOptionalText(value?: string | null): string | null {
  if (!value) {
    return null
  }

  const trimmed = value.trim()
  return trimmed || null
}

export function normalizeEmail(value?: string | null): string | null {
  const trimmed = normalizeOptionalText(value)
  return trimmed ? trimmed.toLowerCase() : null
}

export function normalizeKgPhone(value: string): string {
  const trimmed = value.trim()
  const digits = trimmed.replace(/\D/g, '')

  if (digits.startsWith('996') && digits.length === 12) {
    return `+${digits}`
  }

  if (digits.startsWith('0') && digits.length === 10) {
    return `+996${digits.slice(1)}`
  }

  if (digits.length === 9) {
    return `+996${digits}`
  }

  if (KG_PHONE_REGEX.test(trimmed)) {
    return trimmed
  }

  return trimmed
}

export function validateRequiredText(
  value: string | undefined,
  options: { minLength: number; maxLength: number; fieldLabel: string },
): true | string {
  if (!value?.trim()) {
    return `${options.fieldLabel} обязательно`
  }

  const trimmed = value.trim()

  if (HTML_TAG_REGEX.test(trimmed)) {
    return 'HTML/JS-теги запрещены'
  }

  if (trimmed.length < options.minLength) {
    return `Минимум ${options.minLength} символа`
  }

  if (trimmed.length > options.maxLength) {
    return `Максимум ${options.maxLength} символов`
  }

  return true
}

export function validateOptionalText(
  value: string | undefined | null,
  maxLength: number,
): true | string {
  if (!value?.trim()) {
    return true
  }

  const trimmed = value.trim()

  if (HTML_TAG_REGEX.test(trimmed)) {
    return 'HTML/JS-теги запрещены'
  }

  if (trimmed.length > maxLength) {
    return `Максимум ${maxLength} символов`
  }

  return true
}

export function validateKgPhone(value: string | undefined): true | string {
  if (!value?.trim()) {
    return 'Укажите телефон'
  }

  const normalized = normalizeKgPhone(value)

  if (!KG_PHONE_REGEX.test(normalized)) {
    return 'Телефон должен быть в формате +996XXXXXXXXX'
  }

  return true
}

export function validateOptionalEmail(value: string | undefined | null): true | string {
  if (!value?.trim()) {
    return true
  }

  const normalized = normalizeEmail(value)

  if (!normalized) {
    return true
  }

  if (HTML_TAG_REGEX.test(normalized)) {
    return 'HTML/JS-теги запрещены'
  }

  if (normalized.length > 255) {
    return 'Максимум 255 символов'
  }

  if (!EMAIL_REGEX.test(normalized)) {
    return 'Укажите корректный email'
  }

  return true
}
