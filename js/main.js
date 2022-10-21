//  get data from DataBase
async function GetData_From_DataBase() {
  // GetData_From_DataBase
  let responsse = await fetch(
    "https://6351a0c99d64d7c71304d214.mockapi.io/car"
  );
  let data = await responsse.json();

  // Handel Data To Html and css
  let final = await data.map((ele) => {
    let container = document.getElementById("container");
    // create div in Html to add Car Details
    let carDiv = document.createElement("div");
    carDiv.setAttribute("class", "carDiv");
    carDiv.setAttribute("id", ele.id);
    // create h2 in Html to put car name on it
    let name = document.createElement("h2");
    name.setAttribute("class", "name");
    name.textContent = ele.name;
    // create h5 in Html to put car price on it
    let price = document.createElement("h5");
    price.setAttribute("class", "price");
    price.textContent = `${ele.price} SAR`;
    // create p in Html to put car description on it
    let description = document.createElement("p");
    name.setAttribute("class", "description");
    description.textContent = ele.description;
    // create image in Html to put car img on it
    let image = document.createElement("img");
    image.setAttribute("class", "image");
    image.src = ele.img;
    image.alt = ele.name;
    // Add All elemnet in CarDive in Html
    let DeleteBtn = document.createElement("button");
    DeleteBtn.setAttribute("class", "buttonStyle");
    DeleteBtn.textContent = `Delete`;
    carDiv.appendChild(image);
    carDiv.appendChild(name);
    carDiv.appendChild(price);
    carDiv.appendChild(description);
    carDiv.appendChild(DeleteBtn);
    container.appendChild(carDiv);
    // Delete car from DataBase by Car Id
    DeleteBtn.addEventListener("click", async function () {
      const response = await fetch(
        `https://6351a0c99d64d7c71304d214.mockapi.io/car/${ele.id}`,
        {
          method: "DELETE", // DELETE From DataBase
        }
      ).then(() => window.location.reload());
    });
  });
}
window.onload = GetData_From_DataBase();

async function sendData() {
  const name = await document.getElementById("name").value;
  const price = await document.getElementById("price").value;
  const description = await document.getElementById("description").value;
  const img = await document.getElementById("img").value;
  const data = await {
    name,
    description,
    price,
    img,
  };
  // setnd data to api
  const response = await fetch(
    "https://6351a0c99d64d7c71304d214.mockapi.io/car",
    {
      method: "POST", // Add To DataBase
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redentials: "same-origin",
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data),
    }
  ).then(() => window.location.reload());
  return response.json();
}
