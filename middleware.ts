import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/incidents']

  // Verificar si la ruta es protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Redirigir a login si no está autenticado
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Usuario autenticado - crear respuesta con headers que previenen caché
      const response = NextResponse.next()
      
      // Headers para prevenir caché en rutas protegidas
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')

      return response
    } catch (error) {
      // En caso de error, redirigir a login por seguridad
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
