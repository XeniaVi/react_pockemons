export const stylesBtn = (theme) => ({
  position: "absolute",
  top: "1rem",
  left: "1rem",
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  transition: "all 0.5s ease-in-out",

  "&:hover": {
    borderColor: theme.palette.primary.main,
    transition: "all 0.5s ease-in-out",
  },
});

export const stylesCard = {
  width: "calc(48% - 2rem)",
};

export const MenuPropsFilter = {
  PaperProps: {
    sx: {
      width: "230px",
      p: 1,
      "& .MuiList-root": {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "0.5rem",
      },
    },
  },
};

export const MenuPropsLimit = {
  PaperProps: {
    sx: {
      width: "230px",
      p: 1,
    },
  },
};

export const MenuItemPropsFilter = (props) => ({
  width: "45%",
  background: props,
  "&:hover": {
    background: props,
    opacity: 0.75,
  },
});

export const stylesSelectForm = (props, theme) => ({
  width: props,
  borderColor: theme.palette.secondary.main,
  "& label.Mui-focused": {
    color: theme.palette.secondary.main,
  },
  "& .MuiInputBase-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
  },
});

export const stylesInput = (theme) => ({
  borderColor: theme.palette.secondary.main,
  "& label.Mui-focused": {
    color: theme.palette.secondary.main,
  },
  "& .MuiInputBase-root": {
    p: 1,
    "&::after": {
      borderColor: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
  },
});

export const sizeDefaultAvatar = { width: "156px", height: "156px" };
