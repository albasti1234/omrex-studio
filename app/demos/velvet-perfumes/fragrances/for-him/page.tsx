"use client";

import { FragranceCatalog } from "../../_components/FragranceCatalog";
import { FOR_HIM_THEME } from "../../_lib/theme";

export default function ForHimPage() {
    return (
        <FragranceCatalog 
            activeGender="men" 
            theme={FOR_HIM_THEME} 
            title="Nocturnal Edge"
            description="Power, depth, and sophistication. Fragrances that command attention and leave a lasting mark."
        />
    );
}
