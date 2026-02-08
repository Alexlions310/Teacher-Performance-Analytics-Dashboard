import * as React from 'react'
import { cn } from '@/shared/lib/utils'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}

export interface SelectProps<T extends string = string>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  value: T | null
  onValueChange: (value: T | null) => void
  options: SelectOption<T>[]
  placeholder?: string
}

function SelectInner<T extends string>(
  { className, value, onValueChange, options, placeholder = 'Select...', ...props }: SelectProps<T>,
  ref: React.Ref<HTMLSelectElement>
) {
  return (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      value={value ?? ''}
      onChange={(e) => {
        const v = e.target.value
        onValueChange(v ? (v as T) : null)
      }}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

const Select = React.forwardRef(SelectInner) as <T extends string = string>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLSelectElement> }
) => React.ReactElement

export { Select }
