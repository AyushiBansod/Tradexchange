// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/exchange-api@1/latest/currencies";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");

// for(let select of dropdowns){
//     for (currCode in countryList) {
//         let newOption = document.createElement("option");
//         newOption.innerText = currCode;
//         newOption.value = currCode;
//         if(select.name === "from" && currCode === "USD") {
//             newOption.selected = "selected";
//     } else if (select.name === "to" && currCode === "INR") {
//         newOption.selected = "selected";
//     }
//     select.append(newOption);
//  }
  
//  select.addEventListener("change", (evt) => {
//  updateFlag(evt.target);
//  });

// }

// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// btn.addEventListener("click", async (evt) => {
// evt.preventDefault();
// let amount = document.querySelector(".amount input");
// let amtVal = amount.value;
// if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
// }

// //console.log(fromCurr.value, toCurr.value);
// const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
// let response = await fetch(URL);
// console.log(response);
// });


const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const swapBtn = document.querySelector(".fa-arrow-right-arrow-left"); // Select the swap icon
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const amountInput = document.querySelector(".amount input");

// Load country list options
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    await performConversion();
});

// Swap currencies
swapBtn.addEventListener("click", () => {
    const temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    
    // Update flags after swapping
    updateFlag(fromCurr);
    updateFlag(toCurr);

    // Trigger the conversion calculation after swapping
    btn.click();
});

// Perform conversion
const performConversion = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value) || 1;
    if (amtVal < 1) amtVal = 1;

    const fromCurrency = fromCurr.value.toUpperCase();
    const toCurrency = toCurr.value.toUpperCase();
    const URL = `${BASE_URL}${fromCurrency}`;

    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amtVal * rate).toFixed(2);
        const msg = `${amtVal} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        document.querySelector(".msg").innerText = msg;
        console.log(msg); // Log message to console
    } catch (error) {
        console.error('Error fetching the exchange rate:', error);
        const errorMsg = "Error fetching the exchange rate. Check console for details.";
        document.querySelector(".msg").innerText = errorMsg;
        console.log(errorMsg); // Log error message to console
    }
};

// Trigger conversion on Enter key press
amountInput.addEventListener("keypress", (evt) => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        btn.click(); // Simulate button click
    }
});





