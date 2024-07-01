import React from "react";

export default function Packeta() {
  const loadData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "779021b8cd9ce678f43394a85b4dd68f");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
      method: "GET",
      headers: new Headers(),
      redirect: "follow",
    };

    fetch("https://www.zasilkovna.cz/api/__API_KEY__/point.json?ids=__BRANCH_IDS__", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <p>Api of packeta</p>
      <button className="button__normal button__positive" onClick={loadData}>
        Fetch api
      </button>
    </div>
  );
}
