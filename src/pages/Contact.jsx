import { useState } from "react";
import Footer from "../parts/Footer.jsx";
import { RevealX, RevealY } from "../animations/Reveal.jsx";
import { FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Hero Section - Aligned with Home_Hero */}
      <div className="relative flex h-[350px] justify-center bg-black">
        <div className="absolute top-[60px] flex flex-col items-center text-white text-center px-6">
          <RevealY>
            <p className="text-5xl font-bold mt-4">Napište, cinkněte, nebo doražte</p>
          </RevealY>
          <RevealY>
            <p className="text-sm text-gray-300 max-w-2xl mt-4 leading-relaxed">
              Něco nehraje s objednávkou? Chcete pomoct vybrat ty pravé brýle na vaši tvář, nebo si je prostě chcete vyzkoušet naživo? Jsme lidi, ne roboti – ozvěte se a společně to vyřešíme.
            </p>
          </RevealY>
        </div>
      </div>

      <div className="mx-24 py-16">
        <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
          
          {/* Left Column: Contact info cards */}
          <div className="flex flex-col gap-6 w-full lg:w-[380px] shrink-0">
            <RevealX>
              <div className="space-y-6">
                <div>
                  <p className="text-brand-blue uppercase font-bold text-xs tracking-wider mb-2">Kde nás najdete</p>
                  <p className="text-3xl font-bold mb-4">Kontaktní spojka</p>
                </div>

                {/* Address Card */}
                <div className="bg-white p-5 rounded-xl border-2 border-blue-300 flex gap-4 items-start shadow-sm">
                  <div className="text-brand-blue mt-1">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Prodejna a výdejní místo</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Avenue Gustave Eiffel<br />
                      75007 Paříž, Francie
                    </p>
                  </div>
                </div>

                {/* Clock Card */}
                <div className="bg-white p-5 rounded-xl border-2 border-blue-300 flex gap-4 items-start shadow-sm">
                  <div className="text-brand-blue mt-1">
                    <FaClock size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Otevírací doba prodejny</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Pondělí - Pátek: 9:00 - 18:00<br />
                      Sobota - Neděle: Zavřeno
                    </p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-white p-5 rounded-xl border-2 border-blue-300 flex gap-4 items-start shadow-sm">
                  <div className="text-brand-blue mt-1">
                    <FaPhoneAlt size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Zákaznická linka</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Po - Pá (9:00 - 17:00):<br />
                      <a href="tel:+420777123456" className="text-brand-blue font-bold hover:underline">+420 777 123 456</a>
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white p-5 rounded-xl border-2 border-blue-300 flex gap-4 items-start shadow-sm">
                  <div className="text-brand-blue mt-1">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">E-mailová adresa</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Dotazy k objednávkám:<br />
                      <a href="mailto:info@tohlechces.cz" className="text-brand-blue font-bold hover:underline">info@tohlechces.cz</a>
                    </p>
                  </div>
                </div>
              </div>
            </RevealX>
          </div>

          {/* Right Column: Contact form & Map */}
          <div className="flex-1 w-full space-y-8">
            {/* Contact Form - styled like Developer Forms */}
            <RevealX direction="left">
              <div className="bg-gray-100 rounded-xl p-8 border-2 border-gray-300 shadow-sm">
                <p className="text-2xl font-bold text-gray-800 mb-6">Napište nám zprávu</p>
                
                {submitted ? (
                  <div className="bg-white border-2 border-brand-blue text-gray-800 rounded-xl p-6 text-center animate-fade-in">
                    <p className="font-bold text-lg text-brand-blue">Zpráva byla úspěšně odeslána!</p>
                    <p className="text-xs text-gray-500 mt-2">Děkujeme za váš dotaz. Naši specialisté se vám ozvou hned, jak to bude možné (zpravidla do 24 hodin).</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-bold text-gray-600 mb-1">Jméno a příjmení *</p>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border-2 border-blue-500 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                          placeholder="Jan Novák"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-600 mb-1">E-mail *</p>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border-2 border-blue-500 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                          placeholder="jan.novak@email.cz"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-bold text-gray-600 mb-1">Telefonní číslo</p>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-md border-2 border-blue-500 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                          placeholder="+420 123 456 789"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-600 mb-1">Předmět zprávy *</p>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border-2 border-blue-500 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                          placeholder="Dotaz na produkt / objednávku..."
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Vaše zpráva *</p>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full rounded-md border-2 border-blue-500 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none bg-white"
                        placeholder="Napište nám, co vás zajímá..."
                      ></textarea>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition"
                      >
                        <FaPaperPlane size={12} />
                        <span>Odeslat zprávu</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </RevealX>

            {/* Google Map Embed */}
            <RevealX direction="left">
              <div className="flex w-full flex-col items-center justify-center rounded border-2 border-gray-300 p-2 bg-white h-[350px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615668612!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1625682025219!5m2!1sen!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "6px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa prodejny TohleChces"
                ></iframe>
              </div>
            </RevealX>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
