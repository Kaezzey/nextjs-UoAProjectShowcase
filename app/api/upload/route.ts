import { writeClient } from '@/sanity/lib/writeClient'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('image') as File

if (!file || !file.type.startsWith('image/')) {
  return new Response(JSON.stringify({ error: 'Invalid file' }), { status: 400 })
}

  try {
    const asset = await writeClient.assets.upload('image', file, {
      filename: file.name,
      contentType: file.type,
    })

    return new Response(JSON.stringify({ url: asset.url }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 })
  }
}
