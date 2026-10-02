// import { Quote } from "lucide-react";
// import { pillars } from "../../data/aboutData";
// import Reveal from "../../components/Reveal";

// const ThoughtfulPlanning = () => (
//   <section className="bg-oat px-4 py-16 sm:px-8 lg:py-20">
//     <div className="mx-auto max-w-[1000px] text-center">
//       <Reveal>
//         <Quote size={28} className="mx-auto fill-[#c4a982] text-[#c4a982]" />
//         <h2 className="mt-3  text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
//           “Every Journey Deserves Thoughtful Planning”
//         </h2>
//         <p className="mx-auto mt-5 max-w-[620px] text-base leading-relaxed text-ink/75">
//           Whether you are planning a relaxing holiday, a business trip, a group tour, or urgent crew travel
//           arrangements, we strive to provide professional support and dependable travel solutions.
//         </p>
//       </Reveal>

//       <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-2 gap-4 lg:grid-cols-4">
//         {pillars.map((pillar, index) => (
//           <Reveal key={pillar.number} delay={index * 100}>
//             <div className="flex min-h-[110px] flex-col items-center rounded-sm bg-white px-3 py-5 shadow-sm transition-transform duration-300 hover:-translate-y-1">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brown">Pillar {pillar.number}</p>
//               <h3 className="mt-2 text-base font-medium uppercase leading-snug text-ink sm:text-lg">{pillar.title}</h3>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default ThoughtfulPlanning;


import { Quote } from "lucide-react";
import { pillars } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const ThoughtfulPlanning = () => (
  <section className="bg-oat px-4 py-16 sm:px-8 lg:py-20">
    <div className="mx-auto max-w-[1000px] text-center">
      <Reveal>
        <Quote size={28} className="mx-auto fill-[#b89f80] text-[#b89f80]" />
        <h2 className="mt-3  text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          “Every Journey Deserves Thoughtful Planning”
        </h2>
        <p className="mx-auto mt-5 max-w-[680px] text-base leading-relaxed text-ink/75">
          Whether you are planning a relaxing holiday, a business trip, a group tour, or urgent crew travel
          arrangements, we strive to provide professional support and dependable travel solutions.
        </p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-[985px] grid-cols-2 gap-4 lg:grid-cols-4">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.number} delay={index * 100}>
            <div className="flex min-h-[120px] flex-col items-center rounded-sm bg-white px-3 py-5 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brown">Pillar {pillar.number}</p>
              <h3 className="mt-2 text-base font-medium uppercase leading-snug text-ink sm:text-lg">{pillar.title}</h3>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ThoughtfulPlanning;