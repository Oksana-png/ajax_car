document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const select = document.getElementById("cars"),
    output = document.getElementById("output");

  select.addEventListener("change", () => {
    getData()
      .then((data) => {
        const { brand, model, price } = data;
        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
      })
      .catch(() => (output.innerHTML = "Произошла ошибка"));
  });

  const getData = () => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", "./cars.json");
      request.setRequestHeader("Content-type", "application/json");
      request.send();
      request.addEventListener("readystatechange", () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.readyState === 4 && request.status === 200) {
          const data = JSON.parse(request.responseText);
          data.cars.forEach((item) => {
            if (item.brand === select.value) {
              resolve(item);
            }
          });
        } else {
          reject();
        }
      });
    });
  };
});
