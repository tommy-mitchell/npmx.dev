import { http, HttpResponse } from 'msw'
import type {
  DeprecatedPackageInfo,
  VulnerabilityTreeResult,
} from '#shared/types/dependency-analysis'
import { VULNERABILITY_TREE_PATH } from './vulnerabilities'

const deprecatedPackages = [
  {
    name: 'request',
    version: '2.88.2',
    depth: 'direct',
    path: [],
    message: 'request has been deprecated, see https://github.com/request/request/issues/3142',
  },
  {
    name: 'uuid',
    version: '3.4.0',
    depth: 'transitive',
    path: ['request', 'uuid'],
    message:
      'Please upgrade to version 7 or higher. Older versions may use Math.random() in certain circumstances, which is known to be problematic.',
  },
  {
    name: 'har-validator',
    version: '5.1.5',
    depth: 'transitive',
    path: ['request', 'har-validator'],
    message: 'this library is no longer supported',
  },
  {
    name: 'querystring',
    version: '0.2.0',
    depth: 'transitive',
    path: ['request', 'url', 'querystring'],
    message:
      'The querystring API is considered Legacy. new code should use the URLSearchParams API instead.',
  },
  {
    name: 'inflight',
    version: '1.0.6',
    depth: 'transitive',
    path: ['glob', 'inflight'],
    message:
      'This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.',
  },
  {
    name: 'glob',
    version: '7.2.3',
    depth: 'direct',
    path: [],
    message: 'Glob versions prior to v9 are no longer supported',
  },
  {
    name: 'rimraf',
    version: '3.0.2',
    depth: 'transitive',
    path: ['glob', 'rimraf'],
    message: 'Rimraf versions prior to v4 are no longer supported',
  },
] satisfies DeprecatedPackageInfo[]

const baseResult = {
  package: 'my-legacy-app',
  version: '1.0.0',
  totalPackages: 84,
  failedQueries: 0,
  vulnerablePackages: [],
  totalCounts: { critical: 0, high: 0, moderate: 0, low: 0, total: 0 },
} satisfies Omit<VulnerabilityTreeResult, 'deprecatedPackages'>

export const deprecatedTreeHandler = http.get(VULNERABILITY_TREE_PATH, () =>
  HttpResponse.json({ ...baseResult, deprecatedPackages }),
)

export const fewDeprecatedHandler = http.get(VULNERABILITY_TREE_PATH, () =>
  HttpResponse.json({ ...baseResult, deprecatedPackages: deprecatedPackages.slice(0, 2) }),
)

export const noDeprecatedHandler = http.get(VULNERABILITY_TREE_PATH, () =>
  HttpResponse.json({ ...baseResult, deprecatedPackages: [] }),
)
