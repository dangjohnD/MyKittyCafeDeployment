export interface Cat {
    id?: number,
    name: string,
    colour: string,
    birthday: Date,
    desc: string,
    disabled: boolean,
    note: string
    image: string | File
    adoptable: boolean
  }