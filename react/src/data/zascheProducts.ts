
export interface ZascheProduct {
    id: string;
    title: string;
    heroImage: string;
    heroDescription: string;
    mainDescription: {
        title: string;
        paragraphs: string[];
        highlightBox: {
            title: string;
            content: string;
        };
    };
    gallery: {
        main: string;
        thumbnails: string[];
    };
    applicationExamples: {
        title: string;
        description: string;
        images: {
            id: number;
            src: string;
            title: string;
        }[];
    };
    features: {
        designVariations: string[];
        controlOptions: string[];
        benefits: string[];
    };
    technicalTable?: {
        headers: string[];
        rows: Record<string, string | number>[];
        footer?: string;
    };
    relatedProducts: {
        id: string;
        title: string;
        description: string;
    }[];
    subtitle?: string;
    specs?: {
        load?: string;
        lift?: string;
        reach?: string;
        torque?: string;
    };
    categoryId?: string;
    link?: string;
    seo?: {
        title: string;
        description: string;
        keywords: string[];
        schemaDescription: string;
    };
}

export const zascheProducts: ZascheProduct[] = [
    {
        id: "elektrikli-halatli-dengeleyici",
        title: "Elektrikli Halatlı Dengeleyiciler",
        subtitle: "Electric rope balancers",
        categoryId: "kaldirma",
        link: "/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler/elektrikli-halatli-dengeleyici",
        specs: { load: "100 kg", lift: "2000 mm" },
        seo: {
            title: "Zasche Elektrikli Halatlı Dengeleyici | Havasız Hassas Kaldırma",
            description: "Basınçlı hava gerektirmeyen Zasche elektrikli halatlı dengeleyiciler ile 100 kg'a kadar yükleri sessiz ve hassas taşıyın. Pnömatik altyapısı olmayan tesisler için ideal.",
            keywords: ["elektrikli halatlı dengeleyici", "rope balancer", "z-be", "havasız kaldırma", "endüstriyel manipülatör", "zasche türkiye"],
            schemaDescription: "Z-BE serisi, 100 kg kapasiteli ve 2000 mm stroklu elektrikli halatlı dengeleyicidir. Basınçlı hava gerektirmez, sessiz çalışır ve operatörün doğal el hareketleriyle yükü yönlendirmesini sağlayan sensör teknolojisine sahiptir."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Elektrikli+Halatli+Dengeleyiciler",
        heroDescription: "Basınçlı hava gerektirmeyen, yüksek hassasiyetli ve sessiz kaldırma çözümü.",
        mainDescription: {
            title: "Elektrikli Güç, <span class=\"text-primary\">Sezgisel Kontrol</span>",
            paragraphs: [
                "Elektrikli halatlı dengeleyicilerimiz, özellikle basınçlı hava hattının (pnömatik besleme) bulunmadığı üretim tesisleri için mükemmel bir kaldırma ekipmanıdır.",
                "Yükleri hassasiyetle konumlandırmak ve taşımak için tasarlanmıştır. En önemli özelliği sezgisel kullanımıdır; operatörler yükü parçalarla birleştirirken ek kontrol butonlarına ihtiyaç duymadan, doğal el hareketleriyle çalışabilirler."
            ],
            highlightBox: {
                title: "Havasız Ortamlar İçin İdeal",
                content: "Sadece elektrik enerjisi ile çalışması, hava kompresörü gürültüsünü ortadan kaldırır ve altyapı maliyetlerini düşürürken, pnömatik sistemlerin hassasiyetini sunar."
            }
        },
        gallery: {
            main: "/zasche_product_images/Electric_rope_balancers_main.png",
            thumbnails: [
                "/zasche_product_images/Electric_rope_balancers_main.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Elektrikli halatlı dengeleyicilerin endüstriyel sahadaki kullanım senaryoları.",
            images: [
                { id: 1, src: "/zasche_product_images/Electric_rope_balancers_urunadiu1.jpg", title: "Uygulama Örneği 1" },
                { id: 2, src: "/zasche_product_images/Electric_rope_balancers_urunadiu2.jpg", title: "Uygulama Örneği 2" }
            ]
        },
        features: {
            designVariations: [
                "Asma vinç veya ray sisteminde hareketli (Tavana monte)",
                "Mafsallı kol (pivot arm) üzerinde sabit"
            ],
            controlOptions: [
                "El kuvveti ile sürekli yukarı/aşağı kontrol",
                "Sezgisel el kuvveti algılama (Hand Force Detection)"
            ],
            benefits: [
                "Plug & play (Tak-Çalıştır) hazır sistem",
                "Yorulmadan çalışma için ergonomik D-Grip tutamak",
                "Güvenlik için sürekli yük izleme",
                "Kolay servis ve bakım imkanı",
                "PC bağlantısı ve parametre yazılımı dahil"
            ]
        },
        technicalTable: {
            headers: ["Temel Ünite", "Yük Kapasitesi [kg]", "Strok [mm]", "Kaldırma Hızı [m/dak]"],
            rows: [
                { unit: 'Z-BE', load: '100', stroke: 2000, speed: '0-42' }
            ]
        },
        relatedProducts: [
            { id: "pnomatik-halatli-dengeleyici", title: "Pnömatik Halatlı Dengeleyici", description: "Basınçlı hava ile çalışan hassas dengeleme." },
            { id: "mafsalli-kollar", title: "Mafsallı Kollar", description: "Geniş erişimli ve rijit kaldırma yardımcıları." },
            { id: "teleskopik-kaldirma", title: "Teleskopik Kaldırma", description: "Düşük tavanlı alanlar için kompakt çözümler." }
        ]
    },
    {
        id: "kaldirma-eksenleri",
        title: "Kaldırma Eksenleri",
        subtitle: "Lifting axes",
        categoryId: "manipulatorler",
        link: "/kategoriler/manipulatorler/manipulatorler/kaldirma-eksenleri",
        specs: { load: "1000 kg", lift: "1200 mm", torque: "2500 Nm" },
        seo: {
            title: "Zasche Kaldırma Eksenleri | 1000 kg Ağır Yük Manipülatörü",
            description: "Rijit ve merkez dışı (off-center) yüklemeler için Zasche kaldırma eksenleri. 1000 kg kapasite, 2500 Nm tork direnci ve hassas lineer hareket kabiliyeti.",
            keywords: ["kaldırma eksenleri", "lifting axes", "rijit manipülatör", "ağır yük taşıma", "z-lp", "off-center yükleme", "dikey hareket ekseni"],
            schemaDescription: "1000 kg'a kadar yükleri taşıyabilen Zasche kaldırma eksenleri, yüksek tork (2500 Nm) gerektiren eksantrik yüklemeler için tasarlanmıştır. Pnömatik tahrikli, sertleştirilmiş bilyalı kılavuzlu ve düşük bakım gerektiren endüstriyel kaldırma çözümüdür."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Kaldirma+Eksenleri",
        heroDescription: "Rijit ve merkez dışı yüklemeler için yüksek kapasiteli dikey hareket.",
        mainDescription: {
            title: "Ağır Yükler İçin <span class=\"text-primary\">Hassas Kontrol</span>",
            paragraphs: [
                "Kaldırma eksenlerimiz 1000 kg'a kadar yükleri kaldırabilir; rijit ve merkez dışı (off-center) yüklemeler için mükemmel bir çözümdür. İhtiyaç duyulduğunda zincirli vinçlerle de kombine edilebilir.",
                "Sertleştirilmiş ve taşlanmış bilyalı kılavuzlar ve düşük bakım gerektiren kızak sistemleri ile donatılmış olup, minimum kuvvetle pürüzsüz lineer strok hareketleri sağlar."
            ],
            highlightBox: {
                title: "Operatör Dostu",
                content: "Pnömatik tahrikli kaldırma eksenlerimiz sayesinde operatörler, yükleri güvenli, konforlu ve yüksek kontrol hassasiyetiyle taşıyabilir."
            }
        },
        gallery: {
            main: "/zasche_product_images/Lifting_axes_main.png",
            thumbnails: [
                "/zasche_product_images/Lifting_axes_main.png",
                "/zasche_product_images/Lifting_axes_1.png",
                "/zasche_product_images/Lifting_axes_2.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Kaldırma eksenlerinin endüstriyel sahadaki kullanım senaryoları.",
            images: [
                { id: 1, src: "/zasche_product_images/Lifting_axes_urunadiu1.png", title: "Uygulama Örneği 1" },
                { id: 2, src: "/zasche_product_images/Lifting_axes_urunadiu2.png", title: "Uygulama Örneği 2" },
                { id: 3, src: "/zasche_product_images/Lifting_axes_urunadiu3.png", title: "Uygulama Örneği 3" },
                { id: 4, src: "/zasche_product_images/Lifting_axes_urunadiu4.png", title: "Uygulama Örneği 4" }
            ]
        },
        features: {
            designVariations: [
                "Asma vinç veya raylı sistemde hareketli (Tavana monte)",
                "Ağır hizmet tipi pivot kol ile zemine monte"
            ],
            controlOptions: [
                "Tek, iki veya çoklu yük dengeleme",
                "Yüksüz dengeleme opsiyonlu yukarı/aşağı kontrol",
                "Sezgisel el kuvveti algılama",
                "Tutucu güvenlik bırakma gibi güvenlik özellikleri"
            ],
            benefits: [
                "Elektro-pnömatik frenler",
                "Bakım ünitesi",
                "Pozisyonlama taraması (Positioning scanning)",
                "Kaldırma kilidi",
                "X/Y ekseninde tahrik ünitesi (Travel drive)"
            ]
        },
        technicalTable: {
            headers: ["Temel Ünite", "Yük Kapasitesi [kg]", "Strok [mm]", "Dönme Aralığı [°]", "Yük Flanşı Torku [Nm]"],
            rows: [
                { unit: 'Z-LP-6', load: '160*', stroke: 1200, range: 330, torque: 600 },
                { unit: 'Z-LP/E-12', load: '300*', stroke: 1200, range: 330, torque: 1200 },
                { unit: 'Z-LP/E-25', load: '1000*', stroke: 1200, range: 330, torque: 2500 },
            ],
            footer: "*6 bar basınç ile. Özel tasarımlar talep üzerine mevcuttur."
        },
        relatedProducts: [
            { id: "mafsalli-kollar", title: "Mafsallı Kollar", description: "Ergonomik ve geniş erişimli kaldırma yardımcıları." },
            { id: "paralelogram-manipulatorler", title: "Paralelogram Manipülatörler", description: "Ağır yükler için rijit ve dengeli kaldırma." },
            { id: "teleskopik-kaldirma", title: "Teleskopik Kaldırma", description: "Düşük tavanlı alanlar için kompakt çözümler." }
        ]
    },
    {
        id: "mafsalli-kollar",
        title: "Mafsallı Kollar",
        subtitle: "Articulated arms",
        categoryId: "manipulatorler",
        link: "/kategoriler/manipulatorler/manipulatorler/mafsalli-kollar",
        specs: { load: "160 kg", lift: "2000 mm", reach: "4000 mm" },
        seo: {
            title: "Zasche Mafsallı Kollar | Geniş Erişimli Ergonomik Manipülatör",
            description: "4000 mm erişim yarıçapına sahip Zasche mafsallı kollar ile ergonomik taşıma. Sütun veya tavana monte seçenekleriyle montaj hatlarında maksimum verimlilik.",
            keywords: ["mafsallı kol", "articulated arm", "endüstriyel manipülatör kolu", "zasche z-kme", "ergonomik taşıma kolu", "pivot kol"],
            schemaDescription: "Zasche mafsallı kollar, 160 kg yük kapasitesi ve 4 metrelik erişim mesafesi sunar. Halatlı dengeleyicilerle entegre edilebilen, düşük sürtünmeli eklemleri sayesinde operatör yorgunluğunu azaltan ergonomik taşıma sistemidir."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Mafsalli+Kollar",
        heroDescription: "Ergonomik kaldırma yardımcıları, geniş erişim alanı.",
        mainDescription: {
            title: "Ergonomik <span class=\"text-primary\">Kaldırma Çözümü</span>",
            paragraphs: [
                "Makine operatörleri için ergonomik bir yardımcı olan mafsallı kollarımız, halatlı dengeleyicilerle donatılmış olup sütun, kolon veya tavana monte edilebilir. Bu sistemler, operatörün yükü minimum eforla taşımasını sağlar.",
                "Mafsallı kollar, özellikle geniş çalışma alanlarında ve tekrarlayan taşıma işlemlerinde büyük avantaj sağlar. Hafif yapısı ve kolay hareket kabiliyeti ile verimliliği artırır."
            ],
            highlightBox: {
                title: "Esnek Montaj Seçenekleri",
                content: "Sütun, kolon veya tavana monte edilebilen yapısı sayesinde, mevcut çalışma alanınıza en uygun şekilde entegre edilebilir."
            }
        },
        gallery: {
            main: "/zasche_product_images/Articulated_arms_main.png",
            thumbnails: [
                "/zasche_product_images/Articulated_arms_main.png",
                "/zasche_product_images/Articulated_arms_1.png",
                "/zasche_product_images/Articulated_arms_2.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Mafsallı kollarımızın farklı endüstriyel alanlardaki kullanım örnekleri.",
            images: [
                { id: 1, src: "/zasche_product_images/Articulated_arms_urunadiu1.png", title: "Uygulama Örneği 1" },
                { id: 2, src: "/zasche_product_images/Articulated_arms_urunadiu2.png", title: "Uygulama Örneği 2" },
                { id: 3, src: "/zasche_product_images/Articulated_arms_urunadiu3.png", title: "Uygulama Örneği 3" },
                { id: 4, src: "/zasche_product_images/Articulated_arms_urunadiu4.png", title: "Uygulama Örneği 4" },
                { id: 5, src: "/zasche_product_images/Articulated_arms_urunadiu5.png", title: "Uygulama Örneği 5" },
                { id: 6, src: "/zasche_product_images/Articulated_arms_urunadiu6.png", title: "Uygulama Örneği 6" },
                { id: 7, src: "/zasche_product_images/Articulated_arms_urunadiu7.png", title: "Uygulama Örneği 7" },
                { id: 8, src: "/zasche_product_images/Articulated_arms_urunadiu8.png", title: "Uygulama Örneği 8" }
            ]
        },
        features: {
            designVariations: [
                "Zemine monte",
                "Tavana monte sabit",
                "Asma vinç veya raylı sistemde hareketli"
            ],
            controlOptions: [
                "Tek, iki veya çoklu yük dengeleme",
                "Yüksüz dengeleme ile/olmadan yukarı/aşağı kontrol",
                "Sezgisel el kuvveti algılama",
                "Tutucu güvenlik bırakma gibi güvenlik fonksiyonları"
            ],
            benefits: [
                "Elektro-pnömatik frenler",
                "Bakım ünitesi",
                "Dönme açısı sensörü",
                "Mobil taban plakası",
                "Sütunda sonsuz dönüş"
            ]
        },
        technicalTable: {
            headers: ["Temel Ünite", "Yük Kapasitesi [kg]", "Çalışma Yarıçapı [mm]", "Kaldırma Hızı [m/dak]", "Dönme Aralığı [°]"],
            rows: [
                { unit: 'Z-KL', load: '80*', radius: 3200, speed: '0-60', range: 330 },
                { unit: 'Z-KMP', load: '80*', radius: 3800, speed: '0-60', range: 330 },
                { unit: 'Z-KC', load: '80*', radius: 4000, speed: '0-60', range: 330 },
                { unit: 'Z-KME', load: '80', radius: 4000, speed: '0- 42', range: 330 },
                { unit: 'Z-KME', load: '125', radius: 3500, speed: '0- 42', range: 330 },
                { unit: 'Z-KME', load: '160', radius: 3000, speed: '0- 42', range: 330 },
            ],
            footer: "*6 bar basınç ile. Özel tasarımlar talep üzerine mevcuttur."
        },
        relatedProducts: [
            { id: "pnomatik-halatli-dengeleyici", title: "Pnömatik Halatlı Dengeleyici", description: "Basınçlı hava ile çalışan hassas dengeleme." },
            { id: "kaldirma-eksenleri", title: "Kaldırma Eksenleri", description: "Dikey hareketler için hassas lineer eksenler." },
            { id: "paralelogram-manipulatorler", title: "Paralelogram Manipülatörler", description: "Ağır yükler için rijit ve dengeli kaldırma." }
        ]
    },
    {
        id: "elektrikli-halatli-vinc",
        title: "Z-RE Elektrikli Halatlı Dengeleyici",
        subtitle: "Electric ropehoist (Z-RE / Z-BE)",
        categoryId: "kaldirma",
        link: "/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler/elektrikli-halatli-vinc",
        specs: { load: "100 kg", lift: "2000 mm" },
        seo: {
            title: "Zasche Z-RE Elektrikli Halatlı Vinç | Yüksek Hızlı Pick & Place",
            description: "32 m/dk hızla çalışan Zasche Z-RE elektrikli halatlı dengeleyici. Al-bırak (pick & place) operasyonları için 230V tak-çalıştır özellikli hızlı kaldırma çözümü.",
            keywords: ["elektrikli halatlı vinç", "z-re", "hızlı manipülatör", "pick and place vinç", "230v vinç", "ergonomik kaldırma"],
            schemaDescription: "Z-RE serisi, hız ve ergonomiyi birleştiren elektrikli halatlı dengeleyicidir. 32 m/dk kaldırma hızı ile sınıfının en hızlısıdır. 230V besleme ile çalışır, hassas montaj için hızı 1 m/dk altına düşürülebilir."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Elektrikli+Halatli+Dengeleyici",
        heroDescription: "Hız ve ergonominin buluştuğu nokta: Yorulmadan, hızlı yük taşıma.",
        mainDescription: {
            title: "Hız ve Hassasiyetin <span class=\"text-primary\">Mükemmel Uyumu</span>",
            paragraphs: [
                "Tamamen elektrikli bu halatlı kaldırma cihazı ile yükleri minimum yorgunlukla ve maksimum hızla taşıyabilirsiniz. 32 m/dakikaya varan hızıyla sınıfının en hızlılarından biri olan Z-RE, kısa çevrim süreleri gerektiren \"al-bırak\" (pick & place) uygulamaları için idealdir.",
                "Yatay monte edilmiş ergonomik tutamak, yüksek veya alçak kaldırma pozisyonlarında bile yükün kolayca yönlendirilmesini sağlar. Hassas montaj işleri için hızı sezgisel olarak 1 m/dakikanın altına düşürülebilir."
            ],
            highlightBox: {
                title: "Plug & Play (Tak & Çalıştır)",
                content: "230V besleme voltajı sayesinde endüstriyel alanlarda kolayca devreye alınabilir. Sağlam tasarımı, zorlu endüstriyel kullanımlar için idealdir."
            }
        },
        gallery: {
            main: "/zasche_product_images/Electric_rope_balancers_main.png",
            thumbnails: [
                "/zasche_product_images/Electric_rope_balancers_main.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Z-RE Elektrikli Halatlı Dengeleyicinin endüstriyel sahadaki kullanım senaryoları.",
            images: []
        },
        features: {
            designVariations: [
                "Asma vinç veya ray sisteminde hareketli (Tavana monte)",
                "Mafsallı kol (pivot arm) üzerinde sabit",
                "Hafif vinç sistemlerinde klasik kullanım"
            ],
            controlOptions: [
                "El kuvveti ile sürekli yukarı/aşağı kontrol",
                "Sezgisel el kuvveti algılama (Intuitive hand force detection)",
                "D-Grip üzerinden elektronik kontrol"
            ],
            benefits: [
                "Plug & play hazır sistem (230V)",
                "Yorulmadan çalışma için ergonomik tutamak",
                "Güvenlik için sürekli yük izleme",
                "PC bağlantısı ve parametre yazılımı (CD) dahil"
            ]
        },
        technicalTable: {
            headers: ["Temel Ünite", "Yük Kapasitesi [kg]", "Strok [mm]", "Kaldırma Hızı [m/dak]"],
            rows: [
                { unit: 'Z-BE', load: '100', stroke: 2000, speed: '0-42' }
            ],
            footer: "*Genel olarak Z-RE serisi 60 kg ile 250 kg arasında 4 farklı ağırlık sınıfında mevcuttur."
        },
        relatedProducts: [
            { id: "mafsalli-kollar", title: "Mafsallı Kollar", description: "Ergonomik ve geniş erişimli kaldırma yardımcıları." },
            { id: "kaldirma-eksenleri", title: "Kaldırma Eksenleri", description: "Dikey hareketler için hassas lineer eksenler." },
            { id: "paralelogram-manipulatorler", title: "Paralelogram Manipülatörler", description: "Ağır yükler için rijit ve dengeli kaldırma." }
        ]
    },
    {
        id: "istifleme-vincleri",
        title: "İstifleme Vinçleri",
        subtitle: "Stacker crane",
        categoryId: "manipulatorler",
        link: "/kategoriler/manipulatorler/manipulatorler/istifleme-vincleri",
        specs: { load: "500 kg", lift: "3000 mm", torque: "2500 Nm" },
        seo: {
            title: "Zasche İstifleme Vinçleri | Dar Alanlar İçin Teleskopik İstifleme",
            description: "Normal erişimin ötesine geçen Zasche istifleme vinçleri ile 500 kg'a kadar yükleri güvenle istifleyin. Merkez dışı yükler ve zorlu depo alanları için özel çözüm.",
            keywords: ["istifleme vinci", "stacker crane", "teleskopik istifleme", "depo vinci", "z-se", "z-sp", "endüstriyel istifleme"],
            schemaDescription: "Zorlu ve merkez dışı noktalara erişim için tasarlanmış Zasche istifleme vinçleri. 3000 mm strok ve 500 kg kapasiteye sahiptir. Operatör kontrol ünitesi her yükseklikte erişilebilir konumdadır."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Istifleme+Vincleri",
        heroDescription: "Zorlu ve merkez dışı noktalara erişim için özel tasarım istifleme çözümleri.",
        mainDescription: {
            title: "Zorlu Alanlarda <span class=\"text-primary\">Maksimum Erişim</span>",
            paragraphs: [
                "Tavana asılı veya zemine monte sistemler olarak sunulan istifleme vinçlerimiz, merkez dışı (off-center) alma noktalarına ulaşmak ve operatörün normal erişim mesafesinin ötesindeki yüksekliklere (strok) erişmek için tasarlanmıştır.",
                "Alma ve istifleme pozisyonları arasındaki mesafe ne kadar uzun olursa olsun, kontrol ünitesi operatörün her zaman kolayca ulaşabileceği bir konumda kalır."
            ],
            highlightBox: {
                title: "Özel Tasarım Kapasite",
                content: "İstifleme vinçlerinin kaldırma kapasiteleri ve tork değerleri, uygulamanızın özel gereksinimlerine göre özel olarak tasarlanıp üretilebilir."
            }
        },
        gallery: {
            main: "/zasche_product_images/Stacker_cranes_main.png",
            thumbnails: [
                "/zasche_product_images/Stacker_cranes_main.png",
                "/zasche_product_images/Stacker_cranes_1.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "İstifleme vinçlerinin endüstriyel sahadaki kullanım senaryoları.",
            images: [
                { id: 1, src: "/zasche_product_images/Stacker_cranes_urunadiu1.png", title: "Uygulama Örneği 1" },
                { id: 2, src: "/zasche_product_images/Stacker_cranes_urunadiu2.png", title: "Uygulama Örneği 2" }
            ]
        },
        features: {
            designVariations: [
                "Asma vinç veya raylı sistemde hareketli (Tavana monte)",
                "Ağır hizmet tipi pivot kol ile zemine monte"
            ],
            controlOptions: [
                "Hassas yukarı/aşağı kontrol",
                "Tutucu güvenlik bırakma (safety release)"
            ],
            benefits: [
                "Pozisyonlama taraması (Positioning scanning)",
                "X/Y ekseninde tahrik ünitesi (Travel drive)",
                "Ergonomik kontrol ünitesi konumu"
            ]
        },
        technicalTable: {
            headers: ["Temel Ünite", "Yük Kapasitesi [kg]", "Strok [mm]", "Yük Flanşı Torku [Nm]"],
            rows: [
                { unit: 'Z-SP', load: '160', stroke: 2500, torque: 800 },
                { unit: 'Z-SE', load: '500', stroke: 3000, torque: 3000 },
            ],
            footer: "Özel tasarımlar talep üzerine mevcuttur."
        },
        relatedProducts: [
            { id: "teleskopik-kaldirma", title: "Teleskopik Kaldırma", description: "Düşük tavanlı alanlar için kompakt çözümler." },
            { id: "kaldirma-eksenleri", title: "Kaldırma Eksenleri", description: "Dikey hareketler için hassas lineer eksenler." },
            { id: "mafsalli-kollar", title: "Mafsallı Kollar", description: "Ergonomik ve geniş erişimli kaldırma yardımcıları." }
        ]
    },
    {
        id: "paralelogram-manipulatorler",
        title: "Paralelogram Manipülatörler",
        subtitle: "Parallelogram manipulators",
        categoryId: "manipulatorler",
        link: "/kategoriler/manipulatorler/manipulatorler/paralelogram-manipulatorler",
        specs: { load: "350 kg", lift: "1600 mm", reach: "3500 mm" },
        seo: {
            title: "Zasche Paralelogram Manipülatör | Burulmasız Rijit Taşıma",
            description: "Yerçekimsiz taşıma hissi veren Zasche paralelogram manipülatörler. Burulma kuvvetlerini (tork) sönümleyen yapısı ile otomotiv ve ağır sanayi için ideal.",
            keywords: ["paralelogram manipülatör", "endüstriyel manipülatör", "tork kolu", "rijit kaldırma", "zasche z-ap", "ağırlıksız taşıma"],
            schemaDescription: "Burulma kuvvetlerini dengeleyerek yükü sabitleyen pnömatik paralelogram manipülatör. 350 kg kapasite ve 3500 mm erişim mesafesi sunar. Parçanın dönmesi veya eğilmesi gereken montaj işlemleri için rijit yapıdadır."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Paralelogram+Manipulatorler",
        heroDescription: "Burulma kuvvetlerini dengeleyen, yüksek hassasiyetli kaldırma çözümleri.",
        mainDescription: {
            title: "Rijit ve <span class=\"text-primary\">Dengeli Kaldırma</span>",
            paragraphs: [
                "Pnömatik vinçler ile paralelogram mekanizmasının birleşimi olan manipülatörlerimiz, burulma (torsiyon) kuvvetlerini dengeleyerek yerçekimi etkisini minimize eden üstün bir çözüm sunar.",
                "Paralelogram manipülatörlerimiz standart olarak 3200 mm'ye kadar çalışma yarıçapı sunar, ancak proje gereksinimlerine göre bu ölçü özelleştirilebilir."
            ],
            highlightBox: {
                title: "Hafif ve Kompakt Tasarım",
                content: "Optimize edilmiş kesit yapısı ve düşük ölü ağırlığı sayesinde kompakt paralelogram manipülatörlerimiz, özellikle seri üretim ve hafif yük uygulamaları için idealdir."
            }
        },
        gallery: {
            main: "/zasche_product_images/Parallelogram_manipulators_main.png",
            thumbnails: [
                "/zasche_product_images/Parallelogram_manipulators_main.png",
                "/zasche_product_images/Parallelogram_manipulators_1.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Paralelogram manipülatörlerimizin endüstriyel sahadaki kullanım senaryoları.",
            images: [
                { id: 1, src: "/zasche_product_images/Parallelogram_manipulators_urunadiu1.png", title: "Uygulama Örneği 1" },
                { id: 2, src: "/zasche_product_images/Parallelogram_manipulators_urunadiu2.png", title: "Uygulama Örneği 2" },
                { id: 3, src: "/zasche_product_images/Parallelogram_manipulators_urunadiu3.png", title: "Uygulama Örneği 3" },
                { id: 4, src: "/zasche_product_images/Parallelogram_manipulators_urunadiu4.png", title: "Uygulama Örneği 4" }
            ]
        },
        features: {
            designVariations: [
                "Zemine monte (sütunlu)",
                "Tavana monte (sabit)",
                "Asma vinç veya raylı sistemde hareketli"
            ],
            controlOptions: [
                "Tek, iki veya çoklu yük dengeleme",
                "Yüksüz dengeleme opsiyonlu yukarı/aşağı kontrol",
                "Sezgisel el kuvveti algılama (Hand Force Detection)",
                "Tutucu güvenlik bırakma gibi gelişmiş güvenlik özellikleri"
            ],
            benefits: [
                "Elektro-pnömatik frenler",
                "Bakım ünitesi",
                "Dönme açısı sensörü",
                "Kaldırma kilidi (Lifting lock)",
                "Mobil taban plakası"
            ]
        },
        technicalTable: {
            headers: ["Temel Ünite", "Yük Kapasitesi [kg]", "Çalışma Yarıçapı [mm]", "Strok [mm]", "Dönme Aralığı [°]", "Yük Flanşı Torku [Nm]"],
            rows: [
                { unit: 'Z-AP-10', load: '120*', radius: 3200, stroke: 1700, range: 330, torque: 800 },
                { unit: 'Z-AP-20', load: '240*', radius: 3200, stroke: 1700, range: 330, torque: 1200 },
                { unit: 'Z-AP-50', load: '300*', radius: 3200, stroke: 1700, range: 330, torque: 1500 },
            ],
            footer: "*6 bar basınç ile. Özel tasarımlar talep üzerine mevcuttur."
        },
        relatedProducts: [
            { id: "mafsalli-kollar", title: "Mafsallı Kollar", description: "Ergonomik ve geniş erişimli kaldırma yardımcıları." },
            { id: "kaldirma-eksenleri", title: "Kaldırma Eksenleri", description: "Dikey hareketler için hassas lineer eksenler." },
            { id: "teleskopik-kaldirma", title: "Teleskopik Kaldırma", description: "Düşük tavanlı alanlar için kompakt çözümler." }
        ]
    },
    {
        id: "pnomatik-halatli-dengeleyici",
        title: "Pnömatik Halatlı Dengeleyiciler",
        subtitle: "Pneumatic rope balancers",
        categoryId: "kaldirma",
        link: "/kategoriler/manipulatorler/kaldirma-ekipmanlari-halatli-dengeleyiciler/pnomatik-halatli-dengeleyici",
        specs: { load: "100 kg", lift: "2000 mm" },
        seo: {
            title: "Zasche Pnömatik Halatlı Dengeleyici | Ağırlıksız Montaj",
            description: "Zasche pnömatik halatlı dengeleyiciler ile yükleri \"ağırlıksız\" hissedin. Hassas parça montajı için hava tahrikli, yumuşak ve güvenli konumlandırma.",
            keywords: ["pnömatik dengeleyici", "pneumatic balancer", "havalı balansör", "montaj manipülatörü", "z-bp", "hassas parça taşıma"],
            schemaDescription: "Basınçlı hava ile çalışan ve yükü havada asılı (floating) tutabilen Zasche pnömatik dengeleyici. 100 kg kapasiteye kadar hassas montaj ve birleştirme işlemleri için operatöre 'ağırlıksızlık' hissi verir."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Pnomatik+Halatli+Dengeleyiciler",
        heroDescription: "Hassas konumlandırma ve montaj işlemleri için esnek ve hızlı çözüm.",
        mainDescription: {
            title: "Montaj Hattında <span class=\"text-primary\">Maksimum Hassasiyet</span>",
            paragraphs: [
                "Pnömatik halatlı dengeleyicilerimiz, yüklerin büyük bir hassasiyetle konumlandırılması ve karmaşık birleştirme/montaj görevlerinin tamamlanması için idealdir.",
                "Sistem, yükü halat üzerinde askıya almak ve dengelemek için basınçlı hava kullanan halat tamburları ile donatılmıştır. Bu sayede operatörler, yükü sanki ağırlıksızmış gibi yüksek hassasiyetle hareket ettirebilir ve konumlandırabilir."
            ],
            highlightBox: {
                title: "Güvenli ve Kompakt",
                content: "Kontrol ünitesi ve sürücünün tek bir gövdede toplandığı kompakt tasarım, kabul edilemez kaldırma hızlarını önleyen entegre hız sınırlayıcı (speed limiter) ile maksimum güvenlik sağlar."
            }
        },
        gallery: {
            main: "/zasche_product_images/Pneumatic_rope_balancers_main.png",
            thumbnails: [
                "/zasche_product_images/Pneumatic_rope_balancers_main.png",
                "/zasche_product_images/Pneumatic_rope_balancers_1.png",
                "/zasche_product_images/Pneumatic_rope_balancers_2.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Pnömatik halatlı dengeleyicilerin endüstriyel sahadaki kullanım senaryoları.",
            images: [
                { id: 1, src: "/zasche_product_images/Pneumatic_rope_balancers_urunadiu1.png", title: "Uygulama Örneği 1" },
                { id: 2, src: "/zasche_product_images/Pneumatic_rope_balancers_urunadiu2.png", title: "Uygulama Örneği 2" },
                { id: 3, src: "/zasche_product_images/Pneumatic_rope_balancers_urunadiu3.png", title: "Uygulama Örneği 3" },
                { id: 4, src: "/zasche_product_images/Pneumatic_rope_balancers_urunadiu4.png", title: "Uygulama Örneği 4" },
                { id: 5, src: "/zasche_product_images/Pneumatic_rope_balancers_urunadiu5.png", title: "Uygulama Örneği 5" },
                { id: 6, src: "/zasche_product_images/Pneumatic_rope_balancers_urunadiu6.png", title: "Uygulama Örneği 6" },
                { id: 7, src: "/zasche_product_images/Pneumatic_rope_balancers_urunadiu7.png", title: "Uygulama Örneği 7" },
                { id: 8, src: "/zasche_product_images/Pneumatic_rope_balancers_urunadiu8.png", title: "Uygulama Örneği 8" }
            ]
        },
        features: {
            designVariations: [
                "Asma vinç veya ray sisteminde hareketli (Tavana monte)",
                "Pergel vinç veya pivot kol ile zemine monte"
            ],
            controlOptions: [
                "Tek, iki veya çoklu yük dengeleme kontrolü",
                "Yüksüz dengeleme opsiyonlu yukarı/aşağı kontrol",
                "Sezgisel el kuvveti algılama",
                "Tutucu güvenlik bırakma (safety release)"
            ],
            benefits: [
                "Yüklerin hassas ve pürüzsüz konumlandırılması",
                "Kısa çevrim süreleri ile hızlı transfer",
                "Sezgisel el ile yönlendirme",
                "Kompakt tasarım (kontrol ve sürücü tek gövdede)"
            ]
        },
        technicalTable: {
            headers: ["Temel Ünite", "Yük Kapasitesi [kg]", "Strok [mm]", "Kaldırma Hızı [m/dak]"],
            rows: [
                { unit: 'Z-BP', load: '100*', stroke: 2000, speed: '0-60' },
            ],
            footer: "*6 bar basınç ile."
        },
        relatedProducts: [
            { id: "z-re-elektrikli-halatli-dengeleyici", title: "Elektrikli Halatlı Dengeleyici", description: "Ergonomik ve elektrikli hızlı taşıma çözümü." },
            { id: "mafsalli-kollar", title: "Mafsallı Kollar", description: "Geniş erişimli ve rijit kaldırma yardımcıları." },
            { id: "kaldirma-eksenleri", title: "Kaldırma Eksenleri", description: "Dikey hareketler için hassas lineer eksenler." }
        ]
    },
    {
        id: "teleskopik-kaldirma",
        title: "Teleskopik Kaldırma Sistemleri",
        subtitle: "Telescopic lifting devices",
        categoryId: "manipulatorler",
        link: "/kategoriler/manipulatorler/manipulatorler/teleskopik-kaldirma",
        specs: { load: "1500 kg", lift: "2000 mm", torque: "5000 Nm" },
        seo: {
            title: "Zasche Teleskopik Kaldırma | Düşük Tavan (Low Headroom) Çözümü",
            description: "Tavan yüksekliği az olan tesisler için Zasche teleskopik kaldırma sistemleri. 1500 kg kapasite ve 5000 Nm tork dayanımı ile kompakt ve güçlü.",
            keywords: ["teleskopik kaldırma", "telescopic lifter", "düşük tavan vinci", "low headroom crane", "z-tr", "z-tv", "sanayi tipi teleskop"],
            schemaDescription: "Düşük tavanlı (low headroom) alanlar için geliştirilmiş, iç içe geçen teleskopik profillere sahip kaldırma sistemi. 1500 kg'a kadar yük kaldırabilir ve yüksek tork (5000 Nm) gerektiren işlemler için rijit yapı sunar."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Teleskopik+Kaldirma+Sistemleri",
        heroDescription: "Düşük tavanlı alanlar ve yüksek tork gereksinimleri için ideal çözüm.",
        mainDescription: {
            title: "Kompakt ve <span class=\"text-primary\">Güçlü Tasarım</span>",
            paragraphs: [
                "Teleskopik kaldırma cihazlarımız, içten veya dıştan çalışan zincirlere sahip elektrikli vinçler ile manevra kabiliyeti sağlar. 1500 kg'a kadar ağır yükleri ve 5000 Nm'ye kadar büyük torkları karşılamak için tasarlanmıştır.",
                "Özellikle düşük tavan yüksekliğine sahip alanlar (low headroom) için tek veya çift teleskopik seçenekleri mevcuttur. İhtiyaca göre kare kolonlu (TV serisi) veya yuvarlak kolonlu (TR serisi) olarak yapılandırılabilir."
            ],
            highlightBox: {
                title: "Esnek Entegrasyon",
                content: "Sistemlerimiz, bir ray sistemiyle entegre edilerek hareketli hale getirilebildiği gibi, Z-K2 ağır hizmet tipi pivot kol ile zemine sabitlenerek de kullanılabilir."
            }
        },
        gallery: {
            main: "/zasche_product_images/Telescopic_lifting_devices_main.png",
            thumbnails: [
                "/zasche_product_images/Telescopic_lifting_devices_main.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Teleskopik kaldırma sistemlerinin endüstriyel sahadaki kullanım senaryoları.",
            images: [
                { id: 1, src: "/zasche_product_images/Telescopic_lifting_devices_urunadiu1.png", title: "Uygulama Örneği 1" },
                { id: 2, src: "/zasche_product_images/Telescopic_lifting_devices_urunadiu2.png", title: "Uygulama Örneği 2" }
            ]
        },
        features: {
            designVariations: [
                "Asma vinç veya raylı sistemde hareketli (Tavana monte)",
                "Ağır hizmet tipi pivot kol ile zemine monte",
                "Kare (TV) veya Yuvarlak (TR) teleskop profili"
            ],
            controlOptions: [
                "Hassas yukarı/aşağı kontrol",
                "Tutucu güvenlik bırakma (safety release)",
                "Yük düşmesine karşı güvenlik özellikleri"
            ],
            benefits: [
                "Elektro-pnömatik frenler",
                "Konum tarama (Positioning scanning)",
                "X/Y ekseninde tahrik ünitesi (Travel drive)",
                "Kompakt yapı ile alandan tasarruf"
            ]
        },
        technicalTable: {
            headers: ["Temel Ünite", "Yük Kapasitesi [kg]", "Strok [mm]", "Yük Flanşı Torku [Nm]"],
            rows: [
                { unit: 'Z-TR (Yuvarlak)', load: '475', stroke: 1800, torque: 750 },
                { unit: 'Z-TV (Kare)', load: '1000', stroke: 2000, torque: 1500 },
            ],
            footer: "Özel tasarımlar talep üzerine mevcuttur."
        },
        relatedProducts: [
            { id: "mafsalli-kollar", title: "Mafsallı Kollar", description: "Ergonomik ve geniş erişimli kaldırma yardımcıları." },
            { id: "paralelogram-manipulatorler", title: "Paralelogram Manipülatörler", description: "Ağır yükler için rijit ve dengeli kaldırma." },
            { id: "kaldirma-eksenleri", title: "Kaldırma Eksenleri", description: "Dikey hareketler için hassas lineer eksenler." }
        ]
    },
    {
        id: "zemin-kilavuzlu-tasima",
        title: "Zeminde Hareketli Sistemler",
        subtitle: "Floor-guided handling devices",
        categoryId: "manipulatorler",
        link: "/kategoriler/manipulatorler/manipulatorler/zemin-kilavuzlu-tasima",
        specs: { load: "200 kg", lift: "800 mm", torque: "1500 Nm" },
        seo: {
            title: "Zasche Zeminde Hareketli Manipülatör | Seyyar & Bağımsız Vinç",
            description: "Tavana veya kolona montaj gerektirmeyen, zeminde özgürce hareket eden Zasche taşıma sistemleri. Akülü veya hidrolik seçeneklerle tam mobilite.",
            keywords: ["zeminde hareketli vinç", "mobil manipülatör", "seyyar vinç", "floor guided handling", "bağımsız taşıma sistemi"],
            schemaDescription: "Sabit bir yapıya montaj gerektirmeyen, zemin üzerinde serbestçe hareket ettirilebilen mobil manipülatör sistemi. Akülü, hidrolik veya pnömatik tahrik seçenekleriyle fabrika içinde istenilen noktada kullanılabilir."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Zeminde+Hareketli+Sistemler",
        heroDescription: "Sabitleme gerektirmeyen, yüksek kapasiteli mobil taşıma çözümleri.",
        mainDescription: {
            title: "Özgür ve <span class=\"text-primary\">Güçlü Hareket</span>",
            paragraphs: [
                "Zeminde hareketli taşıma cihazlarımız, devasa kaldırma kapasitelerine sahip özel mobil çözümlerdir. Bir taşıma sistemini zemine, tavana veya bir kolona sabitlemenin mümkün olmadığı veya uygun olmadığı durumlar için idealdir.",
                "Belirli montaj noktalarından bağımsız olarak çalışabilen bu sistemler; mekanik, elektrikli (örneğin akülü), hidrolik veya pnömatik olarak çalıştırılabilir. Esnek üretim alanları için mükemmel bir alternatiftir."
            ],
            highlightBox: {
                title: "Tam Bağımsızlık",
                content: "Herhangi bir yapıya monte edilmek zorunda olmayan bu cihazlar, tesis içinde ihtiyaç duyulan her noktaya kolayca taşınabilir ve anında kullanıma hazır hale gelir."
            }
        },
        gallery: {
            main: "/zasche_product_images/Floor-guided_handling_devices_main.png",
            thumbnails: [
                "/zasche_product_images/Floor-guided_handling_devices_main.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Zeminde hareketli sistemlerin endüstriyel sahadaki kullanım senaryoları.",
            images: [
                { id: 1, src: "/zasche_product_images/Floor-guided_handling_devices_urunadiu1.png", title: "Uygulama Örneği 1" },
                { id: 2, src: "/zasche_product_images/Floor-guided_handling_devices_urunadiu2.png", title: "Uygulama Örneği 2" },
                { id: 3, src: "/zasche_product_images/Floor-guided_handling_devices_urunadiu3.png", title: "Uygulama Örneği 3" },
                { id: 4, src: "/zasche_product_images/Floor-guided_handling_devices_urunadiu4.png", title: "Uygulama Örneği 4" }
            ]
        },
        features: {
            designVariations: [
                "Elektrikli, hidrolik ve pnömatik strok seçenekleri",
                "Müşteri gereksinimlerine göre özel tasarım",
                "Tutuculu veya tutucusuz (Without gripper) seçenekler"
            ],
            controlOptions: [
                "Buton ile kontrol",
                "Ayak pompası ile yukarı/aşağı kontrol"
            ],
            benefits: [
                "Entegre fren sistemi",
                "Tam mobilite ve bağımsız çalışma",
                "Yüksek kaldırma kapasitesi"
            ]
        },
        technicalTable: {
            headers: [],
            rows: [],
            footer: "Bu ürün grubu, tamamen müşterilerimizin tesis ve yük gereksinimlerine göre (load capacity, stroke, vb.) özel olarak tasarlanmaktadır. Detaylı teknik özellikler ve kapasite bilgileri için lütfen bizimle iletişime geçiniz."
        },
        relatedProducts: [
            { id: "mafsalli-kollar", title: "Mafsallı Kollar", description: "Ergonomik ve geniş erişimli kaldırma yardımcıları." },
            { id: "teleskopik-kaldirma", title: "Teleskopik Kaldırma", description: "Düşük tavanlı alanlar için kompakt çözümler." },
            { id: "istifleme-vincleri", title: "İstifleme Vinçleri", description: "Zorlu alanlarda maksimum erişim ve istifleme." }
        ]
    },
    {
        id: "celik-ustyapi-vinc-destek-yapisi",
        title: "Çelik Üstyapı / Vinç Destek Yapısı",
        subtitle: "Steel superstructure / crane supporting structure",
        categoryId: "asmavinc",
        link: "/kategoriler/manipulatorler/manipulatorler/celik-ustyapi-vinc-destek-yapisi",
        specs: {},
        seo: {
            title: "Zasche Çelik Vinç Konstrüksiyonu | Sertifikalı Destek Yapıları",
            description: "Zasche vinç sistemleriniz için özel statik hesaplamalı çelik üstyapı ve destek direkleri. Tesisinize uygun, sertifikalı kaynaklı profesyonel kurulum.",
            keywords: ["vinç çelik konstrüksiyon", "vinç direği", "crane superstructure", "vinç yolu", "çelik destek yapısı", "statik hesaplama"],
            schemaDescription: "Asma vinç ve manipülatör sistemlerinin kurulumu için gerekli olan, özel statik hesaplamalarla tasarlanmış çelik konstrüksiyon ve destek yapıları. Bağımsız (free-standing) veya binaya entegre çözümler."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Celik+Ustyapi",
        heroDescription: "Asma vinç sistemlerini çalıştırmak için özel çelik üstyapılar.",
        mainDescription: {
            title: "Özel Tasarım <span class=\"text-primary\">Çelik Yapılar</span>",
            paragraphs: [
                "Kendi uzman mühendislerimiz ve sertifikalı kaynak ekibimiz, asma vinç sistemlerini çalıştırmak için özel çelik üstyapılar tasarlayıp kurabilir.",
                "Mevcut bina yapısının vinç sistemlerini desteklemeye yetmediği veya bağımsız bir sistemin gerektiği durumlarda, projenize özel statik hesaplamalarla en uygun çelik konstrüksiyon çözümünü sunuyoruz."
            ],
            highlightBox: {
                title: "Uzman Mühendislik",
                content: "Projenize özel statik hesaplamalar ve sertifikalı üretim ile güvenli ve uzun ömürlü yapılar."
            }
        },
        gallery: {
            main: "/zasche_product_images/Steel_superstructure_crane_supporting_structure_main.png",
            thumbnails: [
                "/zasche_product_images/Steel_superstructure_crane_supporting_structure_main.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Çelik üstyapı çözümlerimizin endüstriyel sahadaki örnekleri.",
            images: []
        },
        features: {
            designVariations: [
                "Tavana asılı sistemler",
                "Bağımsız duran (Free-standing) sistemler",
                "Mevcut kolonlara entegre sistemler"
            ],
            controlOptions: [
                "Müşteri talebine göre özel çözümler"
            ],
            benefits: [
                "Sertifikalı kaynak işçiliği",
                "Özel statik hesaplama ve projelendirme",
                "Tam uyumlu montaj ve devreye alma"
            ]
        },
        technicalTable: {
            headers: [],
            rows: [],
            footer: "Bu yapılar tamamen projenize özel olarak (boyutlar, yük kapasiteleri, bina yapısı vb.) tasarlanmaktadır."
        },
        relatedProducts: [
            { id: "hafif-vinc-sistemleri", title: "Hafif Vinç Sistemleri", description: "Modüler ve esnek taşıma çözümleri." },
            { id: "asma-vinc-sistemleri", title: "Asma Vinç Sistemleri", description: "Esnek ve modüler tavan vinç çözümleri." }
        ]
    },
    {
        id: "hafif-vinc-sistemleri",
        title: "Hafif Vinç Sistemleri",
        subtitle: "Light crane systems",
        categoryId: "asmavinc",
        link: "/kategoriler/manipulatorler/manipulatorler/hafif-vinc-sistemleri",
        specs: {},
        seo: {
            title: "Zasche Hafif Vinç Sistemleri | Alüminyum & Çelik Profil Raylar",
            description: "Modüler Zasche hafif vinç sistemleri ile tesisinizi donatın. Düşük sürtünmeli alüminyum veya çelik profiller ile ergonomik ve esnek tavan vinçleri.",
            keywords: ["hafif vinç sistemi", "light crane system", "alüminyum vinç rayı", "modüler vinç", "tavan vinci", "monoray sistem"],
            schemaDescription: "2000 kg kapasiteye kadar yükler için alüminyum veya çelik profillerden oluşan modüler hafif vinç sistemi. Düşük sürtünme katsayısı sayesinde yükler manuel olarak çok az kuvvetle hareket ettirilebilir."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Hafif+Vinc+Sistemleri",
        heroDescription: "Modüler ve esnek taşıma çözümleri.",
        mainDescription: {
            title: "Esnek ve <span class=\"text-primary\">Modüler</span>",
            paragraphs: [
                "Gerektiğinde, tek veya çift kirişli hafif vinç sistemleri, manipülatörler ve kaldırma ekipmanları gibi bileşenlerimizle kombine edilebilir.",
                "Alüminyum veya çelik profillerden oluşan bu sistemler, düşük sürtünme katsayısı sayesinde yüklerin operatör tarafından minimum kuvvetle hareket ettirilmesini sağlar."
            ],
            highlightBox: {
                title: "Kolay Entegrasyon",
                content: "Mevcut sistemlere veya yeni projelere sorunsuz entegrasyon sağlayan modüler yapı."
            }
        },
        gallery: {
            main: "/zasche_product_images/Light_crane_systems_main.png",
            thumbnails: [
                "/zasche_product_images/Light_crane_systems_main.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Hafif vinç sistemlerinin kullanım alanları.",
            images: []
        },
        features: {
            designVariations: [
                "Tek kirişli sistemler",
                "Çift kirişli sistemler",
                "Monoray sistemler"
            ],
            controlOptions: [
                "Manuel hareket",
                "Elektrikli yürütme (opsiyonel)"
            ],
            benefits: [
                "Düşük sürtünme ve sessiz çalışma",
                "Modüler ve genişletilebilir yapı",
                "Kolay montaj"
            ]
        },
        technicalTable: {
            headers: ["Profil Tipi", "Maks. Yük [kg]", "Maks. Köprü Açıklığı [m]"],
            rows: [
                { type: 'Alüminyum', load: '125 - 2000', span: '8 - 12' },
                { type: 'Çelik', load: '125 - 2000', span: '8 - 12' }
            ],
            footer: "Değerler profil kesitine ve askı mesafelerine göre değişiklik gösterebilir."
        },
        relatedProducts: [
            { id: "celik-ustyapi-vinc-destek-yapisi", title: "Çelik Üstyapı", description: "Vinç sistemleri için destek yapıları." },
            { id: "elektrikli-halatli-vinc", title: "Elektrikli Halatlı Vinç", description: "Güçlü kaldırma üniteleri." }
        ]
    },
    {
        id: "pergel-vincler",
        title: "Pergel Vinçler",
        subtitle: "Slewing cranes",
        categoryId: "asmavinc",
        link: "/kategoriler/manipulatorler/manipulatorler/pergel-vincler",
        specs: {},
        seo: {
            title: "Zasche Endüstriyel Pergel Vinçler | Duvar ve Sütun Tipi",
            description: "360° dönme açısına sahip Zasche pergel vinçler ile iş istasyonlarında verimliliği artırın. Duvara veya zemine monte seçenekleriyle ekonomik taşıma.",
            keywords: ["pergel vinç", "slewing crane", "sütunlu vinç", "duvar tipi vinç", "pergel vinç fiyatları", "bölgesel vinç"],
            schemaDescription: "Belirli bir çalışma hücresinde 80 kg'dan 1000 kg'a kadar yükleri taşımak için kullanılan döner kollu vinç sistemi. 270° veya 360° dönme açısı seçenekleri ve manuel ya da elektrikli dönüş opsiyonları mevcuttur."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Pergel+Vincler",
        heroDescription: "Basit ve etkili bölgesel taşıma çözümü.",
        mainDescription: {
            title: "Bölgesel <span class=\"text-primary\">Taşıma</span>",
            paragraphs: [
                "Duvara veya zemine monte pergel vinçler, halat dengeleyiciler veya zincirli vinçlerle birleştirilerek basit taşıma operasyonlarını yönetebilir.",
                "Belirli bir iş istasyonunda veya makine besleme noktasında ergonomik ve ekonomik bir kaldırma çözümü sunar."
            ],
            highlightBox: {
                title: "Geniş Erişim",
                content: "270° veya 360° dönme açısı ile geniş bir çalışma alanını kapsar."
            }
        },
        gallery: {
            main: "/zasche_product_images/Slewing_cranes_main.jpg",
            thumbnails: [
                "/zasche_product_images/Slewing_cranes_main.jpg"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Pergel vinçlerin kullanım alanları.",
            images: []
        },
        features: {
            designVariations: [
                "Duvara monte pergel vinçler",
                "Zemine monte (Sütunlu) pergel vinçler",
                "Alüminyum veya çelik kol seçenekleri"
            ],
            controlOptions: [
                "Manuel dönüş",
                "Elektrikli dönüş (opsiyonel)"
            ],
            benefits: [
                "Ekonomik çözüm",
                "Kolay kurulum ve devreye alma",
                "Ergonomik kullanım"
            ]
        },
        technicalTable: {
            headers: ["Tip", "Yük Kapasitesi [kg]", "Kol Uzunluğu [m]", "Dönme Açısı"],
            rows: [
                { type: 'Duvar Tipi', load: '80 - 1000', arm: '2 - 7', angle: '180°' },
                { type: 'Sütun Tipi', load: '80 - 1000', arm: '2 - 7', angle: '270° / 360°' }
            ],
            footer: "Özel kapasite ve ölçüler için lütfen iletişime geçiniz."
        },
        relatedProducts: [
            { id: "elektrikli-halatli-vinc", title: "Elektrikli Halatlı Vinç", description: "Güçlü kaldırma üniteleri." },
            { id: "pnomatik-halatli-dengeleyici", title: "Pnömatik Halatlı Dengeleyici", description: "Hassas dengeleme." }
        ]
    },
    {
        id: "takim-tasima-panelleri",
        title: "Takım Taşıma / Takım Panelleri",
        subtitle: "Tool handling / tool panels",
        categoryId: "ozelcozumler",
        link: "/kategoriler/manipulatorler/ozel-ekipmanlar/takim-tasima-panelleri",
        specs: { load: "150 kg", lift: "4000 mm" },
        seo: {
            title: "Zasche Takım Taşıma Panelleri | Ergonomik Ekipman Organizasyonu",
            description: "Üretim hattındaki alet karmaşasına son. Zasche takım taşıma panelleri ve arabaları ile ekipmanlarınız düzenli, operatörleriniz verimli olsun.",
            keywords: ["takım taşıma paneli", "tool panel", "takım arabası", "5s ekipmanları", "ergonomik takım asıcı", "atölye düzeni"],
            schemaDescription: "Montaj hatlarında el aletlerinin düzenli ve ergonomik bir şekilde taşınmasını sağlayan raylı veya sabit paneller. Kablo karmaşasını önler, iş güvenliğini artırır ve 5S uygulamaları için idealdir."
        },
        heroImage: "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Takim+Tasima+Panelleri",
        heroDescription: "Ergonomik ve verimli çalışma alanları için takım organizasyon çözümleri.",
        mainDescription: {
            title: "Düzenli ve <span class=\"text-primary\">Verimli</span>",
            paragraphs: [
                "Ergonomik ve verimli bir çalışma alanı, takım stoğunuzu minimuma indirir. Takım panellerimizle ekipmanlar düzenli tutulur, takılma ve düşme riskleri azaltılır ve verim artar.",
                "Operatörlerin ihtiyaç duyduğu tüm el aletleri ve ekipmanlar, her zaman el altında ve kullanıma hazır durumda bulunur. Bu sayede iş akışı kesintiye uğramaz ve üretim hızı artar."
            ],
            highlightBox: {
                title: "İş Güvenliği ve Düzen",
                content: "Dağınık kabloları ve hortumları ortadan kaldırarak iş kazası riskini minimize eder, çalışma alanını daha güvenli hale getirir."
            }
        },
        gallery: {
            main: "/zasche_product_images/Tool_handling_tool_panels_main.png",
            thumbnails: [
                "/zasche_product_images/Tool_handling_tool_panels_main.png",
                "/zasche_product_images/Tool_handling_tool_panels_urunadiu1.png",
                "/zasche_product_images/Tool_handling_tool_panels_urunadiu2.png"
            ]
        },
        applicationExamples: {
            title: "Uygulama Örnekleri",
            description: "Takım taşıma sistemlerinin endüstriyel sahadaki kullanım senaryoları.",
            images: [
                { id: 1, src: "/zasche_product_images/Tool_handling_tool_panels_urunadiu1.png", title: "Uygulama Örneği 1" },
                { id: 2, src: "/zasche_product_images/Tool_handling_tool_panels_urunadiu2.png", title: "Uygulama Örneği 2" }
            ]
        },
        features: {
            designVariations: [
                "Raylı sistemlere entegre paneller",
                "Sabit duvar panelleri",
                "Mobil takım arabaları"
            ],
            controlOptions: [
                "Manuel hareket",
                "Yaylı dengeleyiciler ile entegrasyon"
            ],
            benefits: [
                "Minimum takım stoğu",
                "Azalan iş kazası riski",
                "Artan üretim verimliliği",
                "Ergonomik erişim"
            ]
        },
        technicalTable: {
            headers: ["Özellik", "Değer"],
            rows: [
                { feature: 'Maks. Yük Kapasitesi', value: '150 kg' },
                { feature: 'Maks. Kaldırma Yüksekliği', value: '4000 mm' },
                { feature: 'Hareket', value: 'Manuel / Raylı' }
            ],
            footer: "Özel ölçü ve kapasiteler için lütfen iletişime geçiniz."
        },
        relatedProducts: [
            { id: "hafif-vinc-sistemleri", title: "Hafif Vinç Sistemleri", description: "Modüler ve esnek taşıma çözümleri." },
            { id: "pnomatik-halatli-dengeleyici", title: "Pnömatik Halatlı Dengeleyici", description: "Hassas dengeleme." }
        ]
    }
];
