import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { lookup as mimeLookup } from 'mime-types'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const ACCOUNT_ID    = process.env.R2_ACCOUNT_ID    || ''
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || ''
const SECRET_KEY    = process.env.R2_SECRET_KEY    || ''
const BUCKET        = 'ladupla-images'
const LOCAL_DIR     = join(__dirname, 'public', 'images')
const REMOTE_PREFIX = 'images'
const CONCURRENCY   = 20

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_KEY },
})

function walk(dir, base = '') {
  const entries = []
  for (const item of readdirSync(dir)) {
    const full = join(dir, item)
    const rel  = base ? `${base}/${item}` : item
    if (statSync(full).isDirectory()) entries.push(...walk(full, rel))
    else entries.push({ local: full, key: `${REMOTE_PREFIX}/${rel}` })
  }
  return entries
}

async function exists(key) {
  try { await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key })); return true }
  catch { return false }
}

async function upload(file, idx, total) {
  if (await exists(file.key)) {
    process.stdout.write(`\r[${idx}/${total}] SKIP  ${file.key.slice(-50).padEnd(52)}`)
    return
  }
  const body        = readFileSync(file.local)
  const contentType = mimeLookup(file.local) || 'application/octet-stream'
  await client.send(new PutObjectCommand({
    Bucket: BUCKET, Key: file.key, Body: body,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }))
  process.stdout.write(`\r[${idx}/${total}] OK    ${file.key.slice(-50).padEnd(52)}`)
}

const files = walk(LOCAL_DIR)
console.log(`\n📦 ${files.length} archivos encontrados en public/images/\n`)

let done = 0
for (let i = 0; i < files.length; i += CONCURRENCY) {
  const batch = files.slice(i, i + CONCURRENCY)
  await Promise.all(batch.map(f => upload(f, ++done, files.length)))
}

console.log(`\n\n✅ Upload completo — ${files.length} archivos subidos a R2`)
