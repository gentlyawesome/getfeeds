import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FadeUp } from './fade-up'

export default function CallToAction() {
    return (
        <FadeUp>
        <section className="py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Get feedback. Instantly.</h2>
                    <p className="mt-4">Free forever for your first link. Upgrade anytime.</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/">
                                <span>→ Create Free Link</span>
                            </Link>
                        </Button>

                        {/* <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="/">
                                <span>Book Demo</span>
                            </Link>
                        </Button> */}
                    </div>
                </div>
            </div>
        </section>
        </FadeUp>
    )
}