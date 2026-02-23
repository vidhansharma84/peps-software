// ──────────────────────────────────────────────
// Canteen Module — Dummy Data
// ──────────────────────────────────────────────

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "breakfast" | "lunch" | "dinner" | "snacks" | "beverages";
  isVeg: boolean;
  isAvailable: boolean;
  image: string;
  rating: number;
  preparationTime: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

export interface CanteenOrder {
  id: string;
  orderId: string;
  items: { menuItemId: string; name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  customerName: string;
  orderTime: string;
  completedAt: string | null;
}

export interface CanteenInventory {
  id: string;
  name: string;
  category: "vegetables" | "dairy" | "grains" | "spices" | "beverages" | "other";
  quantity: number;
  unit: string;
  minStock: number;
  lastRestocked: string;
  supplier: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  category: string;
  rating: number;
  lastDelivery: string;
  status: "active" | "inactive";
}

// ──────────────────────────────────────────────
// MENU CATEGORIES (5)
// ──────────────────────────────────────────────
export const menuCategories: MenuCategory[] = [
  { id: "cat-01", name: "Breakfast", icon: "Coffee", itemCount: 10 },
  { id: "cat-02", name: "Lunch", icon: "Utensils", itemCount: 10 },
  { id: "cat-03", name: "Dinner", icon: "Utensils", itemCount: 8 },
  { id: "cat-04", name: "Snacks", icon: "Cookie", itemCount: 7 },
  { id: "cat-05", name: "Beverages", icon: "Coffee", itemCount: 5 },
];

// ──────────────────────────────────────────────
// MENU ITEMS (40)
// ──────────────────────────────────────────────
export const menuItems: MenuItem[] = [
  // Breakfast (10)
  { id: "mi-001", name: "Masala Dosa", description: "Crispy rice crepe with spiced potato filling", price: 60, category: "breakfast", isVeg: true, isAvailable: true, image: "", rating: 4.5, preparationTime: 10 },
  { id: "mi-002", name: "Idli Sambar", description: "Steamed rice cakes with lentil soup", price: 40, category: "breakfast", isVeg: true, isAvailable: true, image: "", rating: 4.3, preparationTime: 8 },
  { id: "mi-003", name: "Poha", description: "Flattened rice with peanuts and spices", price: 35, category: "breakfast", isVeg: true, isAvailable: true, image: "", rating: 4.1, preparationTime: 7 },
  { id: "mi-004", name: "Upma", description: "Semolina porridge with vegetables", price: 35, category: "breakfast", isVeg: true, isAvailable: true, image: "", rating: 3.9, preparationTime: 8 },
  { id: "mi-005", name: "Aloo Paratha", description: "Stuffed potato flatbread with butter", price: 50, category: "breakfast", isVeg: true, isAvailable: true, image: "", rating: 4.6, preparationTime: 12 },
  { id: "mi-006", name: "Medu Vada", description: "Crispy lentil doughnuts with chutney", price: 40, category: "breakfast", isVeg: true, isAvailable: true, image: "", rating: 4.2, preparationTime: 10 },
  { id: "mi-007", name: "Chole Bhature", description: "Spiced chickpeas with fried bread", price: 70, category: "breakfast", isVeg: true, isAvailable: false, image: "", rating: 4.7, preparationTime: 15 },
  { id: "mi-008", name: "Puri Bhaji", description: "Deep-fried bread with potato curry", price: 55, category: "breakfast", isVeg: true, isAvailable: true, image: "", rating: 4.3, preparationTime: 12 },
  { id: "mi-009", name: "Egg Bhurji", description: "Scrambled eggs with onions and spices", price: 50, category: "breakfast", isVeg: false, isAvailable: true, image: "", rating: 4.4, preparationTime: 8 },
  { id: "mi-010", name: "Bread Omelette", description: "Fluffy omelette with toasted bread", price: 45, category: "breakfast", isVeg: false, isAvailable: true, image: "", rating: 4.2, preparationTime: 7 },

  // Lunch (10)
  { id: "mi-011", name: "Veg Biryani", description: "Fragrant basmati rice with mixed vegetables", price: 100, category: "lunch", isVeg: true, isAvailable: true, image: "", rating: 4.4, preparationTime: 20 },
  { id: "mi-012", name: "Chicken Biryani", description: "Hyderabadi-style dum biryani with chicken", price: 140, category: "lunch", isVeg: false, isAvailable: true, image: "", rating: 4.8, preparationTime: 25 },
  { id: "mi-013", name: "Paneer Butter Masala", description: "Cottage cheese in rich tomato gravy", price: 120, category: "lunch", isVeg: true, isAvailable: true, image: "", rating: 4.6, preparationTime: 15 },
  { id: "mi-014", name: "Dal Tadka", description: "Yellow lentils tempered with spices", price: 70, category: "lunch", isVeg: true, isAvailable: true, image: "", rating: 4.3, preparationTime: 12 },
  { id: "mi-015", name: "Rajma Chawal", description: "Kidney beans curry with steamed rice", price: 80, category: "lunch", isVeg: true, isAvailable: true, image: "", rating: 4.5, preparationTime: 10 },
  { id: "mi-016", name: "Butter Chicken", description: "Tandoori chicken in creamy tomato sauce", price: 150, category: "lunch", isVeg: false, isAvailable: true, image: "", rating: 4.7, preparationTime: 20 },
  { id: "mi-017", name: "Fish Curry", description: "South Indian-style fish in coconut gravy", price: 160, category: "lunch", isVeg: false, isAvailable: false, image: "", rating: 4.5, preparationTime: 18 },
  { id: "mi-018", name: "Chapati (2 pcs)", description: "Whole wheat flatbread", price: 20, category: "lunch", isVeg: true, isAvailable: true, image: "", rating: 4.0, preparationTime: 5 },
  { id: "mi-019", name: "Jeera Rice", description: "Cumin-flavoured basmati rice", price: 50, category: "lunch", isVeg: true, isAvailable: true, image: "", rating: 4.1, preparationTime: 8 },
  { id: "mi-020", name: "Curd Rice", description: "Yoghurt rice with tempering", price: 45, category: "lunch", isVeg: true, isAvailable: true, image: "", rating: 4.2, preparationTime: 5 },

  // Dinner (8)
  { id: "mi-021", name: "Palak Paneer", description: "Spinach and cottage cheese curry", price: 110, category: "dinner", isVeg: true, isAvailable: true, image: "", rating: 4.4, preparationTime: 15 },
  { id: "mi-022", name: "Mutton Rogan Josh", description: "Kashmiri-style slow-cooked mutton", price: 200, category: "dinner", isVeg: false, isAvailable: true, image: "", rating: 4.8, preparationTime: 30 },
  { id: "mi-023", name: "Egg Curry", description: "Boiled eggs in onion-tomato gravy", price: 80, category: "dinner", isVeg: false, isAvailable: true, image: "", rating: 4.3, preparationTime: 12 },
  { id: "mi-024", name: "Mixed Veg Curry", description: "Seasonal vegetables in spiced gravy", price: 80, category: "dinner", isVeg: true, isAvailable: true, image: "", rating: 4.1, preparationTime: 12 },
  { id: "mi-025", name: "Chicken Tikka Masala", description: "Grilled chicken chunks in spiced gravy", price: 160, category: "dinner", isVeg: false, isAvailable: true, image: "", rating: 4.7, preparationTime: 20 },
  { id: "mi-026", name: "Dal Makhani", description: "Black lentils slow-cooked in cream", price: 90, category: "dinner", isVeg: true, isAvailable: true, image: "", rating: 4.6, preparationTime: 15 },
  { id: "mi-027", name: "Naan (2 pcs)", description: "Tandoori-baked leavened bread", price: 30, category: "dinner", isVeg: true, isAvailable: true, image: "", rating: 4.2, preparationTime: 6 },
  { id: "mi-028", name: "Tandoori Chicken", description: "Marinated chicken grilled in tandoor", price: 180, category: "dinner", isVeg: false, isAvailable: false, image: "", rating: 4.8, preparationTime: 25 },

  // Snacks (7)
  { id: "mi-029", name: "Samosa (2 pcs)", description: "Crispy pastry filled with spiced potatoes", price: 30, category: "snacks", isVeg: true, isAvailable: true, image: "", rating: 4.5, preparationTime: 5 },
  { id: "mi-030", name: "Vada Pav", description: "Mumbai-style spiced potato burger", price: 25, category: "snacks", isVeg: true, isAvailable: true, image: "", rating: 4.6, preparationTime: 5 },
  { id: "mi-031", name: "Pav Bhaji", description: "Mashed vegetable curry with buttered bread", price: 60, category: "snacks", isVeg: true, isAvailable: true, image: "", rating: 4.5, preparationTime: 10 },
  { id: "mi-032", name: "Bhel Puri", description: "Puffed rice chaat with tangy chutneys", price: 35, category: "snacks", isVeg: true, isAvailable: true, image: "", rating: 4.3, preparationTime: 5 },
  { id: "mi-033", name: "Paneer Tikka", description: "Grilled spiced cottage cheese cubes", price: 90, category: "snacks", isVeg: true, isAvailable: true, image: "", rating: 4.6, preparationTime: 12 },
  { id: "mi-034", name: "Chicken Momos", description: "Steamed chicken dumplings with chutney", price: 70, category: "snacks", isVeg: false, isAvailable: true, image: "", rating: 4.4, preparationTime: 10 },
  { id: "mi-035", name: "Spring Roll", description: "Crispy rolls with vegetable filling", price: 50, category: "snacks", isVeg: true, isAvailable: true, image: "", rating: 4.1, preparationTime: 8 },

  // Beverages (5)
  { id: "mi-036", name: "Masala Chai", description: "Indian spiced tea with milk", price: 15, category: "beverages", isVeg: true, isAvailable: true, image: "", rating: 4.7, preparationTime: 3 },
  { id: "mi-037", name: "Filter Coffee", description: "South Indian filter coffee", price: 20, category: "beverages", isVeg: true, isAvailable: true, image: "", rating: 4.6, preparationTime: 3 },
  { id: "mi-038", name: "Mango Lassi", description: "Sweet yoghurt drink with mango pulp", price: 40, category: "beverages", isVeg: true, isAvailable: true, image: "", rating: 4.5, preparationTime: 3 },
  { id: "mi-039", name: "Fresh Lime Soda", description: "Fizzy lemon drink, sweet or salted", price: 25, category: "beverages", isVeg: true, isAvailable: true, image: "", rating: 4.3, preparationTime: 2 },
  { id: "mi-040", name: "Buttermilk", description: "Spiced churned yoghurt drink", price: 15, category: "beverages", isVeg: true, isAvailable: true, image: "", rating: 4.4, preparationTime: 2 },
];

// ──────────────────────────────────────────────
// CANTEEN ORDERS (50)
// ──────────────────────────────────────────────
export const canteenOrders: CanteenOrder[] = [
  { id: "co-001", orderId: "ORD-001", items: [{ menuItemId: "mi-012", name: "Chicken Biryani", quantity: 2, price: 140 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 2, price: 15 }], totalAmount: 310, status: "completed", customerName: "Aarav Sharma", orderTime: "2026-02-23T08:15:00", completedAt: "2026-02-23T08:40:00" },
  { id: "co-002", orderId: "ORD-002", items: [{ menuItemId: "mi-001", name: "Masala Dosa", quantity: 1, price: 60 }, { menuItemId: "mi-037", name: "Filter Coffee", quantity: 1, price: 20 }], totalAmount: 80, status: "completed", customerName: "Diya Patel", orderTime: "2026-02-23T08:20:00", completedAt: "2026-02-23T08:35:00" },
  { id: "co-003", orderId: "ORD-003", items: [{ menuItemId: "mi-005", name: "Aloo Paratha", quantity: 2, price: 50 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 2, price: 15 }], totalAmount: 130, status: "completed", customerName: "Vihaan Reddy", orderTime: "2026-02-23T08:30:00", completedAt: "2026-02-23T08:50:00" },
  { id: "co-004", orderId: "ORD-004", items: [{ menuItemId: "mi-002", name: "Idli Sambar", quantity: 2, price: 40 }], totalAmount: 80, status: "completed", customerName: "Ananya Iyer", orderTime: "2026-02-23T08:35:00", completedAt: "2026-02-23T08:48:00" },
  { id: "co-005", orderId: "ORD-005", items: [{ menuItemId: "mi-009", name: "Egg Bhurji", quantity: 1, price: 50 }, { menuItemId: "mi-010", name: "Bread Omelette", quantity: 1, price: 45 }, { menuItemId: "mi-037", name: "Filter Coffee", quantity: 2, price: 20 }], totalAmount: 135, status: "completed", customerName: "Arjun Nair", orderTime: "2026-02-23T08:45:00", completedAt: "2026-02-23T09:05:00" },
  { id: "co-006", orderId: "ORD-006", items: [{ menuItemId: "mi-003", name: "Poha", quantity: 1, price: 35 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 1, price: 15 }], totalAmount: 50, status: "completed", customerName: "Ishita Gupta", orderTime: "2026-02-23T09:00:00", completedAt: "2026-02-23T09:12:00" },
  { id: "co-007", orderId: "ORD-007", items: [{ menuItemId: "mi-007", name: "Chole Bhature", quantity: 1, price: 70 }], totalAmount: 70, status: "completed", customerName: "Kabir Singh", orderTime: "2026-02-23T09:10:00", completedAt: "2026-02-23T09:30:00" },
  { id: "co-008", orderId: "ORD-008", items: [{ menuItemId: "mi-013", name: "Paneer Butter Masala", quantity: 1, price: 120 }, { menuItemId: "mi-018", name: "Chapati (2 pcs)", quantity: 2, price: 20 }], totalAmount: 160, status: "completed", customerName: "Meera Krishnan", orderTime: "2026-02-23T12:00:00", completedAt: "2026-02-23T12:20:00" },
  { id: "co-009", orderId: "ORD-009", items: [{ menuItemId: "mi-012", name: "Chicken Biryani", quantity: 1, price: 140 }, { menuItemId: "mi-039", name: "Fresh Lime Soda", quantity: 1, price: 25 }], totalAmount: 165, status: "completed", customerName: "Rohan Deshmukh", orderTime: "2026-02-23T12:05:00", completedAt: "2026-02-23T12:30:00" },
  { id: "co-010", orderId: "ORD-010", items: [{ menuItemId: "mi-015", name: "Rajma Chawal", quantity: 1, price: 80 }, { menuItemId: "mi-040", name: "Buttermilk", quantity: 1, price: 15 }], totalAmount: 95, status: "completed", customerName: "Priya Menon", orderTime: "2026-02-23T12:10:00", completedAt: "2026-02-23T12:25:00" },
  { id: "co-011", orderId: "ORD-011", items: [{ menuItemId: "mi-016", name: "Butter Chicken", quantity: 1, price: 150 }, { menuItemId: "mi-019", name: "Jeera Rice", quantity: 1, price: 50 }], totalAmount: 200, status: "completed", customerName: "Siddharth Joshi", orderTime: "2026-02-23T12:15:00", completedAt: "2026-02-23T12:40:00" },
  { id: "co-012", orderId: "ORD-012", items: [{ menuItemId: "mi-014", name: "Dal Tadka", quantity: 1, price: 70 }, { menuItemId: "mi-018", name: "Chapati (2 pcs)", quantity: 2, price: 20 }, { menuItemId: "mi-020", name: "Curd Rice", quantity: 1, price: 45 }], totalAmount: 155, status: "completed", customerName: "Nandini Rao", orderTime: "2026-02-23T12:20:00", completedAt: "2026-02-23T12:40:00" },
  { id: "co-013", orderId: "ORD-013", items: [{ menuItemId: "mi-011", name: "Veg Biryani", quantity: 2, price: 100 }, { menuItemId: "mi-038", name: "Mango Lassi", quantity: 2, price: 40 }], totalAmount: 280, status: "completed", customerName: "Aditya Kulkarni", orderTime: "2026-02-23T12:30:00", completedAt: "2026-02-23T12:55:00" },
  { id: "co-014", orderId: "ORD-014", items: [{ menuItemId: "mi-029", name: "Samosa (2 pcs)", quantity: 2, price: 30 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 2, price: 15 }], totalAmount: 90, status: "completed", customerName: "Kavya Bhatt", orderTime: "2026-02-23T15:00:00", completedAt: "2026-02-23T15:10:00" },
  { id: "co-015", orderId: "ORD-015", items: [{ menuItemId: "mi-030", name: "Vada Pav", quantity: 3, price: 25 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 3, price: 15 }], totalAmount: 120, status: "completed", customerName: "Rahul Tiwari", orderTime: "2026-02-23T15:10:00", completedAt: "2026-02-23T15:20:00" },
  { id: "co-016", orderId: "ORD-016", items: [{ menuItemId: "mi-031", name: "Pav Bhaji", quantity: 1, price: 60 }], totalAmount: 60, status: "completed", customerName: "Sneha Verma", orderTime: "2026-02-23T15:20:00", completedAt: "2026-02-23T15:35:00" },
  { id: "co-017", orderId: "ORD-017", items: [{ menuItemId: "mi-033", name: "Paneer Tikka", quantity: 1, price: 90 }, { menuItemId: "mi-039", name: "Fresh Lime Soda", quantity: 1, price: 25 }], totalAmount: 115, status: "completed", customerName: "Vikram Chauhan", orderTime: "2026-02-23T15:30:00", completedAt: "2026-02-23T15:48:00" },
  { id: "co-018", orderId: "ORD-018", items: [{ menuItemId: "mi-034", name: "Chicken Momos", quantity: 2, price: 70 }], totalAmount: 140, status: "completed", customerName: "Pooja Saxena", orderTime: "2026-02-23T15:40:00", completedAt: "2026-02-23T15:55:00" },
  { id: "co-019", orderId: "ORD-019", items: [{ menuItemId: "mi-021", name: "Palak Paneer", quantity: 1, price: 110 }, { menuItemId: "mi-027", name: "Naan (2 pcs)", quantity: 2, price: 30 }], totalAmount: 170, status: "completed", customerName: "Amit Patil", orderTime: "2026-02-23T19:00:00", completedAt: "2026-02-23T19:20:00" },
  { id: "co-020", orderId: "ORD-020", items: [{ menuItemId: "mi-022", name: "Mutton Rogan Josh", quantity: 1, price: 200 }, { menuItemId: "mi-027", name: "Naan (2 pcs)", quantity: 2, price: 30 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 1, price: 15 }], totalAmount: 275, status: "completed", customerName: "Neha Kapoor", orderTime: "2026-02-23T19:10:00", completedAt: "2026-02-23T19:45:00" },
  { id: "co-021", orderId: "ORD-021", items: [{ menuItemId: "mi-025", name: "Chicken Tikka Masala", quantity: 1, price: 160 }, { menuItemId: "mi-019", name: "Jeera Rice", quantity: 1, price: 50 }], totalAmount: 210, status: "completed", customerName: "Ravi Kumar", orderTime: "2026-02-23T19:15:00", completedAt: "2026-02-23T19:40:00" },
  { id: "co-022", orderId: "ORD-022", items: [{ menuItemId: "mi-026", name: "Dal Makhani", quantity: 1, price: 90 }, { menuItemId: "mi-018", name: "Chapati (2 pcs)", quantity: 2, price: 20 }], totalAmount: 130, status: "completed", customerName: "Sunita Agarwal", orderTime: "2026-02-23T19:20:00", completedAt: "2026-02-23T19:38:00" },
  { id: "co-023", orderId: "ORD-023", items: [{ menuItemId: "mi-023", name: "Egg Curry", quantity: 1, price: 80 }, { menuItemId: "mi-019", name: "Jeera Rice", quantity: 1, price: 50 }], totalAmount: 130, status: "completed", customerName: "Deepak Mishra", orderTime: "2026-02-23T19:30:00", completedAt: "2026-02-23T19:48:00" },
  { id: "co-024", orderId: "ORD-024", items: [{ menuItemId: "mi-024", name: "Mixed Veg Curry", quantity: 1, price: 80 }, { menuItemId: "mi-027", name: "Naan (2 pcs)", quantity: 1, price: 30 }], totalAmount: 110, status: "completed", customerName: "Lakshmi Narayan", orderTime: "2026-02-23T19:40:00", completedAt: "2026-02-23T19:58:00" },
  { id: "co-025", orderId: "ORD-025", items: [{ menuItemId: "mi-012", name: "Chicken Biryani", quantity: 3, price: 140 }, { menuItemId: "mi-038", name: "Mango Lassi", quantity: 3, price: 40 }], totalAmount: 540, status: "completed", customerName: "Manish Pandey", orderTime: "2026-02-23T12:40:00", completedAt: "2026-02-23T13:10:00" },
  // Active orders
  { id: "co-026", orderId: "ORD-026", items: [{ menuItemId: "mi-013", name: "Paneer Butter Masala", quantity: 1, price: 120 }, { menuItemId: "mi-018", name: "Chapati (2 pcs)", quantity: 2, price: 20 }], totalAmount: 160, status: "pending", customerName: "Tanvi Sharma", orderTime: "2026-02-23T20:00:00", completedAt: null },
  { id: "co-027", orderId: "ORD-027", items: [{ menuItemId: "mi-016", name: "Butter Chicken", quantity: 2, price: 150 }, { menuItemId: "mi-027", name: "Naan (2 pcs)", quantity: 2, price: 30 }], totalAmount: 360, status: "pending", customerName: "Karan Malhotra", orderTime: "2026-02-23T20:02:00", completedAt: null },
  { id: "co-028", orderId: "ORD-028", items: [{ menuItemId: "mi-029", name: "Samosa (2 pcs)", quantity: 2, price: 30 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 2, price: 15 }], totalAmount: 90, status: "pending", customerName: "Shreya Jain", orderTime: "2026-02-23T20:05:00", completedAt: null },
  { id: "co-029", orderId: "ORD-029", items: [{ menuItemId: "mi-012", name: "Chicken Biryani", quantity: 1, price: 140 }], totalAmount: 140, status: "preparing", customerName: "Gaurav Sinha", orderTime: "2026-02-23T19:50:00", completedAt: null },
  { id: "co-030", orderId: "ORD-030", items: [{ menuItemId: "mi-025", name: "Chicken Tikka Masala", quantity: 1, price: 160 }, { menuItemId: "mi-019", name: "Jeera Rice", quantity: 1, price: 50 }], totalAmount: 210, status: "preparing", customerName: "Pallavi Desai", orderTime: "2026-02-23T19:48:00", completedAt: null },
  { id: "co-031", orderId: "ORD-031", items: [{ menuItemId: "mi-026", name: "Dal Makhani", quantity: 1, price: 90 }, { menuItemId: "mi-027", name: "Naan (2 pcs)", quantity: 2, price: 30 }], totalAmount: 150, status: "preparing", customerName: "Harish Reddy", orderTime: "2026-02-23T19:45:00", completedAt: null },
  { id: "co-032", orderId: "ORD-032", items: [{ menuItemId: "mi-021", name: "Palak Paneer", quantity: 1, price: 110 }, { menuItemId: "mi-018", name: "Chapati (2 pcs)", quantity: 2, price: 20 }], totalAmount: 150, status: "preparing", customerName: "Divya Choudhary", orderTime: "2026-02-23T19:42:00", completedAt: null },
  { id: "co-033", orderId: "ORD-033", items: [{ menuItemId: "mi-030", name: "Vada Pav", quantity: 4, price: 25 }], totalAmount: 100, status: "ready", customerName: "Nikhil Mehta", orderTime: "2026-02-23T19:35:00", completedAt: null },
  { id: "co-034", orderId: "ORD-034", items: [{ menuItemId: "mi-022", name: "Mutton Rogan Josh", quantity: 1, price: 200 }, { menuItemId: "mi-027", name: "Naan (2 pcs)", quantity: 2, price: 30 }], totalAmount: 260, status: "ready", customerName: "Swati Banerjee", orderTime: "2026-02-23T19:30:00", completedAt: null },
  { id: "co-035", orderId: "ORD-035", items: [{ menuItemId: "mi-011", name: "Veg Biryani", quantity: 1, price: 100 }, { menuItemId: "mi-040", name: "Buttermilk", quantity: 1, price: 15 }], totalAmount: 115, status: "ready", customerName: "Rajesh Pillai", orderTime: "2026-02-23T19:28:00", completedAt: null },
  { id: "co-036", orderId: "ORD-036", items: [{ menuItemId: "mi-031", name: "Pav Bhaji", quantity: 2, price: 60 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 2, price: 15 }], totalAmount: 150, status: "cancelled", customerName: "Ankita Thakur", orderTime: "2026-02-23T18:50:00", completedAt: null },
  { id: "co-037", orderId: "ORD-037", items: [{ menuItemId: "mi-005", name: "Aloo Paratha", quantity: 3, price: 50 }], totalAmount: 150, status: "completed", customerName: "Vivek Awasthi", orderTime: "2026-02-23T08:50:00", completedAt: "2026-02-23T09:10:00" },
  { id: "co-038", orderId: "ORD-038", items: [{ menuItemId: "mi-006", name: "Medu Vada", quantity: 2, price: 40 }, { menuItemId: "mi-037", name: "Filter Coffee", quantity: 2, price: 20 }], totalAmount: 120, status: "completed", customerName: "Geeta Madhavan", orderTime: "2026-02-23T09:20:00", completedAt: "2026-02-23T09:38:00" },
  { id: "co-039", orderId: "ORD-039", items: [{ menuItemId: "mi-032", name: "Bhel Puri", quantity: 2, price: 35 }, { menuItemId: "mi-039", name: "Fresh Lime Soda", quantity: 2, price: 25 }], totalAmount: 120, status: "completed", customerName: "Suresh Hegde", orderTime: "2026-02-23T16:00:00", completedAt: "2026-02-23T16:10:00" },
  { id: "co-040", orderId: "ORD-040", items: [{ menuItemId: "mi-035", name: "Spring Roll", quantity: 2, price: 50 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 1, price: 15 }], totalAmount: 115, status: "completed", customerName: "Bhavna Shah", orderTime: "2026-02-23T16:15:00", completedAt: "2026-02-23T16:30:00" },
  { id: "co-041", orderId: "ORD-041", items: [{ menuItemId: "mi-015", name: "Rajma Chawal", quantity: 2, price: 80 }], totalAmount: 160, status: "completed", customerName: "Jatin Oberoi", orderTime: "2026-02-23T12:50:00", completedAt: "2026-02-23T13:05:00" },
  { id: "co-042", orderId: "ORD-042", items: [{ menuItemId: "mi-014", name: "Dal Tadka", quantity: 1, price: 70 }, { menuItemId: "mi-020", name: "Curd Rice", quantity: 1, price: 45 }], totalAmount: 115, status: "completed", customerName: "Rekha Dixit", orderTime: "2026-02-23T13:00:00", completedAt: "2026-02-23T13:18:00" },
  { id: "co-043", orderId: "ORD-043", items: [{ menuItemId: "mi-033", name: "Paneer Tikka", quantity: 2, price: 90 }, { menuItemId: "mi-038", name: "Mango Lassi", quantity: 2, price: 40 }], totalAmount: 260, status: "completed", customerName: "Arun Bhatia", orderTime: "2026-02-23T16:30:00", completedAt: "2026-02-23T16:50:00" },
  { id: "co-044", orderId: "ORD-044", items: [{ menuItemId: "mi-001", name: "Masala Dosa", quantity: 2, price: 60 }, { menuItemId: "mi-002", name: "Idli Sambar", quantity: 1, price: 40 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 3, price: 15 }], totalAmount: 205, status: "completed", customerName: "Uma Shankar", orderTime: "2026-02-23T08:55:00", completedAt: "2026-02-23T09:15:00" },
  { id: "co-045", orderId: "ORD-045", items: [{ menuItemId: "mi-008", name: "Puri Bhaji", quantity: 2, price: 55 }], totalAmount: 110, status: "completed", customerName: "Chandra Mohan", orderTime: "2026-02-23T09:30:00", completedAt: "2026-02-23T09:48:00" },
  { id: "co-046", orderId: "ORD-046", items: [{ menuItemId: "mi-016", name: "Butter Chicken", quantity: 1, price: 150 }, { menuItemId: "mi-018", name: "Chapati (2 pcs)", quantity: 2, price: 20 }, { menuItemId: "mi-036", name: "Masala Chai", quantity: 1, price: 15 }], totalAmount: 205, status: "completed", customerName: "Pankaj Tripathi", orderTime: "2026-02-23T13:10:00", completedAt: "2026-02-23T13:35:00" },
  { id: "co-047", orderId: "ORD-047", items: [{ menuItemId: "mi-034", name: "Chicken Momos", quantity: 3, price: 70 }, { menuItemId: "mi-039", name: "Fresh Lime Soda", quantity: 3, price: 25 }], totalAmount: 285, status: "pending", customerName: "Maya Hegde", orderTime: "2026-02-23T20:08:00", completedAt: null },
  { id: "co-048", orderId: "ORD-048", items: [{ menuItemId: "mi-024", name: "Mixed Veg Curry", quantity: 1, price: 80 }, { menuItemId: "mi-018", name: "Chapati (2 pcs)", quantity: 2, price: 20 }], totalAmount: 120, status: "pending", customerName: "Sunil Yadav", orderTime: "2026-02-23T20:10:00", completedAt: null },
  { id: "co-049", orderId: "ORD-049", items: [{ menuItemId: "mi-036", name: "Masala Chai", quantity: 5, price: 15 }], totalAmount: 75, status: "ready", customerName: "Anand Krishnamurthy", orderTime: "2026-02-23T19:55:00", completedAt: null },
  { id: "co-050", orderId: "ORD-050", items: [{ menuItemId: "mi-013", name: "Paneer Butter Masala", quantity: 2, price: 120 }, { menuItemId: "mi-027", name: "Naan (2 pcs)", quantity: 2, price: 30 }, { menuItemId: "mi-038", name: "Mango Lassi", quantity: 2, price: 40 }], totalAmount: 380, status: "preparing", customerName: "Ritika Sood", orderTime: "2026-02-23T19:52:00", completedAt: null },
];

// ──────────────────────────────────────────────
// CANTEEN INVENTORY (30)
// ──────────────────────────────────────────────
export const canteenInventory: CanteenInventory[] = [
  { id: "inv-001", name: "Rice (Basmati)", category: "grains", quantity: 50, unit: "kg", minStock: 20, lastRestocked: "2026-02-20", supplier: "Agro Fresh Supplies" },
  { id: "inv-002", name: "Wheat Flour", category: "grains", quantity: 40, unit: "kg", minStock: 15, lastRestocked: "2026-02-19", supplier: "Agro Fresh Supplies" },
  { id: "inv-003", name: "Toor Dal", category: "grains", quantity: 15, unit: "kg", minStock: 10, lastRestocked: "2026-02-18", supplier: "Agro Fresh Supplies" },
  { id: "inv-004", name: "Urad Dal", category: "grains", quantity: 8, unit: "kg", minStock: 10, lastRestocked: "2026-02-15", supplier: "Agro Fresh Supplies" },
  { id: "inv-005", name: "Onions", category: "vegetables", quantity: 30, unit: "kg", minStock: 15, lastRestocked: "2026-02-22", supplier: "Fresh Farms Vegetables" },
  { id: "inv-006", name: "Tomatoes", category: "vegetables", quantity: 20, unit: "kg", minStock: 10, lastRestocked: "2026-02-22", supplier: "Fresh Farms Vegetables" },
  { id: "inv-007", name: "Potatoes", category: "vegetables", quantity: 25, unit: "kg", minStock: 12, lastRestocked: "2026-02-21", supplier: "Fresh Farms Vegetables" },
  { id: "inv-008", name: "Green Peas", category: "vegetables", quantity: 5, unit: "kg", minStock: 8, lastRestocked: "2026-02-18", supplier: "Fresh Farms Vegetables" },
  { id: "inv-009", name: "Spinach", category: "vegetables", quantity: 4, unit: "kg", minStock: 5, lastRestocked: "2026-02-21", supplier: "Fresh Farms Vegetables" },
  { id: "inv-010", name: "Capsicum", category: "vegetables", quantity: 3, unit: "kg", minStock: 5, lastRestocked: "2026-02-20", supplier: "Fresh Farms Vegetables" },
  { id: "inv-011", name: "Milk", category: "dairy", quantity: 40, unit: "litre", minStock: 20, lastRestocked: "2026-02-23", supplier: "Nandini Dairy Products" },
  { id: "inv-012", name: "Curd", category: "dairy", quantity: 15, unit: "litre", minStock: 10, lastRestocked: "2026-02-23", supplier: "Nandini Dairy Products" },
  { id: "inv-013", name: "Paneer", category: "dairy", quantity: 8, unit: "kg", minStock: 5, lastRestocked: "2026-02-22", supplier: "Nandini Dairy Products" },
  { id: "inv-014", name: "Butter", category: "dairy", quantity: 5, unit: "kg", minStock: 3, lastRestocked: "2026-02-21", supplier: "Nandini Dairy Products" },
  { id: "inv-015", name: "Ghee", category: "dairy", quantity: 4, unit: "litre", minStock: 3, lastRestocked: "2026-02-20", supplier: "Nandini Dairy Products" },
  { id: "inv-016", name: "Turmeric Powder", category: "spices", quantity: 3, unit: "kg", minStock: 2, lastRestocked: "2026-02-15", supplier: "Spice Garden Traders" },
  { id: "inv-017", name: "Red Chilli Powder", category: "spices", quantity: 2, unit: "kg", minStock: 2, lastRestocked: "2026-02-15", supplier: "Spice Garden Traders" },
  { id: "inv-018", name: "Cumin Seeds", category: "spices", quantity: 1.5, unit: "kg", minStock: 2, lastRestocked: "2026-02-10", supplier: "Spice Garden Traders" },
  { id: "inv-019", name: "Garam Masala", category: "spices", quantity: 1, unit: "kg", minStock: 1.5, lastRestocked: "2026-02-12", supplier: "Spice Garden Traders" },
  { id: "inv-020", name: "Coriander Powder", category: "spices", quantity: 2.5, unit: "kg", minStock: 2, lastRestocked: "2026-02-14", supplier: "Spice Garden Traders" },
  { id: "inv-021", name: "Tea Leaves", category: "beverages", quantity: 5, unit: "kg", minStock: 3, lastRestocked: "2026-02-19", supplier: "Nilgiri Tea Estates" },
  { id: "inv-022", name: "Coffee Powder", category: "beverages", quantity: 3, unit: "kg", minStock: 2, lastRestocked: "2026-02-18", supplier: "Nilgiri Tea Estates" },
  { id: "inv-023", name: "Sugar", category: "other", quantity: 20, unit: "kg", minStock: 10, lastRestocked: "2026-02-20", supplier: "Agro Fresh Supplies" },
  { id: "inv-024", name: "Salt", category: "other", quantity: 10, unit: "kg", minStock: 5, lastRestocked: "2026-02-18", supplier: "Agro Fresh Supplies" },
  { id: "inv-025", name: "Cooking Oil", category: "other", quantity: 15, unit: "litre", minStock: 10, lastRestocked: "2026-02-21", supplier: "Agro Fresh Supplies" },
  { id: "inv-026", name: "Chicken", category: "other", quantity: 10, unit: "kg", minStock: 8, lastRestocked: "2026-02-23", supplier: "Sardar Meat Suppliers" },
  { id: "inv-027", name: "Mutton", category: "other", quantity: 5, unit: "kg", minStock: 4, lastRestocked: "2026-02-23", supplier: "Sardar Meat Suppliers" },
  { id: "inv-028", name: "Eggs", category: "other", quantity: 120, unit: "pcs", minStock: 60, lastRestocked: "2026-02-22", supplier: "Sardar Meat Suppliers" },
  { id: "inv-029", name: "Mango Pulp", category: "beverages", quantity: 3, unit: "litre", minStock: 4, lastRestocked: "2026-02-16", supplier: "Nilgiri Tea Estates" },
  { id: "inv-030", name: "Lemon", category: "vegetables", quantity: 2, unit: "kg", minStock: 3, lastRestocked: "2026-02-21", supplier: "Fresh Farms Vegetables" },
];

// ──────────────────────────────────────────────
// SUPPLIERS (8)
// ──────────────────────────────────────────────
export const suppliers: Supplier[] = [
  { id: "sup-001", name: "Agro Fresh Supplies", contact: "+91 98765 20001", email: "agrofresh@supplier.com", category: "Grains & Staples", rating: 4.5, lastDelivery: "2026-02-20", status: "active" },
  { id: "sup-002", name: "Fresh Farms Vegetables", contact: "+91 98765 20002", email: "freshfarms@supplier.com", category: "Vegetables & Fruits", rating: 4.3, lastDelivery: "2026-02-22", status: "active" },
  { id: "sup-003", name: "Nandini Dairy Products", contact: "+91 98765 20003", email: "nandini.dairy@supplier.com", category: "Dairy Products", rating: 4.7, lastDelivery: "2026-02-23", status: "active" },
  { id: "sup-004", name: "Spice Garden Traders", contact: "+91 98765 20004", email: "spicegarden@supplier.com", category: "Spices & Masalas", rating: 4.2, lastDelivery: "2026-02-15", status: "active" },
  { id: "sup-005", name: "Nilgiri Tea Estates", contact: "+91 98765 20005", email: "nilgiri.tea@supplier.com", category: "Beverages", rating: 4.6, lastDelivery: "2026-02-19", status: "active" },
  { id: "sup-006", name: "Sardar Meat Suppliers", contact: "+91 98765 20006", email: "sardar.meat@supplier.com", category: "Meat & Poultry", rating: 4.4, lastDelivery: "2026-02-23", status: "active" },
  { id: "sup-007", name: "Krishna Packaged Foods", contact: "+91 98765 20007", email: "krishna.foods@supplier.com", category: "Packaged Foods", rating: 3.8, lastDelivery: "2026-01-28", status: "inactive" },
  { id: "sup-008", name: "Ganesh Disposables", contact: "+91 98765 20008", email: "ganesh.disp@supplier.com", category: "Disposables & Packaging", rating: 4.0, lastDelivery: "2026-02-10", status: "active" },
];

// ──────────────────────────────────────────────
// CHART DATA
// ──────────────────────────────────────────────
export const dailySalesData = [
  { name: "Mon", revenue: 12500, orders: 85 },
  { name: "Tue", revenue: 14200, orders: 92 },
  { name: "Wed", revenue: 11800, orders: 78 },
  { name: "Thu", revenue: 15600, orders: 105 },
  { name: "Fri", revenue: 16800, orders: 112 },
  { name: "Sat", revenue: 9200, orders: 58 },
  { name: "Sun", revenue: 8500, orders: 52 },
];

export const hourlyOrdersData = [
  { name: "7AM", orders: 5 },
  { name: "8AM", orders: 18 },
  { name: "9AM", orders: 22 },
  { name: "10AM", orders: 8 },
  { name: "11AM", orders: 6 },
  { name: "12PM", orders: 35 },
  { name: "1PM", orders: 42 },
  { name: "2PM", orders: 15 },
  { name: "3PM", orders: 12 },
  { name: "4PM", orders: 20 },
  { name: "5PM", orders: 14 },
  { name: "6PM", orders: 10 },
  { name: "7PM", orders: 28 },
  { name: "8PM", orders: 32 },
  { name: "9PM", orders: 18 },
];

export const popularItemsData = [
  { name: "Chicken Biryani", value: 145 },
  { name: "Masala Dosa", value: 120 },
  { name: "Paneer Butter Masala", value: 98 },
  { name: "Masala Chai", value: 210 },
  { name: "Butter Chicken", value: 88 },
  { name: "Samosa", value: 156 },
  { name: "Vada Pav", value: 134 },
];

export const categoryRevenueData = [
  { name: "Breakfast", value: 18500 },
  { name: "Lunch", value: 32400 },
  { name: "Dinner", value: 28600 },
  { name: "Snacks", value: 12800 },
  { name: "Beverages", value: 6200 },
];
