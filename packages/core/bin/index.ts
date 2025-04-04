#!/usr/bin/env bun
import { setupCLI } from '@/commands/cli'

setupCLI().parse(process.argv)
