"use client";

import { FragranceCatalog } from "../../_components/FragranceCatalog";
import { FOR_HER_THEME } from "../../_lib/theme";

export default function ForHerPage() {
    return (
        <FragranceCatalog 
            activeGender="women" 
            theme={FOR_HER_THEME} 
            title="For Her"
            description="Elegant, sophisticated, and timeless fragrances designed to captivate."
        />
    );
}
