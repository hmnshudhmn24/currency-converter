document.addEventListener("DOMContentLoaded", () => {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amount = document.getElementById("amount");
    const result = document.getElementById("result");

    const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"];
    currencies.forEach(currency => {
        let option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        let option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";

    window.convertCurrency = async () => {
        let from = fromCurrency.value;
        let to = toCurrency.value;
        let amountValue = amount.value;
        if (amountValue === "" || amountValue <= 0) {
            result.textContent = "Please enter a valid amount.";
            return;
        }

        try {
            let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
            let data = await response.json();
            let rate = data.rates[to];
            let convertedAmount = (amountValue * rate).toFixed(2);
            result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
        } catch (error) {
            result.textContent = "Error fetching exchange rates. Try again later.";
        }
    };
});