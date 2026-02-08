import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth'
import { Button } from '@/shared/ui/button'
import { Moon, Sun, LogOut } from 'lucide-react'
import { useTheme } from '@/app/providers/ThemeProvider'
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const { resolved, setTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const toggleTheme = () => {
    setTheme(resolved === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/" className="font-semibold">
            EduInsight
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground max-md:hidden">
              {user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {resolved === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
