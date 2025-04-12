"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/contexts/cart-context"
import { HardDrive, ShoppingCart, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                  <div className="mr-4 hidden md:flex">
                    <Link className="mr-6 flex items-center space-x-2" href="/">
                      <HardDrive className="h-6 w-6" />
                      <span className="hidden font-bold sm:inline-block">
                        Fil Store
                      </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                      <Link href="/products">Products</Link>
                      <Link href="/about">About</Link>
                      <Link href="/contact">Contact</Link>
                    </nav>
                  </div>
                  <button
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={isMenuOpen}
                    aria-controls="radix-:R1mcq:"
                    data-state={isMenuOpen ? "open" : "closed"}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </button>
                  {isMenuOpen && (
                    <div className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
                      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
                        <Link className="flex items-center space-x-2" href="/">
                          <HardDrive className="h-6 w-6" />
                          <span className="font-bold">Fil Store</span>
                        </Link>
                        <nav className="grid grid-flow-row auto-rows-max text-sm">
                          <Link
                            className="flex w-full items-center rounded-md p-2 hover:underline"
                            href="/products"
                          >
                            Products
                          </Link>
                          <Link
                            className="flex w-full items-center rounded-md p-2 hover:underline"
                            href="/about"
                          >
                            About
                          </Link>
                          <Link
                            className="flex w-full items-center rounded-md p-2 hover:underline"
                            href="/contact"
                          >
                            Contact
                          </Link>
                        </nav>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                      <Button asChild variant="outline">
                        <Link href="/cart">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Cart
                          {cartCount > 0 && (
                            <Badge
                              variant="secondary"
                              className="ml-2"
                            >
                              {cartCount}
                            </Badge>
                          )}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                  <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <HardDrive className="h-6 w-6" />
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                      Built by{" "}
                      <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                      >
                        Fil Store
                      </a>
                      . The source code is available on{" "}
                      <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                      >
                        GitHub
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'