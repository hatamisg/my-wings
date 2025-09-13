import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { HeroHeader } from './header'
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import {
    SiNodedotjs,
    SiTypescript,
    SiKotlin,
    SiReact,
    SiNextdotjs,
    SiSwift,
    SiLaravel,
    SiGit,
    SiDocker,
    SiMysql,
    SiSupabase,
    SiFirebase
} from "react-icons/si";
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section>
                    <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
                        <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">Ship 10x Faster with NS</h1>
                                <p className="mt-8 max-w-2xl text-pretty text-lg">Highly customizable components for building modern websites and applications that look and feel the way you mean it.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="px-5 text-base">
                                        <Link href="#link">
                                            <span className="text-nowrap">Start Building</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="px-5 text-base">
                                        <Link href="#link">
                                            <span className="text-nowrap">Request a demo</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <Image
  className="order-first ml-auto h-56 w-full object-contain sm:h-96 
             lg:absolute lg:inset-0 lg:-right-40 lg:-top-20 lg:order-last 
             lg:h-auto lg:w-2/3"
  src="/doni.webp"
  alt="Hero background"
  width={3000}
  height={4000}
  sizes="(min-width: 1024px) 66vw, 100vw"
  priority
  unoptimized
/>

                        </div>
                    </div>
                </section>
                <section className="bg-background pb-16 md:pb-32">
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
                                        <SiNodedotjs
                                            className="mx-auto h-6 w-6 text-green-600 dark:text-green-400"
                                            title="Node.js"
                                        />
                                    </div>

                                    <div className="flex">
                                        <SiTypescript
                                            className="mx-auto h-6 w-6 text-blue-600 dark:text-blue-400"
                                            title="TypeScript"
                                        />
                                    </div>
                                    
                                    <div className="flex">
                                        <SiKotlin
                                            className="mx-auto h-6 w-6 text-purple-600 dark:text-purple-400"
                                            title="Kotlin"
                                        />
                                    </div>
                                    
                                    <div className="flex">
                                        <SiReact
                                            className="mx-auto h-6 w-6 text-cyan-500 dark:text-cyan-400"
                                            title="React.js"
                                        />
                                    </div>
                                    
                                    <div className="flex">
                                        <SiNextdotjs
                                            className="mx-auto h-6 w-6 text-black dark:text-white"
                                            title="Next.js"
                                        />
                                    </div>
                                    
                                    <div className="flex">
                                        <SiSwift
                                            className="mx-auto h-6 w-6 text-orange-500 dark:text-orange-400"
                                            title="SwiftUI"
                                        />
                                    </div>
                                    
                                    <div className="flex">
                                        <SiLaravel
                                            className="mx-auto h-6 w-6 text-red-600 dark:text-red-400"
                                            title="Laravel"
                                        />
                                    </div>
                                    
                                    <div className="flex">
                                        <SiGit
                                            className="mx-auto h-6 w-6 text-orange-600 dark:text-orange-400"
                                            title="Git"
                                        />
                                    </div>

                                    <div className="flex">
                                        <SiDocker
                                            className="mx-auto h-6 w-6 text-blue-500 dark:text-blue-400"
                                            title="Docker"
                                        />
                                    </div>
                                    
                                    <div className="flex">
                                        <SiMysql
                                            className="mx-auto h-6 w-6 text-blue-700 dark:text-blue-500"
                                            title="MySQL"
                                        />
                                    </div>
                                    
                                    <div className="flex">
                                        <SiSupabase
                                            className="mx-auto h-6 w-6 text-green-500 dark:text-green-400"
                                            title="Supabase"
                                        />
                                    </div>
                                    
                                    <div className="flex">
                                        <SiFirebase
                                            className="mx-auto h-6 w-6 text-yellow-500 dark:text-yellow-400"
                                            title="Firebase"
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
                </section>
            </main>
        </>
    )
}
