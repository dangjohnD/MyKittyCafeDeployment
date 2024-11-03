export interface Cat {
    id?: number,
    name: string,
    color: string,
    birthday: Date,
    isDisabled: boolean,
    note: string
    image: string | File
  }