document.addEventListener("DOMContentLoaded", () => {
  const valueDisplay = document.querySelector(".value");
  const buttons = document.querySelectorAll(".button");
  const hourElement = document.querySelector(".hour");
  const minuteElement = document.querySelector(".minute");

  let currentValue = "0";
  let previousValue = null;
  let operator = null;

  /* Function to update the calculator display */
  function updateDisplay() {
    if (previousValue !== null && operator !== null) {
      valueDisplay.textContent = `${previousValue} ${operator} ${currentValue}`;
    } else {
      valueDisplay.textContent = currentValue;
    }
  }

  /* Function to handle number input */
  function handleNumber(number) {
    if (currentValue === "0" || currentValue === "Error") {
      currentValue = number;
    } else {
      currentValue += number;
    }
  }
  /* Function to handle operator input */
  function handleOperator(newOperator) {
    if (operator && previousValue !== null) {
      calculate();
    }
    operator = newOperator;
    previousValue = currentValue;
    currentValue = "0";
  }
  /* Function to perform calculations */
  function calculate() {
    if (operator && previousValue !== null) {
      const prev = parseFloat(previousValue);
      const curr = parseFloat(currentValue);

      if (isNaN(prev) || isNaN(curr)) {
        currentValue = "Error";
      } else {
        switch (operator) {
          case "+":
            currentValue = (prev + curr).toString();
            break;
          case "−":
            currentValue = (prev - curr).toString();
            break;
          case "×":
            currentValue = (prev * curr).toString();
            break;
          case "÷":
            currentValue = curr === 0 ? "Error" : (prev / curr).toString();
            break;
          default:
            currentValue = "Error";
        }
      }
      operator = null;
      previousValue = null;
    }
  }
  /* Function to handle special functions (AC, ±, %) */
  function handleFunction(func) {
    switch (func) {
      case "AC":
        currentValue = "0";
        previousValue = null;
        operator = null;
        break;
      case "±":
        currentValue = currentValue.startsWith("-")
          ? currentValue.slice(1)
          : `-${currentValue}`;
        break;
      case "%":
        currentValue = (parseFloat(currentValue) / 100).toString();
        break;
    }
  }
  /* Function to calculate Ethiopian time */
  function calculateEthiopianDateTime() {
    const now = new Date();
    // Convert Gregorian time to Ethiopian time
    const gregorianYear = now.getFullYear();
    const gregorianMonth = now.getMonth() + 1; // JavaScript months are 0-based
    const gregorianDay = now.getDate();

    let ethiopianYear = gregorianYear - 8;
    let ethiopianMonth = gregorianMonth - 4;
    let ethiopianDay = gregorianDay;

    if (ethiopianMonth < 1) {
      ethiopianMonth += 12;
      ethiopianYear -= 1;
    }
    // Adjust day boundaries for Ethiopian calendar
    if (gregorianMonth === 1 || gregorianMonth === 2) {
      ethiopianDay += 22;
    } else {
      ethiopianDay -= 10;
    }
    if (ethiopianDay < 1) {
      ethiopianMonth -= 1;
      ethiopianDay += 30;
      if (ethiopianMonth < 1) {
        ethiopianMonth = 13;
        ethiopianYear -= 1;
      }
    }
    // Adjust hours to Ethiopian time (6-hour difference)
    let ethiopianHours = now.getHours() - 6;
    if (ethiopianHours < 0) {
      ethiopianHours += 24;
    }
    const ethiopianMinutes = now.getMinutes();
    // Format time with leading zeros
    const formattedHours = ethiopianHours.toString().padStart(2, "0");
    const formattedMinutes = ethiopianMinutes.toString().padStart(2, "0");

    // Display the Ethiopian time
    hourElement.textContent = formattedHours;
    minuteElement.textContent = formattedMinutes;
  }
  /* Attach event listeners to all buttons */
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const classes = button.classList;

      if (classes.contains("number-0")) {
        handleNumber("0");
      } else if (classes.contains("number-1")) {
        handleNumber("1");
      } else if (classes.contains("number-2")) {
        handleNumber("2");
      } else if (classes.contains("number-3")) {
        handleNumber("3");
      } else if (classes.contains("number-4")) {
        handleNumber("4");
      } else if (classes.contains("number-5")) {
        handleNumber("5");
      } else if (classes.contains("number-6")) {
        handleNumber("6");
      } else if (classes.contains("number-7")) {
        handleNumber("7");
      } else if (classes.contains("number-8")) {
        handleNumber("8");
      } else if (classes.contains("number-9")) {
        handleNumber("9");
      } else if (classes.contains("decimal")) {
        if (!currentValue.includes(".")) {
          currentValue += ".";
        }
      } else if (classes.contains("operator")) {
        if (classes.contains("addition")) {
          handleOperator("+");
        } else if (classes.contains("subtraction")) {
          handleOperator("−");
        } else if (classes.contains("multiplication")) {
          handleOperator("×");
        } else if (classes.contains("division")) {
          handleOperator("÷");
        } else if (classes.contains("equal")) {
          calculate();
        }
      } else if (classes.contains("function")) {
        if (classes.contains("ac")) {
          handleFunction("AC");
        } else if (classes.contains("pm")) {
          handleFunction("±");
        } else if (classes.contains("percent")) {
          handleFunction("%");
        }
      }

      updateDisplay();
    });
  });

  /* Initialize the Ethiopian clock and update every second */
  calculateEthiopianDateTime();
  setInterval(calculateEthiopianDateTime, 1000);

  /* Update the initial display */
  updateDisplay();
});
