export interface PkgJson {
  readonly name: string
  readonly scripts?: Record<string, string>
  readonly dependencies?: Record<string, string>
  readonly devDependencies?: Record<string, string>
}
