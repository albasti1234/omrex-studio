"use client";

import { FragranceCatalog } from "../../_components/FragranceCatalog";
import { FOR_HER_THEME } from "../../_lib/theme";

export default function ForHerPage() {
    return (
        <FragranceCatalog 
            activeGender="women" 
            theme={FOR_HER_THEME} 
            title="The Feminine Mystique"
            description="A curated garden of scents ranging from the ethereal and delicate to the bold and provocative."
        />
    );
}
