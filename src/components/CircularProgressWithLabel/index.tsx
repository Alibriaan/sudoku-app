import { Box, CircularProgress, CircularProgressProps, styled, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

const ProgressContainer = styled(Box)(() => ({
  display: 'inline-flex',
  position: 'relative',
}));

const LabelContainer = styled(Box)(() => ({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface CircularProgressWithLabelProps extends PropsWithChildren<CircularProgressProps> {
  value: number;
};

export function CircularProgressWithLabel(props: CircularProgressWithLabelProps) {
  return (
    <ProgressContainer>
      <CircularProgress {...props} />
      <LabelContainer>
        <Typography variant="caption" component="div">
          {
            props.children || `${Math.round(props.value)}%`
          }
        </Typography>
      </LabelContainer>
    </ProgressContainer>
  )
}