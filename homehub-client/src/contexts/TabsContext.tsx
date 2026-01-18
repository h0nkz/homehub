import { createContext } from "react";

interface TabsContextType {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabsContext = createContext<TabsContextType | null>(null);

export default TabsContext;

export type { TabsContextType };