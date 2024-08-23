import React, { useState, useEffect } from "react";
import { db } from "../../parts/Base";
import { useData } from "../../parts/Memory.jsx";
import { collection, getDocs } from "firebase/firestore";

export default function Account_Orders() {
  const { profile, catalog } = useData();
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      if (!catalog.length) {
        console.log("Catalog is empty");
        return;
      }

      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersArr = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const filteredOrders = ordersArr.filter((order) => order.uid === profile.uid);

      let dataArr = filteredOrders.map((order) => {
        const productsWithDetails = order.products
          .map((product) => {
            const catalogProduct = catalog.find((catalogProduct) => catalogProduct.id === product.id);
            return catalogProduct ? { ...catalogProduct, quantity: product.quantity } : null;
          })
          .filter((product) => product !== null);

        return { ...order, products: productsWithDetails };
      });

      setOrders(filteredOrders);
      setData(dataArr);
    }

    loadOrders();
  }, [profile.uid, catalog]);

  function showStatus(state) {
    let status = "";

    switch (state) {
      case "paid":
        status = "Zaplaceno";
        break;

      case "pending":
        status = "Probíhá";
        break;

      case "expired":
      case "canceled":
      case "unpaid":
        status = "Neúspěšná objednávka";
        break;

      default:
        status = "Nastala chyba";
        break;
    }
    return status;
  }

  return (
    <div>
      {data.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex min-h-[320px] min-w-[820px] flex-col items-center gap-2 rounded-xl border-4 p-8">
            <p className="headline font-bold">Nákupy</p>
            <div className="mt-4 flex flex-col items-center gap-2 rounded-lg p-2">
              {data.map((order, index) => (
                <div key={order.id} className="flex w-[800px] items-center justify-between rounded-xl border-4 p-4">
                  <div className="flex flex-col">
                    {order.products.map((product, pIndex) => (
                      <div key={product.id + pIndex} className="flex items-center justify-between gap-8">
                        <img className="h-16" src={product.images[0]?.url || ""} alt={`Image of ${product.id}`} />
                        <div className="flex w-[300px]">
                          <p className="w-[200px]">{product.name}</p>
                          <p className="w-[50px]">{product.quantity}ks</p>
                          <p className="w-[90px] text-end">{product.price * product.quantity}kč</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex w-[200px] justify-between">
                    <p className="mr-8 w-[60px] text-end font-semibold">{order.products.reduce((sum, product) => sum + product.price * product.quantity, 0) + "Kč"}</p>
                    <div className="w-[100px]">
                      <p className={"w-[100px] text-center font-bold " + (order.paymentState === "paid" ? "text-green-500" : order.paymentState === "pending" ? "text-yellow-500" : "text-red-600")}>{showStatus(order.paymentState)}</p>
                      <button className="button__small button__positive mt-2">Zaplatit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {data.length < 1 && (
        <div className="mt-8 flex min-h-[320px] min-w-[820px] flex-col items-center justify-center gap-2 rounded-xl border-4 p-8">
          <p className="headline font-bold">Nákupy</p>
          <p className="py-[90px]">zatím nemáte žádné nákupy</p>
        </div>
      )}
    </div>
  );
}
