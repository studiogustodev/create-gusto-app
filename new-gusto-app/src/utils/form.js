import { string, number, boolean, mixed, object } from 'yup'

export const createYupSchema = (config) => {
  const schema = config.reduce((obj, item) => {
    let value = {}
    if (item.type === 'text' || item.type === 'textarea' || item.type === 'select' || item.type === 'hidden') {
      value = string().min(2, 'il campo deve essere superiore a 2 caratteri')
      if (item.required) value = value.required('il campo è richiesto')
    }
    if (item.type === 'email') {
      value = string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'l\'email deve essere valida')
      if (item.required) value = value.required('il campo è richiesto')
    }
    if (item.type === 'tel') {
      value = number('').typeError('devi specificare un numero')
      if (item.required) value = value.required('Il campo è richiesto')
    }
    if (item.type === 'checkbox') {
      value = boolean()
      if (item.required) value = value.oneOf([true], 'devi accettare i termini e le condizioni').required('il campo è richiesto')
    }
    if (item.type === 'radio') {
      value = string()
      if (item.required) value = value.required('devi selezionare almeno un campo')
    }
    if (item.type === 'file') {
      value = mixed()
      if (item.required) value = value.required('il campo è richiesto')
    }
    return {
      ...obj,
      [item.name]: value,
    }
  }, {})

  return object().shape(schema)
}

export const createInitialValues = (config) => {
  const values = config.reduce((obj, item) => {
    return {
      ...obj,
      [item.name]: item.type === 'checkbox' ? false : '',
    }
  }, {})
  Object.assign(values, { _wpcf7_recaptcha_response: '' })
  return values
}

export const convertJsontoUrlencoded = (obj) => {
  const str = []
  for (const key in obj) { // eslint-disable-line no-restricted-syntax
    if (obj.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    }
  }
  return str.join('&')
}

export const convertJsontoFormData = (obj) => {
  const formData = new FormData()

  for (const key in obj) { // eslint-disable-line no-restricted-syntax
    if (obj.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
      formData.append(key, obj[key])
    }
  }
  return formData
}
