import React, { useState, useEffect } from "react";
import { db } from "../parts/Base";
import { useData } from "../parts/Memory.jsx";
import { collection, getDocs } from "firebase/firestore";

export default function DevOrders() {
  const { profile } = useData();
  const [data, setData] = useState([
    {
      id: "bagr",
      surname: "false",
      products: [
        { id: "", quantity: 5 },
        { id: "", quantity: 5 },
      ],
    },
  ]);

  useEffect(() => {
    console.log(data.products);
    loadOrders(false);
    async function loadOrders() {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersArr = ordersSnapshot.docs.map((doc) => ({ ...doc.data() }));

      const Arr = ordersArr.filter((order) => order.uid === profile.uid);

      setData(Arr);
    }
  }, []);

  return (
    <div className="mt-6 flex justify-center">
      <div className="flex flex-col items-center gap-2 rounded-xl border-4 p-4">
        <p className="headline">Orders</p>
        <div className="mt-2 flex flex-col items-center">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-2 rounded-lg border-2 border-brand-blue p-2">
              <div className="flex flex-col items-center justify-center">
                <p className="headline__small">Contact</p>
                <p className="h-1 w-64 border-2"></p>
                <p>{item.forename + " " + item.surname}</p>
                <p>{item.uid}</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                0
                {item.products.map((product) => (
                  <div>
                    <p>id: {product.id}</p>
                    <p>quantity: {product.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className={"font-bold " + (item.state === "success" ? "text-green-500" : "text-red-600")}>{item.state}</p>
                <p>Payment id:</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
