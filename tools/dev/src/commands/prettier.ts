import { createBinary } from '../common'

const runPrettier = createBinary('prettier')

export const prettier = (argv: string[]): Promise<number> => {
  return runPrettier('--loglevel', 'warn', '--write', ...argv)
}
