import { http, HttpResponse } from 'msw'
import type { VulnerabilityTreeResult } from '#shared/types/dependency-analysis'

export const VULNERABILITY_TREE_PATH = '/api/registry/vulnerabilities/:pkg/v/:version'

const vulnerabilityTreeResult = {
  package: 'express',
  version: '4.17.1',
  totalPackages: 57,
  failedQueries: 0,
  deprecatedPackages: [],
  totalCounts: { critical: 1, high: 3, moderate: 3, low: 3, total: 10 },
  vulnerablePackages: [
    {
      name: 'qs',
      version: '6.5.2',
      depth: 'transitive',
      path: ['express', 'qs'],
      counts: { critical: 1, high: 1, moderate: 1, low: 0, total: 3 },
      vulnerabilities: [
        {
          id: 'MOCK-0001',
          summary: 'Prototype pollution via nested object parsing',
          severity: 'critical',
          aliases: ['GHSA-mock-qs-0001'],
          url: 'https://osv.dev/vulnerability/MOCK-0001',
          fixedIn: '6.7.3',
        },
        {
          id: 'MOCK-0002',
          summary: 'Denial of service through crafted array limits',
          severity: 'high',
          aliases: ['GHSA-mock-qs-0002'],
          url: 'https://osv.dev/vulnerability/MOCK-0002',
          fixedIn: '6.7.3',
        },
        {
          id: 'MOCK-0003',
          summary: 'Memory exhaustion when parsing deeply nested input',
          severity: 'moderate',
          aliases: [],
          url: 'https://osv.dev/vulnerability/MOCK-0003',
        },
      ],
    },
    {
      name: 'body-parser',
      version: '1.19.0',
      depth: 'direct',
      path: [],
      counts: { critical: 0, high: 0, moderate: 1, low: 1, total: 2 },
      vulnerabilities: [
        {
          id: 'MOCK-0004',
          summary: 'Unbounded request body size in urlencoded parser',
          severity: 'moderate',
          aliases: ['GHSA-mock-bp-0004'],
          url: 'https://osv.dev/vulnerability/MOCK-0004',
          fixedIn: '1.20.3',
        },
        {
          id: 'MOCK-0005',
          summary: 'Inefficient regular expression in content-type matching',
          severity: 'low',
          aliases: [],
          url: 'https://osv.dev/vulnerability/MOCK-0005',
        },
      ],
    },
    {
      name: 'send',
      version: '0.17.1',
      depth: 'transitive',
      path: ['express', 'send'],
      counts: { critical: 0, high: 1, moderate: 0, low: 0, total: 1 },
      vulnerabilities: [
        {
          id: 'MOCK-0006',
          summary: 'Template injection leads to remote file disclosure',
          severity: 'high',
          aliases: ['GHSA-mock-send-0006'],
          url: 'https://osv.dev/vulnerability/MOCK-0006',
          fixedIn: '0.19.0',
        },
      ],
    },
    {
      name: 'debug',
      version: '2.6.9',
      depth: 'transitive',
      path: ['express', 'body-parser', 'debug'],
      counts: { critical: 0, high: 0, moderate: 0, low: 1, total: 1 },
      vulnerabilities: [
        {
          id: 'MOCK-0007',
          summary: 'Regular expression denial of service in debug formatter',
          severity: 'low',
          aliases: [],
          url: 'https://osv.dev/vulnerability/MOCK-0007',
        },
      ],
    },
    {
      name: 'cookie',
      version: '0.4.0',
      depth: 'transitive',
      path: ['express', 'cookie'],
      counts: { critical: 0, high: 0, moderate: 1, low: 0, total: 1 },
      vulnerabilities: [
        {
          id: 'MOCK-0008',
          summary: 'Cookie name, path, and domain accept out-of-bounds characters',
          severity: 'moderate',
          aliases: ['GHSA-mock-cookie-0008'],
          url: 'https://osv.dev/vulnerability/MOCK-0008',
          fixedIn: '0.7.0',
        },
      ],
    },
    {
      name: 'path-to-regexp',
      version: '0.1.7',
      depth: 'transitive',
      path: ['express', 'path-to-regexp'],
      counts: { critical: 0, high: 1, moderate: 0, low: 0, total: 1 },
      vulnerabilities: [
        {
          id: 'MOCK-0009',
          summary: 'Backtracking regular expressions cause denial of service',
          severity: 'high',
          aliases: ['GHSA-mock-ptr-0009'],
          url: 'https://osv.dev/vulnerability/MOCK-0009',
          fixedIn: '0.1.10',
        },
      ],
    },
    {
      name: 'serve-static',
      version: '1.14.1',
      depth: 'transitive',
      path: ['express', 'serve-static'],
      counts: { critical: 0, high: 0, moderate: 0, low: 1, total: 1 },
      vulnerabilities: [
        {
          id: 'MOCK-0010',
          summary: 'Open redirect when serving directories without a trailing slash',
          severity: 'low',
          aliases: [],
          url: 'https://osv.dev/vulnerability/MOCK-0010',
        },
      ],
    },
  ],
} satisfies VulnerabilityTreeResult

export const vulnerabilityTreeHandler = http.get(VULNERABILITY_TREE_PATH, () =>
  HttpResponse.json(vulnerabilityTreeResult),
)

const highestModerateResult = {
  ...vulnerabilityTreeResult,
  totalCounts: { critical: 0, high: 0, moderate: 2, low: 3, total: 5 },
  vulnerablePackages: [
    {
      name: 'body-parser',
      version: '1.19.0',
      depth: 'direct',
      path: [],
      counts: { critical: 0, high: 0, moderate: 1, low: 1, total: 2 },
      vulnerabilities: [
        {
          id: 'MOCK-0004',
          summary: 'Unbounded request body size in urlencoded parser',
          severity: 'moderate',
          aliases: ['GHSA-mock-bp-0004'],
          url: 'https://osv.dev/vulnerability/MOCK-0004',
          fixedIn: '1.20.3',
        },
        {
          id: 'MOCK-0005',
          summary: 'Inefficient regular expression in content-type matching',
          severity: 'low',
          aliases: [],
          url: 'https://osv.dev/vulnerability/MOCK-0005',
        },
      ],
    },
    {
      name: 'debug',
      version: '2.6.9',
      depth: 'transitive',
      path: ['express', 'body-parser', 'debug'],
      counts: { critical: 0, high: 0, moderate: 0, low: 1, total: 1 },
      vulnerabilities: [
        {
          id: 'MOCK-0007',
          summary: 'Regular expression denial of service in debug formatter',
          severity: 'low',
          aliases: [],
          url: 'https://osv.dev/vulnerability/MOCK-0007',
        },
      ],
    },
    {
      name: 'cookie',
      version: '0.4.0',
      depth: 'transitive',
      path: ['express', 'cookie'],
      counts: { critical: 0, high: 0, moderate: 1, low: 0, total: 1 },
      vulnerabilities: [
        {
          id: 'MOCK-0008',
          summary: 'Cookie name, path, and domain accept out-of-bounds characters',
          severity: 'moderate',
          aliases: ['GHSA-mock-cookie-0008'],
          url: 'https://osv.dev/vulnerability/MOCK-0008',
          fixedIn: '0.7.0',
        },
      ],
    },
    {
      name: 'serve-static',
      version: '1.14.1',
      depth: 'transitive',
      path: ['express', 'serve-static'],
      counts: { critical: 0, high: 0, moderate: 0, low: 1, total: 1 },
      vulnerabilities: [
        {
          id: 'MOCK-0010',
          summary: 'Open redirect when serving directories without a trailing slash',
          severity: 'low',
          aliases: [],
          url: 'https://osv.dev/vulnerability/MOCK-0010',
        },
      ],
    },
  ],
} satisfies VulnerabilityTreeResult

export const highestModerateHandler = http.get(VULNERABILITY_TREE_PATH, () =>
  HttpResponse.json(highestModerateResult),
)

const withFailedQueriesResult = {
  ...vulnerabilityTreeResult,
  failedQueries: 2,
} satisfies VulnerabilityTreeResult

export const withFailedQueriesHandler = http.get(VULNERABILITY_TREE_PATH, () =>
  HttpResponse.json(withFailedQueriesResult),
)

const emptyResult = {
  package: 'express',
  version: '4.17.1',
  totalPackages: 57,
  failedQueries: 0,
  deprecatedPackages: [],
  totalCounts: { critical: 0, high: 0, moderate: 0, low: 0, total: 0 },
  vulnerablePackages: [],
} satisfies VulnerabilityTreeResult

export const emptyResultHandler = http.get(VULNERABILITY_TREE_PATH, () =>
  HttpResponse.json(emptyResult),
)

export const serverErrorHandler = http.get(
  VULNERABILITY_TREE_PATH,
  () => new HttpResponse(null, { status: 500 }),
)
