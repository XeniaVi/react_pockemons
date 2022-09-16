export const stylesBtn = {
  position: "absolute",
  top: "1rem",
  left: "1rem",
  color: "#08212c",
  borderColor: "#08212c",
  transition: "all 0.5s ease-in-out",

  "&:hover": {
    borderColor: "#08212c",
    transition: "all 0.5s ease-in-out",
  },
};

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
      "& Mui-Focused": {
        background: "red",
      },
    },
  },
};

export const MenuPropsLimit = {
  PaperProps: {
    sx: {
      width: "230px",
      p: 1,
      borderColor: "red",
    },
  },
};

export const MenuItemPropsFilter = (props) => {
  return {
    width: "45%",
    background: props,
    "&:hover": {
      background: props,
      opacity: 0.75,
    },
  };
};

export const stylesSelectForm = (props) => {
  return {
    width: props,
    borderColor: "#46748e",
    "& label.Mui-focused": {
      color: "#46748e",
    },
    "& .MuiInputBase-root": {
      pl: 6,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#46748e",
      },
    },
  };
};

export const stylesInput = {
  borderColor: "#46748e",
  "& label.Mui-focused": {
    color: "#46748e",
  },
  "& .MuiInputBase-root": {
    pl: 6,
    "&::after": {
      borderColor: "#46748e",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#46748e",
    },
  },
};
