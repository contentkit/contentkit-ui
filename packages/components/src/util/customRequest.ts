import { CustomRequestParams } from '../types'

async function customRequest ({ headers, file, action, onSuccess }: CustomRequestParams): Promise<void> {
  const formData = new window.FormData()
  for (let field in action.fields) {
    formData.append(field, action.fields[field])
  }
  formData.append('file', file)
  const resp = await fetch(action.url, {
    method: 'POST',
    body: formData,
    headers: headers
  })
  onSuccess(resp)
}

export default customRequest
