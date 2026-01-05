"use client";

import { FragranceCatalog } from "../../_components/FragranceCatalog";
import { UNISEX_THEME } from "../../_lib/theme";

export default function UnisexPage() {
    return (
        <FragranceCatalog 
            activeGender="unisex" 
            theme={UNISEX_THEME} 
            title="Unisex Collection"
            description="Boundless scents that transcend gender, focusing purely on olfactory excellence."
        />
    );
}
