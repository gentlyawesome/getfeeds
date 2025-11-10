import { FadeUp } from './fade-up'

export default function LogoCloud() {
    // Class for logo styling to enhance visibility in light/dark mode
    const logoClass =
      "h-auto logo-img max-h-7 w-auto filter grayscale contrast-200 invert-0 dark:invert dark:brightness-200 dark:contrast-125 transition";

    return (
      <FadeUp>
        <section className="bg-background py-10">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center text-balance text-3xl font-semibold lg:text-4xl">
              Trusted by creators, teams, and professionals who value real feedback.
            </h2>
            <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
              <img className={`${logoClass} h-5`} src="https://html.tailus.io/blocks/customers/nvidia.svg" alt="Nvidia Logo" />
              <img className={`${logoClass} h-4`} src="https://html.tailus.io/blocks/customers/column.svg" alt="Column Logo" />
              <img className={`${logoClass} h-4`} src="https://html.tailus.io/blocks/customers/github.svg" alt="GitHub Logo" />
              <img className={`${logoClass} h-5`} src="https://html.tailus.io/blocks/customers/nike.svg" alt="Nike Logo" />
              <img className={`${logoClass} h-4`} src="https://html.tailus.io/blocks/customers/laravel.svg" alt="Laravel Logo" />
              <img className={`${logoClass} h-7`} src="https://html.tailus.io/blocks/customers/lilly.svg" alt="Lilly Logo" />
              <img className={`${logoClass} h-5`} src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg" alt="Lemon Squeezy Logo" />
              <img className={`${logoClass} h-6`} src="https://html.tailus.io/blocks/customers/openai.svg" alt="OpenAI Logo" />
              <img className={`${logoClass} h-4`} src="https://html.tailus.io/blocks/customers/tailwindcss.svg" alt="Tailwind CSS Logo" />
              <img className={`${logoClass} h-5`} src="https://html.tailus.io/blocks/customers/vercel.svg" alt="Vercel Logo" />
              <img className={`${logoClass} h-5`} src="https://html.tailus.io/blocks/customers/zapier.svg" alt="Zapier Logo" />
            </div>
          </div>
        </section>
      </FadeUp>
    );
}