/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  Leaf, 
  Award, 
  Truck, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  MessageCircle,
  ChevronRight,
  Star,
  ShieldCheck,
  Clock,
  ShoppingCart,
  Check,
  Plus,
  Minus,
  Trash2,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: string;
  weight: string;
  quantity: number;
}

const PRODUCTS = [
  { id: 1, name: "Lal Mirch Powder", desc: "Taaza aur tez lal mirch", price: "₹150", weight: "500g", icon: <Flame className="w-8 h-8 text-orange-600" />, color: "bg-orange-50", image: "https://storage.googleapis.com/ai-studio-assets/ddk-spices/red-chilli.png" },
  { id: 2, name: "Haldi Powder", desc: "Pure aur khoobsurat haldi", price: "₹120", weight: "500g", icon: <Star className="w-8 h-8 text-yellow-500" />, color: "bg-yellow-50", image: "https://storage.googleapis.com/ai-studio-assets/ddk-spices/turmeric.png" },
  { id: 3, name: "Cinnamon Powder", desc: "Khushbudaar dalchini", price: "₹180", weight: "500g", icon: <Leaf className="w-8 h-8 text-amber-800" />, color: "bg-amber-50", image: "https://storage.googleapis.com/ai-studio-assets/ddk-spices/cinnamon.png" },
  { id: 4, name: "Black Lemon Powder", desc: "Unique aur chatpata", price: "₹220", weight: "500g", icon: <ShieldCheck className="w-8 h-8 text-stone-800" />, color: "bg-stone-50", image: "https://storage.googleapis.com/ai-studio-assets/ddk-spices/black-lemon.png" },
  { id: 5, name: "Garam Masala", desc: "Special recipe garam masala", price: "₹250", weight: "500g", icon: <Flame className="w-8 h-8 text-red-700" />, color: "bg-red-50", image: "https://storage.googleapis.com/ai-studio-assets/ddk-spices/garam-masala.png" },
  { id: 6, name: "Sabji Masala", desc: "Har sabji perfect banaye", price: "₹140", weight: "500g", icon: <Clock className="w-8 h-8 text-amber-600" />, color: "bg-amber-50", image: "https://storage.googleapis.com/ai-studio-assets/ddk-spices/sabji-masala.png" },
];

const FEATURES = [
  { icon: <Leaf className="w-10 h-10" />, title: "100% Natural", text: "Koi chemicals nahi, sirf natural masale" },
  { icon: <Award className="w-10 h-10" />, title: "Premium Quality", text: "Sabse best quality, har packet mein" },
  { icon: <Flame className="w-10 h-10" />, title: "Best Price", text: "Quality ke saath reasonable rates" },
  { icon: <Truck className="w-10 h-10" />, title: "Fast Delivery", text: "Ghar tak delivery, jaldi aur free" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedItem, setAddedItem] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ddk_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("ddk_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        weight: product.weight, 
        quantity: 1 
      }];
    });

    // Show feedback
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace("₹", ""));
    return sum + (price * item.quantity);
  }, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-stone-900 font-sans selection:bg-orange-200">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tight">
            DDK <span className="text-orange-600">Spices</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {["home", "about", "products", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm font-medium uppercase tracking-wider hover:text-orange-600 transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
            <div className="relative group">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 text-stone-900 group-hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden z-[60]"
                >
                  <div className="p-4 border-bottom border-stone-100 flex justify-between items-center bg-stone-50">
                    <h3 className="font-serif italic font-bold">Your Cart</h3>
                    <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-stone-900">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-8 text-stone-400">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>Your cart is empty</p>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <div className="flex-1">
                            <h4 className="text-sm font-bold">{item.name}</h4>
                            <p className="text-xs text-stone-400">{item.price} / {item.weight}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="p-4 bg-stone-50 border-t border-stone-100">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-stone-500">Total Amount</span>
                        <span className="text-lg font-bold text-stone-900">₹{cartTotal}</span>
                      </div>
                      <button className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-700 transition-all">
                        Checkout Now
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            <button 
              onClick={() => scrollToSection('products')}
              className="bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Order Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&q=80"
            alt="Spices background"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-orange-400 font-medium tracking-[0.3em] uppercase mb-4 text-sm">
              Authentic Indian Flavors
            </span>
            <h1 className="text-5xl md:text-8xl font-serif italic text-white mb-6 leading-tight">
              DDK Spices House
            </h1>
            <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Premium Quality Masale - Ghar Ke Swad Ke Saath. Experience the richness of pure, chemical-free spices.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollToSection('products')}
                className="w-full sm:w-auto bg-orange-600 text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-orange-700 transition-all flex items-center justify-center gap-2 group"
              >
                Explore Products
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="w-full sm:w-auto border border-white/30 text-white backdrop-blur-sm px-10 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-all"
              >
                Our Story
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-600 font-semibold tracking-widest uppercase text-xs mb-4 block">
              About Our Brand
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight">
              DDK Spices House - Quality Ka Naam
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <p>
                DDK Spices House ek trusted brand hai jo premium quality masalon ke liye jaana jaata hai. Hum sirf masale nahi bechhte, hum ghar ke swad ki yaad dilaate hain.
              </p>
              <p>
                Founded by <span className="text-stone-900 font-bold">Dinesh Bhati</span>, humare masale taaza hain, chemical-free hain aur har ghar ki rasoi mein madad karte hain. Humari commitment hai - sirf best quality, sirf natural ingredients.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-stone-200">
                    <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="Customer" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-stone-500">
                Trusted by <span className="text-stone-900">10,000+</span> happy families
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80" 
                alt="Spice grinding" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl hidden lg:block">
              <div className="text-4xl font-serif italic text-orange-600 mb-1">100%</div>
              <div className="text-sm font-bold uppercase tracking-tighter text-stone-400">Natural & Pure</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-semibold tracking-widest uppercase text-xs mb-4 block">
              Our Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Humare Products</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Handpicked and carefully processed spices to bring the authentic taste of India to your kitchen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group cursor-pointer border border-stone-100 flex flex-col"
              >
                <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-stone-50">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={`w-full h-full ${product.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      {product.icon}
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900 shadow-sm">
                      {product.weight}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-serif italic mb-2">{product.name}</h3>
                  <p className="text-stone-500 text-sm mb-6 line-clamp-2">{product.desc}</p>
                </div>

                <div className="flex flex-col gap-4 pt-6 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-stone-900">{product.price}</span>
                    <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 overflow-hidden relative ${
                      addedItem === product.id 
                        ? "bg-green-600 text-white" 
                        : "bg-stone-900 text-white hover:bg-orange-600"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {addedItem === product.id ? (
                        <motion.div
                          key="added"
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Added to Cart
                        </motion.div>
                      ) : (
                        <motion.div
                          key="order"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Order Online
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif italic mb-3">{feature.title}</h3>
              <p className="text-stone-500 leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/10 skew-x-12 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 font-semibold tracking-widest uppercase text-xs mb-4 block">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic mb-8 leading-tight">
                Contact Karein
              </h2>
              <p className="text-stone-400 text-lg mb-12 max-w-md">
                Humare products ke baare mein poochein ya order karein. Hum aapki help ke liye hamesha taiyaar hain.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-stone-500 uppercase tracking-widest mb-1">WhatsApp</div>
                    <a href="https://wa.me/97335003917" target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-orange-500 transition-colors">+973 35003917</a>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[2rem] text-stone-900 shadow-2xl"
            >
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Dhanyavaad! Hum aapke contact karenge.');
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Aapka Naam</label>
                    <input type="text" required className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Phone Number</label>
                    <input type="tel" required className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="+91 00000 00000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                  <input type="email" required className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="hello@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Aapka Message</label>
                  <textarea rows={4} className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none resize-none" placeholder="Write your message here..."></textarea>
                </div>
                <button type="submit" className="w-full bg-orange-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
                  Message Bhejein
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-stone-950 text-stone-500 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-2xl font-bold text-white">
              DDK <span className="text-orange-600">Spices</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="https://wa.me/97335003917" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><MessageCircle className="w-6 h-6" /></a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p>&copy; 2025 DDK Spices House. All Rights Reserved.</p>
              <p className="text-stone-600">Owned by <span className="text-stone-400 font-medium">Dinesh Bhati</span></p>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
