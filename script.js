document.addEventListener("DOMContentLoaded", function () {
    // Get all the elements we need from the page
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");
    const amountInput = document.querySelector("#amount input");
    const calculateBtn = document.getElementById("btn");
    const resultDiv = document.getElementById("result");

    // Add a click event listener to the button
    calculateBtn.addEventListener("click", async () => {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = amountInput.value;

        // 1. Basic validation
        if (!fromCurrency || !toCurrency || !amount) {
            alert("Please select both currencies and enter an amount.")
            return;
        }

        resultDiv.textContent = "Calculating...";

        // 2. Construct the API URL
        const apiUrl = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`;

        try {
            // 3. Fetch data from the API
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            
            // 4. Find the specific conversion rate
            const rate = data[fromCurrency][toCurrency];

            if (rate) {
                // 5. Calculate and display the result
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${convertedAmount} ${toCurrency.toUpperCase()}`;
            } else {
                resultDiv.textContent = "Conversion rate not available for the selected currencies.";
            }
        } catch (error) {
            console.error("Error fetching or parsing data:", error);
            alert("Error: Could not retrieve exchange rates.")
        }
    });
});