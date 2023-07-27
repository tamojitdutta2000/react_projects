import { useState } from 'react';
import './App.css';
import Buttons from './components/button/Buttons';

function App() {

  // display is shown in the screen whatever we type is display
  const [display, setDisplay] = useState("0");

  // equation array is used as a stack to calculate the result
  const [equation, setEquation] = useState([]);

  // array of buttons which is iterated and passed to the buttons component
  const buttonsArr = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]

  //string of operators
  const operators = "*+-=/";

  const handleClick = (buttonName) => {
    switch (buttonName) {
      case "AC":
        // clear the display and the equation
        setDisplay("0");
        setEquation([]);
        break;

      case "+/-":
        // if top of the stack is aldready a - we replace that with a + to avoid condition eval(3--3)
        if (equation.length > 1 && equation[equation.length - 1] === "-") {
          equation.pop();
          equation.push("+");
          setEquation(equation);
        }
        setDisplay("" + (-1 * display));
        break;

      case "%":
        setDisplay("" + (display / 100));
        break;

      case "=":
        // here we convert our equation stack to string and replace all the ',' and append the display
        // as we push into the stack only when we hit a operator +,-,*,/ 
        // so still display is not present in stack when '=' is clicked
        let expression = equation.toString().replaceAll(",", "") + display;

        //Calculating the answer using expression and setting it to display and clearing the equation
        try {
          setDisplay("" + eval(expression));
        } catch (e) {
          console.error(e);
        }
        setEquation([]);
        break;

      default:
        // if the button pressed is an operator then we push the display and the operator into stack
        // and clear the display
        if (operators.includes(buttonName)) {
          equation.push(display);
          equation.push(buttonName);
          setEquation(equation);
          setDisplay("0");
        } else {

          // We limit the number of characters being entered to avoid it exiting the display
          if (display.length <= 26) {

            // To prevent multiple 0's to be entered until any non zero is entered like 00000
            if (display.length === 1 && display.charAt(0) === "0" && buttonName === "0") {
              return;
            }
            // For the case when only . is entered and we want 0.
            else if (display.length === 1 && display.charAt(0) === "0" && buttonName === ".") {
              setDisplay("0" + buttonName);
            }
            // To prevent multiple 0's to be entered before any number like 001 or 01
            else if (display.length === 1 && display.charAt(0) === "0" && buttonName !== "0") {
              setDisplay(buttonName);
            }
            //To prevent multiple "." if aldready there is one "."
            else if (display.includes(".") && buttonName === ".") {
              return;
            }
            // To prevent the condition Infinity123 in display
            else if (display === "Infinity") {
              setDisplay(buttonName);
            }
            else {
              setDisplay(display + buttonName);
            }
          } else {
            //If length is exceeded
            alert("Length exceeded !!");
          }
        }
        break;
    }
  }

  return (
    <div className="calculator">
      <div className="answer">
        <p>{display}</p>
      </div>
      {buttonsArr.map((buttonname, index) => {
        return (<Buttons key={index} buttonName={buttonname} buttonClass={operators.includes(buttonname) ? "operator" : null} handleClick={handleClick} />)
      })}
    </div >
  );
}

export default App;
