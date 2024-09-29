import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  List,
  Box,
} from "@mui/material";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavigationItem } from "..";
import Link from "next/link";
import { memo } from "react";
import { useRouter } from "next/navigation";

type SidebarItemProps = {
  item: NavigationItem;
  isExpanded: boolean;
  onToggle: (itemName: string) => void;
  currentPath: string;
};

const SidebarItem = ({
  item,
  isExpanded,
  onToggle,
  currentPath,
}: SidebarItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (item.subItems) {
      onToggle(item.name);
    } else {
      router.push(item.href);
    }
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        selected={currentPath.startsWith(item.href)}
        sx={{ padding: "0.75rem 1rem", maxHeight: "3rem" }}
      >
        <ListItemIcon
          sx={{ minWidth: "fit-content", padding: "0 1.25rem 0rem 1rem" }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText>
          <Typography>{item.name}</Typography>
        </ListItemText>
        {item.subItems && (
          <IconButton sx={{ ml: "auto" }}>
            {isExpanded ? (
              <ChevronUpIcon style={{ height: 15, width: 15 }} />
            ) : (
              <ChevronDownIcon style={{ height: 15, width: 15 }} />
            )}
          </IconButton>
        )}
      </ListItemButton>
      {item.subItems && (
        <Box
          sx={{
            overflow: "hidden",
            transition: "max-height 0.3s ease",
            maxHeight: isExpanded ? "10rem" : "0px",
            minHeight: isExpanded ? "fit-content" : "0px",
          }}
        >
          <List sx={{ padding: "0.5rem 1rem 0.5rem 2rem" }}>
            {item.subItems.map((subItem) => (
              <ListItemButton
                key={subItem.name}
                component={Link}
                href={subItem.href}
                sx={{
                  pl: 4,
                  backgroundColor:
                    currentPath === subItem.href ? "rgba(0, 0, 255, 0.1)" : "",
                  "&:hover": { backgroundColor: "rgba(0, 0, 255, 0.1)" },
                }}
              >
                <ListItemText>
                  <Typography>{subItem.name}</Typography>
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default memo(SidebarItem);
