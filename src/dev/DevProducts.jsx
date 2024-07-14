import React, { useState, useRef, useEffect } from "react";
import { useData } from "../parts/Memory";
import { MdDelete } from "react-icons/md";

import { MdFileUpload } from "react-icons/md";
import Select from "../components/dev/Dev_Select.jsx";
import Input from "../components/Input_normal.jsx";

export default function DevProducts(props) {
  //#region --- --- --- --- --- --- --- --- --- --- INITIALIZATION --- --- --- --- --- --- --- --- --- ---
  const [uploadButton, setUploadButton] = useState("Upload to catalog");
  const [uploadText, setUploadText] = useState("");
  const { profile, catalog, addToCatalog, deleteFromCatalog, updateCatalog, uploadImage } = useData();
  const editor = profile.editor; //if editor mode ON
  const fileRef = useRef(); //reference to file (which is uploaded)
  const linkRef = useRef(); //reference to download link

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    inStock: 0,
    description: "",
    images: "",
  });
  const [editingForm, setEditingForm] = useState({
    name: "",
    price: 0,
    inStock: 0,
    description: "",
    images: [],
  });
  const [designForm, setDesignForm] = useState({
    name: "",
    price: 0,
    inStock: 0,
    description: "",
    images: [],
  });
  const [selectedElement, setSelectedElement] = useState("testingXYZ"); //Text on select button
  const idRef = useRef("testingXYZ"); // reference to id
  const itemRef = useRef({}); // reference to current item to render
  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- HANDLE FORMS --- --- --- --- --- --- --- --- --- ---
  function handleDataChange(e) {
    let type = e.target.name;
    let newValue = e.target.value;
    if (type === "price") {
      newValue = Number(newValue);
      newValue = String(newValue) === "NaN" ? 0 : newValue;
    }

    setFormData((prev) => ({ ...prev, [type]: newValue }));
    setUploadState("reset");
    setUploadText("");
  }

  function handleEditingForm(e) {
    let newValue = e.target.value;
    let type = e.target.name;
    if (type === "price" || type === "id") {
      newValue = Number(newValue);
      newValue = String(newValue) === "NaN" ? 0 : newValue;
    }
    setEditingForm((prev) => ({
      ...prev,
      [e.target.name]: newValue,
    }));
  }
  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- UPLOADING --- --- --- --- --- --- --- --- --- ---

  function setUploadState(state) {
    let value = "";
    switch (state) {
      case "reset":
        value = "Upload to catalog";
        break;
      case "added":
        value = "Added!";
    }
    setUploadButton(value);
  }

  //#endregion

  //#region --- --- --- --- --- --- --- --- --- --- HANDLING DATA --- --- --- --- --- --- --- --- --- ---

  function nullId() {
    idRef.current = catalog[0].id;
  }

  async function addToCatalogLocal() {
    try {
      let image = true;
      if (fileRef.current) {
        let data = await uploadImage(fileRef.current);
        linkRef.current = data.downloadURL;
      } else {
        image = false;
      }

      addToCatalog({
        ...formData,
        images: fileRef.current ? [{ url: linkRef.current, id: 0 }] : [],
      });
      setUploadState("added");
      image ? setUploadText("All data uploaded successfully") : setUploadText("uploaded successfully without Image");
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  }

  useEffect(() => {
    if (idRef.current === "testingXYZ") {
      setEditingForm(catalog[0]);
      setDesignForm(catalog[0]);
    } else {
      findNewItem();
    }
  }, [catalog]);

  function findNewItem() {
    catalog.map((item) => {
      item.id === idRef.current ? (itemRef.current = item) : null;
    });

    setEditingForm(itemRef.current);
    setDesignForm(itemRef.current);
  }
  //#endregion

  useEffect(() => {}, [designForm]);

  return (
    <div className="mt-5 flex justify-center">
      <div className="w-128 mt-5 flex flex-col  items-center rounded-xl border-4 p-6">
        <p className="headline__big font-bold">Products</p>
        <div className="mt-6 flex flex-col items-center rounded-lg border-2 p-6">
          <p className="headline__small font-semibold">Add Product</p>

          <p className="mt-6">name</p>
          <Input type="text" value={formData.name} name="name" onChange={handleDataChange} />
          <p>price</p>
          <Input value={formData.price} name="price" onChange={handleDataChange} />
          <p>in stock</p>
          <Input value={formData.inStock} name="inStock" onChange={handleDataChange} />
          <p>description</p>
          <Input value={formData.description} name="description" onChange={handleDataChange} />

          <input
            type="file"
            className="mt-3"
            onChange={(e) => {
              let file = e.target.files[0];
              fileRef.current = file;
              setUploadState("reset");
              setUploadText("");
            }}
          />
          <button className="mt-5 rounded-xl bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3" onClick={addToCatalogLocal}>
            {uploadButton}
          </button>

          <div className="mt-2 flex">
            <p className="mr-1">{uploadText}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center rounded-lg border-2 p-6">
          <div className="mt-2 flex items-center">
            <p className="headline__small mr-4 font-semibold">Update Product</p>
            <Select
              catalog={catalog}
              update={(value) => {
                props.setSelected(value);

                idRef.current = Number(value.substring(0, 1));

                findNewItem();
              }}
              value={props.selected}
            ></Select>
          </div>
          <div className="flex">
            <div className="flex flex-wrap">
              {catalog[0].description !== "testingXYZ" && (
                <div className="mt-8 flex flex-col items-center">
                  <div className="flex">
                    <div className="min-w-15 mx-3 mt-5 flex w-64 flex-initial flex-col items-center rounded-xl bg-white text-center ">
                      <p className="headline__extraSmall font-bold">For Updating</p>
                      <p>------------------------------------</p>
                      <input type="text" name="name" className="text-center text-lg font-semibold" value={editingForm.name} onChange={handleEditingForm}></input>
                      <div className="mt-2 flex justify-center">
                        <a className="mr-1 flex h-20 w-20" href="/schick-glaser">
                          <img className="h-20 w-max" src={editingForm.images[0] && editingForm.images[0].url} />
                        </a>
                        <div className="flex flex-col justify-center">
                          <button
                            title="delete"
                            onClick={() => {
                              idRef.current === "testingXYZ" && nullId();
                              deleteFromCatalog(idRef.current);
                              idRef.current = "testingXYZ";
                            }}
                          >
                            <MdDelete size="25" />
                          </button>
                          <button
                            className="mt-1"
                            title="update"
                            onClick={() => {
                              idRef.current === "testingXYZ" && nullId();
                              updateCatalog(Number(idRef.current), editingForm);
                            }}
                          >
                            <MdFileUpload size="25" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 flex">
                        <p className="w-[80px] text-left">price:</p>
                        <input type="text" name="price" className="text-center" title="price" value={editingForm.price} onChange={handleEditingForm}></input>
                      </div>
                      <div className="mt-3 flex">
                        <p className="w-[80px] text-left">inStock:</p>
                        <input type="text" name="inStock" className="text-center" title="inStock" value={editingForm.inStock} onChange={handleEditingForm}></input>
                      </div>
                      <div className="flex">
                        <p>description:</p>
                        <input type="text" name="description" className="text-center" title="description" value={editingForm.description} onChange={handleEditingForm}></input>
                      </div>
                    </div>

                    <div className="min-w-15 mx-3 mt-5 flex w-64 flex-initial flex-col items-center rounded-xl bg-white ">
                      <p className="headline__extraSmall font-bold">Actual look</p>
                      <p>------------------------------------</p>
                      <p className="text-lg font-semibold">{designForm.name}</p>

                      <a className="mt-2 flex justify-center" href="/schick-glaser">
                        <img className="h-20 w-max" src={designForm.images[0] && designForm.images[0].url} />
                      </a>

                      <p className="mt-3">{designForm.price} Kč</p>
                      <p>{designForm.inStock} ks</p>
                      <p>{designForm.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p>Images</p>
          <p>Products</p>
        </div>
      </div>
    </div>
  );
}
