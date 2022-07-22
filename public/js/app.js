const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const address = search.value;

  messageOne.textContent = "Loading";
  messageTwo.textContent = "";
  show(address);
});

// console.log("Cliente side js file is laoded!");

async function show(address) {
  const res = await fetch(`./weather?address=${address}`);
  const json = await res.json();
  if (json.error) {
    messageOne.textContent = json.error;
  } else {
    messageOne.textContent = json.location;
    messageTwo.textContent = json.forecast;
  }
}
