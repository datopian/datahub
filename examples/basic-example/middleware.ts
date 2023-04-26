// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, res: NextResponse) {
  const urlPaths = req.nextUrl.pathname.split('/')
  const fileName = urlPaths[urlPaths.length - 1]
  return NextResponse.rewrite(new URL(`/api/get-data-file?fileName=${fileName}`, req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/:file*.csv'],
}
