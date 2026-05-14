document.addEventListener("DOMContentLoaded", function () {
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");
    const amountInput = document.querySelector("#amount input");
    const calculateBtn = document.getElementById("btn");
    const resultDiv = document.getElementById("result");

    const currencyData = {
        popular: {
            usd: "USD - United States Dollar", eur: "EUR - Euro", gbp: "GBP - British Pound Sterling",
            jpy: "JPY - Japanese Yen", cad: "CAD - Canadian Dollar", aud: "AUD - Australian Dollar",
            chf: "CHF - Swiss Franc", cny: "CNY - Chinese Yuan", inr: "INR - Indian Rupee", sgd: "SGD - Singapore Dollar"
        },
        others: {
            aed: "AED - UAE Dirham", afn: "AFN - Afghan Afghani", all: "ALL - Albanian Lek", amd: "AMD - Armenian Dram",
            ang: "ANG - Dutch Guilder", aoa: "AOA - Angolan Kwanza", ars: "ARS - Argentine Peso", awg: "AWG - Aruban Florin",
            azn: "AZN - Azerbaijani Manat", bam: "BAM - Bosnian Mark", bbd: "BBD - Barbadian Dollar", bdt: "BDT - Bangladeshi Taka",
            bgn: "BGN - Bulgarian Lev", bhd: "BHD - Bahraini Dinar", bif: "BIF - Burundian Franc", bmd: "BMD - Bermudian Dollar",
            bnd: "BND - Brunei Dollar", bob: "BOB - Bolivian Boliviano", brl: "BRL - Brazilian Real", bsd: "BSD - Bahamian Dollar",
            btn: "BTN - Bhutanese Ngultrum", bwp: "BWP - Botswanan Pula", byn: "BYN - Belarusian Ruble", bzd: "BZD - Belize Dollar",
            cdf: "CDF - Congolese Franc", clp: "CLP - Chilean Peso", cop: "COP - Colombian Peso", crc: "CRC - Costa Rican Colón",
            cuc: "CUC - Cuban Convertible Peso", cup: "CUP - Cuban Peso", cve: "CVE - Cape Verdean Escudo", czk: "CZK - Czech Koruna",
            djf: "DJF - Djiboutian Franc", dkk: "DKK - Danish Krone", dop: "DOP - Dominican Peso", dzd: "DZD - Algerian Dinar",
            egp: "EGP - Egyptian Pound", ern: "ERN - Eritrean Nakfa", etb: "ETB - Ethiopian Birr", fjd: "FJD - Fijian Dollar",
            fkp: "FKP - Falkland Islands Pound", gel: "GEL - Georgian Lari", ghs: "GHS - Ghanaian Cedi", gip: "GIP - Gibraltar Pound",
            gmd: "GMD - Gambian Dalasi", gnf: "GNF - Guinean Franc", gtq: "GTQ - Guatemalan Quetzal", gyd: "GYD - Guyanese Dollar",
            hkd: "HKD - Hong Kong Dollar", hnl: "HNL - Honduran Lempira", hrk: "HRK - Croatian Kuna", htg: "HTG - Haitian Gourde",
            huf: "HUF - Hungarian Forint", idr: "IDR - Indonesian Rupiah", ils: "ILS - Israeli New Shekel", imp: "IMP - Manx Pound",
            iqd: "IQD - Iraqi Dinar", irr: "IRR - Iranian Rial", isk: "ISK - Icelandic Króna", jmd: "JMD - Jamaican Dollar",
            jod: "JOD - Jordanian Dinar", kes: "KES - Kenyan Shilling", kgs: "KGS - Kyrgyzstani Som", khr: "KHR - Cambodian Riel",
            kmf: "KMF - Comorian Franc", kpw: "KPW - North Korean Won", krw: "KRW - South Korean Won", kwd: "KWD - Kuwaiti Dinar",
            kyd: "KYD - Cayman Islands Dollar", kzt: "KZT - Kazakhstani Tenge", lak: "LAK - Lao Kip", lbp: "LBP - Lebanese Pound",
            lkr: "LKR - Sri Lankan Rupee", lrd: "LRD - Liberian Dollar", lsl: "LSL - Lesotho Loti", lyd: "LYD - Libyan Dinar",
            mad: "MAD - Moroccan Dirham", mdl: "MDL - Moldovan Leu", mga: "MGA - Malagasy Ariary", mkd: "MKD - Macedonian Denar",
            mmk: "MMK - Myanmar Kyat", mnt: "MNT - Mongolian Tögrög", mop: "MOP - Macanese Pataca", mru: "MRU - Mauritanian Ouguiya",
            mur: "MUR - Mauritian Rupee", mvr: "MVR - Maldivian Rufiyaa", mwk: "MWK - Malawian Kwacha", mxn: "MXN - Mexican Peso",
            myr: "MYR - Malaysian Ringgit", mzn: "MZN - Mozambican Metical", nad: "NAD - Namibian Dollar", ngn: "NGN - Nigerian Naira",
            nio: "NIO - Nicaraguan Córdoba", nok: "NOK - Norwegian Krone", npr: "NPR - Nepalese Rupee", nzd: "NZD - New Zealand Dollar",
            omr: "OMR - Omani Rial", pab: "PAB - Panamanian Balboa", pen: "PEN - Peruvian Sol", pgk: "PGK - Papua New Guinean Kina",
            php: "PHP - Philippine Peso", pkr: "PKR - Pakistani Rupee", pln: "PLN - Polish Złoty", pyg: "PYG - Paraguayan Guaraní",
            qar: "QAR - Qatari Riyal", ron: "RON - Romanian Leu", rsd: "RSD - Serbian Dinar", rub: "RUB - Russian Ruble",
            rwf: "RWF - Rwandan Franc", sar: "SAR - Saudi Riyal", sbd: "SBD - Solomon Islands Dollar", scr: "SCR - Seychellois Rupee",
            sdg: "SDG - Sudanese Pound", sek: "SEK - Swedish Krona", shp: "SHP - Saint Helena Pound", sll: "SLL - Sierra Leonean Leone",
            sos: "SOS - Somali Shilling", srd: "SRD - Surinamese Dollar", ssp: "SSP - South Sudanese Pound", stn: "STN - São Tomé Dobra",
            svc: "SVC - Salvadoran Colón", syp: "SYP - Syrian Pound", szl: "SZL - Swazi Lilangeni", thb: "THB - Thai Baht",
            tjs: "TJS - Tajikistani Somoni", tmt: "TMT - Turkmenistan Manat", tnd: "TND - Tunisian Dinar", top: "TOP - Tongan Paʻanga",
            try: "TRY - Turkish Lira", ttd: "TTD - Trinidad Dollar", twd: "TWD - New Taiwan Dollar", tzs: "TZS - Tanzanian Shilling",
            uah: "UAH - Ukrainian Hryvnia", ugx: "UGX - Ugandan Shilling", uyu: "UYU - Uruguayan Peso", uzs: "UZS - Uzbekistani Soʻm",
            ves: "VES - Venezuelan Bolívar", vnd: "VND - Vietnamese Đồng", vuv: "VUV - Vanuatu Vatu", wst: "WST - Samoan Tala",
            xaf: "XAF - Central African Franc", xcd: "XCD - East Caribbean Dollar", xof: "XOF - West African Franc",
            xpf: "XPF - CFP Franc", yer: "YER - Yemeni Rial", zar: "ZAR - South African Rand", zmw: "ZMW - Zambian Kwacha", zwl: "ZWL - Zimbabwean Dollar"
        }
    };

    function populateSelects(selectElement) {
        let popularGroup = `<optgroup label="Popular Currencies">`;
        for (let code in currencyData.popular) {
            popularGroup += `<option value="${code}">${currencyData.popular[code]}</option>`;
        }
        popularGroup += `</optgroup>`;

        let otherGroup = `<optgroup label="All Other Currencies">`;
        for (let code in currencyData.others) {
            otherGroup += `<option value="${code}">${currencyData.others[code]}</option>`;
        }
        otherGroup += `</optgroup>`;

        selectElement.innerHTML += popularGroup + otherGroup;
    }

    populateSelects(fromCurrencySelect);
    populateSelects(toCurrencySelect);

    calculateBtn.addEventListener("click", async () => {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        let amount = amountInput.value;

        if (amount === "" || amount <= 0) {
            amount = 1;
            amountInput.value = "1";
        }

        if (!fromCurrency || !toCurrency) {
            alert("Please select both currencies.");
            return;
        }

        resultDiv.textContent = "Calculating...";
        const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Network response error.");
            const data = await response.json();
            const rate = data[fromCurrency][toCurrency];
            
            if (rate) {
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${convertedAmount} ${toCurrency.toUpperCase()}`;
            } else {
                resultDiv.textContent = "Rate not available.";
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Could not retrieve exchange rates.");
            resultDiv.textContent = ""; 
        }
    });
});
