#!/usr/bin/env bun
import { createCli } from '@/commands/cli'

createCli().parse(process.argv)
