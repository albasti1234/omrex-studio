// Atlas Legal — Premium Translation Dictionary
// Professional transcreation: culturally natural, legal-professional tone
// Not word-for-word literal translation

export type Language = "en" | "ar";

export type TranslationKey = keyof typeof translations.en;

export const translations = {
    en: {
        // ═══════════════════════════════════════════════════════════════════
        // NAVIGATION
        // ═══════════════════════════════════════════════════════════════════
        "nav.home": "Home",
        "nav.practiceAreas": "Practice Areas",
        "nav.about": "About",
        "nav.team": "Our Team",
        "nav.attorneys": "Attorneys",
        "nav.results": "Case Results",
        "nav.caseStudies": "Case Studies",
        "nav.insights": "Insights",
        "nav.blog": "Blog",
        "nav.contact": "Contact",
        "nav.consultation": "Free Consultation",
        "nav.phone": "(212) 555-0100",

        // ═══════════════════════════════════════════════════════════════════
        // HERO SECTION
        // ═══════════════════════════════════════════════════════════════════
        "hero.established": "Established 1994",
        "hero.title1": "Justice Demands",
        "hero.title2": "Excellence.",
        "hero.subtitle": "For three decades, Atlas Legal has championed the rights of individuals and corporations facing their most consequential legal challenges. Our record speaks: $2B+ recovered, 98% success rate.",
        "hero.cta.consultation": "Schedule Free Consultation",
        "hero.cta.explore": "Our Practice Areas",
        "hero.scroll": "Scroll to Explore",
        "hero.tagline": "Justice • Integrity • Excellence",

        // ═══════════════════════════════════════════════════════════════════
        // STATS
        // ═══════════════════════════════════════════════════════════════════
        "stats.recovered": "Recovered for Clients",
        "stats.successRate": "Success Rate",
        "stats.experience": "Years of Excellence",
        "stats.casesWon": "Cases Won",
        "stats.attorneys": "Expert Attorneys",
        "stats.offices": "National Offices",

        // ═══════════════════════════════════════════════════════════════════
        // PRACTICE AREAS
        // ═══════════════════════════════════════════════════════════════════
        "practice.kicker": "Areas of Expertise",
        "practice.title1": "Comprehensive Legal",
        "practice.title2": "Representation",
        "practice.subtitle": "From complex corporate transactions to high-stakes litigation, our attorneys bring decades of experience—and an unwavering commitment to your success.",
        "practice.learnMore": "Learn More",
        "practice.viewAll": "View All Practice Areas",
        "practice.notSure": "Unsure Which Practice Area Fits Your Case?",
        "practice.notSureDesc": "Every situation is unique. Schedule a complimentary consultation, and our team will assess your matter and connect you with the right specialist.",

        // Practice Area Names
        "practice.corporate": "Corporate & Business Law",
        "practice.litigation": "Complex Litigation",
        "practice.personalInjury": "Personal Injury",
        "practice.familyLaw": "Family Law",
        "practice.realEstate": "Real Estate Law",
        "practice.criminalDefense": "Criminal Defense",

        // ═══════════════════════════════════════════════════════════════════
        // ABOUT / FIRM STORY
        // ═══════════════════════════════════════════════════════════════════
        "about.kicker": "Our Legacy",
        "about.title": "Built on a Foundation of Excellence",
        "about.subtitle": "Since 1994, Atlas Legal has stood with clients in their defining moments. Our commitment to relentless advocacy and uncompromising ethics has earned us recognition as one of the nation's most respected firms.",
        "about.feature1": "Trial-tested attorneys with proven courtroom success",
        "about.feature2": "Personalized strategies tailored to your unique circumstances",
        "about.feature3": "Resources and expertise to confront the most formidable adversaries",
        "about.feature4": "A legacy of landmark verdicts and precedent-setting settlements",
        "about.learnStory": "Discover Our Story",

        // About Page
        "about.pageTitle": "About Atlas Legal",
        "about.pageSubtitle": "A tradition of excellence spanning three decades.",
        "about.missionTitle": "Our Mission",
        "about.missionText": "To deliver uncompromising legal representation while maintaining the highest standards of professional ethics and client service.",
        "about.historyTitle": "Our History",
        "about.historyText": "Founded in 1994 by a team of former federal prosecutors, Atlas Legal has grown from a boutique litigation firm to a full-service powerhouse with a national reputation.",

        // ═══════════════════════════════════════════════════════════════════
        // ATTORNEYS
        // ═══════════════════════════════════════════════════════════════════
        "attorneys.kicker": "Leadership",
        "attorneys.title": "Meet Our Attorneys",
        "attorneys.subtitle": "Our team includes former federal prosecutors, Fortune 500 advisors, and nationally recognized trial lawyers—each committed to achieving the best possible outcome for you.",
        "attorneys.viewAll": "View All Attorneys",
        "attorneys.ready": "Ready to Speak With an Attorney?",
        "attorneys.readyDesc": "Schedule a confidential consultation and we'll match you with the right specialist for your case.",

        // ═══════════════════════════════════════════════════════════════════
        // WHY CHOOSE US
        // ═══════════════════════════════════════════════════════════════════
        "why.kicker": "The Atlas Difference",
        "why.title": "Why Clients Choose Us",
        "why.trackRecord": "Proven Track Record",
        "why.trackRecordDesc": "Over $2 billion recovered for our clients with a 98% success rate in complex litigation matters.",
        "why.eliteTeam": "Elite Legal Team",
        "why.eliteTeamDesc": "Former federal prosecutors, Fortune 500 advisors, and nationally recognized trial lawyers.",
        "why.clientFirst": "Client-Centered Approach",
        "why.clientFirstDesc": "24/7 availability, transparent communication, and strategies tailored to your goals.",
        "why.noFee": "No Fee Unless We Win",
        "why.noFeeDesc": "For personal injury and select litigation matters, you pay nothing unless we secure a recovery.",

        // ═══════════════════════════════════════════════════════════════════
        // TESTIMONIALS
        // ═══════════════════════════════════════════════════════════════════
        "testimonials.kicker": "Client Stories",
        "testimonials.title": "Trusted by Those We Serve",

        // ═══════════════════════════════════════════════════════════════════
        // CASE STUDIES / RESULTS
        // ═══════════════════════════════════════════════════════════════════
        "results.kicker": "Our Track Record",
        "results.title": "Case Results",
        "results.subtitle": "Our results speak for themselves. We have recovered billions of dollars in verdicts and settlements for clients across the nation.",
        "results.featured": "Featured Recoveries",
        "results.landmark": "Landmark Verdicts & Settlements",
        "results.verdict": "Verdict",
        "results.settlement": "Settlement",
        "results.disclaimer": "Prior results do not guarantee a similar outcome. Each case is unique and must be evaluated on its own merits.",
        "results.ready": "Ready to Discuss Your Case?",
        "results.readyDesc": "Contact us for a free, confidential consultation. Let our proven track record work for you.",

        // ═══════════════════════════════════════════════════════════════════
        // FAQ
        // ═══════════════════════════════════════════════════════════════════
        "faq.title": "Frequently Asked Questions",
        "faq.q1": "What does an initial consultation cost?",
        "faq.a1": "Initial consultations are complimentary for most practice areas. During this meeting, we'll evaluate your situation and outline your legal options—with no obligation.",
        "faq.q2": "How long will my case take to resolve?",
        "faq.a2": "Timelines vary based on complexity. Straightforward matters may conclude within weeks, while complex litigation can extend over months or years. We'll provide realistic expectations during your consultation.",
        "faq.q3": "What is a contingency fee arrangement?",
        "faq.a3": "For personal injury cases, we work on contingency—you pay no upfront costs, and our fee is a percentage of your recovery. If we don't win, you owe nothing.",
        "faq.q4": "Will I need to appear in court?",
        "faq.a4": "Many cases settle before trial. However, our willingness to litigate—and our track record of courtroom success—often leads to more favorable settlement offers.",

        // ═══════════════════════════════════════════════════════════════════
        // CONTACT
        // ═══════════════════════════════════════════════════════════════════
        "contact.kicker": "Get in Touch",
        "contact.title": "Contact Us",
        "contact.subtitle": "Schedule a confidential consultation with one of our experienced attorneys. We're ready to help.",
        "contact.office": "New York Headquarters",
        "contact.address": "1 Justice Plaza, Suite 4000\nNew York, NY 10005",
        "contact.hours": "Office Hours",
        "contact.hoursValue": "Monday – Friday: 8:00 AM – 7:00 PM\nSaturday: By Appointment Only",
        "contact.contactUs": "Send Message",
        "contact.bookConsultation": "Book Consultation",
        "contact.formName": "Full Name",
        "contact.formEmail": "Email Address",
        "contact.formPhone": "Phone Number",
        "contact.formMessage": "How Can We Help?",
        "contact.formSubmit": "Submit Inquiry",
        "contact.formSuccess": "Thank you for reaching out. We'll respond within 24 hours.",

        // ═══════════════════════════════════════════════════════════════════
        // FINAL CTA
        // ═══════════════════════════════════════════════════════════════════
        "cta.kicker": "Take the First Step",
        "cta.title1": "Your Case Deserves",
        "cta.title2": "Elite Representation.",
        "cta.subtitle": "Contact us today for a confidential consultation. Our experienced attorneys will evaluate your case and explain your options—at no cost and no obligation.",
        "cta.call": "Call Now",

        // ═══════════════════════════════════════════════════════════════════
        // METHODOLOGY / PROCESS
        // ═══════════════════════════════════════════════════════════════════
        "methodology.kicker": "Our Approach",
        "methodology.title": "How We Win",
        "methodology.step1.title": "Comprehensive Case Analysis",
        "methodology.step1.desc": "We conduct an exhaustive review of the facts, evidence, and applicable law to build an unassailable foundation.",
        "methodology.step2.title": "Strategic Planning",
        "methodology.step2.desc": "Every case receives a tailored strategy designed to maximize your outcome while minimizing risk and uncertainty.",
        "methodology.step3.title": "Aggressive Advocacy",
        "methodology.step3.desc": "Our trial-tested attorneys pursue every advantage—whether negotiating a settlement or litigating in court.",
        "methodology.step4.title": "Client Communication",
        "methodology.step4.desc": "You'll receive regular updates and have direct access to your legal team throughout the process.",

        // ═══════════════════════════════════════════════════════════════════
        // INSIGHTS / BLOG
        // ═══════════════════════════════════════════════════════════════════
        "blog.kicker": "Insights & Resources",
        "blog.title": "Legal Insights",
        "blog.subtitle": "Expert analysis, legal updates, and practical guidance from our attorneys. Stay informed on the issues that matter.",
        "blog.readTime": "min read",
        "blog.readMore": "Read Article",
        "blog.viewAll": "View All Articles",
        "blog.subscribe": "Subscribe",
        "blog.stayInformed": "Stay Informed",
        "blog.subscribeDesc": "Subscribe to receive legal updates and insights delivered to your inbox.",
        "blog.categories": "Categories",
        "blog.recentPosts": "Recent Articles",

        // ═══════════════════════════════════════════════════════════════════
        // FOOTER
        // ═══════════════════════════════════════════════════════════════════
        "footer.description": "For over 30 years, Atlas Legal has delivered exceptional results for clients facing complex legal challenges. Our commitment to excellence defines everything we do.",
        "footer.practiceAreas": "Practice Areas",
        "footer.theFirm": "The Firm",
        "footer.resources": "Resources",
        "footer.aboutUs": "About Us",
        "footer.ourAttorneys": "Our Attorneys",
        "footer.caseResults": "Case Results",
        "footer.blogInsights": "Blog & Insights",
        "footer.careers": "Careers",
        "footer.freeConsultation": "Free Consultation",
        "footer.contactUs": "Contact Us",
        "footer.faq": "FAQ",
        "footer.privacyPolicy": "Privacy Policy",
        "footer.termsOfService": "Terms of Service",
        "footer.disclaimer": "Disclaimer",
        "footer.copyright": "© 2024 Atlas Legal LLP. All rights reserved.",
        "footer.legalDisclaimer": "This website is for informational purposes only and does not constitute legal advice. Prior results do not guarantee a similar outcome. Attorney advertising.",

        // ═══════════════════════════════════════════════════════════════════
        // BOOKING FORM
        // ═══════════════════════════════════════════════════════════════════
        "booking.step1": "Case Type",
        "booking.step2": "Your Information",
        "booking.step3": "Schedule",
        "booking.caseTypeQuestion": "What type of legal matter do you need assistance with?",
        "booking.urgency": "How urgent is your matter?",
        "booking.normal": "Standard",
        "booking.urgent": "Urgent",
        "booking.emergency": "Emergency",
        "booking.fullName": "Full Name",
        "booking.email": "Email Address",
        "booking.phone": "Phone Number",
        "booking.caseDescription": "Brief Description of Your Matter",
        "booking.preferredDate": "Preferred Date",
        "booking.timeSlots": "Available Times",
        "booking.summary": "Consultation Summary",
        "booking.back": "Back",
        "booking.continue": "Continue",
        "booking.confirm": "Confirm Booking",
        "booking.success": "Consultation Scheduled",
        "booking.successDesc": "Thank you! We've received your request and will contact you within 24 hours to confirm your appointment.",

        // ═══════════════════════════════════════════════════════════════════
        // LIVE CHAT
        // ═══════════════════════════════════════════════════════════════════
        "chat.greeting": "Hello! How may we assist you today?",
        "chat.response": "Thank you for reaching out. An attorney will review your inquiry and respond shortly. For immediate assistance, please call (212) 555-0100.",
        "chat.placeholder": "Type your message...",
        "chat.disclaimer": "All communications are confidential and protected by attorney-client privilege.",
        "chat.online": "Online Now",

        // ═══════════════════════════════════════════════════════════════════
        // CALCULATOR
        // ═══════════════════════════════════════════════════════════════════
        "calc.title": "Case Value Estimator",
        "calc.subtitle": "Get a preliminary estimate of your potential case value",
        "calc.caseType": "Case Type",
        "calc.injurySeverity": "Injury Severity",
        "calc.mild": "Minor",
        "calc.moderate": "Moderate",
        "calc.severe": "Severe",
        "calc.catastrophic": "Catastrophic",
        "calc.medicalExpenses": "Medical Expenses ($)",
        "calc.lostWages": "Lost Wages ($)",
        "calc.estimate": "Estimated Range",
        "calc.disclaimer": "This is a preliminary estimate only. Actual case values depend on many factors. Contact us for a thorough evaluation.",

        // ═══════════════════════════════════════════════════════════════════
        // NOTIFICATIONS
        // ═══════════════════════════════════════════════════════════════════
        "notification.available": "Attorney Available",
        "notification.availableDesc": "A specialist is available for a free consultation right now.",
        "notification.newCase": "Recent Victory",
        "notification.newCaseDesc": "We just secured a significant verdict for our client.",

        // ═══════════════════════════════════════════════════════════════════
        // ACCESSIBILITY
        // ═══════════════════════════════════════════════════════════════════
        "a11y.skipToContent": "Skip to main content",
        "a11y.openMenu": "Open navigation menu",
        "a11y.closeMenu": "Close navigation menu",
        "a11y.toggleDarkMode": "Toggle dark mode",
        "a11y.switchLanguage": "Switch language",

        // ═══════════════════════════════════════════════════════════════════
        // THEME
        // ═══════════════════════════════════════════════════════════════════
        "theme.light": "Light",
        "theme.dark": "Dark",
        "theme.system": "System",

        // ═══════════════════════════════════════════════════════════════════
        // LEGAL PAGES
        // ═══════════════════════════════════════════════════════════════════
        "legal.privacyTitle": "Privacy Policy",
        "legal.termsTitle": "Terms of Service",
        "legal.disclaimerTitle": "Legal Disclaimer",
        "legal.lastUpdated": "Last Updated",
    },

    ar: {
        // ═══════════════════════════════════════════════════════════════════
        // NAVIGATION — Professional legal Arabic
        // ═══════════════════════════════════════════════════════════════════
        "nav.home": "الرئيسية",
        "nav.practiceAreas": "مجالات التخصص",
        "nav.about": "عن المكتب",
        "nav.team": "فريق العمل",
        "nav.attorneys": "المحامون",
        "nav.results": "سجل النجاحات",
        "nav.caseStudies": "دراسات القضايا",
        "nav.insights": "رؤى قانونية",
        "nav.blog": "المقالات",
        "nav.contact": "تواصل معنا",
        "nav.consultation": "استشارة مجانية",
        "nav.phone": "٠١٠٠-٥٥٥ (٢١٢)",

        // ═══════════════════════════════════════════════════════════════════
        // HERO SECTION — Culturally resonant, authoritative
        // ═══════════════════════════════════════════════════════════════════
        "hero.established": "منذ عام ١٩٩٤",
        "hero.title1": "العدالة تستوجب",
        "hero.title2": "التميز.",
        "hero.subtitle": "على مدار ثلاثة عقود، وقف أطلس القانوني إلى جانب الأفراد والمؤسسات في أدق لحظاتهم القانونية. سجلنا يتحدث: أكثر من ملياري دولار مستردة، ونسبة نجاح ٩٨٪.",
        "hero.cta.consultation": "احجز استشارتك المجانية",
        "hero.cta.explore": "مجالات تخصصنا",
        "hero.scroll": "اكتشف المزيد",
        "hero.tagline": "العدالة • النزاهة • التميز",

        // ═══════════════════════════════════════════════════════════════════
        // STATS
        // ═══════════════════════════════════════════════════════════════════
        "stats.recovered": "استردادات للعملاء",
        "stats.successRate": "نسبة النجاح",
        "stats.experience": "عاماً من التميز",
        "stats.casesWon": "قضية ناجحة",
        "stats.attorneys": "محامٍ خبير",
        "stats.offices": "مكاتب وطنية",

        // ═══════════════════════════════════════════════════════════════════
        // PRACTICE AREAS — Natural legal Arabic
        // ═══════════════════════════════════════════════════════════════════
        "practice.kicker": "مجالات التخصص",
        "practice.title1": "تمثيل قانوني",
        "practice.title2": "متكامل",
        "practice.subtitle": "من المعاملات التجارية المعقدة إلى التقاضي الحاسم، يضع فريقنا عقوداً من الخبرة في خدمة نجاحكم.",
        "practice.learnMore": "اكتشف المزيد",
        "practice.viewAll": "جميع مجالات التخصص",
        "practice.notSure": "غير متأكد من المجال المناسب لقضيتك؟",
        "practice.notSureDesc": "لكل حالة طابعها الخاص. احجز استشارة مجانية، وسيقوم فريقنا بتقييم وضعك وتوجيهك للمختص المناسب.",

        // Practice Area Names
        "practice.corporate": "قانون الشركات والأعمال التجارية",
        "practice.litigation": "التقاضي التجاري المعقد",
        "practice.personalInjury": "قضايا الإصابات والتعويضات",
        "practice.familyLaw": "قانون الأسرة والأحوال الشخصية",
        "practice.realEstate": "القانون العقاري",
        "practice.criminalDefense": "الدفاع الجنائي",

        // ═══════════════════════════════════════════════════════════════════
        // ABOUT / FIRM STORY
        // ═══════════════════════════════════════════════════════════════════
        "about.kicker": "إرثنا",
        "about.title": "ركائز راسخة من التميز",
        "about.subtitle": "منذ عام ١٩٩٤، وقف أطلس القانوني مع عملائه في لحظاتهم المصيرية. التزامنا بالدفاع الدؤوب والمعايير الأخلاقية الراسخة أكسبنا مكانة بين أكثر المكاتب احتراماً في البلاد.",
        "about.feature1": "محامون مجربون بسجل حافل من النجاحات القضائية",
        "about.feature2": "استراتيجيات مصممة خصيصاً وفق ظروفكم الفريدة",
        "about.feature3": "إمكانيات وخبرات لمواجهة أصعب الخصوم",
        "about.feature4": "إرث من الأحكام التاريخية والتسويات السابقة",
        "about.learnStory": "اكتشف قصتنا",

        // About Page
        "about.pageTitle": "عن أطلس القانوني",
        "about.pageSubtitle": "تقليد من التميز يمتد لثلاثة عقود.",
        "about.missionTitle": "رسالتنا",
        "about.missionText": "تقديم تمثيل قانوني لا هوادة فيه مع الحفاظ على أعلى معايير الأخلاقيات المهنية وخدمة العملاء.",
        "about.historyTitle": "تاريخنا",
        "about.historyText": "تأسس عام ١٩٩٤ على يد فريق من المدعين العامين الفيدراليين السابقين، ونما أطلس القانوني من مكتب متخصص في التقاضي إلى مؤسسة متكاملة ذات سمعة وطنية.",

        // ═══════════════════════════════════════════════════════════════════
        // ATTORNEYS
        // ═══════════════════════════════════════════════════════════════════
        "attorneys.kicker": "القيادة",
        "attorneys.title": "تعرف على محامينا",
        "attorneys.subtitle": "يضم فريقنا مدعين عامين فيدراليين سابقين، ومستشارين لكبرى الشركات، ومحامين مشهورين على المستوى الوطني — ملتزمون جميعاً بتحقيق أفضل النتائج لكم.",
        "attorneys.viewAll": "جميع المحامين",
        "attorneys.ready": "هل أنت مستعد للتحدث مع محامٍ؟",
        "attorneys.readyDesc": "احجز استشارة سرية وسنوصلك بالمختص المناسب لقضيتك.",

        // ═══════════════════════════════════════════════════════════════════
        // WHY CHOOSE US
        // ═══════════════════════════════════════════════════════════════════
        "why.kicker": "ما يميز أطلس",
        "why.title": "لماذا يختارنا العملاء",
        "why.trackRecord": "سجل نجاح مثبت",
        "why.trackRecordDesc": "أكثر من ملياري دولار مستردة لعملائنا بنسبة نجاح ٩٨٪ في القضايا المعقدة.",
        "why.eliteTeam": "فريق قانوني نخبوي",
        "why.eliteTeamDesc": "مدعون عامون فيدراليون سابقون، ومستشارون لكبرى الشركات، ومحامون معترف بهم وطنياً.",
        "why.clientFirst": "العميل أولاً",
        "why.clientFirstDesc": "متاحون على مدار الساعة، تواصل شفاف، واستراتيجيات مصممة حسب أهدافكم.",
        "why.noFee": "بدون أتعاب إلا عند النجاح",
        "why.noFeeDesc": "لقضايا الإصابات وبعض قضايا التقاضي، لا تدفعون شيئاً ما لم نحقق لكم تعويضاً.",

        // ═══════════════════════════════════════════════════════════════════
        // TESTIMONIALS
        // ═══════════════════════════════════════════════════════════════════
        "testimonials.kicker": "قصص العملاء",
        "testimonials.title": "ثقة من نخدمهم",

        // ═══════════════════════════════════════════════════════════════════
        // CASE STUDIES / RESULTS
        // ═══════════════════════════════════════════════════════════════════
        "results.kicker": "سجلنا",
        "results.title": "نتائج القضايا",
        "results.subtitle": "نتائجنا تتحدث عن نفسها. حققنا مليارات الدولارات في الأحكام والتسويات لعملائنا.",
        "results.featured": "أبرز الاستردادات",
        "results.landmark": "أحكام وتسويات تاريخية",
        "results.verdict": "حكم قضائي",
        "results.settlement": "تسوية",
        "results.disclaimer": "النتائج السابقة لا تضمن نتائج مماثلة. كل قضية فريدة وتُقيّم وفق ظروفها الخاصة.",
        "results.ready": "هل أنت مستعد لمناقشة قضيتك؟",
        "results.readyDesc": "تواصل معنا لاستشارة مجانية وسرية. دع سجلنا الحافل يعمل لصالحك.",

        // ═══════════════════════════════════════════════════════════════════
        // FAQ
        // ═══════════════════════════════════════════════════════════════════
        "faq.title": "الأسئلة الشائعة",
        "faq.q1": "ما تكلفة الاستشارة الأولية؟",
        "faq.a1": "الاستشارات الأولية مجانية في معظم المجالات. خلال هذا الاجتماع، سنقيّم وضعك ونوضح خياراتك القانونية — بدون أي التزام.",
        "faq.q2": "ما المدة المتوقعة لحل قضيتي؟",
        "faq.a2": "تختلف المدة حسب تعقيد القضية. القضايا البسيطة قد تُحل في أسابيع، بينما التقاضي المعقد قد يمتد لأشهر أو سنوات. سنقدم توقعات واقعية خلال استشارتك.",
        "faq.q3": "ما هو نظام الأتعاب المشروطة؟",
        "faq.a3": "لقضايا الإصابات، نعمل بنظام الأتعاب المشروطة — لا تدفعون مقدماً، وأتعابنا نسبة من التعويض المستحصل. إن لم نفز، لا تدينون بشيء.",
        "faq.q4": "هل سأحتاج للمثول أمام المحكمة؟",
        "faq.a4": "كثير من القضايا تُسوى قبل المحاكمة. لكن استعدادنا للتقاضي — وسجلنا في النجاح بالمحاكم — غالباً ما يؤدي لعروض تسوية أفضل.",

        // ═══════════════════════════════════════════════════════════════════
        // CONTACT
        // ═══════════════════════════════════════════════════════════════════
        "contact.kicker": "تواصل معنا",
        "contact.title": "اتصل بنا",
        "contact.subtitle": "احجز استشارة سرية مع أحد محامينا ذوي الخبرة. نحن على أتم الاستعداد للمساعدة.",
        "contact.office": "المقر الرئيسي — نيويورك",
        "contact.address": "١ ساحة العدالة، جناح ٤٠٠٠\nنيويورك، NY ١٠٠٠٥",
        "contact.hours": "ساعات العمل",
        "contact.hoursValue": "الاثنين — الجمعة: ٨ صباحاً — ٧ مساءً\nالسبت: بموعد مسبق",
        "contact.contactUs": "أرسل رسالة",
        "contact.bookConsultation": "احجز استشارة",
        "contact.formName": "الاسم الكامل",
        "contact.formEmail": "البريد الإلكتروني",
        "contact.formPhone": "رقم الهاتف",
        "contact.formMessage": "كيف يمكننا مساعدتك؟",
        "contact.formSubmit": "إرسال الاستفسار",
        "contact.formSuccess": "شكراً لتواصلك. سنرد خلال ٢٤ ساعة.",

        // ═══════════════════════════════════════════════════════════════════
        // FINAL CTA
        // ═══════════════════════════════════════════════════════════════════
        "cta.kicker": "اتخذ الخطوة الأولى",
        "cta.title1": "قضيتك تستحق",
        "cta.title2": "تمثيلاً نخبوياً.",
        "cta.subtitle": "تواصل معنا اليوم لاستشارة سرية. محامونا ذوو الخبرة سيقيّمون قضيتك ويشرحون خياراتك — بدون تكلفة ولا التزام.",
        "cta.call": "اتصل الآن",

        // ═══════════════════════════════════════════════════════════════════
        // METHODOLOGY / PROCESS
        // ═══════════════════════════════════════════════════════════════════
        "methodology.kicker": "منهجيتنا",
        "methodology.title": "كيف نحقق النجاح",
        "methodology.step1.title": "تحليل شامل للقضية",
        "methodology.step1.desc": "نجري مراجعة دقيقة للوقائع والأدلة والقانون المطبق لبناء أساس متين.",
        "methodology.step2.title": "التخطيط الاستراتيجي",
        "methodology.step2.desc": "كل قضية تحظى باستراتيجية مصممة خصيصاً لتحقيق أفضل النتائج مع تقليل المخاطر.",
        "methodology.step3.title": "الدفاع الحازم",
        "methodology.step3.desc": "محامونا المجربون يسعون لكل ميزة — سواء في التفاوض أو أمام المحاكم.",
        "methodology.step4.title": "التواصل المستمر",
        "methodology.step4.desc": "ستتلقى تحديثات منتظمة مع إمكانية الوصول المباشر لفريقكم القانوني طوال العملية.",

        // ═══════════════════════════════════════════════════════════════════
        // INSIGHTS / BLOG
        // ═══════════════════════════════════════════════════════════════════
        "blog.kicker": "رؤى ومصادر",
        "blog.title": "رؤى قانونية",
        "blog.subtitle": "تحليلات خبيرة، ومستجدات قانونية، وإرشادات عملية من محامينا. ابق على اطلاع بالمسائل المهمة.",
        "blog.readTime": "دقائق للقراءة",
        "blog.readMore": "اقرأ المقال",
        "blog.viewAll": "جميع المقالات",
        "blog.subscribe": "اشترك",
        "blog.stayInformed": "ابق على اطلاع",
        "blog.subscribeDesc": "اشترك لتلقي المستجدات والرؤى القانونية في بريدك.",
        "blog.categories": "التصنيفات",
        "blog.recentPosts": "أحدث المقالات",

        // ═══════════════════════════════════════════════════════════════════
        // FOOTER
        // ═══════════════════════════════════════════════════════════════════
        "footer.description": "على مدى ٣٠ عاماً، حقق أطلس القانوني نتائج استثنائية لعملاء يواجهون تحديات قانونية معقدة. التزامنا بالتميز هو ما يميزنا.",
        "footer.practiceAreas": "مجالات التخصص",
        "footer.theFirm": "المكتب",
        "footer.resources": "الموارد",
        "footer.aboutUs": "عن المكتب",
        "footer.ourAttorneys": "محامونا",
        "footer.caseResults": "سجل النجاحات",
        "footer.blogInsights": "المقالات والرؤى",
        "footer.careers": "الوظائف",
        "footer.freeConsultation": "استشارة مجانية",
        "footer.contactUs": "تواصل معنا",
        "footer.faq": "الأسئلة الشائعة",
        "footer.privacyPolicy": "سياسة الخصوصية",
        "footer.termsOfService": "شروط الخدمة",
        "footer.disclaimer": "إخلاء المسؤولية",
        "footer.copyright": "© ٢٠٢٤ أطلس القانوني. جميع الحقوق محفوظة.",
        "footer.legalDisclaimer": "هذا الموقع لأغراض إعلامية فقط ولا يُعد استشارة قانونية. النتائج السابقة لا تضمن نتائج مماثلة. إعلان قانوني.",

        // ═══════════════════════════════════════════════════════════════════
        // BOOKING FORM
        // ═══════════════════════════════════════════════════════════════════
        "booking.step1": "نوع القضية",
        "booking.step2": "بياناتك",
        "booking.step3": "الموعد",
        "booking.caseTypeQuestion": "ما نوع المسألة القانونية التي تحتاج مساعدة فيها؟",
        "booking.urgency": "ما مدى إلحاح قضيتك؟",
        "booking.normal": "عادي",
        "booking.urgent": "عاجل",
        "booking.emergency": "طارئ",
        "booking.fullName": "الاسم الكامل",
        "booking.email": "البريد الإلكتروني",
        "booking.phone": "الهاتف",
        "booking.caseDescription": "وصف موجز للمسألة",
        "booking.preferredDate": "التاريخ المفضل",
        "booking.timeSlots": "الأوقات المتاحة",
        "booking.summary": "ملخص الاستشارة",
        "booking.back": "رجوع",
        "booking.continue": "متابعة",
        "booking.confirm": "تأكيد الحجز",
        "booking.success": "تم جدولة الاستشارة",
        "booking.successDesc": "شكراً! استلمنا طلبك وسنتواصل معك خلال ٢٤ ساعة لتأكيد موعدك.",

        // ═══════════════════════════════════════════════════════════════════
        // LIVE CHAT
        // ═══════════════════════════════════════════════════════════════════
        "chat.greeting": "مرحباً! كيف يمكننا مساعدتك اليوم؟",
        "chat.response": "شكراً لتواصلك. سيراجع أحد المحامين استفسارك ويرد قريباً. للمساعدة الفورية، اتصل على (٢١٢) ٥٥٥-٠١٠٠.",
        "chat.placeholder": "اكتب رسالتك...",
        "chat.disclaimer": "جميع المحادثات سرية ومحمية بموجب امتياز المحامي-العميل.",
        "chat.online": "متصل الآن",

        // ═══════════════════════════════════════════════════════════════════
        // CALCULATOR
        // ═══════════════════════════════════════════════════════════════════
        "calc.title": "مُقدّر قيمة القضية",
        "calc.subtitle": "احصل على تقدير أولي لقيمة قضيتك المحتملة",
        "calc.caseType": "نوع القضية",
        "calc.injurySeverity": "شدة الإصابة",
        "calc.mild": "بسيطة",
        "calc.moderate": "متوسطة",
        "calc.severe": "شديدة",
        "calc.catastrophic": "كارثية",
        "calc.medicalExpenses": "النفقات الطبية ($)",
        "calc.lostWages": "الأجور المفقودة ($)",
        "calc.estimate": "النطاق المُقدّر",
        "calc.disclaimer": "هذا تقدير أولي فقط. قيم القضايا الفعلية تعتمد على عوامل عديدة. تواصل معنا لتقييم شامل.",

        // ═══════════════════════════════════════════════════════════════════
        // NOTIFICATIONS
        // ═══════════════════════════════════════════════════════════════════
        "notification.available": "محامٍ متاح الآن",
        "notification.availableDesc": "أحد المختصين متاح لاستشارة مجانية الآن.",
        "notification.newCase": "نصر حديث",
        "notification.newCaseDesc": "حققنا للتو حكماً مهماً لصالح موكلنا.",

        // ═══════════════════════════════════════════════════════════════════
        // ACCESSIBILITY
        // ═══════════════════════════════════════════════════════════════════
        "a11y.skipToContent": "انتقل للمحتوى الرئيسي",
        "a11y.openMenu": "فتح قائمة التنقل",
        "a11y.closeMenu": "إغلاق قائمة التنقل",
        "a11y.toggleDarkMode": "تبديل الوضع المظلم",
        "a11y.switchLanguage": "تغيير اللغة",

        // ═══════════════════════════════════════════════════════════════════
        // THEME
        // ═══════════════════════════════════════════════════════════════════
        "theme.light": "فاتح",
        "theme.dark": "داكن",
        "theme.system": "تلقائي",

        // ═══════════════════════════════════════════════════════════════════
        // LEGAL PAGES
        // ═══════════════════════════════════════════════════════════════════
        "legal.privacyTitle": "سياسة الخصوصية",
        "legal.termsTitle": "شروط الخدمة",
        "legal.disclaimerTitle": "إخلاء المسؤولية القانونية",
        "legal.lastUpdated": "آخر تحديث",
    },
} as const;

// Helper functions
export const isRTL = (lang: Language): boolean => lang === "ar";

export const languageNames: Record<Language, string> = {
    en: "English",
    ar: "العربية",
};

export const languageFlags: Record<Language, string> = {
    en: "🇺🇸",
    ar: "🇸🇦",
};