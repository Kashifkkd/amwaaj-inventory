"use client";

import { useState, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Stack,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  Divider,
  ListItemText,
} from "@mui/material";
import AmwaajLogo from "/public/images/amwaaj-logo.png";
import {
  HomeIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  ArchiveBoxIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import SidebarItem from "./components/SidebarItem";

export type NavigationItem = {
  name: string;
  href: string;
  icon: React.ReactElement;
  subItems?: { name: string; href: string }[];
};

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleItem = (itemName: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const navigationItems: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <HomeIcon style={{ height: 20, width: 20 }} />,
    },
    {
      name: "Sales",
      href: "/sales",
      icon: <ShoppingCartIcon style={{ height: 20, width: 20 }} />,
      subItems: [
        { name: "Create", href: "/sales/create" },
        { name: "View", href: "/sales/view" },
        { name: "Reports", href: "/sales/reports" },
      ],
    },
    {
      name: "Purchases",
      href: "/purchases",
      icon: <ShoppingBagIcon style={{ height: 20, width: 20 }} />,
      subItems: [
        { name: "Create", href: "/purchases/create" },
        { name: "View", href: "/purchases/view" },
        { name: "Reports", href: "/purchases/reports" },
      ],
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: <ArchiveBoxIcon style={{ height: 20, width: 20 }} />,
    },
    {
      name: "Products",
      href: "/products",
      icon: <ShoppingBagIcon style={{ height: 20, width: 20 }} />,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: <ChartBarIcon style={{ height: 20, width: 20 }} />,
    },
  ];

  const settingsHelpItems: NavigationItem[] = [
    {
      name: "Settings",
      href: "/settings",
      icon: <CogIcon style={{ height: 20, width: 20 }} />,
    },
    {
      name: "Help",
      href: "/help",
      icon: <QuestionMarkCircleIcon style={{ height: 20, width: 20 }} />,
    },
  ];

  useEffect(() => {
    const newExpandedItems = { ...expandedItems };

    navigationItems.forEach((item) => {
      if (pathname.startsWith(item.href)) {
        newExpandedItems[item.name] = true;
      } else {
        newExpandedItems[item.name] = false;
      }
    });

    setExpandedItems(newExpandedItems);
  }, [pathname]);

  return (
    <Box
      sx={{
        borderRight: "1px solid",
        borderColor: "divider",
        width: "17vw",
        maxWidth: 240,
        height: "100vh",
        display: "flex",
        alignItems: "space-between",
        flexDirection: "column",
        padding: 0,
        margin: 0,
      }}
    >
      <Box sx={{ padding: 2, display: "flex", alignItems: "center" }}>
        <Link href="/">
          <Image
            src={AmwaajLogo}
            width="80"
            height="40"
            objectFit="contain"
            alt="amwaaj-logo"
            loading="lazy"
          />
        </Link>
      </Box>

      <Stack justifyContent={"space-between"} sx={{ flex: 1 }}>
        <Stack>
          <List
            sx={{
              flex: 1,
              height: "100%",
              overflowY: "auto",
            }}
          >
            {navigationItems.map((item) => (
              <SidebarItem
                key={item.name}
                item={item}
                isExpanded={expandedItems[item.name]}
                onToggle={toggleItem}
                currentPath={pathname}
              />
            ))}
          </List>
        </Stack>

        <Stack sx={{ overflow: "auto" }}>
          <List>
            <Divider sx={{ mb: "1rem" }} />

            {settingsHelpItems.map((item) => (
              <ListItemButton key={item.name} sx={{ padding: "0.75rem 1rem" }}>
                <ListItemIcon sx={{ minWidth: "fit-content", padding:"0 1.25rem 0rem 1rem" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {/* <Typography>{item.name}</Typography>
                </ListItemText> */}
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </Stack>
    </Box>
  );
};

export default memo(Sidebar);
