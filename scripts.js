function job(jobName, pay, pension, bonus, fritvalg, hours, phone = Boolean, internet = Boolean, lunch = Boolean, exDaysOff = Boolean) {
    this.jobName = jobName;
    this.pay = pay;
    this.pension = pension;
    this.bonus = bonus;
    this.fritvalg = fritvalg;
    this.hours = hours;
    this.phone = phone;
    this.internet = internet;
    this.lunch = lunch;
    this.exDaysOff = exDaysOff
}

var inputToLocaleStringElm = document.querySelectorAll(".format-input")

// auto format inputs with toLocaleString while typing
inputToLocaleStringElm.forEach(function(elm){
    elm.addEventListener('input', function(){
        var n = parseInt(this.value.replace(/\D/g,''), 10);
        elm.value = n.toLocaleString("da-DK")

        if(elm.value === "NaN"){
            elm.value = ""
        }
    });
})

var jobForm = document.querySelector(".lon-form")

jobForm.onsubmit = function(event){
    event.preventDefault();

    jobName = document.getElementById("inp-name").value

    payToggle = document.getElementById("lon-toggle").checked
    if(payToggle){
        payValue = document.getElementById("inp-lon").value
        payValueClean = payValue.replace(/\./g,'')
        pay = Number(payValueClean)
    } else {
        payValue = document.getElementById("inp-lon").value
        payValueClean = payValue.replace(/\./g,'')
        pay = Number(payValueClean) * 12
    }

    pension = document.getElementById("inp-pension").value

    bonusToggle = document.getElementById("bonus-toggle").checked
    if(bonusToggle){
        bonusValue = document.getElementById("inp-bonus").value
        bonusValueClean = bonusValue.replace(/\./g,'')
        bonus = Number(bonusValueClean)
        console.log("bonus yearly selected " + bonus)
    } else {
        bonusValue = document.getElementById("inp-bonus").value
        bonusValueClean = bonusValue.replace(/\./g,'')
        bonus = Number(bonusValueClean) * 12
        console.log("bonus montly selected " + bonus)
    }

    fritvalg = document.getElementById("inp-fritvalg").value
    hours = document.getElementById("inp-hours").value
    phone = document.getElementById("inp-phone-paid").checked
    internet = document.getElementById("inp-internet-paid").checked
    lunch = document.getElementById("inp-lunch-paid").checked
    exDaysOff = document.getElementById("inp-extra-days-off").checked

    newjob = new job(jobName, pay, pension, bonus, fritvalg, hours, phone, internet, lunch, exDaysOff)
    jobsArray.push(newjob)

    updatejobs();
    showJobInfo();
}

let jobInfoContainer = document.querySelector(".jobs-info")

function showJobInfo(){

    let payDiv = document.createElement("div")
    payDiv.innerHTML = `Din årlige løn er <span class="highlight">${pay.toLocaleString("da-DK")} kroner.</span> `
    jobInfoContainer.appendChild(payDiv)

    let pensionDiv = document.createElement("div")
    pensionTotal = pay * pension / 100
    pensionDiv.innerHTML = `Din arbejdsgiver indbetaler <span class="highlight">${pension.toLocaleString("da-DK")}%</span> til din pension, som årligt svarer til <span class="highlight">${pensionTotal.toLocaleString("da-DK")}</span> kroner.`
    jobInfoContainer.appendChild(pensionDiv)

    let bonusDiv = document.createElement("div")
    bonusDiv.innerHTML = `Udover din årlige løn, får du bonus eller provision på <span class="highlight">${bonus.toLocaleString("da-DK")} kroner</span>. Det antages, at dette beløb ikke er pensionsgivende.`
    jobInfoContainer.appendChild(bonusDiv)

    let fritvalgDiv = document.createElement("div")
    fritvalgTotal = pay * fritvalg / 100
    fritvalgDiv.innerHTML = `Din fritvalgsordning giver dig <span class="highlight">${fritvalgTotal.toLocaleString("da-DK")} kroner</span> ekstra i løn om året. Det antages, at dette beløb ikke er pensionsgivende.`
    jobInfoContainer.appendChild(fritvalgDiv)

    let hoursDiv = document.createElement("div")
    monthlyPay = pay / 12
    regulatePay = monthlyPay * 37 / hours

    if(hours === 37){
        hoursDiv.innerHTML = `Du arbejder <span class="highlight">${hours} timer</span> om ugen som svarer til en normal fuldtidsstilling.`
    } else {
        hoursDiv.innerHTML = `Du arbejder <span class="highlight">${hours} timer</span> om ugen og tjener <span class="highlight">${monthlyPay.toLocaleString("da-DK")} kroner</span> om måneden. Hvis din arbejdstid var 37 timer om ugen, ville det svare til <span class="highlight">${regulatePay.toLocaleString("da-DK")}</span> kroner om måneden.`
    }
    jobInfoContainer.appendChild(hoursDiv)
}

let job1 = new job("Nordicals", 396000, 5, 9900, 5, "37", true, false, true, false);
let job2 = new job("HLTV", 480000, 5, 10000, 0, "37,5", false, true, false, false);
let job3 = new job("HLTVferiedage", 480000, 5, 10000, 0, "37,5", false, true, false, true);


let jobsArray = [job1, job2, job3];

// Get reference to the div where you want to display the jobs
let jobsContainer = document.querySelector(".jobs-wrap");

function updatejobs() {

    let currency = " DKK"
    jobsContainer.innerHTML = ""; // Clear the container

    // Iterate through the jobsArray and create divs for each job
    jobsArray.forEach(function(job, index) {
    // Create a new div for the job
    let jobDiv = document.createElement("div");
    jobDiv.className = "jobs-grid jobs-container"

    // Create elements for job details and append to the jobDiv

    let removeButton = document.createElement("div");
        removeButton.className = "close-button flex-center"

        removeButton.innerHTML = `
            <i class="fa-solid fa-xmark"></i>
        `;
        removeButton.addEventListener("click", function() {
            // Remove the job from the array
            jobsArray.splice(index, 1);
            // Display updated jobs
            updatejobs();
        });

    jobDiv.appendChild(removeButton)

    let jobNameDiv = document.createElement("div");
    jobNameDiv.textContent = job.jobName;
    jobNameDiv.classList.add("job")
    jobDiv.appendChild(jobNameDiv);

    let pensionDiv = document.createElement("div");
    pensionDiv.classList.add("pension");
    pensionDiv.textContent = job.pension + "%";
    jobDiv.appendChild(pensionDiv);

    let bonusDiv = document.createElement("div");
    bonusDiv.classList.add("bonus")

    bonusDivided = job.bonus / 1000
    // bonusDividedRounded = Math.round(bonusDivided * 10) / 10;
    job.bonus >= 1000 ? bonusDiv.textContent = bonusDivided + "K" : bonusDiv.textContent = job.bonus.toLocaleString("da-DK") + currency;


    // bonusDiv.textContent = job.bonus.toLocaleString("da-DK") + currency;
    jobDiv.appendChild(bonusDiv);

    let fritvalgDiv = document.createElement("div");
    fritvalgDiv.classList.add("fritvalg")
    fritvalgDiv.textContent = job.fritvalg + "%";
    jobDiv.appendChild(fritvalgDiv);

    let hoursDiv = document.createElement("div");
    hoursDiv.classList.add("hours")
    hoursDiv.textContent = job.hours + " t";
    jobDiv.appendChild(hoursDiv);

    checkmark = `
        <label class="check-container">
            <input type="checkbox" disabled>
            <span class="checkmark" ></span>
        </label>
    `;

    checkmarkChecked = `
        <label class="check-container">
            <input type="checkbox" checked disabled>
            <span class="checkmark" ></span>
        </label>
    `;

    let phoneDiv = document.createElement("div")
    phoneDiv.className = "phone center"
    job.phone ? phoneDiv.innerHTML = checkmarkChecked : phoneDiv.innerHTML = checkmark
    jobDiv.appendChild(phoneDiv)

    let internetDiv = document.createElement("div")
    internetDiv.className = "internet center"
    job.internet ? internetDiv.innerHTML = checkmarkChecked : internetDiv.innerHTML = checkmark
    jobDiv.appendChild(internetDiv)

    let lunchDiv = document.createElement("div")
    lunchDiv.className = "lunch center"
    job.lunch ? lunchDiv.innerHTML = checkmarkChecked : lunchDiv.innerHTML = checkmark
    jobDiv.appendChild(lunchDiv)

    let payDiv = document.createElement("div");
    payDiv.classList.add("pay")
    payAnually = job.pay + job.bonus
    console.log("job.pay = " + job.pay)
    payDiv.textContent = payAnually.toLocaleString("da-DK") + currency;
    jobDiv.appendChild(payDiv);

    let totalDiv = document.createElement("div");
    totalDiv.classList.add("pay-gross");
    totalDiv.classList.add("right");

    let totalGross = 0

    function getTotalGross() {
        totalGross += job.pay
        totalGross += job.pay * job.pension / 100
        totalGross += job.pay * job.fritvalg / 100
        totalGross += job.bonus
        job.exDaysOff ? totalGross += job.pay * 0.0045 * 5 : totalGross += 0;
        return totalGross.toFixed(0)
    }

    console.log(getTotalGross());

    totalDiv.textContent = totalGross.toLocaleString("da-DK") + currency
    jobDiv.appendChild(totalDiv)

    // Append the jobDiv to the jobsContainer
    jobsContainer.appendChild(jobDiv);
    });
}

updatejobs();