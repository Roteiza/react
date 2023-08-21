import { Form } from 'react-bootstrap'
import { SectionTypes } from '../types.d'

interface Props {
  type: SectionTypes
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const getPlaceholder = ({ type, loading }: { type: SectionTypes, loading?: boolean }) => {
  if (type === SectionTypes.From) return 'Enter text'
  if (loading === true) return 'Loading...'
  return 'Translation'
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

export const TextArea = ({ type, loading, onChange, value }: Props) => {
  const styles = type === SectionTypes.To
    ? commonStyles
    : { ...commonStyles, background: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionTypes.To}
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      onChange={handleChange}
      value={value}
      disabled={type === SectionTypes.To}
    />
  )
}
