import { database } from '@db'

interface Source {
  name: string
  url: string
}

export const sources = database.collection<Source>('sources')
