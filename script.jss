/* =====================================================
   IPL TICKET BOOKING JAVASCRIPT
===================================================== */


/* =====================================================
   TICKET PRICE DATA
===================================================== */

const ticketPrices = {

    "01": {
        match: "CSK vs MI",
        general: 1200,
        premium: 2500,
        vip: 5000
    },

    "02": {
        match: "RCB vs KKR",
        general: 1000,
        premium: 2200,
        vip: 4500
    },

    "03": {
        match: "MI vs RCB",
        general: 1300,
        premium: 2800,
        vip: 5500
    },

    "04": {
        match: "CSK vs RCB",
        general: 1100,
        premium: 2400,
        vip: 4800
    },

    "05": {
        match: "KKR vs MI",
        general: 900,
        premium: 2000,
        vip: 4200
    },

    "06": {
        match: "SRH vs CSK",
        general: 1000,
        premium: 2300,
        vip: 4500
    },

    "07": {
        match: "DC vs RCB",
        general: 800,
        premium: 1800,
        vip: 4000
    },

    "08": {
        match: "GT vs RR",
        general: 900,
        premium: 2100,
        vip: 4300
    }

};



/* =====================================================
   GET HTML ELEMENTS
===================================================== */

const teamFilter = document.getElementById("team");

const matchSelect = document.getElementById("match");

const standSelect = document.getElementById("stand");

const ticketInput = document.getElementById("tickets");

const bookingForm = document.getElementById("bookingForm");



/* =====================================================
   TEAM FILTER
===================================================== */

teamFilter.addEventListener("change", function () {

    const selectedTeam = this.value;

    const rows = document.querySelectorAll("#matchTable tr");


    rows.forEach(function (row) {

        const teams = row.getAttribute("data-teams");


        if (
            selectedTeam === "all" ||
            teams.includes(selectedTeam)
        ) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});



/* =====================================================
   UPDATE BOOKING SUMMARY
===================================================== */

function updateSummary() {

    const selectedMatch = matchSelect.value;

    const selectedStand = standSelect.value;

    let quantity = parseInt(ticketInput.value);


    if (isNaN(quantity) || quantity < 1) {

        quantity = 1;

    }


    const matchData = ticketPrices[selectedMatch];


    let price = 0;


    if (selectedStand === "General") {

        price = matchData.general;

    }

    else if (selectedStand === "Premium") {

        price = matchData.premium;

    }

    else if (selectedStand === "VIP") {

        price = matchData.vip;

    }


    const total = price * quantity;


    document.getElementById("summaryMatch").textContent =
        matchData.match;


    document.getElementById("summaryStand").textContent =
        selectedStand;


    document.getElementById("summaryPrice").textContent =
        "₹" + price;


    document.getElementById("summaryQuantity").textContent =
        quantity;


    document.getElementById("summaryTotal").textContent =
        "₹" + total;

}



/* =====================================================
   LISTEN FOR FORM CHANGES
===================================================== */

matchSelect.addEventListener("change", updateSummary);

standSelect.addEventListener("change", updateSummary);

ticketInput.addEventListener("input", updateSummary);



/* =====================================================
   BOOK BUTTONS
===================================================== */

const bookButtons = document.querySelectorAll(".book-button");


bookButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const matchNumber = this.getAttribute("data-match");


        matchSelect.value = matchNumber;


        updateSummary();

    });

});



/* =====================================================
   BOOKING FORM
===================================================== */

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const selectedMatch = matchSelect.value;

    const selectedStand = standSelect.value;

    const quantity = parseInt(ticketInput.value);


    const matchData = ticketPrices[selectedMatch];


    let price;


    if (selectedStand === "General") {

        price = matchData.general;

    }

    else if (selectedStand === "Premium") {

        price = matchData.premium;

    }

    else {

        price = matchData.vip;

    }


    const total = price * quantity;


    alert(
        "Booking Confirmed!\n\n" +
        "Match: " + matchData.match + "\n" +
        "Stand: " + selectedStand + "\n" +
        "Tickets: " + quantity + "\n" +
        "Total Amount: ₹" + total
    );

});

