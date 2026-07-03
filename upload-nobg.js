import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { lookup as mimeLookup } from 'mime-types'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const ACCOUNT_ID    = process.env.R2_ACCOUNT_ID    || 'ff8ea091cb473a977b75fdb25cab9ed2'
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || 'c8cbc50737e3bcfc12b36c510a7484b8'
const SECRET_KEY    = process.env.R2_SECRET_KEY    || 'c705c18f62c2d20dd1437c81c55138c9a97351a9fe6322a64ad39ce316c7cc0c'
const BUCKET        = 'ladupla-images'

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_KEY },
})

const dir = join(__dirname, 'public', 'images', 'slider')
const files = readdirSync(dir).filter(f => f.endsWith('.png') && !f.startsWith('flag_'))

console.log(`Subiendo ${files.length} imagenes a R2...\n`)

for (const file of files) {
  const key = `images/slider/${file}`
  const body = readFileSync(join(dir, file))
  const contentType = mimeLookup(file) || 'image/png'
  await client.send(new PutObjectCommand({
    Bucket: BUCKET, Key: key, Body: body,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }))
  console.log(`  OK  ${key}`)
}

console.log('\nListo!')
