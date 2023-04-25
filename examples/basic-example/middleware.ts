// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, res: NextResponse) {
  const refererPaths = req.headers.get('referer').split('/'); // logs the referer URL to the console
  const urlPaths = req.nextUrl.pathname.split('/')
  const datasetName = refererPaths[refererPaths.length - 1]
  const fileName = urlPaths[urlPaths.length - 1]
  return NextResponse.rewrite(new URL(`/api/get-data-file?datasetName=${datasetName}&fileName=${fileName}`, req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/datasets/:file*.csv',
}
