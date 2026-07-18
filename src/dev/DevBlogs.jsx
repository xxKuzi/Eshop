import { useState, useEffect } from "react";
import { useData } from "../parts/Memory";
import { MdDelete, MdFileUpload } from "react-icons/md";
import Input from "../components/Input_normal";
import { Link } from "react-router-dom";

export default function DevBlogs() {
  const { blogs, addToBlogs, deleteFromBlogs, updateBlog } = useData();

  const [addForm, setAddForm] = useState({
    title: "",
    summary: "",
    content: "",
    image: "wide.jpg",
  });

  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    summary: "",
    content: "",
    image: "wide.jpg",
  });

  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    if (blogs && blogs.length > 0 && selectedId === "") {
      setSelectedId(blogs[0].id.toString());
      setEditForm(blogs[0]);
    }
  }, [blogs, selectedId]);

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectBlog = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const post = blogs.find((b) => b.id.toString() === id);
    if (post) {
      setEditForm(post);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!addForm.title || !addForm.summary || !addForm.content) {
      alert("Vyplňte prosím všechna povinná pole!");
      return;
    }
    await addToBlogs(addForm);
    setAddForm({
      title: "",
      summary: "",
      content: "",
      image: "wide.jpg",
    });
    alert("Článek byl přidán do blogu!");
  };

  const handleUpdateSubmit = async () => {
    if (selectedId === "") return;
    await updateBlog(Number(selectedId), {
      title: editForm.title,
      summary: editForm.summary,
      content: editForm.content,
      image: editForm.image,
    });
    alert("Článek byl úspěšně aktualizován!");
  };

  const handleDeleteSubmit = async () => {
    if (selectedId === "") return;
    if (window.confirm("Opravdu chcete tento článek smazat?")) {
      await deleteFromBlogs(Number(selectedId));
      setSelectedId("");
      alert("Článek byl smazán.");
    }
  };

  const actualLookPost = blogs.find((b) => b.id.toString() === selectedId);

  return (
    <div className="mt-5 flex justify-center">
      <div className="w-128 mt-5 flex flex-col items-center rounded-xl border-4 p-6">
        <p className="headline__big font-bold">Správa Blogu</p>

        {/* Add Blog Form */}
        <div className="mt-6 flex flex-col items-center rounded-lg border-2 p-6">
          <p className="headline__small font-semibold">Přidat Článek</p>
          <form onSubmit={handleAddSubmit} className="w-full mt-4 flex flex-col items-center">
            <p className="mt-6">Název článku *</p>
            <Input value={addForm.title} name="title" onChange={handleAddChange} />
            <p>Stručný popis (summary) *</p>
            <Input value={addForm.summary} name="summary" onChange={handleAddChange} />
            <p>Obrázek (URL / název) *</p>
            <Input value={addForm.image} name="image" onChange={handleAddChange} />
            <p className="mt-3">Obsah článku *</p>
            <textarea
              name="content"
              value={addForm.content}
              onChange={handleAddChange}
              rows="6"
              className="w-full rounded-md border-2 border-blue-500 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none bg-white mt-1"
              placeholder="Napište obsah článku..."
            ></textarea>
            
            <button
              type="submit"
              className="mt-5 rounded-xl bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
            >
              Uložit do blogu
            </button>
          </form>
        </div>

        {/* Update / Delete Blog Form - Aligned with DevProducts side-by-side */}
        <div className="mt-6 flex flex-col items-center rounded-lg border-2 p-6 w-full">
          <div className="mt-2 flex items-center">
            <p className="headline__small mr-4 font-semibold">Upravit Článek</p>
            <select
              value={selectedId}
              onChange={handleSelectBlog}
              className="rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm"
            >
              <option value="" disabled>Vyberte článek...</option>
              {blogs.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id + " " + b.title}
                </option>
              ))}
            </select>
          </div>

          {selectedId !== "" && actualLookPost && (
            <div className="flex">
              <div className="flex flex-wrap">
                <div className="mt-8 flex flex-col items-center">
                  <div className="flex">
                    {/* Editing Form Column */}
                    <div className="min-w-15 mx-3 mt-5 flex w-64 flex-initial flex-col items-center rounded-xl bg-white text-center">
                      <p className="headline__extraSmall font-bold">For Updating</p>
                      <p>------------------------------------</p>
                      <input
                        type="text"
                        name="title"
                        className="text-center text-lg font-semibold border-b focus:outline-none"
                        value={editForm.title}
                        onChange={handleEditChange}
                      />
                      <div className="mt-2 flex justify-center">
                        <Link className="mr-1 flex h-20 w-20" to={`/blog/${selectedId}`}>
                          <img className="h-20 w-max object-cover rounded" src={editForm.image || "wide.jpg"} />
                        </Link>
                        <div className="flex flex-col justify-center">
                          <button
                            title="delete"
                            onClick={handleDeleteSubmit}
                          >
                            <MdDelete size="25" />
                          </button>
                          <button
                            className="mt-1"
                            title="update"
                            onClick={handleUpdateSubmit}
                          >
                            <MdFileUpload size="25" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 flex">
                        <p className="w-[80px] text-left">summary:</p>
                        <input
                          type="text"
                          name="summary"
                          className="text-center border-b focus:outline-none w-[120px]"
                          value={editForm.summary}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="mt-3 flex">
                        <p className="w-[80px] text-left">image:</p>
                        <input
                          type="text"
                          name="image"
                          className="text-center border-b focus:outline-none w-[120px]"
                          value={editForm.image}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="flex mt-3">
                        <p className="w-[80px] text-left">content:</p>
                        <input
                          type="text"
                          name="content"
                          className="text-center border-b focus:outline-none w-[120px]"
                          value={editForm.content}
                          onChange={handleEditChange}
                        />
                      </div>
                    </div>

                    {/* Actual Look Column */}
                    <div className="min-w-15 mx-3 mt-5 flex w-64 flex-initial flex-col items-center rounded-xl bg-white p-3 text-center border">
                      <p className="headline__extraSmall font-bold">Actual look</p>
                      <p>------------------------------------</p>
                      <p className="text-lg font-semibold">{actualLookPost.title}</p>
                      <Link className="mt-2 flex justify-center" to={`/blog/${selectedId}`}>
                        <img className="h-20 w-max object-cover rounded" src={actualLookPost.image || "wide.jpg"} />
                      </Link>
                      <p className="mt-3 text-xs text-gray-500 leading-snug line-clamp-3">{actualLookPost.summary}</p>
                      <p className="text-[10px] text-gray-400 mt-2">{actualLookPost.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
