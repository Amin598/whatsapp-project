import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get('shop')

  if (!shop) {
    return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 })
  }

  if (!shop.endsWith('.myshopify.com')) {
    return NextResponse.json({ error: 'Shop must end with .myshopify.com' }, { status: 400 })
  }

  const state = crypto.randomUUID()

  const authUrl = `https://${shop}/admin/oauth/authorize?` +
    `client_id=${process.env.SHOPIFY_CLIENT_ID}&` +
    `scope=read_products,write_orders&` +
    `redirect_uri=http://localhost:3000/api/auth/callback&` +
    `state=${state}`

  const cookieStore = await cookies()
  cookieStore.set('shopify-oauth-state', state, {
    httpOnly: true,
    sameSite: 'lax'
  })

  return NextResponse.redirect(authUrl)
}