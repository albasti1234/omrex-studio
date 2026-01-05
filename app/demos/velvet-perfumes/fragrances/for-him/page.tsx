"use client";

import { FragranceCatalog } from "../../_components/FragranceCatalog";
import { FOR_HIM_THEME } from "../../_lib/theme";

export default function ForHimPage() {
    return (
        <FragranceCatalog 
            activeGender="men" 
            theme={FOR_HIM_THEME} 
            title="For Him"
            description="Bold, charismatic, and powerful scents defined by strength and character."
        />
    );
}
