import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPixelEvent } from "@/lib/metaPixel";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    trackPixelEvent("PageView");
  }, [pathname]);

  return null;
};

export default ScrollToTop;

