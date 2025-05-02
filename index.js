// Grab the DOM elements for savings, expenses, and depletion output
const savingsInput = document.getElementById("savings");
const incomeInput = document.getElementById("rough-income");
const expenseInput = document.getElementById("expense-total");
const runwayOutput = document.getElementById("runway-output");
const burnRateOutput = document.getElementById("burn-rate-output");

// Function to calculate and update depletion
function calculateDepletion() {
  const savings = parseFloat(savingsInput.value);  // Get savings from input
  const income = parseFloat(incomeInput.value);  // Get income from input
  const expense = parseFloat(expenseInput.value);  // Get expenses from input

  // Check if both values are valid numbers
  if (!isNaN(savings) && !isNaN(income) && !isNaN(expense) && expense > 0) {
    //calculate burnrate
    const netIncomePerMonth = income * 0.89 * 0.9 * 4.333;
    const monthlyBurn = expense - netIncomePerMonth;

    if (monthlyBurn <= 0) {
        depletionOutput.textContent = "You will not run out of savings at this rate! 🎉";
        return;
      }

    // Calculate how many months savings will last (runway)
    const months = savings / monthlyBurn;
    const roundedMonths = months.toFixed(2); // One decimal place
    let realMonths = 0;
    let days = roundedMonths * 30.41;
    while (days >= 30.41){
        realMonths++;
        days -= 30.41;
    }

    // Display the result in the "Depletion Estimate" section
    runwayOutput.textContent = `Your savings will last approximately ${realMonths} months, ${Math.floor(days)} days.`;
    burnRateOutput.innerHTML = `Monthly burn rate: <span id="burn-rate-dollars">$${monthlyBurn.toLocaleString('en-US', {maximumFractionDigits:0})}</span>.`;
  } else {
    // If inputs are not valid, show an error message
    runwayOutput.textContent = "Please enter valid savings and expenses.";
  }
}

// Listen for changes in savings or expense inputs
savingsInput.addEventListener("input", calculateDepletion);
incomeInput.addEventListener("input", calculateDepletion);
expenseInput.addEventListener("input", calculateDepletion);
