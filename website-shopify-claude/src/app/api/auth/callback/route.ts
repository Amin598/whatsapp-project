import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '../../../../../utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const shop = searchParams.get('shop')
  const state = searchParams.get('state')
  const hmac = searchParams.get('hmac')

  if (!code || !shop || !state) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const cookieStore = await cookies()
  const storedState = cookieStore.get('shopify-oauth-state')?.value

  if (!storedState || storedState !== state) {
    return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 })
  }

  const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
      code,
    }),
  })

  if (!tokenResponse.ok) {
    return NextResponse.json({ error: 'Failed to exchange token' }, { status: 400 })
  }

  const tokenData = await tokenResponse.json()
  const accessToken = tokenData.access_token

  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('shops')
      .upsert({
        shop_domain: shop,
        access_token: accessToken,
        scope: 'read_products,write_orders',
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.redirect('http://localhost:3000/error?message=Database error')
    }

    return NextResponse.redirect('http://localhost:3000/success')

  } catch (error) {
    console.error('Database save error:', error)
    return NextResponse.redirect('http://localhost:3000/error?message=Failed to save shop data')
  }
}