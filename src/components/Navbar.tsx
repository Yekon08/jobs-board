import { useState, useContext, MouseEvent } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";

import { User } from "firebase/auth";

import PhonelinkSharpIcon from "@mui/icons-material/PhonelinkSharp";
import { UserContext } from "../context/userContext";

interface userContext {
  currentUser: User | null;
  handleSignInGoogle: () => void;
  handleSignOutGoogle: () => void;
}

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {
    currentUser,
    handleSignInGoogle,
    handleSignOutGoogle,
  }: userContext | Record<string, never> = useContext(UserContext);

  const userSettings = (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {currentUser ? (
            <Avatar
              alt={`${currentUser.displayName} profile picture`}
              src={currentUser.photoURL as string}
            />
          ) : (
            <Avatar />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={handleSignOutGoogle}>
            Sign Out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PhonelinkSharpIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="h1"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JobBoard
            </Typography>
          </Box>

          <PhonelinkSharpIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JobBoard
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              userSettings
            ) : (
              <Typography
                variant="subtitle1"
                component="p"
                sx={{ cursor: "pointer" }}
                onClick={handleSignInGoogle}
              >
                Sign In
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
