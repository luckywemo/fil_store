import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { HardDrive, ShoppingCart, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fil Store - Filecoin Merchandise",
  description: "Premium Filecoin merchandise for enthusiasts and supporters",
    generator: 'v0.dev'
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <HardDrive className="h-6 w-6 text-teal-500" />
              <span>Fil Store</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="container mt-8 flex flex-col gap-6">
            <Link
              href="/"
              className="text-lg font-medium hover:underline underline-offset-4"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-lg font-medium hover:underline underline-offset-4"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium hover:underline underline-offset-4"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium hover:underline underline-offset-4"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full relative">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Shopping Cart
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    3
                  </Badge>
                </Button>
              </Link>
              <Link href="/account" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Account
                </Button>
              </Link>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Login
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <HardDrive className="h-6 w-6 text-teal-500" />
                <span>Fil Store</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                  Home
                </Link>
                <Link href="/products" className="text-sm font-medium hover:underline underline-offset-4">
                  Products
                </Link>
                <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                  About
                </Link>
                <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
                  Contact
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <Link href="/cart" className="hidden md:block">
                  <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      3
                    </Badge>
                    <span className="sr-only">Shopping Cart</span>
                  </Button>
                </Link>
                <Link href="/account" className="hidden md:block">
                  <Button variant="ghost" size="sm">
                    Account
                  </Button>
                </Link>
                <Link href="/login" className="hidden md:block">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    Login
                  </Button>
                </Link>
                <MobileMenu />
              </div>
            </div>
          </header>
          {children}
          <footer className="w-full border-t bg-background">
            <div className="container px-4 md:px-6 py-8 md:py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <HardDrive className="h-6 w-6 text-teal-500" />
                    <span>Fil Store</span>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Your one-stop shop for premium Filecoin merchandise and accessories.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Shop</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/products" className="text-muted-foreground hover:text-foreground">
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/category/apparel" className="text-muted-foreground hover:text-foreground">
                        Apparel
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/products/category/accessories"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Accessories
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/products/category/collectibles"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Collectibles
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Company</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/about" className="text-muted-foreground hover:text-foreground">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Legal</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                        Shipping Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                        Returns & Refunds
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Fil Store. All rights reserved.
                </p>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}


import './globals.css'