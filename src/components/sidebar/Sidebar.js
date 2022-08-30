import React, { useContext, useState } from "react";

import {
  StyledLink,
  StyledLinkContainer,
  StyledLinkIcon,
  StyledLinkLabel,
  StyledLinkNotif,
  StyledPerson,
  StyledSidebar,
  StyledSideBarButton,
  StyledSidebarDivider,
  StyledTheme,
  StyledThemeLabel,
  StyledThemeToggler,
  StyledToggleThumb,
} from "./Sidebar-styles";
import { AiOutlineHome, AiOutlineSetting, AiOutlineLeft } from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { ThemeContext } from "../../App";
import PersonIcon from "@mui/icons-material/Person";

const Sidebar = () => {
  const { setTheme, theme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <StyledSidebar isOpen={sidebarOpen}>
      <>
        <StyledSideBarButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <AiOutlineLeft />
        </StyledSideBarButton>
      </>
      <StyledPerson>
        <PersonIcon fontSize="large" />
        {sidebarOpen && (
          <>
            <StyledLinkLabel>Person Username Here</StyledLinkLabel>
          </>
        )}
      </StyledPerson>

      <StyledSidebarDivider />
      {linksArray.map(({ icon, label, notif, to }) => (
        <StyledLinkContainer key={label}>
          <StyledLink
            to={to}
            // when sidebar is not open, width: fit-content. else, the params that we set
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            <StyledLinkIcon>{icon}</StyledLinkIcon>
            {sidebarOpen && (
              <>
                <StyledLinkLabel>{label}</StyledLinkLabel>
                {/* if notifications are at 0 or null, do not display */}
                {!!notif && <StyledLinkNotif>{notif}</StyledLinkNotif>}
              </>
            )}
          </StyledLink>
        </StyledLinkContainer>
      ))}
      <StyledSidebarDivider />
      {linksSecondaryArray.map(({ icon, label }) => (
        <StyledLinkContainer key={label}>
          <StyledLink
            to="/"
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            <StyledLinkIcon>{icon}</StyledLinkIcon>
            {sidebarOpen && <StyledLinkLabel>{label}</StyledLinkLabel>}
          </StyledLink>
        </StyledLinkContainer>
      ))}
      <StyledSidebarDivider />
      <StyledTheme>
        {sidebarOpen && <StyledThemeLabel>Dark Mode</StyledThemeLabel>}
        <StyledThemeToggler
          isActive={theme === "dark"}
          onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
        >
          <StyledToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
        </StyledThemeToggler>
      </StyledTheme>
    </StyledSidebar>
  );
};
const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
<<<<<<< Updated upstream
    to: "/",
=======
    to: "/home",
>>>>>>> Stashed changes
    notif: 0,
  },
  {
    label: "Posts",
    icon: <MdOutlineAnalytics />,
    to: "/posts",
    notif: 1,
  },
  {
    label: "Account",
    icon: <BsPeople />,
    to: "/account",
    notif: 5,
  },
];

const linksSecondaryArray = [
  {
    label: "Settings",
    icon: <AiOutlineSetting />,
  },
  {
    label: "Logout",
    icon: <MdLogout />,
  },
];

export default Sidebar;
