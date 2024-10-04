import "./index.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Lab2Navigation from "./Navigation";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Margins from "./Margins";
import Padding from "./Padding";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import ReactIconsSampler from "./ReactIcons";
import BootstrapGrids from "./BootstrapGrids";
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";

export default function Lab2() {
  return (
    <div className="container">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <div id="wd-css-id-selectors">
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the elements of the same
          name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Here's another paragraph using a different ID and a different look and
          feel
        </p>
      </div>
      <div id="wd-css-class-selectors">
        <h3>Class selectors</h3>
        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an element's
          CLASS attribute
        </p>
        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>
      </div>
      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular places in
            the document
            <p className="wd-selector-3">
              This paragraph's red background is referenced as
              <br />
              .selector-2 .selector3
              <br />
              meaning the descendant of some ancestor.
              <br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span>
              <br />
              You can combine these relationships to create specific styles
              depending on the document structure
            </p>
          </div>
        </div>
      </div>
      <table>
        <tr>
          <td valign="top">
            <Lab2Navigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/" element={<Navigate to="/Labs/Lab2" />} />
              <Route path="ForegroundColors" element={<ForegroundColors />} />
              <Route path="BackgroundColors" element={<BackgroundColors />} />
              <Route path="Corners" element={<Corners />} />
              <Route path="Borders" element={<Borders />} />
              <Route path="Margins" element={<Margins />} />
              <Route path="Padding" element={<Padding />} />
              <Route path="Dimensions" element={<Dimensions />} />
              <Route path="Positions" element={<Positions />} />
              <Route path="Zindex" element={<Zindex />} />
              <Route path="Float" element={<Float />} />
              <Route path="GridLayout" element={<GridLayout />} />
              <Route path="Flex" element={<Flex />} />
              <Route path="ReactIcons" element={<ReactIconsSampler />} />
              <Route path="BootstrapGrid" element={<BootstrapGrids />} />
              <Route path="ScreenSizeLabel" element={<ScreenSizeLabel />} />
              <Route path="BootstrapTables" element={<BootstrapTables />} />
              <Route path="BootstrapLists" element={<BootstrapLists />} />
              <Route path="BootstrapForms" element={<BootstrapForms />} />
              <Route
                path="BootstrapNavigation"
                element={<BootstrapNavigation />}
              />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
