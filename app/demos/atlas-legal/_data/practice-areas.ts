// Practice Areas Data with i18n support

export interface PracticeArea {
    slug: string;
    title: string;
    titleAr: string;
    shortDescription: string;
    shortDescriptionAr: string;
    fullDescription: string;
    fullDescriptionAr: string;
    icon: string;
    features: string[];
    featuresAr: string[];
    caseTypes: string[];
    caseTypesAr: string[];
}

export const PRACTICE_AREAS: PracticeArea[] = [
    {
        slug: "corporate-law",
        title: "Corporate & Business Law",
        titleAr: "قانون الشركات والأعمال التجارية",
        shortDescription:
            "Strategic counsel for complex transactions, governance, and regulatory compliance.",
        shortDescriptionAr:
            "استشارات استراتيجية للمعاملات المعقدة والحوكمة والامتثال التنظيمي.",
        fullDescription:
            "Our corporate practice provides comprehensive legal services for businesses of all sizes, from startups to Fortune 500 companies. We guide clients through complex transactions, mergers and acquisitions, corporate governance, and regulatory compliance.",
        fullDescriptionAr:
            "يقدم قطاع الشركات لدينا خدمات قانونية شاملة للشركات من جميع الأحجام، من الشركات الناشئة إلى شركات فورتشن ٥٠٠. نرشد العملاء خلال المعاملات المعقدة والاندماجات والاستحواذات وحوكمة الشركات والامتثال التنظيمي.",
        icon: "corporate",
        features: [
            "Mergers & Acquisitions",
            "Corporate Governance",
            "Securities & Finance",
            "Joint Ventures & Strategic Alliances",
            "Regulatory Compliance",
        ],
        featuresAr: [
            "الاندماجات والاستحواذات",
            "حوكمة الشركات",
            "الأوراق المالية والتمويل",
            "المشاريع المشتركة والتحالفات الاستراتيجية",
            "الامتثال التنظيمي",
        ],
        caseTypes: [
            "M&A Transactions",
            "Private Equity",
            "Venture Capital",
            "Corporate Restructuring",
        ],
        caseTypesAr: [
            "معاملات الاندماج والاستحواذ",
            "الأسهم الخاصة",
            "رأس المال الجريء",
            "إعادة هيكلة الشركات",
        ],
    },
    {
        slug: "litigation",
        title: "Complex Litigation",
        titleAr: "التقاضي التجاري المعقد",
        shortDescription:
            "Aggressive trial advocacy for high-stakes commercial disputes.",
        shortDescriptionAr:
            "دفاع قضائي حازم في النزاعات التجارية عالية المخاطر.",
        fullDescription:
            "Our litigation team has a proven track record in the courtroom. We handle bet-the-company disputes, class actions, appellate matters, and complex commercial cases requiring sophisticated legal strategies.",
        fullDescriptionAr:
            "يتمتع فريق التقاضي لدينا بسجل حافل بالإنجازات في المحاكم. نتعامل مع النزاعات المصيرية للشركات والدعاوى الجماعية والاستئنافات والقضايا التجارية المعقدة التي تتطلب استراتيجيات قانونية متطورة.",
        icon: "litigation",
        features: [
            "Commercial Disputes",
            "Class Action Defense",
            "Appellate Practice",
            "Arbitration & Mediation",
            "White Collar Defense",
        ],
        featuresAr: [
            "النزاعات التجارية",
            "الدفاع في الدعاوى الجماعية",
            "ممارسة الاستئناف",
            "التحكيم والوساطة",
            "الدفاع في الجرائم الاقتصادية",
        ],
        caseTypes: [
            "Breach of Contract",
            "Partnership Disputes",
            "Securities Litigation",
            "Antitrust Matters",
        ],
        caseTypesAr: [
            "الإخلال بالعقود",
            "نزاعات الشراكة",
            "دعاوى الأوراق المالية",
            "قضايا مكافحة الاحتكار",
        ],
    },
    {
        slug: "personal-injury",
        title: "Personal Injury",
        titleAr: "قضايا الإصابات والتعويضات",
        shortDescription:
            "Maximum compensation for victims of negligence and wrongful conduct.",
        shortDescriptionAr:
            "أقصى تعويض لضحايا الإهمال والسلوك الخاطئ.",
        fullDescription:
            "We fight for victims of negligence, securing fair compensation for medical expenses, lost wages, pain and suffering, and other damages. Our trial experience often leads to favorable settlements without the need for litigation.",
        fullDescriptionAr:
            "نقاتل من أجل ضحايا الإهمال، ونحقق تعويضات عادلة عن النفقات الطبية والأجور المفقودة والألم والمعاناة وأضرار أخرى. خبرتنا في المحاكمات غالباً ما تؤدي إلى تسويات إيجابية دون الحاجة للتقاضي.",
        icon: "injury",
        features: [
            "Medical Malpractice",
            "Motor Vehicle Accidents",
            "Premises Liability",
            "Product Liability",
            "Wrongful Death",
        ],
        featuresAr: [
            "سوء الممارسة الطبية",
            "حوادث السيارات",
            "مسؤولية المباني",
            "مسؤولية المنتجات",
            "الوفاة غير المشروعة",
        ],
        caseTypes: [
            "Catastrophic Injuries",
            "Brain & Spinal Injuries",
            "Burn Injuries",
            "Construction Accidents",
        ],
        caseTypesAr: [
            "الإصابات الكارثية",
            "إصابات الدماغ والعمود الفقري",
            "إصابات الحروق",
            "حوادث البناء",
        ],
    },
    {
        slug: "family-law",
        title: "Family Law",
        titleAr: "قانون الأسرة والأحوال الشخصية",
        shortDescription:
            "Compassionate advocacy for divorce, custody, and family matters.",
        shortDescriptionAr:
            "دفاع رحيم في قضايا الطلاق والحضانة وشؤون الأسرة.",
        fullDescription:
            "Our family law attorneys provide sensitive yet assertive representation in divorce, child custody, support matters, and high-net-worth property division. We prioritize protecting your interests and your family's well-being.",
        fullDescriptionAr:
            "يقدم محامونا في قانون الأسرة تمثيلاً حساساً لكن حازماً في قضايا الطلاق وحضانة الأطفال والنفقة وتقسيم الممتلكات لأصحاب الثروات. نعطي الأولوية لحماية مصالحكم ورفاهية عائلتكم.",
        icon: "family",
        features: [
            "High-Asset Divorce",
            "Child Custody & Support",
            "Prenuptial Agreements",
            "Adoption",
            "Domestic Violence Protection",
        ],
        featuresAr: [
            "طلاق أصحاب الثروات",
            "حضانة الأطفال والنفقة",
            "عقود ما قبل الزواج",
            "التبني",
            "الحماية من العنف الأسري",
        ],
        caseTypes: [
            "Contested Divorce",
            "Modification of Orders",
            "International Custody",
            "Paternity Actions",
        ],
        caseTypesAr: [
            "الطلاق المتنازع عليه",
            "تعديل الأحكام",
            "الحضانة الدولية",
            "دعاوى النسب",
        ],
    },
    {
        slug: "real-estate",
        title: "Real Estate Law",
        titleAr: "القانون العقاري",
        shortDescription:
            "Comprehensive legal services for real estate transactions and disputes.",
        shortDescriptionAr:
            "خدمات قانونية شاملة للمعاملات والنزاعات العقارية.",
        fullDescription:
            "From acquisitions to development, our real estate practice covers all aspects of commercial and residential property law. We handle complex transactions, financing, zoning issues, and property disputes.",
        fullDescriptionAr:
            "من الاستحواذات إلى التطوير، يغطي قطاعنا العقاري جميع جوانب القانون العقاري التجاري والسكني. نتعامل مع المعاملات المعقدة والتمويل وقضايا تخطيط المدن والنزاعات العقارية.",
        icon: "realestate",
        features: [
            "Commercial Transactions",
            "Residential Closings",
            "Real Estate Development",
            "Landlord-Tenant Disputes",
            "Zoning & Land Use",
        ],
        featuresAr: [
            "المعاملات التجارية",
            "إغلاقات السكنية",
            "التطوير العقاري",
            "نزاعات المالك والمستأجر",
            "التخطيط واستخدام الأراضي",
        ],
        caseTypes: [
            "Property Acquisitions",
            "Lease Negotiations",
            "Title Disputes",
            "Construction Defects",
        ],
        caseTypesAr: [
            "اقتناء العقارات",
            "مفاوضات الإيجار",
            "نزاعات الملكية",
            "عيوب البناء",
        ],
    },
    {
        slug: "criminal-defense",
        title: "Criminal Defense",
        titleAr: "الدفاع الجنائي",
        shortDescription:
            "Vigorous defense of your rights in state and federal criminal matters.",
        shortDescriptionAr:
            "دفاع قوي عن حقوقك في القضايا الجنائية الفيدرالية والولائية.",
        fullDescription:
            "Our criminal defense attorneys bring former prosecutorial experience to your defense. We handle everything from misdemeanors to complex federal investigations, always protecting your constitutional rights.",
        fullDescriptionAr:
            "يجلب محامونا في الدفاع الجنائي خبرة ادعائية سابقة لدفاعك. نتعامل مع كل شيء من الجنح إلى التحقيقات الفيدرالية المعقدة، مع حماية حقوقك الدستورية دائماً.",
        icon: "criminal",
        features: [
            "White Collar Crime",
            "Drug Offenses",
            "DUI/DWI Defense",
            "Federal Crimes",
            "Appeals & Post-Conviction",
        ],
        featuresAr: [
            "الجرائم الاقتصادية",
            "جرائم المخدرات",
            "الدفاع عن القيادة تحت التأثير",
            "الجرائم الفيدرالية",
            "الاستئنافات وما بعد الإدانة",
        ],
        caseTypes: [
            "Securities Fraud",
            "Tax Crimes",
            "RICO Violations",
            "Professional License Defense",
        ],
        caseTypesAr: [
            "احتيال الأوراق المالية",
            "الجرائم الضريبية",
            "انتهاكات قانون ريكو",
            "الدفاع عن الرخص المهنية",
        ],
    },
];

// Helper functions
export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
    return PRACTICE_AREAS.find((area) => area.slug === slug);
}
