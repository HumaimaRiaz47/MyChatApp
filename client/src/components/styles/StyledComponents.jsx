import { colors, styled } from '@mui/material';  // Improved import formatting
import { Link as LinkComponent } from 'react-router-dom';
import { grayColor } from '../../Constants/colors';

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);  // Corrected to use rgba
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  paddinh: 0 3rem;
  boorder-radius: 1.5rem;
  background-color: ${grayColor};
`;