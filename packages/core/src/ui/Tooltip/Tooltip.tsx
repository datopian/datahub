import React, { useState, useEffect, useRef, Fragment } from "react";

// importing separately due to build error
// Module '"@floating-ui/react-dom-interactions"' has no exported member 'autoPlacement' ...
import {
  arrow,
  autoPlacement,
  inline,
  offset,
  shift,
} from "@floating-ui/react-dom";

import {
  FloatingPortal,
  useDismiss,
  useFloating,
  useHover,
  useFocus,
  useInteractions,
  useRole,
} from "@floating-ui/react-dom-interactions";

import { motion, AnimatePresence } from "framer-motion";

interface Props extends React.PropsWithChildren {
  render: (t) => React.ReactNode;
  href: string;
  data: any;
  usehook?: any;
  className?: string;
}

const tooltipBoxStyle = (theme: string) =>
  ({
    height: "auto",
    maxWidth: "40rem",
    padding: "1rem",
    background: theme === "light" ? "#fff" : "#000",
    color: theme === "light" ? "rgb(99, 98, 98)" : "#A8A8A8",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.55) 0px 0px 16px -3px",
  } as React.CSSProperties);

const tooltipBodyStyle = (theme: string) =>
  ({
    maxHeight: "4.8rem",
    position: "relative",
    lineHeight: "1.2rem",
    overflow: "hidden",
  } as React.CSSProperties);

const tooltipArrowStyle = ({ theme, x, y, side }) =>
  ({
    position: "absolute",
    left: x != null ? `${x}px` : "",
    top: y != null ? `${y}px` : "",
    right: "",
    bottom: "",
    [side]: "-4px",
    height: "8px",
    width: "8px",
    background: theme === "light" ? "#fff" : "#000",
    transform: "rotate(45deg)",
  } as React.CSSProperties);

export const Tooltip: React.FC<Props> = ({
  render,
  data,
  usehook,
  ...props
}) => {
  const theme = "light"; // temporarily hard-coded; light theme tbd in next PR

  const arrowRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    content: null || <Fragment />,
    image: "",
  });
  const [tooltipContentLoaded, setTooltipContentLoaded] = useState(false);
  // floating-ui hook
  const {
    x,
    y,
    reference, // trigger element back ref
    floating, // tooltip back ref
    placement, // default: 'bottom'
    strategy, // default: 'absolute'
    context,
    middlewareData: { arrow: { x: arrowX = 0, y: arrowY = 0 } = {} }, // data for arrow positioning
  } = useFloating({
    open: showTooltip, // state value binding
    onOpenChange: setShowTooltip, // state value setter
    middleware: [
      offset(5), // offset from container border
      autoPlacement({ padding: 5 }), // auto place vertically
      shift({ padding: 5 }), // flip horizontally if necessary
      arrow({ element: arrowRef, padding: 4 }), // add arrow element
      inline(), // correct position for multiline anchor tags
    ],
  });
  // floating-ui hook
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { delay: 100 }),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context, { ancestorScroll: true }),
  ]);

  const triggerElementProps = getReferenceProps({ ...props, ref: reference });
  const tooltipProps = getFloatingProps({
    ref: floating,
    style: {
      position: strategy,
      left: x ?? "",
      top: y ?? "",
    },
  });

  const arrowPlacement = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]];

  // get tooltip data
  let image: string;
  let PageContent;
  const filePath = props.href.slice(1); // remove slash from the beginning

  const page = data.find((p) => p._raw.flattenedPath === filePath);

  if (page && page.body.code.length > 0) {
    const Component = usehook(page.body.code);
    PageContent = Component;
    image = page.image ?? "";
  }

  const fetchTooltipContent = () => {
    setTooltipContentLoaded(false);

    let Body: React.ReactElement = <Fragment />;

    // strip out all other elements from tooltip content
    // since we only need the paragraph
    const elems = ["h1", "h2", "h3", "div", "img", "pre", "blockquote"].reduce(
      (acc, elem) => ({ ...acc, [elem]: () => <Fragment /> }),
      {}
    );

    if (PageContent) {
      Body = (
        <PageContent
          components={{
            ...elems,
            p: (props) => <Fragment {...props} />, // avoid hydration errors
            wrapper: (props) => <div className="line-clamp-3" {...props} />,
          }}
        />
      );

      setTooltipData({
        content: Body,
        image: image,
      });

      setTooltipContentLoaded(true);
    }
  };

  useEffect(() => {
    if (showTooltip) {
      fetchTooltipContent();
    }
  }, [showTooltip]);

  return (
    <Fragment>
      {render?.(triggerElementProps)}
      <FloatingPortal>
        <AnimatePresence>
          {showTooltip && tooltipContentLoaded && (
            <motion.div
              {...tooltipProps}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div
                className="tooltip-box flex items-center space-x-2"
                style={tooltipBoxStyle(theme)}
              >
                {tooltipData.image && (
                  <img
                    src={tooltipData.image}
                    alt=""
                    width={100}
                    height={100}
                  />
                )}
                {tooltipData.content && (
                  <div className="tooltip-body" style={tooltipBodyStyle(theme)}>
                    {tooltipData.content}
                  </div>
                )}
              </div>
              <div
                ref={arrowRef}
                className="tooltip-arrow"
                style={tooltipArrowStyle({
                  theme,
                  x: arrowX,
                  y: arrowY,
                  side: arrowPlacement,
                })}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Fragment>
  );
};
