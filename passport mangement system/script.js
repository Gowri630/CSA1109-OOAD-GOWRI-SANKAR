function readForm(form) {
  const data = {};
  new FormData(form).forEach((value, key) => data[key] = value);
  return data;
}
function saveSection(key, form) {
  const data = readForm(form);
  localStorage.setItem(key, JSON.stringify(data));
}
function getSection(key) {
  try { return JSON.parse(localStorage.getItem(key) || "{}"); }
  catch (error) { return {}; }
}
function showMessage(id, message) {
  const element = document.getElementById(id);
  if (element) element.textContent = message;
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    if (username === "applicant" && password === "passport123") {
      localStorage.setItem("passportLoggedIn", "yes");
      window.location.href = "form1.html";
    } else {
      showMessage("loginMessage", "Incorrect username or password. Please try again.");
    }
  });
}

const form1 = document.getElementById("form1");
if (form1) {
  if (localStorage.getItem("passportLoggedIn") !== "yes") window.location.href = "index.html";
  const saved = getSection("passportForm1");
  Object.keys(saved).forEach(key => { if (form1.elements[key]) form1.elements[key].value = saved[key]; });
  form1.addEventListener("submit", function(event) {
    event.preventDefault();
    saveSection("passportForm1", form1);
    window.location.href = "form2.html";
  });
}

const form2 = document.getElementById("form2");
if (form2) {
  if (localStorage.getItem("passportLoggedIn") !== "yes") window.location.href = "index.html";
  const saved = getSection("passportForm2");
  Object.keys(saved).forEach(key => { if (form2.elements[key]) form2.elements[key].value = saved[key]; });
  form2.addEventListener("submit", function(event) {
    event.preventDefault();
    saveSection("passportForm2", form2);
    window.location.href = "form3.html";
  });
}

const form3 = document.getElementById("form3");
if (form3) {
  if (localStorage.getItem("passportLoggedIn") !== "yes") window.location.href = "index.html";
  const saved = getSection("passportForm3");
  Object.keys(saved).forEach(key => { if (form3.elements[key]) form3.elements[key].value = saved[key]; });
  form3.addEventListener("submit", function(event) {
    event.preventDefault();
    saveSection("passportForm3", form3);
    const applicationNumber = "DEMO-" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById("applicationNumber").textContent = applicationNumber;
    document.getElementById("confirmation").classList.remove("hidden");
    form3.classList.add("hidden");
    localStorage.setItem("passportApplicationNumber", applicationNumber);
  });

  document.getElementById("viewSummary").addEventListener("click", function() {
    const summary = document.getElementById("summary");
    const data = {
      "Personal Details": getSection("passportForm1"),
      "Address Details": getSection("passportForm2"),
      "Passport Details": getSection("passportForm3")
    };
    summary.innerHTML = "";
    Object.entries(data).forEach(([section, values]) => {
      const heading = document.createElement("h3");
      heading.textContent = section;
      summary.appendChild(heading);
      Object.entries(values).forEach(([key, value]) => {
        const row = document.createElement("p");
        row.textContent = key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase()) + ": " + value;
        summary.appendChild(row);
      });
    });
    summary.classList.toggle("hidden");
  });

  document.getElementById("startAgain").addEventListener("click", function() {
    ["passportForm1", "passportForm2", "passportForm3", "passportApplicationNumber"].forEach(key => localStorage.removeItem(key));
    window.location.href = "form1.html";
  });
}
