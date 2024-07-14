import React, { useState, useEffect } from "react";
import { db } from "../parts/Base";
import { useData } from "../parts/Memory.jsx";
import { collection, getDocs } from "firebase/firestore";
import { filterProps } from "framer-motion";

export default function DevOrders() {
  const { profile, catalog } = useData();
  const [orders, setOrders] = useState([
    {
      id: "bagr",
      surname: "false",
      products: [
        { id: "", quantity: 5 },
        { id: "", quantity: 5 },
      ],
    },
  ]);
  const [data, setData] = useState([{ productId: "1", images: [{}] }]);

  useEffect(() => {
    loadOrders(false);
    async function loadOrders() {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersArr = ordersSnapshot.docs.map((doc) => ({ ...doc.data() }));
      const filteredOrders = ordersArr.filter((order) => order.uid === profile.uid);
      setOrders(filteredOrders);

      let dataArr = [];
      filteredOrders.map((order) => {
        order.products.map((product) => {
          catalog.map((catalogProduct) => {
            if (catalogProduct.id === product.id) {
              dataArr.push({ ...catalogProduct, quantity: product.quantity });
            }
          });
        });

        setData(dataArr);
        console.log(dataArr);
      });
    }
  }, []);

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex flex-col items-center gap-2 rounded-xl border-4 p-8">
        <p className="headline font-bold">Orders</p>
        <div className="mt-4 flex flex-col items-center">
          {orders.map((order, i) => (
            <div key={i} className="flex items-center justify-center gap-2 rounded-lg border-2 border-brand-blue p-2">
              <div className="flex flex-col items-center justify-center">
                <p className="headline__small">Contact</p>
                <p className="h-1 w-64 border-2"></p>
                <p>{order.forename + " " + order.surname}</p>
                <p>{order.uid}</p>
              </div>

              {data.map((product, i) => (
                <div key={i} className="flex flex-col items-center justify-center">
                  <p>id: {product.id}</p>
                  <p>quantity: {product.quantity}</p>
                  <p>price: {product.price * product.quantity}</p>
                  <img className="h-16" src={product.images[0].url} />
                </div>
              ))}
              <p>final price: {data.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
              <div className="flex flex-col items-center justify-center">
                <p className={"font-bold " + (order.state === "success" ? "text-green-500" : "text-red-600")}>{order.state}</p>
                <p>Payment id:</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
