// 1. إخفاء شاشة الترحيب بشكل سينمائي بعد 2.2 ثانية
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const intro = document.getElementById('intro-screen');
        intro.style.transform = 'translateY(-100%)';
    }, 2200);
});

// 2. نظام التبديل الكامل والترجمة الفورية بين اللغتين
let currentLang = 'ar';

function toggleLanguage() {
    const htmlTag = document.documentElement;
    const langBtn = document.getElementById('lang-toggle');
    
    if (currentLang === 'ar') {
        htmlTag.setAttribute('lang', 'en');
        htmlTag.setAttribute('dir', 'ltr');
        langBtn.innerText = 'AR';
        currentLang = 'en';
    } else {
        htmlTag.setAttribute('lang', 'ar');
        htmlTag.setAttribute('dir', 'rtl');
        langBtn.innerText = 'EN';
        currentLang = 'ar';
    }

    // ترجمة كافة العناصر التي تمتلك سمات النصوص المزدوجة
    const translatableElements = document.querySelectorAll('[data-lang-ar]');
    translatableElements.forEach(elem => {
        if (currentLang === 'ar') {
            elem.innerText = elem.getAttribute('data-lang-ar');
        } else {
            elem.innerText = elem.getAttribute('data-lang-en');
        }
    });

    // تحديث تلميحات خانة إدخال العقار المختار حسب اللغة الحالية
    const propInput = document.getElementById('selected-property');
    if (!propInput.value) {
        if (currentLang === 'ar') {
            propInput.placeholder = "اضغط على زر (حجز / تفاصيل) من الأعلى أو اكتب هنا";
        } else {
            propInput.placeholder = "Click (Book / Details) above or type here";
        }
    }
}

// 3. دالة تحديد وملء اسم العقار في الاستمارة تلقائياً عند الضغط عليه
function selectProperty(nameAr, nameEn) {
    const propInput = document.getElementById('selected-property');
    if (currentLang === 'ar') {
        propInput.value = nameAr;
    } else {
        propInput.value = nameEn;
    }
    // الانتقال التلقائي السلس إلى قسم الاستمارة لملء باقي البيانات
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// 4. دالة معالجة الاستمارة وإرسال الطلب الرسمي مباشرة إلى حساب الواتساب
function sendToWhatsApp(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    
    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;
    const property = document.getElementById('selected-property').value || "استشارة عقارية عامة";
    const payment = document.getElementById('payment-method').value;
    
    // رقم الواتساب للشركة (تستطيع استبداله برقم حقيقي يبدأ برمز الدولة مثل 964)
    const companyWhatsAppNumber = "9647700000000"; 
    
    // صياغة نص الرسالة الاحترافية المُرتبة
    const message = `مرحباً ألفا العقارية، لدي طلب حجز ومعاينة من الموقع الإلكتروني:%0A%0A` +
                    `👤 *اسم الزبون:* ${name}%0A` +
                    `📞 *رقم الهاتف:* ${phone}%0A` +
                    `🏢 *العقار المطلوب:* ${property}%0A` +
                    `💳 *طريقة الدفع المفضلـة:* ${payment}`;
                    
    // فتح رابط الواتساب الرسمي لإرسال الطلب فوراً
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${companyWhatsAppNumber}&text=${message}`;
    window.open(whatsappUrl, '_blank');
}
