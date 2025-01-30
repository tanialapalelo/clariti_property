
import HomeLayout from "@/components/layout/HomeLayout";
import { MapProps } from "@/lib/shared.types";

const tempMapData: MapProps[] = [
  {
    id: "1",
    icon: "home",
    title: "Home Facility",
    description: "A description of the home facility.",
    link: "/home",
    x: "50%",
    y: "50%",
  },
  {
    id: "2",
    icon: "wifi",
    title: "WiFi Hotspot",
    description: "A description of the WiFi hotspot.",
    link: "/wifi",
    x: "40%",
    y: "30%",
  },
];



export default function Home() {

  const finalMapData = tempMapData;

  return (
    <>
      <HomeLayout/>
    </>
  );
}
