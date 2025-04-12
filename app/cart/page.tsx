import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Shopping Cart</span>
          </div>

          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4">
                    <div className="relative aspect-square w-full sm:w-32 h-32 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <Link href={`/products/${item.id}`} className="font-semibold hover:text-teal-600">
                          {item.name}
                        </Link>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Size: {item.size}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <span>Color: {item.color}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <div className="flex h-8 w-8 items-center justify-center text-sm">{item.quantity}</div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center">
                  <Link href="/products">
                    <Button variant="outline">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border rounded-lg p-6 space-y-4">
                  <h2 className="font-semibold text-lg">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${(subtotal + shipping + tax).toFixed(2)}</span>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Proceed to Checkout</Button>
                  </Link>
                </div>

                <div className="border rounded-lg p-6 space-y-4">
                  <h2 className="font-semibold text-lg">Apply Coupon</h2>
                  <div className="flex gap-2">
                    <Input placeholder="Enter coupon code" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-6 space-y-4">
                  <h2 className="font-semibold text-lg">Shipping Estimate</h2>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="ZIP / Postal code" />
                      <Button variant="outline">Calculate</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="flex justify-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/products">
                <Button className="mt-4 bg-teal-600 hover:bg-teal-700">Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const cartItems = [
  {
    id: 1,
    name: "Filecoin T-Shirt",
    description: "Premium cotton t-shirt with Filecoin logo",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 2,
    size: "M",
    color: "Black",
  },
  {
    id: 4,
    name: "Filecoin Mug",
    description: "Ceramic mug for your morning coffee",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 1,
    size: "Standard",
    color: "White",
  },
  {
    id: 5,
    name: "Filecoin Stickers Pack",
    description: "Set of 10 vinyl stickers",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 1,
    size: "Standard",
    color: "Multi",
  },
]

const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
const shipping = 4.99
const tax = subtotal * 0.08
