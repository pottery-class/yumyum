import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "30px 20px",
  width: 300,
  margin: "20px auto",
  elevation: 10,
}));
