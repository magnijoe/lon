function job(jobName, pay, pension, bonus, fritvalg, hours, phone = Boolean, internet = Boolean, lunch = Boolean) {
    this.jobName = jobName;
    this.pay = pay;
    this.pension = pension;
    this.bonus = bonus;
    this.fritvalg = fritvalg;
    this.hours = hours;
    this.phone = phone;
    this.internet = internet;
    this.lunch = lunch;
}

var jobForm = document.querySelector(".lon-form")

jobForm.onsubmit = function(event){
    event.preventDefault();

    jobName = document.getElementById("inp-name").value

    payToggle = document.getElementById("lon-toggle").checked
    if(payToggle){
        pay = document.getElementById("inp-lon").value
    } else {
        pay = document.getElementById("inp-lon").value / 12
    }

    console.log(pay)
    pension = document.getElementById("inp-pension").value

    bonusToggle = document.getElementById("bonus-toggle").checked
    if(bonusToggle){
        bonus = document.getElementById("inp-bonus").value
    } else {
        bonus = document.getElementById("inp-bonus").value / 12
    }

    fritvalg = document.getElementById("inp-fritvalg").value
    hours = document.getElementById("inp-hours").value
    phone = document.getElementById("inp-phone-paid").checked
    internet = document.getElementById("inp-internet-paid").checked
    lunch = document.getElementById("inp-lunch-paid").checked

    newjob = new job(jobName, pay, pension, bonus, fritvalg, hours, phone, internet, lunch)
    jobsArray.push(newjob)

    updatejobs();
}

let job1 = new job("Nordicals", 33000, 5, 10000, 5, "37", true, false, true);
let job2 = new job("HLTV", 42000, 5, 10, 0, "37,5", false, true, false);


let jobsArray = [job1, job2];


// Get reference to the div where you want to display the jobs
let jobsContainer = document.querySelector(".jobs-wrap");


function updatejobs() {
    let currency = " DKK"
    jobsContainer.innerHTML = ""; // Clear the container

    // Iterate through the jobsArray and create divs for each job
    jobsArray.forEach(function(job, index) {
    // Create a new div for the job
    let jobDiv = document.createElement("div");
    jobDiv.classList.add("jobs-grid"); // Optional: Add a CSS class for styling purposes
    jobDiv.classList.add("jobs-container"); // Optional: Add a CSS class for styling purposes


    // Create elements for job details and append to the jobDiv

    let removeButton = document.createElement("div");
        removeButton.classList.add("close-button")
        removeButton.classList.add("flex-center")

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
    bonusDiv.textContent = job.bonus + currency;
    jobDiv.appendChild(bonusDiv);

    let fritvalgDiv = document.createElement("div");
    fritvalgDiv.classList.add("fritvalg")
    fritvalgDiv.textContent = job.fritvalg + "%";
    jobDiv.appendChild(fritvalgDiv);

    let hoursDiv = document.createElement("div");
    hoursDiv.classList.add("hours")
    hoursDiv.textContent = job.hours + " timer";
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
    phoneDiv.classList.add("phone")
    phoneDiv.classList.add("center")
    
    if(job.phone){
        phoneDiv.innerHTML = checkmarkChecked
    } else {
        phoneDiv.innerHTML = checkmark
    }
    jobDiv.appendChild(phoneDiv)

    let internetDiv = document.createElement("div")
    internetDiv.classList.add("internet")
    internetDiv.classList.add("center")
    
    if(job.internet){
        internetDiv.innerHTML = checkmarkChecked
    } else {
        internetDiv.innerHTML = checkmark
    }
    jobDiv.appendChild(internetDiv)

    let lunchDiv = document.createElement("div")
    lunchDiv.classList.add("internet")
    lunchDiv.classList.add("center")
    
    if(job.lunch){
        lunchDiv.innerHTML = checkmarkChecked
    } else {
        lunchDiv.innerHTML = checkmark
    }
    jobDiv.appendChild(lunchDiv)

    let payDiv = document.createElement("div");
    payDiv.classList.add("pay")
    payAnually = job.pay * 12 + job.bonus * 12
    console.log("job.pay = " + job.pay)
    payDiv.textContent = payAnually.toLocaleString("da-DK") + currency;
    jobDiv.appendChild(payDiv);

    let totalDiv = document.createElement("div");
    totalDiv.classList.add("pay-gross");
    totalDiv.classList.add("right");


    let totalGross = 0

    function getTotalGross() {
        totalGross += job.pay * 12
        totalGross += job.pay * 12 * job.pension / 100
        totalGross += job.pay * 12 * job.fritvalg / 100
        totalGross += job.bonus * 12
        return totalGross
    }

    console.log(getTotalGross());

    totalDiv.textContent = totalGross.toLocaleString("da-DK") + currency
    jobDiv.appendChild(totalDiv)





    // Append the jobDiv to the jobsContainer
    jobsContainer.appendChild(jobDiv);
    });
}

updatejobs();