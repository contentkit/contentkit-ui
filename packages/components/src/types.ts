export type SidebarAvatarOption = {
  label: string,
  onClick: () => void
}

export type onUpload = (file: File) => Promise<void>

export type CustomRequestParams = {
  action: ActionResponse,
  headers: {},
  file: File,
  onSuccess: (data: any) => void
}

export type CustomRequest = (params: CustomRequestParams) => Promise<void>

export type Fields = {
  tagging: string
}

export type ActionResponse = {
  fields: Fields,
  url: string,
  bucket: string,
  'X-AMZ-Algorithm': string,
  'X-Amz-Credential': string,
  'X-Amz-Date': string,
  'X-Amz-Security-Token': string
}

export enum DropzoneVariant {
  THUMBNAIL = 'thumbnail',
  FULL_WIDTH = 'full_width'
}

export type DropzoneProps = {
  onUpload: onUpload,
  children: any,
  className?: string,
  variant?: DropzoneVariant
}
