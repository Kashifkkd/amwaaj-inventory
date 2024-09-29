import { ReactNode } from "react";
import { Typography as MuiTypography, Theme, SxProps } from "@mui/material";
import { styled } from "@mui/system";
import { typographyStyles } from "./helpers/typographyStyles";

export type CustomTypographyProps = {
  variant?:
    | "xxxlSemibold"
    | "xxlSemibold"
    | "xxlMedium"
    | "xxlRegular"
    | "xlBold"
    | "xlSemibold"
    | "xlRegular"
    | "lMedium"
    | "lRegular"
    | "xlMedium";
  children: ReactNode;
  onClick?: () => void;
  sx?: SxProps<Theme>;
};



const TypographyStyle = styled(MuiTypography)<{
  a: keyof typeof typographyStyles;
}>(({ a }) => typographyStyles[a]);

const CustomTypography = ({
  variant = "xlMedium",
  children,
  onClick,
  sx,
}: CustomTypographyProps) => {
  return (
    <TypographyStyle a={variant} onClick={onClick} sx={sx}>
      {children}
    </TypographyStyle>
  );
};

export default CustomTypography;
