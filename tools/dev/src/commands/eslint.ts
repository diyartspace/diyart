import { createBinary } from '../common'

const runEslint = createBinary('eslint')

// TODO review/simplify "extends", feel like standard is not required anymore
export const eslint = (argv: string[]): Promise<number> => {
  return runEslint('--config', 'eslint.json', '--ignore-pattern', '/lib/', '--fix', '--ext', '.ts,.tsx', ...argv)
}
