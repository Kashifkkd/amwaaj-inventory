import { CircularProgress, Stack, SxProps } from "@mui/material";
import React from "react";
import CustomTypography from "../custom_typography";

const START_POSITION = "start";
const END_POSITION = "end";

export type PrimaryButtonProps = {
  title: string;
  onClick?: () => void;
  iconProps?: {
    icon: React.ReactNode;
    position: string;
  };
  boxSx?: SxProps;
  textSx?: SxProps;
  loadingProps?: {
    loading: boolean;
    position: string;
  };
  loaderProps?: SxProps;
  disabled?: boolean;
  variant?: "solid" | "outlined";
};

const CustomButton = ({
  title,
  onClick,
  iconProps,
  boxSx,
  textSx,
  loadingProps,
  disabled,
  loaderProps,
  variant = "solid",
}: PrimaryButtonProps) => {
  return (
    <Stack
      onClick={onClick}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        gap: iconProps?.position === START_POSITION ? "0.35rem" : "0.2rem",
        padding:
          iconProps?.position === START_POSITION
            ? "0rem 1rem 0rem 0.85rem"
            : iconProps?.position === END_POSITION
            ? "0rem 0.85rem 0rem 1rem"
            : iconProps?.position === START_POSITION && loadingProps?.loading
            ? "0rem 0.85rem 0rem 1rem"
            : iconProps?.position === END_POSITION && loadingProps?.loading
            ? "0.125rem 1rem 0.125rem 0.85rem"
            : "0rem 1.125rem",
        height: "2.35rem",
        cursor: disabled ? "not-allowed" : "pointer",
        background: disabled
          ? "rgba(85, 87, 112, 0.50) "
          : variant === "solid"
          ? "linear-gradient(95deg, #012687 0.62%, #616ADA 65.95%)"
          : variant === "outlined"
          ? "white"
          : null,
        borderRadius: "0.625rem",
        width: "fit-content",
        boxShadow:
          variant === "solid" ? "none" : "0px 0px 1px 0px rgba(0, 0, 0, 0.40)",
        "&:hover": {
          boxShadow:
            variant === "solid"
              ? `0px 4px 16px 0px rgba(0, 0, 0, 0.12)`
              : `0px 0px 1px 0px rgba(0, 0, 0, 0.40)`,
          background: disabled
            ? "rgba(85, 87, 112, 0.50)"
            : variant === "solid"
            ? "linear-gradient(95deg, #012687 0.62%, #616ADA 65.95%)"
            : "#F5F6F7",
        },
        opacity: disabled ? 0.7 : 1,
        ...boxSx,
      }}
    >
      {/* Icon/Loading at start */}
      {loadingProps?.loading && loadingProps.position === START_POSITION ? (
        <CircularProgress
          size={16}
          thickness={5}
          sx={{
            color: variant === "solid" ? "white" : "#000",
            marginRight: "0.35rem",
            ...loaderProps,
          }}
        />
      ) : !loadingProps?.loading &&
        iconProps?.icon &&
        iconProps?.position === START_POSITION ? (
        iconProps.icon
      ) : null}

      <CustomTypography
        variant="xlSemibold"
        sx={{
          color: variant === "solid" ? "white" : "#000",
          userSelect: "none",
          ...textSx,
        }}
      >
        {title}
      </CustomTypography>

      {/* Icon/Loading at end */}
      {loadingProps?.loading && loadingProps.position === END_POSITION ? (
        <CircularProgress
          size={16}
          thickness={5}
          sx={{
            color: variant === "solid" ? "white" : "#000",
            marginLeft: "0.35rem",
            ...loaderProps,
          }}
        />
      ) : !loadingProps?.loading &&
        iconProps?.icon &&
        iconProps?.position === END_POSITION ? (
        iconProps.icon
      ) : null}
    </Stack>
  );
};

export default CustomButton;
