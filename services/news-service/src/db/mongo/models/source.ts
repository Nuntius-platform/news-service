import { database } from '#db'

export interface Source {
  name: string
  url: string
}

export const sources = database.collection<Source>('sources')
