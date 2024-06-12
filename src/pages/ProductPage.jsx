import React, { useState } from "react";
import { useData } from "../parts/Memory";

export default function ProductPage(props) {
  const { images, price, name, description, inStock, id } = props.data;
  const { profile, addToCart } = useData();

  const [numberOfItems, setNumberOfItems] = useState(1);

  async function handlePayment() {
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: id, quantity: numberOfItems }],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="mx-16 my-16 flex flex-col">
      <div className="flex">
        <div className="flex w-[50vw] flex-col  items-center justify-center rounded border-2 border-gray-300">
          <div className="flex flex-col items-center">
            <img src={images[0].url} className="max-h-[450px]" />
            {images.length > 1 && <div className=" w-[550px] border-[1px]  "></div>}
          </div>
          <div className="items center mt-2 flex flex-wrap">
            {images.map((img, i) => {
              if (i === 0) {
                return;
              }

              return <img src={img.url} key={i} className={"ml-4 mr-4  max-h-[250px]"} />;
            })}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="headline__big mt-6">{name}</p>
          <p className="mt-2">Sportovní brýle</p>

          <p className="mt-10 text-xl">{price}Kč</p>
          {inStock > 0 ? <p className="mt-2 font-bold text-green-600">Skladem</p> : <p className="font-bold text-red-600">Není skladem</p>}

          <div className="mt-10 flex items-center justify-center rounded-lg border-2 border-gray-200 px-3 py-1">
            <button className="mr-6 text-xl" onClick={() => setNumberOfItems((old) => old + 1)}>
              +
            </button>
            <p className="mr-6 text-lg">{numberOfItems}</p>
            <button className="text-xl" onClick={() => setNumberOfItems((old) => old - 1)}>
              -
            </button>
          </div>

          <div className="mt-4 flex">
            <button className="button button__small button__positive mr-5" onClick={() => addToCart(id, numberOfItems)}>
              Přidat do košíku
            </button>
            <button
              className="button button__small button__black"
              onClick={async () => {
                handlePayment();
              }}
            >
              Koupit
            </button>{" "}
            {/* after the payment method will finish - make */}
          </div>

          <p className="mt-16">{description}</p>
        </div>
      </div>
    </div>
  );
}
