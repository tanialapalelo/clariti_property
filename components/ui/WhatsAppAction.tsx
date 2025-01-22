"use client";

import { ActionIcon } from "@mantine/core";
import { IconBrandWhatsappFilled } from "@tabler/icons-react";
import classes from "../../styles/WhatsAppAction.module.css";

const WhatsAppAction = () => {
  return (
    <ActionIcon
      component="a"
      href="https://wa.me/6281806218999"
      size="70"
      color="rgba(34, 189, 37, 1)"
      aria-label="Open in a new tab"
      onClick={(event) => event.preventDefault()}
      radius={"100"}
      className={classes.customIcon}
    >
      <IconBrandWhatsappFilled size={55} />
    </ActionIcon>
  );
};

export default WhatsAppAction;
