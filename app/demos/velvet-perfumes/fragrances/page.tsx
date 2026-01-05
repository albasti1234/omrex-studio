"use client";

import { FragranceCatalog } from "../_components/FragranceCatalog";
import { THEME } from "../_lib/theme";

export default function FragrancesPage() {
    return (
        <FragranceCatalog 
            activeGender="all" 
            theme={THEME} 
        />
    );
}