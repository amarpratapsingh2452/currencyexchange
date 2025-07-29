document.addEventListener("DOMContentLoaded", function () {
    
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");
    const amountInput = document.querySelector("#amount input");
    const calculateBtn = document.getElementById("btn");
    const resultDiv = document.getElementById("result");

    
    calculateBtn.addEventListener("click", async () => {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = amountInput.value;

      
        if (!fromCurrency || !toCurrency || !amount) {
            alert("Please select both currencies and enter an amount.")
            return;
        }

        resultDiv.textContent = "Calculating...";

        const apiUrl = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`;

        try {
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            
           
            const rate = data[fromCurrency][toCurrency];

            if (rate) {
              
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
