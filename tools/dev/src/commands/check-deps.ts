import getLatestVersion from 'latest-version'
import path from 'path'
import Progress from 'progress'
import { table } from 'table'

import { findPackages, isPackage, PkgJson } from '../common'

interface VersionInfo {
  version: string
  dependents: string[]
}

interface DependencyInfo {
  readonly name: string
  readonly versionInfos: VersionInfo[]
}

const getOrCreateVersionInfo = (dependencyInfo: DependencyInfo, dependencyVersion: string): VersionInfo => {
  const existingVersionInfo = dependencyInfo.versionInfos.find(({ version }) => version === dependencyVersion)
  if (existingVersionInfo) {
    return existingVersionInfo
  }
  const versionInfo = { version: dependencyVersion, dependents: [] }
  dependencyInfo.versionInfos.push(versionInfo)
  return versionInfo
}

const updateDependencyInfoVersion = (dependencyInfo: DependencyInfo, version: string, dependent: string) => {
  const versionInfo: VersionInfo = getOrCreateVersionInfo(dependencyInfo, version)
  versionInfo.dependents.push(dependent)
}

const getOrCreateDependencyInfo = (dependencyInfos: DependencyInfo[], dependencyName: string): DependencyInfo => {
  const existingDependencyInfo = dependencyInfos.find(({ name }) => name === dependencyName)
  if (existingDependencyInfo) {
    return existingDependencyInfo
  }
  const dependencyInfo: DependencyInfo = {
    name: dependencyName,
    versionInfos: [],
  }
  dependencyInfos.push(dependencyInfo)
  return dependencyInfo
}

const findDependencies = (
  dependencyInfos: DependencyInfo[],
  internalPackage: Record<string, boolean>,
  pkgPath: string,
) => {
  // eslint-disable-next-line
  const pkgJson: PkgJson = require(path.join(pkgPath, 'package.json'))
  internalPackage[pkgJson.name] = true
  const dependencyConfigs = [pkgJson.dependencies, pkgJson.devDependencies]
  dependencyConfigs.forEach((dependencyConfig) => {
    if (!dependencyConfig) {
      return
    }
    Object.keys(dependencyConfig).forEach((dependencyName: string) => {
      const dependencyVersion = dependencyConfig[dependencyName]
      const dependencyInfo: DependencyInfo = getOrCreateDependencyInfo(dependencyInfos, dependencyName)
      updateDependencyInfoVersion(dependencyInfo, dependencyVersion, pkgJson.name)
    })
  })
}

const checkOutdated = async (dependencyInfos: DependencyInfo[]) => {
  const progress = new Progress('[:bar] :percent - checking \':dependency\'', { total: dependencyInfos.length })
  const report: string[][] = [['Package', 'Defined Version', 'In Range Version', 'Latest Version', 'Dependents']]
  for (const dependencyInfo of dependencyInfos) {
    progress.tick(0, { dependency: dependencyInfo.name })
    for (const versionInfo of dependencyInfo.versionInfos) {
      const latestVersion: string = await getLatestVersion(dependencyInfo.name)
      const inRangeVersion: string = await getLatestVersion(dependencyInfo.name, { version: versionInfo.version })
      const canUpdateInRange = !versionInfo.version.includes(inRangeVersion)
      const canUpdateLatest = inRangeVersion !== latestVersion
      const shouldReport = canUpdateInRange || canUpdateLatest
      if (shouldReport) {
        report.push([
          dependencyInfo.name,
          versionInfo.version,
          `${inRangeVersion} ${canUpdateInRange ? '*' : ''}`,
          `${latestVersion} ${canUpdateLatest ? '*' : ''}`,
          versionInfo.dependents.join('\n'),
        ])
      }
    }
    progress.tick()
  }
  console.log(table(report))
}

export const checkDependencies = async (): Promise<number> => {
  const rootPath = process.cwd()
  const packages = findPackages(rootPath)
  if (isPackage(rootPath)) {
    packages.push(rootPath)
  }
  const dependencyInfos: DependencyInfo[] = []
  const internalPackage: Record<string, boolean> = {}
  packages.forEach((pkgPath) => findDependencies(dependencyInfos, internalPackage, pkgPath))
  const dependencyInfosToCheck = dependencyInfos.filter((dependencyInfo) => !internalPackage[dependencyInfo.name])
  dependencyInfosToCheck.sort((a, b) => a.name.localeCompare(b.name))
  await checkOutdated(dependencyInfosToCheck)
  return 0
}
