import { build } from 'bun'

await build({
    entrypoints: ['src/main.tsx'],
    outdir: 'public',
    target: 'browser',
})

console.log('React app built to public/main.js')
