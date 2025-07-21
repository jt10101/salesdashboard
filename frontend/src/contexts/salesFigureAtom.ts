import { atom } from "jotai";
import type { YearlyGroupedData } from "@/utils/chartDataHandler";

const salesFigureAtom = atom<YearlyGroupedData>({});

export { salesFigureAtom };
