"use client";

import { FragranceCatalog } from "../../_components/FragranceCatalog";
import { UNISEX_THEME } from "../../_lib/theme";

export default function UnisexPage() {
    return (
        <FragranceCatalog 
            activeGender="unisex" 
            theme={UNISEX_THEME} 
            title="Fluid Modernity"
            description="Transcending boundaries with avant-garde compositions. Pure art, undefined by gender."
        />
    );
}
