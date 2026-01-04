// Attorneys Data

export interface Attorney {
    slug: string;
    name: string;
    title: string;
    titleAr: string;
    role: string;
    roleAr: string;
    bio: string;
    bioAr: string;
    education: string[];
    admissions: string[];
    barAdmissions: string[];
    awards: string[];
    practiceAreas: string[];
    email: string;
    phone: string;
    linkedin?: string;
    featured: boolean;
}

export const ATTORNEYS: Attorney[] = [
    {
        slug: "james-harrison",
        name: "James Harrison",
        title: "Managing Partner",
        titleAr: "الشريك الإداري",
        role: "Commercial Litigation",
        roleAr: "التقاضي التجاري",
        bio: "James Harrison is the Managing Partner of Atlas Legal, leading a team of over 50 attorneys. With more than 25 years of experience in complex commercial litigation, he has secured landmark verdicts and settlements exceeding $500 million for clients.",
        bioAr: "جيمس هاريسون هو الشريك الإداري لأطلس القانوني، يقود فريقاً من أكثر من ٥٠ محامياً. مع أكثر من ٢٥ عاماً من الخبرة في التقاضي التجاري المعقد، حقق أحكاماً وتسويات تاريخية تجاوزت ٥٠٠ مليون دولار للعملاء.",
        education: [
            "J.D., Harvard Law School",
            "B.A., Georgetown University",
        ],
        admissions: [
            "New York",
            "U.S. Supreme Court",
            "Second Circuit Court of Appeals",
        ],
        barAdmissions: [
            "New York State Bar",
            "U.S. Supreme Court",
            "Second Circuit Court of Appeals",
        ],
        awards: [
            "Super Lawyers - Top 100 (2019-2024)",
            "Best Lawyers in America",
            "Chambers USA - Band 1",
            "Lawdragon 500 Leading Lawyers",
        ],
        practiceAreas: ["litigation", "corporate-law"],
        email: "jharrison@atlaslegal.com",
        phone: "(212) 555-0101",
        linkedin: "#",
        featured: true,
    },
    {
        slug: "sarah-mitchell",
        name: "Sarah Mitchell",
        title: "Partner",
        titleAr: "شريكة",
        role: "Personal Injury",
        roleAr: "الإصابات الشخصية",
        bio: "Sarah Mitchell is a nationally recognized trial lawyer specializing in catastrophic personal injury cases. She has obtained over 50 verdicts and settlements exceeding $1 million, including a $12.5 million medical malpractice verdict.",
        bioAr: "سارة ميتشل محامية محاكمات معترف بها وطنياً ومتخصصة في قضايا الإصابات الشخصية الكارثية. حققت أكثر من ٥٠ حكماً وتسوية تتجاوز مليون دولار، بما في ذلك حكم بـ ١٢.٥ مليون دولار في سوء الممارسة الطبية.",
        education: [
            "J.D., Columbia Law School",
            "B.S., Cornell University",
        ],
        admissions: [
            "New York",
            "New Jersey",
            "Pennsylvania",
        ],
        barAdmissions: [
            "New York State Bar",
            "New Jersey State Bar",
            "Pennsylvania State Bar",
        ],
        awards: [
            "Trial Lawyer of the Year (2022)",
            "Super Lawyers Rising Star",
            "Top 40 Under 40 Trial Lawyers",
        ],
        practiceAreas: ["personal-injury"],
        email: "smitchell@atlaslegal.com",
        phone: "(212) 555-0102",
        linkedin: "#",
        featured: true,
    },
    {
        slug: "victoria-chen",
        name: "Victoria Chen",
        title: "Partner",
        titleAr: "شريكة",
        role: "Family Law",
        roleAr: "قانون الأسرة",
        bio: "Victoria Chen leads our family law practice with sensitivity and strategic excellence. She specializes in high-net-worth divorce, complex custody matters, and international family law issues.",
        bioAr: "تقود فيكتوريا تشين ممارسة قانون الأسرة لدينا بحساسية وتميز استراتيجي. وهي متخصصة في طلاق أصحاب الثروات العالية والقضايا المعقدة للحضانة وقضايا قانون الأسرة الدولية.",
        education: [
            "J.D., Yale Law School",
            "B.A., Stanford University",
        ],
        admissions: [
            "New York",
            "Connecticut",
        ],
        barAdmissions: [
            "New York State Bar",
            "Connecticut State Bar",
        ],
        awards: [
            "Best Lawyers - Family Law (2020-2024)",
            "New York Super Lawyers",
            "Leading Women Lawyers in America",
        ],
        practiceAreas: ["family-law"],
        email: "vchen@atlaslegal.com",
        phone: "(212) 555-0103",
        linkedin: "#",
        featured: true,
    },
    {
        slug: "michael-torres",
        name: "Michael Torres",
        title: "Partner",
        titleAr: "شريك",
        role: "Corporate Law",
        roleAr: "قانون الشركات",
        bio: "Michael Torres advises Fortune 500 companies and emerging growth companies on complex transactions. He has led deals exceeding $5 billion and serves on the boards of several prominent organizations.",
        bioAr: "يقدم مايكل توريس المشورة لشركات فورتشن ٥٠٠ والشركات الناشئة سريعة النمو حول المعاملات المعقدة. قاد صفقات تجاوزت ٥ مليارات دولار ويخدم في مجالس إدارة عدة منظمات بارزة.",
        education: [
            "J.D., NYU School of Law",
            "M.B.A., Wharton School",
            "B.S., MIT",
        ],
        admissions: [
            "New York",
            "Delaware",
        ],
        barAdmissions: [
            "New York State Bar",
            "Delaware State Bar",
        ],
        awards: [
            "Chambers USA - Corporate/M&A",
            "Legal 500 – Leading Lawyer",
            "M&A Advisor of the Year (2021)",
        ],
        practiceAreas: ["corporate-law"],
        email: "mtorres@atlaslegal.com",
        phone: "(212) 555-0104",
        linkedin: "#",
        featured: false,
    },
    {
        slug: "david-wright",
        name: "David Wright",
        title: "Partner",
        titleAr: "شريك",
        role: "Criminal Defense",
        roleAr: "الدفاع الجنائي",
        bio: "David Wright is a former federal prosecutor with the U.S. Attorney's Office. He now applies his prosecutorial experience to defend clients in complex white-collar and federal criminal matters.",
        bioAr: "ديفيد رايت مدع عام فيدرالي سابق في مكتب المدعي الأمريكي. يطبق الآن خبرته الادعائية للدفاع عن العملاء في القضايا الجنائية الفيدرالية والاقتصادية المعقدة.",
        education: [
            "J.D., University of Chicago Law School",
            "B.A., Duke University",
        ],
        admissions: [
            "New York",
            "District of Columbia",
            "U.S. Supreme Court",
        ],
        barAdmissions: [
            "New York State Bar",
            "District of Columbia Bar",
            "U.S. Supreme Court",
        ],
        awards: [
            "Best Lawyers - Criminal Defense (2018-2024)",
            "National Trial Lawyers Top 100",
            "AV Preeminent Rating – Martindale-Hubbell",
        ],
        practiceAreas: ["criminal-defense"],
        email: "dwright@atlaslegal.com",
        phone: "(212) 555-0105",
        linkedin: "#",
        featured: false,
    },
    {
        slug: "amanda-rodriguez",
        name: "Amanda Rodriguez",
        title: "Partner",
        titleAr: "شريكة",
        role: "Real Estate Law",
        roleAr: "القانون العقاري",
        bio: "Amanda Rodriguez heads our real estate practice, handling complex commercial transactions and development projects. She has closed over $3 billion in real estate deals across the United States.",
        bioAr: "تترأس أماندا رودريغيز ممارستنا العقارية، وتتعامل مع المعاملات التجارية المعقدة ومشاريع التطوير. أغلقت أكثر من ٣ مليارات دولار في الصفقات العقارية عبر الولايات المتحدة.",
        education: [
            "J.D., Fordham Law School",
            "B.S., Boston College",
        ],
        admissions: [
            "New York",
            "Florida",
        ],
        barAdmissions: [
            "New York State Bar",
            "Florida State Bar",
        ],
        awards: [
            "Real Estate Lawyer of the Year - NYC (2023)",
            "Super Lawyers - Real Estate",
            "Crain's Notable Women in Real Estate Law",
        ],
        practiceAreas: ["real-estate"],
        email: "arodriguez@atlaslegal.com",
        phone: "(212) 555-0106",
        linkedin: "#",
        featured: false,
    },
];

// Helper functions
export function getAttorneyBySlug(slug: string): Attorney | undefined {
    return ATTORNEYS.find((attorney) => attorney.slug === slug);
}

export function getFeaturedAttorneys(): Attorney[] {
    return ATTORNEYS.filter((attorney) => attorney.featured);
}
