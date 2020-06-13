import { createBinary } from '../common'

const tsc = createBinary('tsc')

export const build = (argv: string[]): Promise<number> => tsc(...argv)
