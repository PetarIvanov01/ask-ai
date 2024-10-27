import { usePathname } from "next/navigation";

type Props = {
  href: string;
  style?: {
    active: string;
    nonActive: string;
  };
};

export default function useActive({
  href,
  style = { active: "bg-gradient-to-r", nonActive: "hover:bg-gradient-to-r" },
}: Props) {
  const pathname = usePathname();
  const activeStyle = pathname === href ? style.active : style.nonActive;
  return activeStyle;
}
