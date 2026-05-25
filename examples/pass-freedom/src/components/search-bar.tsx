import { SearchBar } from "@appboxo/ui-kit";
import {
  SearchBarProps,
  SearchBarRef,
} from "@arco-design/mobile-react/cjs/search-bar";
import { useMount } from "ahooks";
import { useRef } from "react";

export const CustomSearchBar = ({ autoFocus, ...props }: SearchBarProps) => {
  const ref = useRef<SearchBarRef>(null);

  useMount(() => {
    if (autoFocus) {
      setTimeout(() => {
        ref.current?.dom?.focus();
        ref.current?.dom?.click();
      }, 100);
    }
  });

  return (
    <SearchBar ref={ref} autoFocus={autoFocus} actionButton={null} {...props} />
  );
};
