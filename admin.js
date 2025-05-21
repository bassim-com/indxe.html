// CANDLES IL RAJAA - وظائف المصادقة والربط البرمجي للوحة التحكم

// متغيرات عامة
let isLoggedIn = false;
let currentUser = null;
let darkMode = localStorage.getItem('darkMode') === 'true';

// بيانات تجريبية للمستخدمين
const users = [
    {
        username: 'admin',
        password: 'admin123',
        name: 'مدير النظام',
        email: 'admin@candlesilrajaa.com',
        role: 'admin'
    }
];

// بيانات تجريبية للمنتجات
let products = [
    {
        id: 1,
        name: 'شمعة العناق الوردية',
        code: 'HUG-PINK-001',
        price: 45,
        description: 'شمعة فنية على شكل عناق بلون وردي جميل',
        image: '../candles_website/images/Photoroom_20250505_030731.jpeg',
        stock: 15,
        min_stock: 5,
        status: 'متوفر'
    },
    {
        id: 2,
        name: 'باقة الشموع البيضاء',
        code: 'BOUQ-WHITE-001',
        price: 100,
        description: 'باقة من الشموع البيضاء الأنيقة',
        image: '../candles_website/images/bouquet.jpeg',
        stock: 8,
        min_stock: 5,
        status: 'متوفر'
    },
    {
        id: 3,
        name: 'شمعة العناق البيضاء',
        code: 'HUG-WHITE-001',
        price: 35,
        description: 'شمعة فنية على شكل عناق بلون أبيض ناعم',
        image: '../candles_website/images/Photoroom_20250505_030306.jpeg',
        stock: 20,
        min_stock: 5,
        status: 'متوفر'
    },
    {
        id: 4,
        name: 'شمعة متموجة',
        code: 'WAVE-001',
        price: 30,
        description: 'شمعة بتصميم متموج عصري',
        image: '../candles_website/images/IMG_1519.jpeg',
        stock: 12,
        min_stock: 5,
        status: 'متوفر'
    },
    {
        id: 5,
        name: 'شمعة نجمة البحر',
        code: 'STAR-001',
        price: 55,
        description: 'شمعة على شكل نجمة البحر بتصميم مميز',
        image: '../candles_website/images/IMG_1523.jpeg',
        stock: 5,
        min_stock: 5,
        status: 'منخفض'
    },
    {
        id: 6,
        name: 'شمعة الفقعات الوردية',
        code: 'BUBBLE-PINK-001',
        price: 30,
        description: 'شمعة بتصميم فقاعات وردية جذابة',
        image: '../candles_website/images/IMG_1517.jpeg',
        stock: 0,
        min_stock: 5,
        status: 'غير متوفر'
    }
];

// بيانات تجريبية للطلبات
let orders = [
    {
        id: 1001,
        customer: {
            name: 'محمد أحمد',
            phone: '+966 50 123 4567',
            email: 'mohammed@example.com',
            address: 'الرياض، حي النزهة، شارع الأمير سلطان',
            city: 'الرياض',
            country: 'المملكة العربية السعودية'
        },
        items: [
            { product_id: 1, name: 'شمعة العناق الوردية', price: 45, quantity: 1 },
            { product_id: 4, name: 'شمعة متموجة', price: 30, quantity: 2 }
        ],
        subtotal: 105,
        shipping: 40,
        total: 145,
        status: 'قيد الانتظار',
        date: '20 مايو 2025'
    },
    {
        id: 1002,
        customer: {
            name: 'سارة خالد',
            phone: '+966 55 987 6543',
            email: 'sarah@example.com',
            address: 'جدة، حي الروضة، شارع فلسطين',
            city: 'جدة',
            country: 'المملكة العربية السعودية'
        },
        items: [
            { product_id: 2, name: 'باقة الشموع البيضاء', price: 100, quantity: 1 },
            { product_id: 3, name: 'شمعة العناق البيضاء', price: 35, quantity: 1 }
        ],
        subtotal: 135,
        shipping: 40,
        total: 175,
        status: 'قيد المعالجة',
        date: '19 مايو 2025'
    },
    {
        id: 1003,
        customer: {
            name: 'فهد عبدالله',
            phone: '+966 54 111 2222',
            email: 'fahad@example.com',
            address: 'الدمام، حي الشاطئ، شارع الملك فهد',
            city: 'الدمام',
            country: 'المملكة العربية السعودية'
        },
        items: [
            { product_id: 5, name: 'شمعة نجمة البحر', price: 55, quantity: 1 },
            { product_id: 6, name: 'شمعة الفقعات الوردية', price: 30, quantity: 1 }
        ],
        subtotal: 85,
        shipping: 40,
        total: 125,
        status: 'مكتمل',
        date: '18 مايو 2025'
    },
    {
        id: 1004,
        customer: {
            name: 'نورة سعد',
            phone: '+966 56 333 4444',
            email: 'noura@example.com',
            address: 'الرياض، حي الملز، شارع الستين',
            city: 'الرياض',
            country: 'المملكة العربية السعودية'
        },
        items: [
            { product_id: 5, name: 'شمعة نجمة البحر', price: 55, quantity: 1 }
        ],
        subtotal: 55,
        shipping: 40,
        total: 95,
        status: 'ملغي',
        date: '17 مايو 2025'
    },
    {
        id: 1005,
        customer: {
            name: 'عبدالرحمن محمد',
            phone: '+966 59 555 6666',
            email: 'abdulrahman@example.com',
            address: 'مكة المكرمة، حي العزيزية، شارع الحج',
            city: 'مكة المكرمة',
            country: 'المملكة العربية السعودية'
        },
        items: [
            { product_id: 3, name: 'شمعة العناق البيضاء', price: 35, quantity: 2 },
            { product_id: 4, name: 'شمعة متموجة', price: 30, quantity: 1 }
        ],
        subtotal: 100,
        shipping: 40,
        total: 140,
        status: 'مكتمل',
        date: '16 مايو 2025'
    }
];

// وظائف المصادقة
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        isLoggedIn = true;
        currentUser = user;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
        return true;
    }
    
    return false;
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function checkAuth() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        isLoggedIn = true;
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
        // إعادة توجيه إلى صفحة تسجيل الدخول إذا لم يكن المستخدم مسجل الدخول
        if (window.location.pathname.indexOf('login.html') === -1) {
            window.location.href = 'login.html';
        }
    }
}

// وظائف إدارة المنتجات
function getProducts() {
    return products;
}

function getProduct(id) {
    return products.find(p => p.id === id);
}

function addProduct(product) {
    // توليد معرف جديد
    const newId = Math.max(...products.map(p => p.id)) + 1;
    product.id = newId;
    
    // تحديد حالة المنتج بناءً على المخزون
    if (product.stock <= 0) {
        product.status = 'غير متوفر';
    } else if (product.stock <= product.min_stock) {
        product.status = 'منخفض';
    } else {
        product.status = 'متوفر';
    }
    
    products.push(product);
    return product;
}

function updateProduct(id, updatedProduct) {
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
        // تحديث حالة المنتج بناءً على المخزون
        if (updatedProduct.stock <= 0) {
            updatedProduct.status = 'غير متوفر';
        } else if (updatedProduct.stock <= updatedProduct.min_stock) {
            updatedProduct.status = 'منخفض';
        } else {
            updatedProduct.status = 'متوفر';
        }
        
        products[index] = { ...products[index], ...updatedProduct };
        return products[index];
    }
    
    return null;
}

function deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
    
    return false;
}

function updateStock(id, newStock) {
    const product = getProduct(id);
    
    if (product) {
        product.stock = newStock;
        
        // تحديث حالة المنتج بناءً على المخزون
        if (product.stock <= 0) {
            product.status = 'غير متوفر';
        } else if (product.stock <= product.min_stock) {
            product.status = 'منخفض';
        } else {
            product.status = 'متوفر';
        }
        
        return product;
    }
    
    return null;
}

function getLowStockProducts() {
    return products.filter(p => p.stock <= p.min_stock);
}

// وظائف إدارة الطلبات
function getOrders() {
    return orders;
}

function getOrder(id) {
    return orders.find(o => o.id === id);
}

function updateOrderStatus(id, newStatus) {
    const order = getOrder(id);
    
    if (order) {
        order.status = newStatus;
        return order;
    }
    
    return null;
}

// وظائف الإحصائيات
function getSalesStats() {
    const completedOrders = orders.filter(o => o.status === 'مكتمل');
    
    const totalSales = completedOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = completedOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    
    return {
        totalSales,
        totalOrders,
        averageOrderValue
    };
}

function getTopProducts() {
    const productSales = {};
    
    // حساب مبيعات كل منتج
    orders.filter(o => o.status === 'مكتمل').forEach(order => {
        order.items.forEach(item => {
            if (!productSales[item.product_id]) {
                productSales[item.product_id] = {
                    id: item.product_id,
                    name: item.name,
                    quantity: 0,
                    total: 0
                };
            }
            
            productSales[item.product_id].quantity += item.quantity;
            productSales[item.product_id].total += item.price * item.quantity;
        });
    });
    
    // تحويل إلى مصفوفة وترتيب حسب الكمية المباعة
    return Object.values(productSales).sort((a, b) => b.quantity - a.quantity);
}

// وظائف واجهة المستخدم
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
    
    // تحديث أيقونة زر تبديل الوضع
    const themeToggleIcon = document.querySelector('.theme-toggle i');
    if (themeToggleIcon) {
        themeToggleIcon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    
    if (alertContainer) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type}">
                ${message}
            </div>
        `;
        
        // إخفاء التنبيه بعد 3 ثوانٍ
        setTimeout(() => {
            alertContainer.innerHTML = '';
        }, 3000);
    }
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة تسجيل الدخول
    checkAuth();
    
    // تطبيق الوضع المظلم إذا كان مفعلاً
    document.body.classList.toggle('dark-mode', darkMode);
    const themeToggleIcon = document.querySelector('.theme-toggle i');
    if (themeToggleIcon) {
        themeToggleIcon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // إعداد زر تبديل الوضع
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleDarkMode);
    }
    
    // إعداد زر تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // إعداد نموذج تسجيل الدخول
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (login(username, password)) {
                window.location.href = 'dashboard.html';
            } else {
                showAlert('اسم المستخدم أو كلمة المرور غير صحيحة', 'danger');
            }
        });
    }
    
    // إعداد روابط القائمة الجانبية
    const menuItems = document.querySelectorAll('.sidebar-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                window.location.href = `${page}.html`;
            }
        });
    });
    
    // تهيئة الرسوم البيانية في صفحة لوحة المعلومات
    initDashboardCharts();
    
    // تهيئة صفحة المنتجات
    initProductsPage();
    
    // تهيئة صفحة الطلبات
    initOrdersPage();
    
    // تهيئة صفحة المخزون
    initInventoryPage();
    
    // تهيئة صفحة الإحصائيات
    initStatisticsPage();
    
    // تهيئة صفحة الإعدادات
    initSettingsPage();
});

// تهيئة الرسوم البيانية في صفحة لوحة المعلومات
function initDashboardCharts() {
    const salesChartCanvas = document.getElementById('sales-chart');
    const topProductsChartCanvas = document.getElementById('top-products-chart');
    
    if (salesChartCanvas && typeof Chart !== 'undefined') {
        new Chart(salesChartCanvas, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'المبيعات (ريال)',
                    data: [1200, 1900, 1500, 2500, 2200, 3000],
                    backgroundColor: 'rgba(161, 138, 118, 0.2)',
                    borderColor: '#a18a76',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    if (topProductsChartCanvas && typeof Chart !== 'undefined') {
        new Chart(topProductsChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['شمعة العناق الوردية', 'باقة الشموع البيضاء', 'شمعة العناق البيضاء', 'شمعة متموجة', 'شمعة نجمة البحر'],
                datasets: [{
                    data: [25, 30, 16, 11, 18],
                    backgroundColor: [
                        '#a18a76',
                        '#d9c5b4',
                        '#8c7b6b',
                        '#b3a394',
                        '#c4b5a8'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }
}

// تهيئة صفحة المنتجات
function initProductsPage() {
    const addProductForm = document.getElementById('add-product-form');
    
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newProduct = {
                name: document.getElementById('product-name').value,
                price: parseFloat(document.getElementById('product-price').value),
                description: document.getElementById('product-description').value,
                image: '../candles_website/images/placeholder.jpg', // صورة افتراضية
                stock: 10, // قيمة افتراضية
                min_stock: 5, // قيمة افتراضية
                code: 'NEW-' + Date.now() // رمز مؤقت
            };
            
            addProduct(newProduct);
            showAlert('تمت إضافة المنتج بنجاح');
            
            // إعادة تحميل الصفحة لعرض المنتج الجديد
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }
    
    // إعداد أزرار حذف المنتج
    con
(Content truncated due to size limit. Use line ranges to read in chunks)