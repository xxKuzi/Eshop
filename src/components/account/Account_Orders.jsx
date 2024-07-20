import React, { useState, useEffect } from "react";
import { db } from "../../parts/Base";
import { useData } from "../../parts/Memory.jsx";
import { collection, getDocs } from "firebase/firestore";

export default function Account_Orders() {
  const { profile, catalog } = useData();
  const [orders, setOrders] = useState([
    {
      id: "x",
      surname: "false",
      products: [
        { id: "", quantity: 5 },
        { id: "", quantity: 5 },
      ],
    },
  ]);
  const [data, setData] = useState([{ productId: "1", images: [{}] }]);

  useEffect(() => {
    async function loadOrders() {
      const ordersSnapshot = await getDocs(collection(db, "orders"));

      const ordersArr = ordersSnapshot.docs.map((doc) => ({ ...doc.data() }));

      const filteredOrders = ordersArr.filter((order) => order.uid === profile.uid);

      let dataArr = [];

      filteredOrders.map((order) => {
        order.products.map((product) => {
          catalog.map((catalogProduct) => {
            console.log("loading3");

            if (catalogProduct.id === product.id) {
              dataArr.push({ ...catalogProduct, quantity: product.quantity });
            }
          });
        });
      });

      filteredOrders.length !== 0 && (setData(dataArr), setOrders(filteredOrders), console.log("Setting new data"));
    }
    loadOrders();
  }, [catalog]);

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex min-h-[320px] min-w-[820px] flex-col items-center gap-2 rounded-xl border-4 p-8">
        <p className="headline font-bold">Nákupy</p>
        <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border-2 border-brand-blue p-2">
          <div className="flex w-[650px] items-center justify-between">
            <p className="headline__small">Kontakt</p>
            <p className="headline__small">Produkty</p>
            <p className="headline__small">Stav</p>
          </div>
          <p className="h-1 w-[1000px] border-2"></p>
          {orders.map((order, i) => (
            <div key={i} className="flex w-[800px] items-center justify-between ">
              <div className="flex flex-col items-center justify-center">
                <p>{order.forename + " " + order.surname}</p>
                <p>{order.uid}</p>
              </div>

              <div className="flex flex-col">
                {data.map((product, i) => (
                  <div key={i} className="flex flex-col items-center justify-center">
                    <p>id: {product.id}</p>
                    <p>quantity: {product.quantity}</p>
                    <p>price: {product.price * product.quantity}</p>
                    <img className="h-16" src={product.images[0].url} />
                  </div>
                ))}
              </div>
              <p>final price: {data.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
              <div className="flex flex-col items-center justify-center">
                <p className={"font-bold " + (order.state === "success" ? "text-green-500" : "text-red-600")}>{order.state === "success" ? "dokončeno" : "nedokončeno"}</p>
                <p>Payment id:</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
