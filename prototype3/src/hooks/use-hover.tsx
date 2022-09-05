import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// export const useHover = (ref: React.RefObject<HTMLElement>) => {
//   const [value, setValue] = useState(false);

//   const handleMouseEnter = useCallback(() => setValue(true), []);
//   const handleMouseLeave = useCallback(() => setValue(false), []);

//   useCallback(
//     (node: HTMLElement) => {
//       if (node) {
//         node.addEventListener("mouseenter", handleMouseEnter);
//         node.addEventListener("mouseleave", handleMouseLeave);

//         return () => {
//           node.removeEventListener("mouseenter", handleMouseEnter);
//           node.removeEventListener("mouseleave", handleMouseLeave);
//         };
//       }
//     },
//     [handleMouseEnter, handleMouseLeave]
//   );

//   return [value, ref.current];
// };

type THook<T extends HTMLElement> = [React.RefObject<T>, boolean];

export const useHover = <T extends HTMLElement>(): THook<T> => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseOver = (): void => setHovered(true);
    const handleMouseOut = (): void => setHovered(false);
    const node = ref && ref.current;

    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref]);

  return [ref, hovered];
};
