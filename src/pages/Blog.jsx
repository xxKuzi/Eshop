import { useData } from "../parts/Memory.jsx";
import Footer from "../parts/Footer.jsx";
import { RevealY } from "../animations/Reveal.jsx";
import { Link } from "react-router-dom";

export default function Blog() {
  const { blogs } = useData();

  return (
    <div>
      <div className="mx-24 flex flex-col items-start mt-8">
        <p className="mt-5 text-3xl font-bold">Náš Blog & Články</p>
        <p className="text-gray-500 mt-2">
          Zajímá vás, jak správně vybrat brýle, jak o ně pečovat, nebo jaké technologie se dnes používají? Přečtěte si naše odborné články.
        </p>

        <div className="mt-3 flex flex-wrap justify-center rounded-xl bg-gray-100 p-5 w-full">
          {blogs.map((post) => (
            <RevealY key={post.id}>
              <div className="m-3 rounded border-2 border-blue-300 bg-white">
                <div className="flex h-[420px] min-w-[318px] max-w-[318px] flex-initial flex-col items-center rounded-xl pb-4 pt-2">
                  <Link className="flex flex-col justify-center text-center px-4" to={`/blog/${post.id}`}>
                    <img className="h-[220px] w-full object-cover rounded-t-lg" src={post.image ? (post.image.startsWith("http") || post.image.startsWith("/") ? post.image : `/${post.image}`) : "/wide.jpg"} alt={post.title} />
                    <p className="text-xl font-bold mt-2 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2 px-2">{post.summary}</p>
                  </Link>
                  <Link
                    to={`/blog/${post.id}`}
                    className="button__submit button button__small mt-4 text-white text-center inline-block"
                  >
                    Číst více
                  </Link>
                </div>
              </div>
            </RevealY>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
