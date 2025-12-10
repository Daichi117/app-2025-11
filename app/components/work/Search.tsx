import { AllPostsContents } from "./contents";
import { Post } from "@type/types";
import { Input } from "@ui/input";
export default function Search({ value, onChange }) {
    const {placeholder,noResults} = AllPostsContents.search
    return (
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    );
  }
  