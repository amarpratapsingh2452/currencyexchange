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

       
        const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;

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
                resultDiv.textContent = "Conversion rate not available.";
            }
        } catch (error) {
            console.error("Error fetching or parsing data:", error);
            alert("Error: Could not retrieve exchange rates. The API might be down or the currency is not supported.");
            resultDiv.textContent = ""; 
        }
    });
});
