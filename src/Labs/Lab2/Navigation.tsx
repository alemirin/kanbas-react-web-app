import { Link } from "react-router-dom";
export default function Lab2Navigation() {
  return (
    <div id="wd-lab2-navigation">
      <Link to={"/Labs/Lab2/ForegroundColors"} id="wd-fg-link">
        Foreground Colors
      </Link>
      <br />
      <Link to={"/Labs/Lab2/BackgroundColors"} id="wd-bg-link">
        Background Colors
      </Link>
      <br />
      <Link to={"/Labs/Lab2/Borders"} id="wd-borders-link">
        Borders
      </Link>
      <br />
      <Link to={"/Labs/Lab2/Corners"} id="wd-corners-link">
        Corners
      </Link>
      <br />
      <Link to={"/Labs/Lab2/Dimensions"} id="wd-dims-link">
        Dimensions
      </Link>
      <br />
      <Link to={"/Labs/Lab2/Margins"} id="wd-mgns-link">
        Margins
      </Link>
      <br />
      <Link to={"/Labs/Lab2/Padding"} id="wd-pdng-link">
        Padding
      </Link>
      <br />
      <Link to={"/Labs/Lab2/Positions"} id="wd-pst-link">
        Positions
      </Link>
      <br />
      <Link to={"/Labs/Lab2/Zindex"} id="wd-zindex-link">
        Z index
      </Link>
      <br />
      <Link to={"/Labs/Lab2/Float"} id="wd-float-link">
        Float
      </Link>
      <br />
      <Link to={"/Labs/Lab2/GridLayout"} id="wd-gl-link">
        Grid Layout
      </Link>
      <br />
      <Link to={"/Labs/Lab2/Flex"} id="wd-flex-link">
        Flex
      </Link>
      <br />
      <Link to={"/Labs/Lab2/ReactIcons"} id="wd-RI-link">
        React Icons
      </Link>
      <br />
      <Link to={"/Labs/Lab2/BootstrapGrid"} id="wd-BG-link">
        Bootstrap Grid
      </Link>
      <br />
      <Link to={"/Labs/Lab2/ScreenSizeLabel"} id="wd-ssl-link">
        Screen Size Label
      </Link>
      <br />
      <Link to={"/Labs/Lab2/BootstrapTables"} id="wd-bt-link">
        Bootstrap Tables
      </Link>
      <br />
      <Link to={"/Labs/Lab2/BootstrapLists"} id="wd-bl-link">
        Bootstrap Lists
      </Link>
      <br />
      <Link to={"/Labs/Lab2/BootstrapForms"} id="wd-forms-link">
        Bootstrap Forms
      </Link>
      <br />
    </div>
  );
}
