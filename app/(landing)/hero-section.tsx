// import React from 'react'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import { HeroHeader } from "./header"
// import { Sparkle } from 'lucide-react'

// export default function HeroSection() {
//     return (
//         <>
//             <HeroHeader />
//             <main>
//                 <section className="">
//                     <div className="py-20 md:py-36">
//                         <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
//                             <div>
//                                 <Link
//                                     href="#"
//                                     className="hover:bg-foreground/5 mx-auto flex w-fit items-center justify-center gap-2 rounded-md py-0.5 pl-1 pr-3 transition-colors duration-150">
//                                     <div
//                                         aria-hidden
//                                         className="border-background bg-linear-to-b dark:inset-shadow-2xs to-foreground from-primary relative flex size-5 items-center justify-center rounded border shadow-md shadow-black/20 ring-1 ring-black/10">
//                                         <div className="absolute inset-x-0 inset-y-1.5 border-y border-dotted border-white/25"></div>
//                                         <div className="absolute inset-x-1.5 inset-y-0 border-x border-dotted border-white/25"></div>
//                                         <Sparkle className="size-3 fill-background stroke-background drop-shadow" />
//                                     </div>
//                                     <span className="font-medium">Introducing AI Agents</span>
//                                 </Link>
//                                 <h1 className="mx-auto mt-8 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">Build 10x Faster with Starter</h1>
//                                 <p className="text-muted-foreground mx-auto my-6 max-w-xl text-balance text-xl">Craft. Build. Ship Modern Websites With AI Support.</p>

//                                 <div className="flex items-center justify-center gap-3">
//                                     <Button
//                                         asChild
//                                         size="lg">
//                                         <Link href="#link">
//                                             <span className="text-nowrap">Start Building</span>
//                                         </Link>
//                                     </Button>
//                                     <Button
//                                         asChild
//                                         size="lg"
//                                         variant="outline">
//                                         <Link href="#link">
//                                             <span className="text-nowrap">Watch Video</span>
//                                         </Link>
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="relative">
//                             <div className="relative z-10 mx-auto max-w-5xl px-6">
//                                 <div className="mt-12 md:mt-16">
//                                     <div className="bg-background rounded-(--radius) relative mx-auto overflow-hidden border border-transparent shadow-lg shadow-black/10 ring-1 ring-black/10">
//                                         <Image
//                                             src="/hero-section-main-app-dark.png"
//                                             alt="app screen"
//                                             width={2880}
//                                             height={1842}
//                                             priority
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </>
//     )
// }

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroHeader } from './header'

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="">
                <section>
                    <div className="pb-15 pt-20 md:pb-32 lg:pb-40 lg:pt-35">
                        <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                <h1 className="mt-8 max-w-3xl text-balance text-3xl font-semibold md:text-3xl lg:mt-16 xl:text-5xl">Get honest feedback, anywhere — all from one simple link.</h1>
                                <p className="mt-8 max-w-2xl text-pretty text-lg">Create your profile, share your unique link or QR, and start collecting real feedback in seconds.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="px-5 text-base">
                                        <Link href="#link">
                                            <span className="text-nowrap">Create My Link ⟶</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="px-5 text-base">
                                        <Link href="#link">
                                            <span className="text-nowrap">See How It Works</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative order-first mx-auto h-64 w-auto max-w-sm sm:h-80 sm:max-w-md lg:absolute lg:right-0 lg:top-1/2 lg:order-last lg:h-96 lg:max-w-lg lg:-translate-y-1/2 xl:h-112 xl:max-w-xl">
                                <Image
                                    className="h-full w-full object-contain"
                                    src="https://i.ibb.co/ccWddzsb/Mockup-1.png"
                                    alt="Product Mockup"
                                    width={500}
                                    height={500}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Logo Cloud */}
                {/* <section className="bg-background pb-16 md:pb-32">
                    <div className="group relative m-auto max-w-6xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6">
                                <p className="text-end text-sm">Powering the best teams</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    speedOnHover={20}
                                    speed={40}
                                    gap={112}>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-5 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                            alt="Nvidia Logo"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>

                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/column.svg"
                                            alt="Column Logo"
                                            height="16"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/github.svg"
                                            alt="GitHub Logo"
                                            height="16"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-5 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/nike.svg"
                                            alt="Nike Logo"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-5 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                                            alt="Lemon Squeezy Logo"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/laravel.svg"
                                            alt="Laravel Logo"
                                            height="16"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-7 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/lilly.svg"
                                            alt="Lilly Logo"
                                            height="28"
                                            width="auto"
                                        />
                                    </div>

                                    <div className="flex">
                                        <img
                                            className="mx-auto h-6 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/openai.svg"
                                            alt="OpenAI Logo"
                                            height="24"
                                            width="auto"
                                        />
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section> */}
            </main>
        </>
    )
}