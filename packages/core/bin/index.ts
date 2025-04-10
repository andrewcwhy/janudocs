#!/usr/bin/env node

import { createCli } from '@/commands/cli'

createCli().parse(process.argv)
