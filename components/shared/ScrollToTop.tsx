"use client";

import { ActionIcon, Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

const ScrollToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <>
      <Affix position={{ bottom: 100, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              variant="default"
              style={transitionStyles}
              radius={"xl"}
              onClick={() => scrollTo({ y: 0 })}
            >
              <IconArrowUp size={16} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default ScrollToTop;
