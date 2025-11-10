import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from 'lucide-react'

// "use client"

import { FadeUp } from './fade-up'
export default function Features() {
    return (
        <FadeUp>
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-3xl font-semibold lg:text-4xl">Designed for creators, teams, and professionals like you</h2>
                    <p>GetFeeds: Feedback made simple. One shareable link to collect ratings and insights that help you grow — perfect for creators, students, and leaders.</p>
                </div>

                {/* <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3"> */}
                <div className="relative mx-auto grid max-w-4xl divide-x divide-y border border-gray-400 divide-gray-400 *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Fast</h3>
                        </div>
                        <p className="text-sm">It supports an entire experience helping developers and creators collect feedback instantly.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Powerful</h3>
                        </div>
                        <p className="text-sm">It supports an entire system helping individuals and teams grow through real insights.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Fingerprint className="size-4" />

                            <h3 className="text-sm font-medium">Secure</h3>
                        </div>
                        <p className="text-sm">It supports an entire process helping users and businesses keep feedback private and safe.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Pencil className="size-4" />

                            <h3 className="text-sm font-medium">Customizable</h3>
                        </div>
                        <p className="text-sm">It supports an entire design helping users shape how feedback looks and feels.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-4" />

                            <h3 className="text-sm font-medium">Control</h3>
                        </div>
                        <p className="text-sm">It supports an entire platform helping users manage responses and visibility with ease.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />

                            <h3 className="text-sm font-medium">Built for AI</h3>
                        </div>
                        <p className="text-sm">It supports an entire flow helping developers and businesses get smarter with AI-driven insights.</p>
                    </div>
                </div>
            </div>
        </section>
        </FadeUp>
    )
}