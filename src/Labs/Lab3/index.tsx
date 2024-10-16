import BooleanVariables from "./BooleanVariables";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import VariableTypes from "./VariableTypes";
import VariablesAndConstants from "./VariablesAndConstants";

export default function Lab3() {
  return (
    <div id="wd-lab3">
      <h2>Lab 3</h2>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
    </div>
  );
}
