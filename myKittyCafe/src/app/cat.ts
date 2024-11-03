export interface Cat {
    id?: number,
    name: string,
    colour: string,
    birthday: Date,
    desc: string,
    isDisabled: boolean,
    note: string
    image: string | File
  }