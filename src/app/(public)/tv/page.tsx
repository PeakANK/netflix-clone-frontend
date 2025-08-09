// import {
//   getPopularTV,
//   getTopRatedTV,
//   getOnTheAirTV,
// } from "@/lib/movies";
// import Hero from "@/components/composite/Hero";
// import SectionRow from "@/components/composite/SectionRow";

// export default async function TVPage() {
//   const [popular, topRated, onTheAir] = await Promise.all([
//     getPopularTV(1),
//     getTopRatedTV(1),
//     getOnTheAirTV(1),
//   ]);

//   const heroItem = popular.results?.[0] || topRated.results?.[0];

//   return (
//     <div className="bg-black text-white min-h-screen">
//       {heroItem && <Hero item={heroItem} />}
//       <main className="-mt-24 relative z-10 pb-20 space-y-10">
//         <SectionRow title="Popular TV Shows" items={popular.results} />
//         <SectionRow title="Top Rated TV Shows" items={topRated.results} />
//         <SectionRow title="Currently Airing" items={onTheAir.results} />
//       </main>
//     </div>
//   );
// }
