// Content Layer for Atlas Legal
// Centralized data with i18n support for all pages

import { Language } from "./i18n/translations";

// ═══════════════════════════════════════════════════════════════════════════
// CASE STUDIES
// ═══════════════════════════════════════════════════════════════════════════

export interface CaseStudy {
    id: string;
    slug: string;
    title: { en: string; ar: string };
    category: { en: string; ar: string };
    amount: string;
    amountAr: string;
    type: "verdict" | "settlement";
    summary: { en: string; ar: string };
    description: { en: string; ar: string };
    challenge: { en: string; ar: string };
    approach: { en: string; ar: string };
    outcome: { en: string; ar: string };
    practiceArea: string;
    featured: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
    {
        id: "1",
        slug: "medical-malpractice-surgical-error",
        title: {
            en: "Surgical Malpractice Victory",
            ar: "انتصار في قضية خطأ جراحي",
        },
        category: {
            en: "Medical Malpractice",
            ar: "سوء الممارسة الطبية",
        },
        amount: "$12.5M",
        amountAr: "١٢.٥ مليون دولار",
        type: "verdict",
        summary: {
            en: "Jury verdict for patient who suffered permanent nerve damage during routine surgery.",
            ar: "حكم هيئة المحلفين لمريض عانى من تلف عصبي دائم خلال عملية جراحية روتينية.",
        },
        description: {
            en: "Our client underwent what should have been a routine appendectomy. Due to the surgeon's negligence, a major nerve was severed, resulting in permanent disability.",
            ar: "خضع موكلنا لعملية استئصال زائدة دودية روتينية. بسبب إهمال الجراح، تم قطع عصب رئيسي، مما أدى إلى إعاقة دائمة.",
        },
        challenge: {
            en: "The hospital's defense team claimed the nerve damage was an unavoidable complication. We needed to prove gross negligence.",
            ar: "ادعى فريق دفاع المستشفى أن تلف العصب كان مضاعفة لا مفر منها. كان علينا إثبات الإهمال الجسيم.",
        },
        approach: {
            en: "We retained leading neurology experts and reconstructed the surgery minute-by-minute, demonstrating the surgeon's deviation from standard care.",
            ar: "استعنا بخبراء أعصاب رائدين وأعدنا بناء تفاصيل الجراحة دقيقة بدقيقة، مبينين انحراف الجراح عن معايير الرعاية.",
        },
        outcome: {
            en: "After a three-week trial, the jury awarded $12.5 million, including $4 million in punitive damages.",
            ar: "بعد محاكمة استمرت ثلاثة أسابيع، منحت هيئة المحلفين ١٢.٥ مليون دولار، شاملة ٤ ملايين كتعويضات عقابية.",
        },
        practiceArea: "personal-injury",
        featured: true,
    },
    {
        id: "2",
        slug: "corporate-merger-deal",
        title: {
            en: "Major Tech Acquisition",
            ar: "صفقة استحواذ تقنية كبرى",
        },
        category: {
            en: "Mergers & Acquisitions",
            ar: "الاندماج والاستحواذ",
        },
        amount: "$2.1B",
        amountAr: "٢.١ مليار دولار",
        type: "settlement",
        summary: {
            en: "Successfully negotiated a $2.1 billion acquisition protecting our client's founders and employees.",
            ar: "نجحنا في التفاوض على صفقة استحواذ بقيمة ٢.١ مليار دولار حامين مؤسسي ومواظفي موكلنا.",
        },
        description: {
            en: "Our client, a rapidly growing fintech startup, attracted interest from multiple Fortune 100 companies. We guided them through a competitive bidding process.",
            ar: "جذبت شركة موكلنا الناشئة في مجال التقنية المالية اهتمام عدة شركات من قائمة فورتشن ١٠٠. وجهناهم خلال عملية مناقصة تنافسية.",
        },
        challenge: {
            en: "Balancing maximum valuation with founder retention, employee protection, and regulatory approval in multiple jurisdictions.",
            ar: "الموازنة بين أقصى تقييم واستبقاء المؤسسين وحماية الموظفين والموافقات التنظيمية في عدة ولايات.",
        },
        approach: {
            en: "We structured a deal with innovative earnout provisions, employee retention packages, and regulatory carve-outs.",
            ar: "هيكلنا صفقة بشروط مبتكرة للحوافز المؤجلة وحزم استبقاء الموظفين واستثناءات تنظيمية.",
        },
        outcome: {
            en: "The deal closed in 90 days with all regulatory approvals secured. Founders received 40% premium over the initial offer.",
            ar: "أُغلقت الصفقة في ٩٠ يوماً مع تأمين جميع الموافقات التنظيمية. حصل المؤسسون على علاوة ٤٠٪ فوق العرض الأولي.",
        },
        practiceArea: "corporate-law",
        featured: true,
    },
    {
        id: "3",
        slug: "class-action-defense",
        title: {
            en: "Class Action Dismissal",
            ar: "رفض دعوى جماعية",
        },
        category: {
            en: "Commercial Litigation",
            ar: "التقاضي التجاري",
        },
        amount: "$850M",
        amountAr: "٨٥٠ مليون دولار",
        type: "verdict",
        summary: {
            en: "Complete dismissal of $850 million class action, saving our client from potential bankruptcy.",
            ar: "رفض كامل لدعوى جماعية بقيمة ٨٥٠ مليون دولار، إنقاذاً لموكلنا من إفلاس محتمل.",
        },
        description: {
            en: "A major pharmaceutical company faced a coordinated class action alleging product liability across 47 states.",
            ar: "واجهت شركة أدوية كبرى دعوى جماعية منسقة تدعي مسؤولية المنتج في ٤٧ ولاية.",
        },
        challenge: {
            en: "The plaintiffs had retained high-profile counsel and extensive media coverage had created prejudicial publicity.",
            ar: "استعان المدعون بمحامين بارزين، وأدت التغطية الإعلامية الواسعة لخلق صورة عامة متحيزة.",
        },
        approach: {
            en: "We filed a comprehensive motion challenging class certification and the scientific basis of the claims.",
            ar: "رفعنا طعناً شاملاً يعترض على تصنيف الدعوى الجماعية والأساس العلمي للادعاءات.",
        },
        outcome: {
            en: "The court granted our motion, dismissing the case with prejudice. The ruling set a favorable precedent.",
            ar: "وافقت المحكمة على طعننا ورفضت الدعوى نهائياً. أسس الحكم سابقة قضائية إيجابية.",
        },
        practiceArea: "litigation",
        featured: true,
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// BLOG ARTICLES
// ═══════════════════════════════════════════════════════════════════════════

export interface BlogArticle {
    id: string;
    slug: string;
    title: { en: string; ar: string };
    excerpt: { en: string; ar: string };
    content: { en: string; ar: string };
    author: string;
    authorTitle: { en: string; ar: string };
    date: string;
    category: { en: string; ar: string };
    readTime: number;
    featured: boolean;
}

export const BLOG_ARTICLES: BlogArticle[] = [
    {
        id: "1",
        slug: "understanding-business-litigation",
        title: {
            en: "Understanding Complex Business Litigation: A Strategic Guide",
            ar: "فهم التقاضي التجاري المعقد: دليل استراتيجي",
        },
        excerpt: {
            en: "Learn how to navigate high-stakes commercial disputes and protect your business interests effectively.",
            ar: "تعلم كيفية التعامل مع النزاعات التجارية عالية المخاطر وحماية مصالح عملك بفعالية.",
        },
        content: {
            en: "Commercial litigation can be one of the most challenging areas of law...",
            ar: "قد يكون التقاضي التجاري من أكثر مجالات القانون تحدياً...",
        },
        author: "James Harrison",
        authorTitle: {
            en: "Partner, Commercial Litigation",
            ar: "شريك، التقاضي التجاري",
        },
        date: "2024-11-15",
        category: {
            en: "Business Law",
            ar: "قانون الأعمال",
        },
        readTime: 8,
        featured: true,
    },
    {
        id: "2",
        slug: "personal-injury-claims-timeline",
        title: {
            en: "What to Expect: The Personal Injury Claims Timeline",
            ar: "ما يجب توقعه: الجدول الزمني لمطالبات الإصابات الشخصية",
        },
        excerpt: {
            en: "A comprehensive overview of the personal injury claims process from initial consultation to resolution.",
            ar: "نظرة شاملة على عملية مطالبات الإصابات الشخصية من الاستشارة الأولية إلى الحل.",
        },
        content: {
            en: "If you've been injured due to someone else's negligence...",
            ar: "إذا أصبت بسبب إهمال شخص آخر...",
        },
        author: "Sarah Mitchell",
        authorTitle: {
            en: "Partner, Personal Injury",
            ar: "شريكة، الإصابات الشخصية",
        },
        date: "2024-11-08",
        category: {
            en: "Personal Injury",
            ar: "الإصابات الشخصية",
        },
        readTime: 6,
        featured: true,
    },
    {
        id: "3",
        slug: "protecting-assets-divorce",
        title: {
            en: "Protecting Your Assets in High-Net-Worth Divorce",
            ar: "حماية أصولك في طلاق أصحاب الثروات العالية",
        },
        excerpt: {
            en: "Strategic considerations for safeguarding wealth and business interests during complex divorce proceedings.",
            ar: "اعتبارات استراتيجية لحماية الثروة ومصالح الأعمال خلال إجراءات الطلاق المعقدة.",
        },
        content: {
            en: "Divorce involving significant assets requires careful planning...",
            ar: "الطلاق الذي يتضمن أصولاً كبيرة يتطلب تخطيطاً دقيقاً...",
        },
        author: "Victoria Chen",
        authorTitle: {
            en: "Partner, Family Law",
            ar: "شريكة، قانون الأسرة",
        },
        date: "2024-10-22",
        category: {
            en: "Family Law",
            ar: "قانون الأسرة",
        },
        readTime: 7,
        featured: false,
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════

export interface Testimonial {
    id: string;
    text: { en: string; ar: string };
    author: { en: string; ar: string };
    role: { en: string; ar: string };
    result: { en: string; ar: string };
    rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        text: {
            en: "Atlas Legal didn't just win my case—they restored my faith in the justice system. Their team's dedication and expertise were truly extraordinary.",
            ar: "أطلس القانوني لم يفز بقضيتي فحسب—بل أعاد ثقتي بنظام العدالة. تفاني فريقهم وخبرتهم كانا استثنائيين حقاً.",
        },
        author: {
            en: "Michael T.",
            ar: "مايكل ت.",
        },
        role: {
            en: "Medical Malpractice Client",
            ar: "موكل في قضية سوء ممارسة طبية",
        },
        result: {
            en: "$12.5M Verdict",
            ar: "حكم بـ ١٢.٥ مليون دولار",
        },
        rating: 5,
    },
    {
        id: "2",
        text: {
            en: "When our company faced a bet-the-company lawsuit, Atlas delivered. They achieved a complete dismissal and saved our business.",
            ar: "عندما واجهت شركتنا دعوى قضائية مصيرية، أنجز أطلس المهمة. حققوا رفضاً كاملاً وأنقذوا أعمالنا.",
        },
        author: {
            en: "Sarah K.",
            ar: "سارة ك.",
        },
        role: {
            en: "CEO, Tech Startup",
            ar: "الرئيس التنفيذي، شركة تقنية ناشئة",
        },
        result: {
            en: "Full Dismissal",
            ar: "رفض كامل للدعوى",
        },
        rating: 5,
    },
    {
        id: "3",
        text: {
            en: "The most professional and compassionate legal team I've ever worked with. They guided me through the most difficult time of my life.",
            ar: "الفريق القانوني الأكثر احترافية وتعاطفاً الذي عملت معه على الإطلاق. وجهوني خلال أصعب فترة في حياتي.",
        },
        author: {
            en: "Jennifer M.",
            ar: "جنيفر م.",
        },
        role: {
            en: "Family Law Client",
            ar: "موكلة في قضية قانون أسرة",
        },
        result: {
            en: "Full Custody Awarded",
            ar: "حضانة كاملة",
        },
        rating: 5,
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// METHODOLOGY STEPS
// ═══════════════════════════════════════════════════════════════════════════

export interface MethodologyStep {
    id: number;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    icon: string;
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
    {
        id: 1,
        title: {
            en: "Comprehensive Case Analysis",
            ar: "تحليل شامل للقضية",
        },
        description: {
            en: "We conduct an exhaustive review of the facts, evidence, and applicable law to build an unassailable foundation for your case.",
            ar: "نجري مراجعة شاملة للوقائع والأدلة والقانون المطبق لبناء أساس متين لقضيتك.",
        },
        icon: "search",
    },
    {
        id: 2,
        title: {
            en: "Strategic Planning",
            ar: "التخطيط الاستراتيجي",
        },
        description: {
            en: "Every case receives a tailored strategy designed to maximize your outcome while minimizing risk and uncertainty.",
            ar: "كل قضية تحظى باستراتيجية مصممة خصيصاً لتحقيق أفضل النتائج مع تقليل المخاطر.",
        },
        icon: "target",
    },
    {
        id: 3,
        title: {
            en: "Aggressive Advocacy",
            ar: "الدفاع الحازم",
        },
        description: {
            en: "Our trial-tested attorneys pursue every advantage—whether negotiating a settlement or litigating in court.",
            ar: "محامونا المجربون يسعون لكل ميزة—سواء في التفاوض أو أمام المحاكم.",
        },
        icon: "gavel",
    },
    {
        id: 4,
        title: {
            en: "Client Communication",
            ar: "التواصل المستمر",
        },
        description: {
            en: "You'll receive regular updates and have direct access to your legal team throughout the entire process.",
            ar: "ستتلقى تحديثات منتظمة مع إمكانية الوصول المباشر لفريقكم القانوني طوال العملية.",
        },
        icon: "phone",
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function getLocalizedText<T extends { en: string; ar: string }>(
    obj: T,
    lang: Language
): string {
    return lang === "ar" ? obj.ar : obj.en;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
    return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
    return CASE_STUDIES.filter((cs) => cs.featured);
}

export function getFeaturedArticles(): BlogArticle[] {
    return BLOG_ARTICLES.filter((article) => article.featured);
}
