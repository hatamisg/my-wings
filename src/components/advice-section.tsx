import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AdviceSection() {
    return (
      <section className="py-16 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <blockquote>
              <p className="text-lg font-medium sm:text-xl md:text-3xl">
                Making systems that are not just functional, but beautiful, scalable, and built to solve real problems.
              </p>

              <div className="mt-12 flex items-center justify-center gap-6">
                <Avatar className="size-12">
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>

                <div className="space-y-1 border-l pl-6">
                  <cite className="font-medium">Sam Altman</cite>
                  <span className="text-muted-foreground block text-sm">
                    CEO, OpenAI
                  </span>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>
    );
}
