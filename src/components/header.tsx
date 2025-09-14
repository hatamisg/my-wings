'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggleButton } from './ThemeToggleButton'

const menuItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'FAQs', href: '#faqs' },
]

export const HeroHeader = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="home" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
            className="lg:hidden p-2"
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          <ul className="hidden lg:flex items-center gap-8 text-sm">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-muted-foreground hover:text-accent-foreground transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggleButton />
            <Button asChild variant="outline" size="icon" aria-label="GitHub">
              <a href="https://github.com/hatamisg" target="_blank" rel="noreferrer">
                <Github />
              </a>
            </Button>
            <Button asChild size="sm">
              <Link href="/cv.pdf">CV / Resume</Link>
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden pb-4">
            <ul className="flex flex-col gap-4 text-sm">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-muted-foreground hover:text-accent-foreground transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <ThemeToggleButton />
              <Button asChild variant="outline" size="icon" aria-label="GitHub">
                <a href="https://github.com/hatamisg" target="_blank" rel="noreferrer">
                  <Github />
                </a>
              </Button>
              <Button asChild size="sm">
                <Link href="/cv.pdf">CV / Resume</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
