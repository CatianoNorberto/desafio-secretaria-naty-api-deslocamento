'use client'

import React, { useEffect, useState } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { useField } from '@unform/core'

type FormTextFieldProps = TextFieldProps & {
  name: string
}
export default function FormTextField({ name, ...rest }: FormTextFieldProps) {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name)

  const [value, setValue] = useState(defaultValue || '')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [registerField, fieldName, value])

  return (
    <TextField
      {...rest}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={() => (error ? clearError() : undefined)}
    />
  )
}
