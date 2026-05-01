window.onload = function () { 
  let expression = ""; 
  let isResultShown = false; 
  const outputElement = document.getElementById("result"); 
  const digitButtons = document.querySelectorAll('[id^="btn_digit_"]'); 
  const defaultResultColor = getComputedStyle(outputElement).color;
  function showOnScreen(value) {
    if (!isResultShown) {
      outputElement.style.color = defaultResultColor;
    }
    outputElement.textContent = value === "" ? "0" : value;
    outputElement.scrollLeft = outputElement.scrollWidth;
  } 
  function formatNumber(value) { 
    const normalizedValue = Number(value.toFixed(12)); 
    if (Object.is(normalizedValue, -0)) { 
      return "0"; 
    } 
    return String(normalizedValue);
  } 
  function toHexColorCode(value) {
    const normalizedValue = Number(value.toFixed(12));
    const colorNumber = Math.abs(Math.trunc(normalizedValue)) % 0x1000000;
    return colorNumber.toString(16).toUpperCase().padStart(6, "0");
  }
  function hasLeadingZeroNumbers(value) {
    return /(^|[+\-*/(])-?0\d+/.test(value);
  }
  function resetCalculator() { 
    expression = "";
    isResultShown = false; 
    showOnScreen(""); 
  }
  function showError() { 
    expression = "";
    isResultShown = true; 
    outputElement.style.color = defaultResultColor;
    showOnScreen("Ошибка"); 
  } 
  function getLastChar() { 
    return expression[expression.length - 1] || ""; 
  } 
  function isOperator(symbol) { 
    return ["+", "-", "*", "/"].includes(symbol); 
  } 
  function hasUnclosedOpeningBracket() {
    const openedBrackets = (expression.match(/\(/g) || []).length;
    const closedBrackets = (expression.match(/\)/g) || []).length; 
    return openedBrackets > closedBrackets; 
  }
  function replaceTrailingNumber(transformer) {
    const match = expression.match(/-?\d*\.?\d+$/);
    if (!match) { 
      return false; 
    }
    const currentNumber = match[0];
    const startIndex = expression.length - currentNumber.length;
    const updatedNumber = transformer(Number(currentNumber)); 
    expression = expression.slice(0, startIndex) + updatedNumber;
    showOnScreen(expression); 
    return true; 
  } 
  function clearBeforeFreshInput() { 
    if (!isResultShown) { 
      return; 
    } 
    expression = "";
    isResultShown = false;
  } 
  function onDigitButtonClicked(digit) { 
    clearBeforeFreshInput(); 
    const lastChar = getLastChar(); 
    if (lastChar === ")") {
      return;
    } 
    if (/^\d$/.test(digit)) {
      const currentNumberPart = (expression.match(/-?\d*\.?\d*$/) || [""])[0];
      const isIntegerPart = currentNumberPart !== "" && !currentNumberPart.includes(".");
      if (isIntegerPart && (currentNumberPart === "0" || currentNumberPart === "-0")) {
        if (digit === "0") {
          return;
        }
        expression = expression.slice(0, -1) + digit;
        showOnScreen(expression);
        return;
      }
    }
    if (digit === ".") { 
      const currentNumberPart = (expression.match(/\d*\.?\d*$/) || [""])[0];
      if (lastChar === ")" || lastChar === ".") {
        return;
      } 
      if (currentNumberPart.includes(".")) { 
        return; 
      }
      if (expression === "" || isOperator(lastChar) || lastChar === "(") {
        expression += "0."; 
        showOnScreen(expression);
        return;
      } 
    } 
    expression += digit; 
    showOnScreen(expression); 
  } 
  function onOpenBracketClicked() { 
    clearBeforeFreshInput();
    const lastChar = getLastChar();
    if (expression === "") { 
      expression = "("; 
      showOnScreen(expression); 
      return; 
    } 
    if (lastChar === ".") {
      return; 
    } 
    if (/\d/.test(lastChar) || lastChar === ")") { 
      expression += "*(";
      showOnScreen(expression); 
      return; 
    }
    expression += "(";
    showOnScreen(expression);
  } 
  function onCloseBracketClicked() {
    const lastChar = getLastChar(); 
    if (expression === "" || !hasUnclosedOpeningBracket()) { 
      return; 
    } 
    if (isOperator(lastChar) || lastChar === "(" || lastChar === ".") {
      return;
    } 
    expression += ")"; 
    isResultShown = false; 
    showOnScreen(expression);
  }
  function onOperationButtonClicked(operation) { 
    if (expression === "") { 
      if (operation === "-") { 
        expression = "-"; 
        showOnScreen(expression); 
      }
      return; 
    }
    const lastChar = getLastChar();
    const previousChar = expression[expression.length - 2] || ""; 
    const isUnaryMinus = lastChar === "-" && (expression.length === 1 || isOperator(previousChar) || previousChar === "("); 
    if (lastChar === ".") {
      return; 
    } 
    if (lastChar === "(") { 
      if (operation === "-") {
        expression += "-";
        isResultShown = false; 
        showOnScreen(expression); 
      }
      return; 
    } 
    if (isOperator(lastChar)) {
      if (isUnaryMinus) {
        return;
      }
      expression = expression.slice(0, -1) + operation; 
      isResultShown = false; 
      showOnScreen(expression); 
      return;
    } 
    if (/\d/.test(lastChar) || lastChar === ")") { 
      expression += operation; 
      isResultShown = false; 
      showOnScreen(expression);
    } 
  }
  function onSignButtonClicked() { 
    const lastChar = getLastChar();
    const previousChar = expression[expression.length - 2] || ""; 
    const isUnaryMinus = lastChar === "-" && (expression.length === 1 || isOperator(previousChar) || previousChar === "("); 
    if (expression === "") { 
      expression = "-"; 
      isResultShown = false; 
      showOnScreen(expression); 
      return; 
    } 
    if (isUnaryMinus) { 
      return; 
    } 
    if (lastChar === "(" || isOperator(lastChar)) { 
      expression += "-"; 
      isResultShown = false; 
      showOnScreen(expression); 
      return; 
    } 
    if (lastChar === ")" || lastChar === ".") {
      return; 
    }
    const numberChanged = replaceTrailingNumber(function (value) { 
      return formatNumber(value * -1); 
    }); 
    if (numberChanged) { 
      isResultShown = false; 
    } 
  } 
  function onPercentButtonClicked() { 
    const lastChar = getLastChar(); 
    if (expression === "" || lastChar === ")" || lastChar === ".") { 
      return;
    } 
    const numberChanged = replaceTrailingNumber(function (value) { 
      return formatNumber(value / 100); 
    });
    if (numberChanged) { 
      isResultShown = false;
    } 
  } 
  function evaluateExpression() { 
    const lastChar = getLastChar(); 
    const isSafeExpression = /^[0-9+\-*/().\s]+$/.test(expression); 
    if (expression === "" || !isSafeExpression) { 
      showError(); 
      return; 
    }
    const expressionWithoutSpaces = expression.replace(/\s+/g, "");
    if (hasLeadingZeroNumbers(expressionWithoutSpaces)) {
      showError();
      return;
    }
    if (isOperator(lastChar) || lastChar === "(" || lastChar === "." || hasUnclosedOpeningBracket()) { 
      showError();
      return; 
    } 
    try { 
      const result = Function('"use strict"; return (' + expression + ');')(); 
      if (!Number.isFinite(result)) { 
        showError(); 
        return; 
      } 
      expression = formatNumber(result); 
      const hexResult = toHexColorCode(result);
      isResultShown = true;
      outputElement.style.color = "#" + hexResult;
      showOnScreen(expression); 
    } catch (error) { 
      showError(); 
    } 
  } 
  function removeLastSymbol() { 
    if (isResultShown) { 
      resetCalculator(); 
      return; 
    } 
    if (expression === "") { 
      return; 
    } 
    expression = expression.slice(0, -1);
    showOnScreen(expression);
  }
  function handleKeyboardInput(key) { 
    if (/^\d$/.test(key)) { 
      onDigitButtonClicked(key); 
      return; 
    } 
    if (key === ".") {
      onDigitButtonClicked("."); 
      return; 
    } 
    if (key === "(") {
      onOpenBracketClicked();
      return; 
    } 
    if (key === ")") { 
      onCloseBracketClicked(); 
      return;
    } 
    if (["+", "-", "*", "/", "x", "X"].includes(key)) { 
      onOperationButtonClicked(key.toLowerCase() === "x" ? "*" : key);
      return; 
    } 
    if (key === "Enter" || key === "=") { 
      evaluateExpression(); 
      return; 
    } 
    if (key === "Backspace") {
      removeLastSymbol();
      return; 
    } 
    if (key === "Delete" || key === "Escape") {
      resetCalculator();
    } 
  } 
  digitButtons.forEach(function (button) {
    button.onclick = function () { 
      onDigitButtonClicked(button.textContent); 
    }; 
  }); 
  document.getElementById("btn_op_clear").onclick = function () {
    resetCalculator();
  };
  document.getElementById("btn_op_sign").onclick = function () { 
    onSignButtonClicked(); 
  };
  document.getElementById("btn_op_percent").onclick = function () { 
    onPercentButtonClicked();
  }; 
  document.getElementById("btn_op_div").onclick = function () { 
    onOperationButtonClicked("/"); 
  }; 
  document.getElementById("btn_op_mult").onclick = function () { 
    onOperationButtonClicked("*"); 
  }; 
  document.getElementById("btn_op_minus").onclick = function () {
    onOperationButtonClicked("-"); 
  }; 
  document.getElementById("btn_op_plus").onclick = function () { 
    onOperationButtonClicked("+");
  }; 
  document.getElementById("btn_op_equal").onclick = function () { 
    evaluateExpression(); 
  };
  document.addEventListener("keydown", function (event) { 
    const isTypingKey = /^\d$/.test(event.key) || [".", "(", ")", "+", "-", "*", "/", "x", "X", "=", "Enter", "Backspace", "Delete", "Escape"].includes(event.key); 
    if (!isTypingKey || event.ctrlKey || event.metaKey || event.altKey) { 
      return; 
    } 
    event.preventDefault(); 
    handleKeyboardInput(event.key); 
  }); 
}; 
