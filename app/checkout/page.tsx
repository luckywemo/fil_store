import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/cart" className="hover:text-foreground">
              Cart
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Checkout</span>
          </div>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="border rounded-lg p-6 space-y-6">
                <h2 className="font-semibold text-lg">Contact Information</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6 space-y-6">
                <h2 className="font-semibold text-lg">Shipping Address</h2>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="Enter your street address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                    <Input id="address2" placeholder="Enter apartment, suite, etc." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Enter your city" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State / Province</Label>
                      <Select>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP / Postal Code</Label>
                      <Input id="zip" placeholder="Enter ZIP code" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-address" />
                    <Label htmlFor="save-address">Save this address for future orders</Label>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6 space-y-6">
                <h2 className="font-semibold text-lg">Shipping Method</h2>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard Shipping (3-5 business days)</Label>
                    </div>
                    <span>$4.99</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express">Express Shipping (1-2 business days)</Label>
                    </div>
                    <span>$12.99</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="border rounded-lg p-6 space-y-6">
                <h2 className="font-semibold text-lg">Payment Method</h2>
                <Tabs defaultValue="card">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" placeholder="Enter name as it appears on card" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="save-card" />
                      <Label htmlFor="save-card">Save this card for future purchases</Label>
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal" className="text-center py-8">
                    <div className="space-y-4">
                      <Image
                        src="/placeholder.svg?height=60&width=120"
                        alt="PayPal"
                        width={120}
                        height={60}
                        className="mx-auto"
                      />
                      <p className="text-muted-foreground">
                        You will be redirected to PayPal to complete your purchase securely.
                      </p>
                      <Button className="bg-[#0070ba] hover:bg-[#005ea6]">Continue with PayPal</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="crypto" className="text-center py-8">
                    <div className="space-y-4">
                      <Image
                        src="/placeholder.svg?height=60&width=120"
                        alt="Cryptocurrency"
                        width={120}
                        height={60}
                        className="mx-auto"
                      />
                      <p className="text-muted-foreground">Pay with Filecoin (FIL) or other cryptocurrencies.</p>
                      <Button className="bg-teal-600 hover:bg-teal-700">Continue with Crypto</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-6 space-y-4">
                <h2 className="font-semibold text-lg">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative aspect-square w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                        <div className="absolute -top-2 -right-2 bg-teal-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size}, Color: {item.color}
                        </p>
                      </div>
                      <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <Separator />
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
              </div>

              <div className="border rounded-lg p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coupon">Coupon Code</Label>
                  <div className="flex gap-2">
                    <Input id="coupon" placeholder="Enter coupon code" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-teal-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-teal-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Lock className="mr-2 h-4 w-4" />
                  Complete Order
                </Button>
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <Lock className="mr-1 h-3 w-3" />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </div>
          </div>
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
