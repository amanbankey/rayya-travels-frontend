import { channels } from "../../data/contactData";
import Reveal from "../../components/Reveal";

const ConnectChannels = () => (
  <section className="bg-ivory px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-[1000px]">
      <Reveal>
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Direct Channels</p>
          <h2 className="mt-3  text-3xl text-ink sm:text-4xl lg:text-5xl">Choose How You’d Like to Connect</h2>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {channels.map((channel, index) => (
          <Reveal key={channel.title} delay={index * 120}>
            <article className="flex h-full flex-col rounded-md bg-oat p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-1 hover:ring-darkBlue">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-brown">{channel.tag}</p>
              <h3 className="mt-4  text-2xl font-medium text-ink">{channel.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{channel.text}</p>
              <p className="mt-5 break-words text-lg font-medium text-brown">{channel.value}</p>
              <a
                href={channel.href}
                className={`mt-2 block rounded-sm py-3.5 text-center text-sm font-medium transition-all hover:shadow-md ${
                  channel.primary ? "bg-brown text-white hover:bg-[#8b6538]" : "bg-white text-ink hover:bg-ivory"
                }`}
              >
                {channel.action}
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ConnectChannels;