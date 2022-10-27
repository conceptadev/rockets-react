import { JSONSchema7 as OriginalJSONSchema7 } from 'json-schema'

declare module 'json-schema' {
  interface JSONSchema7 extends OriginalJSONSchema7 {
    enumNames?: Array<string>
  }
}
