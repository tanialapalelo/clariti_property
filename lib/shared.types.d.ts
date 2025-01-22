export interface ProjectData {
  mainTitle: string;
  heroTitle: string;
  heroDescription: string;
  floorPlan: { title: string; image: string }[];
  specifications: {
    title: string;
    description: string;
    pondasi: string;
    lantai: string;
    dinding: string;
    dapur: string;
    pintu_jendela: string;
    kamar_mandi: string;
    lain_lain: string;
  };
}
