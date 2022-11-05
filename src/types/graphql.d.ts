
type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: Date
  I18NLocaleCode: string | 'en'
  JSON: Record<string, any | any[] | string | number | boolean | null | undefined> | any[]
  Upload: unknown
}

type HomePage = {
  title: Scalars['String']
  img?: Scalars['String']
  subtitle: Scalars['String']
  info: Scalars['String']
}

