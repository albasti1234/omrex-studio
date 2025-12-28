// Classfood Restaurant Menu Data
// All prices in AED

export interface MenuItem {
    id: string;
    nameEn: string;
    nameAr: string;
    price: number;
    category: string;
    descEn?: string;
    descAr?: string;
    spicy?: boolean;
    veg?: boolean;
    sweet?: boolean;
    drink?: boolean;
    popular?: boolean;
    image?: string;
}

export interface Category {
    id: string;
    nameEn: string;
    nameAr: string;
}

export const categories: Category[] = [
    { id: 'mojito', nameEn: 'Mojito', nameAr: 'موهيتو' },
    { id: 'chaat', nameEn: 'Chaat', nameAr: 'شات' },
    { id: 'drinks', nameEn: 'Drinks', nameAr: 'مشروبات' },
    { id: 'burger', nameEn: 'Burger', nameAr: 'برجر' },
    { id: 'pasta', nameEn: 'Pasta', nameAr: 'باستا' },
    { id: 'salad', nameEn: 'Salad', nameAr: 'سلطات' },
    { id: 'dosa', nameEn: 'Dosa', nameAr: 'دوسا' },
    { id: 'biriyani', nameEn: 'Biriyani', nameAr: 'برياني' },
    { id: 'crepe', nameEn: 'Crepe', nameAr: 'كريب' },
    { id: 'desserts', nameEn: 'Desserts', nameAr: 'حلويات' },
    { id: 'juice', nameEn: 'Juice', nameAr: 'عصائر' },
    { id: 'curry', nameEn: 'Curry', nameAr: 'كاري' },
];

export const menuItems: MenuItem[] = [
    // Mojito
    { id: 'm1', nameEn: 'Lemon Mojito', nameAr: 'موهيتو ليمون', price: 13, category: 'mojito', drink: true, popular: true, descEn: 'Refreshing lemon mojito', descAr: 'موهيتو ليمون منعش' },
    { id: 'm2', nameEn: 'Blue Rush', nameAr: 'بلو راش', price: 18, category: 'mojito', drink: true, descEn: 'Blue curacao mojito', descAr: 'موهيتو بلو كوراكاو' },
    { id: 'm3', nameEn: 'Passion Fruit Mojito', nameAr: 'موهيتو باشن فروت', price: 19, category: 'mojito', drink: true, descEn: 'Tropical passion fruit', descAr: 'موهيتو استوائي' },

    // Chaat
    { id: 'c1', nameEn: 'Papdi Chaat', nameAr: 'بابدي شات', price: 18, category: 'chaat', veg: true, popular: true, descEn: 'Crispy papdi with chutneys', descAr: 'بابدي مقرمش مع الصلصات' },
    { id: 'c2', nameEn: 'Dahi Puri', nameAr: 'داهي بوري', price: 19, category: 'chaat', veg: true, descEn: 'Puri with yogurt', descAr: 'بوري مع الزبادي' },
    { id: 'c3', nameEn: 'Bhel Puri', nameAr: 'بهيل بوري', price: 16, category: 'chaat', veg: true, descEn: 'Puffed rice snack', descAr: 'سناك الأرز المنفوخ' },
    { id: 'c4', nameEn: 'Samosa Chaat', nameAr: 'سمبوسة شات', price: 16, category: 'chaat', veg: true, descEn: 'Crushed samosa with toppings', descAr: 'سمبوسة مكسرة مع التوابل' },
    { id: 'c5', nameEn: 'Pani Puri', nameAr: 'باني بوري', price: 16, category: 'chaat', veg: true, popular: true, descEn: '6 pieces with flavored water', descAr: '6 قطع مع الماء المنكه' },
    { id: 'c6', nameEn: 'Raj Kachori', nameAr: 'راج كاشوري', price: 19, category: 'chaat', veg: true, descEn: 'Large stuffed kachori', descAr: 'كاشوري محشي كبير' },

    // Drinks
    { id: 'd1', nameEn: 'Cola Light', nameAr: 'كولا لايت', price: 6.5, category: 'drinks', drink: true, descEn: 'Diet cola', descAr: 'كولا دايت' },
    { id: 'd2', nameEn: 'Coca Cola', nameAr: 'كوكا كولا', price: 6.5, category: 'drinks', drink: true, descEn: 'Classic cola', descAr: 'كولا كلاسيك' },
    { id: 'd3', nameEn: 'Water Small', nameAr: 'مياه صغير', price: 3, category: 'drinks', drink: true, descEn: 'Bottled water', descAr: 'مياه معبأة' },

    // Burger
    { id: 'b1', nameEn: 'Nashville Hot Chicken', nameAr: 'ناشفيل هوت تشيكن', price: 29, category: 'burger', spicy: true, popular: true, descEn: 'Spicy Nashville style', descAr: 'دجاج حار ناشفيل' },
    { id: 'b2', nameEn: 'Zinger Chicken', nameAr: 'زنجر تشيكن', price: 24, category: 'burger', spicy: true, descEn: 'Crispy zinger burger', descAr: 'برجر زنجر مقرمش' },
    { id: 'b3', nameEn: 'Mal Mal Mathafi', nameAr: 'مال مال مطافي', price: 29, category: 'burger', descEn: 'Special house burger', descAr: 'برجر البيت المميز' },
    { id: 'b4', nameEn: 'Beef Burger', nameAr: 'برجر لحم', price: 22, category: 'burger', descEn: 'Classic beef patty', descAr: 'برجر لحم كلاسيكي' },

    // Pasta
    { id: 'p1', nameEn: 'Red Sauce Pasta', nameAr: 'باستا صلصة حمراء', price: 34, category: 'pasta', veg: true, descEn: 'Marinara sauce pasta', descAr: 'باستا بصلصة الطماطم' },
    { id: 'p2', nameEn: 'Mixed Sauce Pasta', nameAr: 'باستا صلصة مكس', price: 32, category: 'pasta', descEn: 'Pink sauce pasta', descAr: 'باستا بالصلصة الوردية' },
    { id: 'p3', nameEn: 'Negresco Pasta', nameAr: 'باستا نيجريسكو', price: 49, category: 'pasta', popular: true, descEn: 'Premium creamy pasta', descAr: 'باستا كريمية فاخرة' },
    { id: 'p4', nameEn: 'White Sauce Pasta', nameAr: 'باستا صلصة بيضاء', price: 29, category: 'pasta', veg: true, descEn: 'Creamy alfredo', descAr: 'باستا ألفريدو كريمية' },

    // Salad
    { id: 's1', nameEn: 'Fattoush', nameAr: 'فتوش', price: 20, category: 'salad', veg: true, descEn: 'Classic Arabic salad', descAr: 'سلطة عربية كلاسيكية' },
    { id: 's2', nameEn: 'Green Salad', nameAr: 'سلطة خضراء', price: 16, category: 'salad', veg: true, descEn: 'Fresh mixed greens', descAr: 'خضار طازجة مشكلة' },

    // Dosa
    { id: 'do1', nameEn: 'Ghee Roast', nameAr: 'غي روست', price: 15, category: 'dosa', veg: true, descEn: 'Crispy ghee dosa', descAr: 'دوسا بالسمن المقرمش' },
    { id: 'do2', nameEn: 'Masala Dosa', nameAr: 'مسالا دوسا', price: 16, category: 'dosa', veg: true, popular: true, descEn: 'With potato filling', descAr: 'مع حشوة البطاطس' },
    { id: 'do3', nameEn: 'Mysore Sada Dosa', nameAr: 'ميسور سادا دوسا', price: 16, category: 'dosa', veg: true, spicy: true, descEn: 'Spicy Mysore style', descAr: 'طريقة ميسور الحارة' },
    { id: 'do4', nameEn: 'Sada Dosa', nameAr: 'سادا دوسا', price: 12, category: 'dosa', veg: true, descEn: 'Plain crispy dosa', descAr: 'دوسا سادة مقرمشة' },
    { id: 'do5', nameEn: 'Mysore Masala Dosa', nameAr: 'ميسور مسالا دوسا', price: 19, category: 'dosa', veg: true, spicy: true, descEn: 'Spicy with potato', descAr: 'حارة مع البطاطس' },
    { id: 'do6', nameEn: 'Thattu Dosa', nameAr: 'تاتو دوسا', price: 12, category: 'dosa', veg: true, descEn: 'Small thick dosa', descAr: 'دوسا صغيرة سميكة' },
    { id: 'do7', nameEn: 'Nutella Dosa', nameAr: 'نوتيلا دوسا', price: 19, category: 'dosa', veg: true, sweet: true, descEn: 'Sweet Nutella filled', descAr: 'محشوة بالنوتيلا' },
    { id: 'do8', nameEn: 'Cheese Masala Dosa', nameAr: 'تشيز مسالا دوسا', price: 22, category: 'dosa', veg: true, descEn: 'Cheese and potato', descAr: 'جبنة وبطاطس' },
    { id: 'do9', nameEn: 'Cheese Dosa', nameAr: 'تشيز دوسا', price: 12, category: 'dosa', veg: true, descEn: 'Cheese topped', descAr: 'مغطاة بالجبنة' },
    { id: 'do10', nameEn: 'Onion Uthappam', nameAr: 'أنيون أوتابام', price: 12, category: 'dosa', veg: true, descEn: 'Thick pancake with onion', descAr: 'بان كيك سميك بالبصل' },

    // Biriyani
    { id: 'bi1', nameEn: 'Grilled Chicken Biriyani', nameAr: 'برياني دجاج مشوي', price: 30, category: 'biriyani', popular: true, descEn: 'With grilled chicken', descAr: 'مع دجاج مشوي' },
    { id: 'bi2', nameEn: 'Hyderabadi Chicken Biriyani', nameAr: 'برياني دجاج حيدر آبادي', price: 22, category: 'biriyani', spicy: true, descEn: 'Authentic Hyderabadi', descAr: 'حيدر آبادي أصلي' },
    { id: 'bi3', nameEn: 'Mutton Biriyani', nameAr: 'برياني لحم غنم', price: 34, category: 'biriyani', descEn: 'Tender mutton pieces', descAr: 'قطع لحم غنم طرية' },
    { id: 'bi4', nameEn: 'Chicken 65 Biriyani', nameAr: 'برياني تشيكن 65', price: 29, category: 'biriyani', spicy: true, descEn: 'With spicy chicken 65', descAr: 'مع دجاج 65 الحار' },
    { id: 'bi5', nameEn: 'Prawns Biriyani', nameAr: 'برياني روبيان', price: 46, category: 'biriyani', descEn: 'Premium prawns', descAr: 'روبيان فاخر' },
    { id: 'bi6', nameEn: 'Biriyani Rice', nameAr: 'رز برياني', price: 14, category: 'biriyani', veg: true, descEn: 'Plain biriyani rice', descAr: 'رز برياني سادة' },

    // Crepe
    { id: 'cr1', nameEn: 'Cheese And Fries', nameAr: 'كريب جبنة وبطاطس', price: 20, category: 'crepe', veg: true, descEn: 'Cheesy with fries', descAr: 'بالجبنة والبطاطس' },
    { id: 'cr2', nameEn: 'Chicken Shawarma', nameAr: 'كريب شاورما دجاج', price: 18, category: 'crepe', popular: true, descEn: 'Shawarma filled', descAr: 'محشو بالشاورما' },
    { id: 'cr3', nameEn: 'Hotdog Crepe', nameAr: 'كريب هوت دوج', price: 19, category: 'crepe', descEn: 'With sausage', descAr: 'مع السجق' },
    { id: 'cr4', nameEn: 'Chicken Zinger', nameAr: 'كريب زنجر', price: 20, category: 'crepe', spicy: true, descEn: 'Crispy chicken', descAr: 'دجاج مقرمش' },
    { id: 'cr5', nameEn: 'Strips And Sausage', nameAr: 'كريب ستربس وسجق', price: 26, category: 'crepe', descEn: 'Loaded crepe', descAr: 'كريب محمل' },

    // Desserts
    { id: 'de1', nameEn: 'Nutella Kunafa', nameAr: 'كنافة نوتيلا', price: 28, category: 'desserts', sweet: true, popular: true, descEn: 'Crispy kunafa with Nutella', descAr: 'كنافة مقرمشة بالنوتيلا' },
    { id: 'de2', nameEn: 'Ferrero Crepe', nameAr: 'كريب فيريرو', price: 34, category: 'desserts', sweet: true, descEn: 'With Ferrero Rocher', descAr: 'مع فيريرو روشيه' },
    { id: 'de3', nameEn: 'Nutella Mini Pancake', nameAr: 'ميني بان كيك نوتيلا', price: 29, category: 'desserts', sweet: true, descEn: 'Bite-sized pancakes', descAr: 'بان كيك صغيرة' },
    { id: 'de4', nameEn: 'Pistachio Mini Pancake', nameAr: 'ميني بان كيك فستق', price: 34, category: 'desserts', sweet: true, descEn: 'With pistachio cream', descAr: 'مع كريمة الفستق' },
    { id: 'de5', nameEn: 'White Choco Mini Pancake', nameAr: 'ميني بان كيك شوكو أبيض', price: 29, category: 'desserts', sweet: true, descEn: 'White chocolate drizzle', descAr: 'مع الشوكولاتة البيضاء' },
    { id: 'de6', nameEn: 'Very Berry Strawberry', nameAr: 'فيري بيري ستروبيري', price: 28, category: 'desserts', sweet: true, descEn: 'Strawberry delight', descAr: 'حلوى الفراولة' },
    { id: 'de7', nameEn: 'Cheese Kunafa', nameAr: 'كنافة جبنة', price: 25, category: 'desserts', sweet: true, descEn: 'Classic cheese kunafa', descAr: 'كنافة جبنة كلاسيكية' },
    { id: 'de8', nameEn: 'Oreo Crunch', nameAr: 'أوريو كرانش', price: 28, category: 'desserts', sweet: true, descEn: 'Crunchy Oreo dessert', descAr: 'حلوى أوريو مقرمشة' },
    { id: 'de9', nameEn: 'Lotus Mini Pancake', nameAr: 'ميني بان كيك لوتس', price: 29, category: 'desserts', sweet: true, descEn: 'With Lotus spread', descAr: 'مع كريمة اللوتس' },
    { id: 'de10', nameEn: 'Pistachio Dessert', nameAr: 'حلوى الفستق', price: 24, category: 'desserts', sweet: true, descEn: 'Pistachio cream cup', descAr: 'كوب كريمة الفستق' },

    // Juice
    { id: 'j1', nameEn: 'Thabakath Juice', nameAr: 'عصير طبقات', price: 19, category: 'juice', drink: true, descEn: 'Layered fruit juice', descAr: 'عصير فواكه طبقات' },
    { id: 'j2', nameEn: 'Oreo Milkshake', nameAr: 'ميلك شيك أوريو', price: 24, category: 'juice', drink: true, sweet: true, popular: true, descEn: 'Creamy Oreo shake', descAr: 'شيك أوريو كريمي' },
    { id: 'j3', nameEn: 'Lemon Mint Juice', nameAr: 'عصير ليمون نعناع', price: 14, category: 'juice', drink: true, descEn: 'Refreshing lemonade', descAr: 'ليموناضة منعشة' },

    // Curry
    { id: 'cu1', nameEn: 'Butter Chicken', nameAr: 'باتر تشيكن', price: 36, category: 'curry', popular: true, descEn: 'Creamy tomato curry', descAr: 'كاري كريمي بالطماطم' },
    { id: 'cu2', nameEn: 'Dal Tadka', nameAr: 'دال تادكا', price: 14, category: 'curry', veg: true, descEn: 'Yellow lentil curry', descAr: 'كاري العدس الأصفر' },
    { id: 'cu3', nameEn: 'Hyderabadi Chicken Curry', nameAr: 'كاري دجاج حيدر آبادي', price: 34, category: 'curry', spicy: true, descEn: 'Spicy Hyderabadi style', descAr: 'طريقة حيدر آباد الحارة' },
    { id: 'cu4', nameEn: 'Chicken Tikka Masala', nameAr: 'تشيكن تكا مسالا', price: 36, category: 'curry', spicy: true, descEn: 'Classic tikka masala', descAr: 'تكا مسالا كلاسيكي' },
];

// Get top picks (popular items)
export const getTopPicks = () => menuItems.filter(item => item.popular);

// Get items by category
export const getByCategory = (categoryId: string) => menuItems.filter(item => item.category === categoryId);

// Filter items
export const filterItems = (items: MenuItem[], filters: {
    under20?: boolean;
    spicy?: boolean;
    veg?: boolean;
    sweet?: boolean;
    drink?: boolean;
    search?: string;
}) => {
    return items.filter(item => {
        if (filters.under20 && item.price >= 20) return false;
        if (filters.spicy && !item.spicy) return false;
        if (filters.veg && !item.veg) return false;
        if (filters.sweet && !item.sweet) return false;
        if (filters.drink && !item.drink) return false;
        if (filters.search) {
            const query = filters.search.toLowerCase();
            return item.nameEn.toLowerCase().includes(query) || item.nameAr.includes(query);
        }
        return true;
    });
};
