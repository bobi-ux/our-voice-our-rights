document.getElementById("loadData").addEventListener("click", async () => {
  const district = document.getElementById("district").value;
  if (!district) {
    alert("Please select a district!");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/district/${district}`);
    if (!response.ok) throw new Error("District not found");
    const d = await response.json();

    document.getElementById("districtName").textContent = `${d.district} - MGNREGA Performance`;
    document.getElementById("households").textContent = d.households;
    document.getElementById("persondays").textContent = d.persondays;
    document.getElementById("avgdays").textContent = d.avgdays;
    document.getElementById("dataSection").classList.remove("hidden");

    const ctx = document.getElementById("performanceChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Households", "Person Days", "Avg Days"],
        datasets: [{
          label: "Performance",
          data: [d.households, d.persondays, d.avgdays],
          backgroundColor: ["#00796b", "#26a69a", "#4db6ac"]
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  } catch (error) {
    alert("Error loading data: " + error.message);
  }
});
