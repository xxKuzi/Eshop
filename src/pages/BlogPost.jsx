import { useParams, Link } from "react-router-dom";
import { useData } from "../parts/Memory.jsx";
import Footer from "../parts/Footer.jsx";
import { FaArrowLeft } from "react-icons/fa";

export default function BlogPost() {
  const { id } = useParams();
  const { blogs } = useData();

  // Find the blog post by id
  const post = blogs.find((b) => b.id === Number(id));

  const isInitialLoading = blogs.length === 1 && blogs[0].title === "";

  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500 font-medium">Načítání článku...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center bg-white p-10 rounded-xl border-2 border-gray-300 max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Článek nenalezen</h2>
          <p className="text-gray-500 mb-6">Je nám líto, ale požadovaný článek neexistuje nebo byl smazán.</p>
          <Link to="/blog" className="button button__small button__black inline-block text-center text-sm font-semibold">
            Zpět na blog
          </Link>
        </div>
      </div>
    );
  }

  // Split content by newlines to render as multiple paragraphs
  const paragraphs = post.content ? post.content.split("\n") : [];

  // Resolve image source to an absolute path if it is relative
  const imageSrc = post.image || "wide.jpg";
  const absoluteImageSrc = (imageSrc.startsWith("http://") || imageSrc.startsWith("https://") || imageSrc.startsWith("/"))
    ? imageSrc
    : `/${imageSrc}`;

  return (
    <div>
      <div className="mx-16 my-16 flex flex-col">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Image */}
          <div className="flex lg:w-[50vw] flex-col items-center justify-center rounded border-2 border-gray-300 p-4 bg-white">
            <img
              src={absoluteImageSrc}
              alt={post.title}
              className="max-h-[450px] w-full object-cover rounded"
            />
          </div>

          {/* Right Column - Text Details */}
          <div className="flex flex-1 flex-col items-start justify-start px-2">
            <p className="text-sm text-gray-400 mt-2">Publikováno: {post.date}</p>
            <p className="headline__big font-bold mt-4 text-gray-800">{post.title}</p>
            
            <p className="mt-6 text-lg text-gray-600 font-medium border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/30 rounded-r-lg w-full">
              {post.summary}
            </p>

            <div className="w-full border-[1px] my-6 border-gray-200"></div>

            <div className="space-y-6 text-gray-700 leading-relaxed text-base">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <Link
              to="/blog"
              className="button button__small button__black mt-8 inline-flex items-center gap-2"
            >
              <FaArrowLeft size={12} />
              Zpět na všechny články
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
