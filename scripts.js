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
    pay = document.getElementById("inp-lon").value
    pension = document.getElementById("inp-pension").value
    bonus = document.getElementById("inp-bonus").value
    fritvalg = document.getElementById("inp-fritvalg").value
    hours = document.getElementById("inp-hours").value
    // phone = document.getElementById("inp-phone-paid").checked
    phone = true
    internet = true
    lunch = false

    newjob = new job(jobName, pay, pension, bonus, fritvalg, hours, phone, internet, lunch)
    jobsArray.push(newjob)

    updatejobs();
}

let job1 = new job("Nordicals", "33.000", "5%", "0%", "0%", "37", true, false, true);
let job2 = new job("HLTV", "42.000", "5%", "10%", "0%", "37,5", true, true, true);


let jobsArray = [job1, job2];


// Get reference to the div where you want to display the jobs
let jobsContainer = document.querySelector(".jobs-wrap");


function updatejobs() {
    jobsContainer.innerHTML = ""; // Clear the container

    // Iterate through the jobsArray and create divs for each job
    jobsArray.forEach(function(job, index) {
    // Create a new div for the job
    let jobDiv = document.createElement("div");
    jobDiv.classList.add("jobs-grid"); // Optional: Add a CSS class for styling purposes
    jobDiv.classList.add("jobs-container"); // Optional: Add a CSS class for styling purposes


    // Create elements for job details and append to the jobDiv

    let removeButton = document.createElement("button");
        removeButton.textContent = "X";
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
    pensionDiv.classList.add("pension")
    pensionDiv.textContent = job.pension;
    jobDiv.appendChild(pensionDiv);

    let bonusDiv = document.createElement("div");
    bonusDiv.classList.add("bonus")
    bonusDiv.textContent = job.bonus;
    jobDiv.appendChild(bonusDiv);

    let fritvalgDiv = document.createElement("div");
    fritvalgDiv.classList.add("fritvalg")
    fritvalgDiv.textContent = job.fritvalg;
    jobDiv.appendChild(fritvalgDiv);

    let hoursDiv = document.createElement("div");
    hoursDiv.classList.add("hours")
    hoursDiv.textContent = job.hours;
    jobDiv.appendChild(hoursDiv);

    // phone, internet, lunch placeholders
    let emptyDiv1 = document.createElement("div");
    let emptyDiv2 = document.createElement("div");
    let emptyDiv3 = document.createElement("div");

    jobDiv.appendChild(emptyDiv1);
    jobDiv.appendChild(emptyDiv2);
    jobDiv.appendChild(emptyDiv3);



    let payDiv = document.createElement("div");
    payDiv.classList.add("pay")
    payDiv.textContent = job.pay;
    jobDiv.appendChild(payDiv);



    // Append the jobDiv to the jobsContainer
    jobsContainer.appendChild(jobDiv);
    });
}

updatejobs();