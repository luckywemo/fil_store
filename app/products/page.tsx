import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
              <p className="text-muted-foreground">Browse our collection of Filecoin merchandise</p>
            </div>
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Narrow down products by applying filters</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-6 py-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox id={`category-${category.id}-mobile`} />
                            <Label htmlFor={`category-${category.id}-mobile`}>{category.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-medium">Price Range</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="price-under-25-mobile" />
                          <Label htmlFor="price-under-25-mobile">Under $25</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="price-25-50-mobile" />
                          <Label htmlFor="price-25-50-mobile">$25 - $50</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="price-50-100-mobile" />
                          <Label htmlFor="price-50-100-mobile">$50 - $100</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="price-over-100-mobile" />
                          <Label htmlFor="price-over-100-mobile">Over $100</Label>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-medium">Color</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="color-black-mobile" />
                          <Label htmlFor="color-black-mobile">Black</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="color-white-mobile" />
                          <Label htmlFor="color-white-mobile">White</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="color-blue-mobile" />
                          <Label htmlFor="color-blue-mobile">Blue</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="color-teal-mobile" />
                          <Label htmlFor="color-teal-mobile">Teal</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline">Reset</Button>
                      <Button className="bg-teal-600 hover:bg-teal-700">Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="hidden md:block space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category.id}`} />
                      <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-under-25" />
                    <Label htmlFor="price-under-25">Under $25</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-25-50" />
                    <Label htmlFor="price-25-50">$25 - $50</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-50-100" />
                    <Label htmlFor="price-50-100">$50 - $100</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-over-100" />
                    <Label htmlFor="price-over-100">Over $100</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">Color</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="color-black" />
                    <Label htmlFor="color-black">Black</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="color-white" />
                    <Label htmlFor="color-white">White</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="color-blue" />
                    <Label htmlFor="color-blue">Blue</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="color-teal" />
                    <Label htmlFor="color-teal">Teal</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Reset</Button>
                <Button className="bg-teal-600 hover:bg-teal-700">Apply Filters</Button>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id} className="group">
                    <Card className="overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        {product.badge && <Badge className="absolute top-2 right-2 bg-teal-600">{product.badge}</Badge>}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold">${product.price.toFixed(2)}</span>
                          <Button variant="ghost" size="sm" className="text-teal-600">
                            View
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-teal-600 text-white hover:bg-teal-700">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const categories = [
  {
    id: 1,
    name: "Apparel",
    slug: "apparel",
  },
  {
    id: 2,
    name: "Accessories",
    slug: "accessories",
  },
  {
    id: 3,
    name: "Collectibles",
    slug: "collectibles",
  },
  {
    id: 4,
    name: "Home Office",
    slug: "home-office",
  },
]

const allProducts = [
  {
    id: 1,
    name: "Filecoin T-Shirt",
    description: "Premium cotton t-shirt with Filecoin logo",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
    category: "Apparel",
  },
  {
    id: 2,
    name: "Filecoin Hoodie",
    description: "Comfortable hoodie for tech enthusiasts",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Apparel",
  },
  {
    id: 3,
    name: "Filecoin Cap",
    description: "Adjustable cap with embroidered logo",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Apparel",
  },
  {
    id: 4,
    name: "Filecoin Mug",
    description: "Ceramic mug for your morning coffee",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Popular",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Filecoin Stickers Pack",
    description: "Set of 10 vinyl stickers",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Filecoin Notebook",
    description: "Hardcover notebook with Filecoin design",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
  },
  {
    id: 7,
    name: "Filecoin Poster",
    description: "High-quality printed poster",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Office",
  },
  {
    id: 8,
    name: "Filecoin Backpack",
    description: "Durable backpack with multiple compartments",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
    category: "Accessories",
  },
  {
    id: 9,
    name: "Filecoin Collectible Coin",
    description: "Limited edition commemorative coin",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Limited",
    category: "Collectibles",
  },
]
