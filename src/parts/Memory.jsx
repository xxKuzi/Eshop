import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { db, storage } from "./Base";

import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from "firebase/storage";

// Create the context
const DataContext = createContext();

// Create a context provider component
export const Memory = ({ children }) => {
  let emptyObject = {
    id: 0,
    name: "",
    price: 0,
    images: [{ url: "", id: 0 }],
    description: "testingXYZ",
  };
  const [catalog, setCatalog] = useState([emptyObject]);
  const [profile, setProfile] = useState({
    editor: false,
    nickname: "Honza",
    newspaper: false,
    email: "email",
    uid: "x",
    cart: [{ id: 0, quantity: 1 }],
  });
  const key = useRef("");
  const catalogKey = useRef();
  const uid = useRef(localStorage.getItem("uid"));
  const freeIdsRef = useRef();

  useEffect(() => {
    loadProfile();
    loadCatalog();
  }, []);

  const loadProfile = async () => {
    let dataObject = await getDocs(collection(db, "users"));
    dataObject.forEach((doc) => {
      doc.data().uid === uid.current ? loadData(doc.data(), doc._key.path.segments[6]) : null;
    });
  };

  function uploadImage(fileRef, itemId, imageId) {
    return new Promise(async (resolve, reject) => {
      if (fileRef === undefined) {
        resolve();
      }

      await findUnused();

      const storageRef = ref(storage, itemId !== undefined ? itemId + "/" + imageId : (freeIdsRef.current[0] !== undefined ? freeIdsRef.current[0] : catalog[0].description === "testingXYZ" ? 0 : catalog.length) + "/" + 0); //need new
      const uploadTask = uploadBytesResumable(storageRef, fileRef);
      let uploadText = "";

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploadText = "Upload " + progress + "% done";
        },
        (error) => {
          uploadText = "Error: " + error.message;
          reject(uploadText);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              let download = downloadURL;
              uploadText = "Added";
              resolve({ downloadURL: download, uploadText: uploadText });
            })
            .catch((error) => {
              reject(error);
            });
        },
      );
    });
  }

  function loadData(tempData, tempKey) {
    key.current = tempKey;
    setProfile((prev) => ({ ...prev, ...tempData }));
    tempData.editor ? updateDb("editorLogin", new Date().toString()) : null; //editor Check
  }

  const loadCatalog = async () => {
    let querySnapshot = await getDocs(collection(db, "catalog"));
    let dataObject = querySnapshot.docs.map((doc) => doc.data());
    dataObject.length !== 0 ? setCatalog(dataObject) : setCatalog([emptyObject]);
  };

  const updateDb = async (type, tempValue) => {
    const dataRef = doc(db, "users", key.current);

    await updateDoc(dataRef, {
      [type]: tempValue,
    });
  };

  const addToCatalog = async ({ name, price, images, description }) => {
    await findUnused();

    const newDoc = {
      id: catalog[0].description !== "testingXYZ" ? (freeIdsRef.current.length === 0 ? catalog.length : freeIdsRef.current[0]) : 0,
      name: name,
      price: price,
      images: images,
      description: description,
    };
    await addDoc(collection(db, "catalog"), newDoc);
    loadCatalog();
  };

  async function addImageToCatalog(id, fileRef) {
    let newData = [];

    await getDocById(id); //get Catalog Key

    //Get current data with id
    let dataObject = await getDocs(collection(db, "catalog"));
    dataObject.forEach((doc) => {
      doc.data().id === id ? (newData = doc.data()) : null;
    });

    /*Getting free IDs*/
    let all = [];
    let used = [];
    let free = [];

    //getting all IDs
    for (let i = 0; i < newData.images.length; i++) {
      all.push(i);
    }

    //getting used IDs
    let catalogObject = await getDocs(collection(db, "catalog"));
    let images = [];
    catalogObject.forEach((doc) => {
      doc.data().id === id ? (images = doc.data().images) : null;
    });

    images.length > 0 &&
      images.forEach((img) => {
        used.push(img.id);
      });

    //getting free IDs
    all.map((id) => {
      !used.includes(id) ? free.push(id) : null;
    });

    //Getting imageid for uploading to Database
    let imageId = free[0] !== undefined ? free[0] : newData.images.length;

    //Uploading image
    let data = await uploadImage(fileRef, id, imageId);
    let downloadUrl = data.downloadURL;
    newData.images.push({ url: downloadUrl, id: imageId });

    await setDoc(doc(db, "catalog", catalogKey.current), newData);

    loadCatalog();
  }

  async function deleteImageFromCatalog(id, imageId) {
    let newData = [];

    await getDocById(id); //get Catalog Key

    let dataObject = await getDocs(collection(db, "catalog"));
    dataObject.forEach((doc) => {
      doc.data().id === id ? (newData = doc.data()) : null;
    });

    newData.images = newData.images.filter((image) => {
      return image.id !== imageId ? image : null;
    });

    await setDoc(doc(db, "catalog", catalogKey.current), newData);

    const itemsToDelete = await listImagesById(id);

    await Promise.all(
      itemsToDelete.map((item) => {
        let ImageName = Number(item.split("/")[1]);

        ImageName === imageId ? deleteObject(ref(storage, item)) : null;
      }),
    );

    loadCatalog();
  }

  async function getDocById(id) {
    let dataObject = await getDocs(collection(db, "catalog"));

    dataObject.forEach((doc) => {
      if (doc.data().id === id) {
        catalogKey.current = doc._key.path.segments[6];

        return;
      }
    });
  }

  async function updateCatalog(id, newData) {
    await getDocById(id);

    await setDoc(doc(db, "catalog", catalogKey.current), newData);

    loadCatalog();
  }

  async function findUnused() {
    let all = [];
    let used = [];
    let free = [];

    for (let i = 0; i < catalog.length; i++) {
      all.push(i);
    }
    let dataObject = await getDocs(collection(db, "catalog"));
    dataObject.forEach((doc) => {
      used.push(doc.data().id);
    });
    all.map((id) => {
      !used.includes(id) ? free.push(id) : null;
    });
    freeIdsRef.current = free;
  }

  async function listImagesById(id) {
    const listRef = ref(storage, id + "/");
    const newArr = [];
    await listAll(listRef)
      .then((res) => {
        res.items.forEach((item) => {
          newArr.push(item._location.path_);
        });
      })
      .catch((error) => {});
    return newArr;
  }

  async function deleteFromCatalog(id) {
    await getDocById(id);
    await deleteDoc(doc(db, "catalog", catalogKey.current));
    const itemsToDelete = await listImagesById(id);

    await Promise.all(
      itemsToDelete.map((item) => {
        deleteObject(ref(storage, item));
      }),
    );
    loadCatalog();
  }

  const updateProfile = (type, value) => {
    setProfile((prev) => ({ ...prev, [type]: value }));
    updateDb(type, value);
  };

  async function addToCart(id, increaseValue) {
    if (key.current === "") {
      console.log("You have to sing up");
      return;
    }

    const dataRef = doc(db, "users", key.current);
    let cartArr = (await getDoc(dataRef)).data().cart;

    /* cartArr can be          
      - empty array - after you delete last product

    */

    let newProductToCart = true;

    //Increasing amount of product in cart
    cartArr = cartArr.map((product) => {
      if (product.id === id) {
        newProductToCart = false;
        return { ...product, quantity: product.quantity + increaseValue };
      } else {
        return product;
      }
    });

    // new product to cart | it doesn't exist in bin
    if (newProductToCart) {
      cartArr.push({ id: id, quantity: increaseValue });
    }

    //delete products with 0 quantity
    cartArr = cartArr.filter((product) => product.quantity !== 0);

    await updateDoc(dataRef, {
      cart: cartArr,
    });

    loadProfile(); //need to load Profile because product Id and quantity is located on profile
    loadCatalog();
  }

  const contextValue = {
    catalog,
    addToCatalog,
    updateCatalog,
    deleteFromCatalog,
    uploadImage,
    addImageToCatalog,
    deleteImageFromCatalog,
    profile,
    updateProfile,
    addToCart,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

// Create a custom hook to access the context
export const useData = () => {
  return useContext(DataContext);
};
