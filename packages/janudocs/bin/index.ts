#!/usr/bin/env bun

import { loadUserConfig } from '../src/loadUserConfig'

async function main() {
    const config = await loadUserConfig()
    console.log('✅ Loaded Janudocs config:', config)
}

main()
