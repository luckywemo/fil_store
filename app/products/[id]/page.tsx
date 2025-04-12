'use client';

import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { uploadToLighthouse, getLighthouseDealStatus } from '@/lib/lighthouse';
import { FIL_STORE_ADDRESS } from '@/lib/web3';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Share2, ShoppingCart, Star } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FilStoreABI = [
  {
    inputs: [{ name: 'productId', type: 'uint256', internalType: 'uint256' }],
    name: 'purchaseProduct',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'productId', type: 'uint256', internalType: 'uint256' }],
    name: 'getProduct',
    outputs: [
      { name: 'id', type: 'uint256', internalType: 'uint256' },
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'description', type: 'string', internalType: 'string' },
      { name: 'price', type: 'uint256', internalType: 'uint256' },
      { name: 'imageURI', type: 'string', internalType: 'string' },
      { name: 'metadataURI', type: 'string', internalType: 'string' },
      { name: 'isNFT', type: 'bool', internalType: 'bool' },
      { name: 'owner', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const { address, isConnected } = useAccount();
  const [dealStatus, setDealStatus] = useState<any>(null);

  const { data: product } = useContractRead({
    address: FIL_STORE_ADDRESS as `0x${string}`,
    abi: FilStoreABI,
    functionName: 'getProduct',
    args: [BigInt(params.id)],
  });

  const { config } = usePrepareContractWrite({
    address: FIL_STORE_ADDRESS as `0x${string}`,
    abi: FilStoreABI,
    functionName: 'purchaseProduct',
    args: [BigInt(params.id)],
    value: product ? BigInt(product[3]) : BigInt(0),
  });

  const { write: purchase } = useContractWrite(config);

  useEffect(() => {
    if (product?.[4]) {
      getLighthouseDealStatus(product[4])
        .then(setDealStatus)
        .catch(console.error);
    }
  }, [product]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/products/category/${product[2].toLowerCase()}`} className="hover:text-foreground">
              {product[2]}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product[1]}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={product[4]}
                  alt={product[1]}
                  fill
                  className="object-cover"
                  priority
                />
                {dealStatus && (
                  <div className="mt-4">
                    <Badge variant="outline">
                      Stored on Filecoin: {dealStatus.active ? 'Active' : 'Pending'}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button className="relative aspect-square overflow-hidden rounded-md border hover:border-teal-600">
                  <Image
                    src={product[4]}
                    alt={`${product[1]} thumbnail 1`}
                    fill
                    className="object-cover"
                  />
                </button>
                <button className="relative aspect-square overflow-hidden rounded-md border hover:border-teal-600">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt={`${product[1]} thumbnail 2`}
                    fill
                    className="object-cover"
                  />
                </button>
                <button className="relative aspect-square overflow-hidden rounded-md border hover:border-teal-600">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt={`${product[1]} thumbnail 3`}
                    fill
                    className="object-cover"
                  />
                </button>
                <button className="relative aspect-square overflow-hidden rounded-md border hover:border-teal-600">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt={`${product[1]} thumbnail 4`}
                    fill
                    className="object-cover"
                  />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{product[1]}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">4.0 (24 reviews)</span>
                  </div>
                  <Separator orientation="vertical" className="h-5" />
                  <span className="text-sm text-muted-foreground">In stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{Number(product[3]) / 1e18} tFIL</span>
                </div>
              </div>

              <p className="text-muted-foreground">{product[2]}</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Size</span>
                    <Link href="#" className="text-sm text-teal-600 hover:underline">
                      Size Guide
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-md">
                      S
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-md bg-teal-50 border-teal-600 text-teal-600">
                      M
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-md">
                      L
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-md">
                      XL
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-md">
                      XXL
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-medium">Color</span>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8 w-8 p-0 border-2 border-teal-600"
                      style={{ backgroundColor: "black" }}
                    >
                      <span className="sr-only">Black</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8 w-8 p-0"
                      style={{ backgroundColor: "white" }}
                    >
                      <span className="sr-only">White</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8 w-8 p-0"
                      style={{ backgroundColor: "#0ea5e9" }}
                    >
                      <span className="sr-only">Blue</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8 w-8 p-0"
                      style={{ backgroundColor: "#14b8a6" }}
                    >
                      <span className="sr-only">Teal</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-medium">Quantity</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
                      -
                    </Button>
                    <div className="flex h-8 w-12 items-center justify-center rounded-md border">1</div>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {isConnected ? (
                  <Button
                    onClick={() => purchase?.()}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Purchase
                  </Button>
                ) : (
                  <Button disabled className="bg-teal-600 hover:bg-teal-700">
                    Connect Wallet to Purchase
                  </Button>
                )}
                <Button size="lg" variant="outline">
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
                <Button size="lg" variant="outline" className="sm:w-10 px-0">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
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
                    className="h-5 w-5 text-teal-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  <span className="text-sm">Secure payment with SSL encryption</span>
                </div>
                <div className="flex items-center gap-2">
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
                    className="h-5 w-5 text-teal-600"
                  >
                    <rect width="16" height="13" x="4" y="2" rx="2" />
                    <path d="M4 10h16" />
                    <path d="M7 15h.01" />
                    <path d="M11 15h2" />
                  </svg>
                  <span className="text-sm">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
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
                    className="h-5 w-5 text-teal-600"
                  >
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                    <path d="M12 3v6" />
                  </svg>
                  <span className="text-sm">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:shadow-none py-3"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:shadow-none py-3"
                >
                  Details & Specs
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:shadow-none py-3"
                >
                  Reviews (24)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <div className="space-y-4">
                  <p>
                    Show your support for the Filecoin network with our premium merchandise. This{" "}
                    {product[1].toLowerCase()} is made with high-quality materials and features the iconic Filecoin
                    logo.
                  </p>
                  <p>
                    Filecoin is a decentralized storage network designed to store humanity's most important information.
                    It aims to be a persistent, retrieval, and verifiable storage solution that allows users to rent out
                    their unused hard drive space.
                  </p>
                  <p>
                    By wearing this {product[1].toLowerCase()}, you're not just getting a stylish piece of
                    merchandise, but also showing your support for the future of decentralized storage.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="details" className="pt-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Materials</h4>
                      <p className="text-sm text-muted-foreground">100% Premium Cotton</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">Standard sizing</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Care Instructions</h4>
                      <p className="text-sm text-muted-foreground">Machine wash cold, tumble dry low</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Origin</h4>
                      <p className="text-sm text-muted-foreground">Made in USA</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-8">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold">4.0</div>
                      <div className="flex mt-2 justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">Based on 24 reviews</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium w-2">5</div>
                        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <div className="text-sm text-muted-foreground w-8">60%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium w-2">4</div>
                        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full rounded-full" style={{ width: "25%" }}></div>
                        </div>
                        <div className="text-sm text-muted-foreground w-8">25%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium w-2">3</div>
                        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full rounded-full" style={{ width: "10%" }}></div>
                        </div>
                        <div className="text-sm text-muted-foreground w-8">10%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium w-2">2</div>
                        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full rounded-full" style={{ width: "5%" }}></div>
                        </div>
                        <div className="text-sm text-muted-foreground w-8">5%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium w-2">1</div>
                        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full rounded-full" style={{ width: "0%" }}></div>
                        </div>
                        <div className="text-sm text-muted-foreground w-8">0%</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Customer Reviews</h3>
                        <Button className="bg-teal-600 hover:bg-teal-700">Write a Review</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Share your thoughts with other customers</p>
                    </div>

                    <div className="space-y-6">
                      {reviews.map((review, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">{review.name}</div>
                            <div className="text-sm text-muted-foreground">Verified Purchase</div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <h4 className="font-medium">{review.title}</h4>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                          <Separator className="mt-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
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
          </div>
        </div>
      </main>
    </div>
  )
}

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

const reviews = [
  {
    name: "Alex Johnson",
    rating: 5,
    date: "March 15, 2023",
    title: "Excellent quality and design",
    comment:
      "I'm really impressed with the quality of this product. The Filecoin logo looks great and the material is very comfortable. Highly recommended for any crypto enthusiast!",
  },
  {
    name: "Sarah Miller",
    rating: 4,
    date: "February 28, 2023",
    title: "Great product, slightly large sizing",
    comment:
      "The product is great overall, but I found the sizing to be a bit larger than expected. The design is awesome and I've received many compliments when wearing it. Just order a size down if you're unsure.",
  },
  {
    name: "Michael Chen",
    rating: 5,
    date: "January 12, 2023",
    title: "Perfect gift for tech friends",
    comment:
      "Bought this as a gift for a friend who's into blockchain technology. They absolutely loved it! The quality is excellent and the shipping was faster than expected.",
  },
]

const relatedProducts = [
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
    id: 8,
    name: "Filecoin Backpack",
    description: "Durable backpack with multiple compartments",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
    category: "Accessories",
  },
]
