import Footer from "../parts/Footer.jsx";
import { RevealX, RevealY } from "../animations/Reveal.jsx";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineSafety, AiOutlineThunderbolt, AiOutlineSmile, AiOutlineRetweet } from "react-icons/ai";

export default function AboutUs() {
  const team = [
    {
      name: "Petr",
      role: "Majitel a zakladatel",
      desc: "Stojí za celou vizí firmy - od prvního nápadu až po dnešní podobu. Každý den se stará o to, aby všechno fungovalo, jak má.",
      initials: "A",
    },
    {
      name: "Lukáš",
      role: "Provozní ředitel",
      desc: "Stará se o to, aby všechno ve firmě fungovalo tak, jak má - od lidí až po každodenní provoz a logistiku.",
      initials: "F",
    },
    {
      name: "Kája",
      role: "Marketingová specialistka",
      desc: "Má pod palcem naše sociální sítě - tvoří obsah, komunikuje se sledujícími a stará se o to, aby nás bylo vidět i slyšet.",
      initials: "T",
    },
    {
      name: "Léňa",
      role: "Zákaznická podpora",
      desc: "Pomáhá zákazníkům s dotazy, objednávkami i výběrem a vždy se snaží najít to nejlepší možné řešení.",
      initials: "M",
    },
  ];

  return (
    <div>
      {/* Hero Section - Aligned with Home_Hero */}
      <div className="relative flex h-[480px] justify-center bg-black">
        <div className="absolute top-[60px] flex flex-col items-center text-white text-center px-6">
          <RevealY>
            <p className="mt-6 text-5xl font-bold">Neděláme z brýlí vědu.</p>
          </RevealY>
          <RevealY>
            <p className="text-brand-blue text-7xl font-bold mt-4">Děláme z nich styl.</p>
          </RevealY>
          <RevealY>
            <p className="text-sm md:text-base text-gray-300 max-w-3xl mt-6 leading-relaxed">
              TohleChces je e-shop pro ty, co nechtějí platit nesmyslné částky za loga světoznámých značek, ale přesto vyžadují špičkovou kvalitu a ochranu očí. Naše brýle netestujeme ve sterilních laboratořích, ale přímo v terénu – při divokých sjezdech na biku, na ostrém slunci u vody i při ranním běhu v mlze. Vznikli jsme v roce 2024 s jasnou misí: přinést brýle, které perfektně sedí, vydrží drsné zacházení a jejich cena vám neprovětrá peněženku.
            </p>
          </RevealY>

          {/* Social Links */}
          <RevealY>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Sleduj nás:</span>
              <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-300 hover:text-brand-blue transition">
                  <FaFacebook size={16} />
                  <span className="text-xs font-bold">Facebook</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-300 hover:text-brand-blue transition">
                  <FaInstagram size={16} />
                  <span className="text-xs font-bold">Instagram</span>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-300 hover:text-brand-blue transition">
                  <FaTiktok size={16} />
                  <span className="text-xs font-bold">TikTok</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-300 hover:text-brand-blue transition">
                  <FaYoutube size={16} />
                  <span className="text-xs font-bold">YouTube</span>
                </a>
              </div>
            </div>
          </RevealY>
        </div>
      </div>

      {/* Trust Metrics Section - Aligned with Catalog Container layout */}
      <div className="mx-24 flex flex-col items-start mt-8">
        <p className="text-3xl font-bold">Proč jít do toho s námi</p>
        <div className="mt-3 flex flex-wrap justify-center rounded-xl bg-gray-100 p-5 w-full">
          
          <div className="m-3 border-2 border-blue-300 rounded-xl bg-white p-6 w-[240px] flex flex-col items-center text-center shadow-sm">
            <div className="text-brand-blue mb-4">
              <AiOutlineSmile size={32} />
            </div>
            <p className="font-bold text-gray-800">Ověřeno lidmi</p>
            <p className="text-xs text-gray-500 mt-2">
              <span className="font-bold text-brand-blue text-sm">98 %</span> spokojenost na Heureka.cz
            </p>
          </div>

          <div className="m-3 border-2 border-blue-300 rounded-xl bg-white p-6 w-[240px] flex flex-col items-center text-center shadow-sm">
            <div className="text-brand-blue mb-4">
              <AiOutlineSafety size={32} />
            </div>
            <p className="font-bold text-gray-800">100% Odolnost</p>
            <p className="text-xs text-gray-500 mt-2">
              Každý model sami <span className="font-bold text-brand-blue">týráme venku</span> před spuštěním prodeje
            </p>
          </div>

          <div className="m-3 border-2 border-blue-300 rounded-xl bg-white p-6 w-[240px] flex flex-col items-center text-center shadow-sm">
            <div className="text-brand-blue mb-4">
              <AiOutlineThunderbolt size={32} />
            </div>
            <p className="font-bold text-gray-800">Expresní odeslání</p>
            <p className="text-xs text-gray-500 mt-2">
              Zásilku předáváme dopravci <span className="font-bold text-brand-blue">do 24 hodin</span>
            </p>
          </div>

          <div className="m-3 border-2 border-blue-300 rounded-xl bg-white p-6 w-[240px] flex flex-col items-center text-center shadow-sm">
            <div className="text-brand-blue mb-4">
              <AiOutlineRetweet size={32} />
            </div>
            <p className="font-bold text-gray-800">Žádný stres s vrácením</p>
            <p className="text-xs text-gray-500 mt-2">
              Nesedí? Vyměníme nebo vrátíme peníze <span className="font-bold text-brand-blue">do 14 dnů bez dotazů</span>
            </p>
          </div>

        </div>
      </div>

      {/* Our Story Section */}
      <div className="mx-24 mt-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <RevealX>
            <div className="max-w-xl">
              <p className="text-brand-blue uppercase font-bold text-xs tracking-wider mb-2">Jak to začalo</p>
              <p className="text-3xl font-bold mb-4">Hledali jsme skvělé brýle, ale trh nám nabízel jen extrémy</p>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                <p>
                  Jako nadšení sportovci a venkovní tvorové jsme pořád dokola řešili stejné dilema. Buď si koupíte předražené brýle prestižních značek, o které se pak bojíte při každém položení na stůl či pádu z kola, nebo levné plastové křápy z benzínky, přes které je vidět všechno kromě reálného světa a po hodině z nich bolí hlava.
                </p>
                <p>
                  Tak jsme se naštvali a řekli dost. Rozhodli jsme se vyšlapat vlastní cestu a přinést na trh špičkové technologie – jako jsou fotochromatická (samozabarvovací) skla, polarizace a lehké TR90 obroučky – za cenu, která dává smysl.
                </p>
                <p>
                  Po měsících zkoušení a ladění s výrobci jsme pustili ven první kousky. Dnes u nás nakupují cyklisté, běžci, horolezci i ti, co prostě hledají stylové brýle na terasu. Každé brýle sami hrdě nosíme a stojíme si za nimi na sto procent.
                </p>
              </div>
            </div>
          </RevealX>
          <RevealX direction="left">
            <div className="flex w-[40vw] flex-col items-center justify-center rounded border-2 border-gray-300 p-3 bg-white">
              <img
                src="wide.jpg"
                alt="Sportovní brýle v akci"
                className="rounded-lg max-h-[350px] w-full object-cover"
              />
            </div>
          </RevealX>
        </div>
      </div>

      {/* Team Section - Aligned with Catalog Container layout */}
      <div className="mx-24 mt-16 flex flex-col items-start w-[calc(100%-12rem)]">
        <p className="text-3xl font-bold">Poznej náš tým</p>
        <p className="text-gray-500 mt-2">
          Jsme parta nadšenců, kteří milují pohyb, sport a kvalitní design. Každý z nás přispívá svým dílem k tomu, abyste byli maximálně spokojeni.
        </p>

        <div className="mt-3 flex flex-wrap justify-center rounded-xl bg-gray-100 p-5 w-full">
          {team.map((member, index) => (
            <RevealY key={index}>
              <div className="m-3 rounded border-2 border-blue-300 bg-white">
                <div className="flex h-[320px] min-w-[240px] max-w-[240px] flex-col items-center rounded-xl pb-4 pt-4 px-4 text-center">
                  <div className="h-20 w-20 rounded-full bg-brand-blue text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-sm">
                    {member.initials}
                  </div>
                  <p className="text-xl font-bold text-gray-800">{member.name}</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">{member.role}</p>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed">{member.desc}</p>
                </div>
              </div>
            </RevealY>
          ))}
        </div>
      </div>

      {/* Contact & Map Section - Aligned with Catalog Container layout */}
      <div className="mx-24 mt-16 mb-16">
        <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
          {/* Contact Details */}
          <RevealX>
            <div className="max-w-xl">
              <p className="text-brand-blue uppercase font-bold text-xs tracking-wider mb-2">Kontakt</p>
              <p className="text-3xl font-bold mb-4">Zastav se u nás na prodejně</p>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Rádi ti poradíme s výběrem či doporučíme, jaké brýle by mohly vyhovovat tvým požadavkům. Na prodejně si můžeš osobně vyzvednout svou objednávku z e-shopu, vyzkoušet si všechny modely nebo se jen stavit na kus řeči.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded border-2 border-blue-300 bg-white flex p-4 gap-4 items-start w-[260px]">
                  <div className="text-brand-blue mt-1"><FaMapMarkerAlt size={18} /></div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Adresa prodejny</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Avenue Gustave Eiffel<br />
                      75007 Paříž, Francie
                    </p>
                  </div>
                </div>

                <div className="rounded border-2 border-blue-300 bg-white flex p-4 gap-4 items-start w-[260px]">
                  <div className="text-brand-blue mt-1"><FaClock size={18} /></div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Otevírací doba</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Pondělí - Pátek:<br />
                      9:00 - 18:00
                    </p>
                  </div>
                </div>

                <div className="rounded border-2 border-blue-300 bg-white flex p-4 gap-4 items-start w-[260px]">
                  <div className="text-brand-blue mt-1"><FaPhoneAlt size={18} /></div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Zavolej nám</p>
                    <p className="text-xs text-gray-500 mt-1 hover:text-brand-blue transition">
                      <a href="tel:+420777123456">+420 777 123 456</a>
                    </p>
                  </div>
                </div>

                <div className="rounded border-2 border-blue-300 bg-white flex p-4 gap-4 items-start w-[260px]">
                  <div className="text-brand-blue mt-1"><FaEnvelope size={18} /></div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Napiš nám</p>
                    <p className="text-xs text-gray-500 mt-1 hover:text-brand-blue transition">
                      <a href="mailto:info@tohlechces.cz">info@tohlechces.cz</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealX>

          {/* Map Embed */}
          <RevealX direction="left">
            <div className="flex-1 w-[40vw] min-w-[300px] lg:max-w-[480px] h-[350px] rounded-xl overflow-hidden border-2 border-gray-300 shadow-sm bg-white p-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615668612!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1625682025219!5m2!1sen!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "6px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prodejna TohleChces"
              ></iframe>
            </div>
          </RevealX>
        </div>
      </div>

      <Footer />
    </div>
  );
}
