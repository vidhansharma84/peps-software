"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Search,
  Leaf,
  Drumstick,
  Coffee,
  Utensils,
  Cookie,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatCurrency } from "@/lib/utils";
import { menuItems, menuCategories, type MenuItem } from "@/data/canteen";

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="h-4 w-4" />,
  Utensils: <Utensils className="h-4 w-4" />,
  Cookie: <Cookie className="h-4 w-4" />,
};

export default function CanteenPOSPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    let items = menuItems.filter((item) => item.isAvailable);
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items;
  }, [selectedCategory, searchQuery]);

  const addToCart = (menuItem: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((c) =>
          c.menuItem.id === menuItem.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
  };

  const updateQuantity = (menuItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.menuItem.id === menuItemId
            ? { ...c, quantity: c.quantity + delta }
            : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  const removeFromCart = (menuItemId: string) => {
    setCart((prev) => prev.filter((c) => c.menuItem.id !== menuItemId));
  };

  const getCartQuantity = (menuItemId: string) => {
    return cart.find((c) => c.menuItem.id === menuItemId)?.quantity || 0;
  };

  const subtotal = cart.reduce(
    (sum, c) => sum + c.menuItem.price * c.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty. Please add items to place an order.");
      return;
    }
    const orderNumber = `ORD-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`;
    toast.success(`Order ${orderNumber} placed successfully!`, {
      description: `Total: ${formatCurrency(total)} | ${cart.reduce((s, c) => s + c.quantity, 0)} items`,
    });
    setCart([]);
  };

  const categories = [
    { id: "all", name: "All Items", icon: <Utensils className="h-4 w-4" /> },
    ...menuCategories.map((cat) => ({
      id: cat.name.toLowerCase(),
      name: cat.name,
      icon: categoryIcons[cat.icon] || <Utensils className="h-4 w-4" />,
    })),
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Point of Sale"
        description="Create and manage canteen orders"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left Side - Menu */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                className="gap-2 shrink-0"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.icon}
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const qty = getCartQuantity(item.id);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold truncate">
                                {item.name}
                              </h3>
                              <Badge
                                variant={item.isVeg ? "success" : "destructive"}
                                className="shrink-0 text-[10px] px-1.5 py-0"
                              >
                                {item.isVeg ? (
                                  <Leaf className="h-3 w-3" />
                                ) : (
                                  <Drumstick className="h-3 w-3" />
                                )}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm font-bold text-primary">
                            {formatCurrency(item.price)}
                          </span>
                          {qty === 0 ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Add
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-semibold w-4 text-center">
                                {qty}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side - Cart */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Order Cart
                {cart.length > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {cart.reduce((s, c) => s + c.quantity, 0)} items
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <Receipt className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Cart is empty. Add items from the menu.
                  </p>
                </div>
              ) : (
                <ScrollArea className="max-h-[400px]">
                  <div className="space-y-3">
                    <AnimatePresence>
                      {cart.map((cartItem) => (
                        <motion.div
                          key={cartItem.menuItem.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {cartItem.menuItem.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(cartItem.menuItem.price)} x{" "}
                              {cartItem.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(cartItem.menuItem.id, -1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-xs font-medium w-4 text-center">
                              {cartItem.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(cartItem.menuItem.id, 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm font-semibold w-16 text-right">
                            {formatCurrency(
                              cartItem.menuItem.price * cartItem.quantity
                            )}
                          </p>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-destructive"
                            onClick={() =>
                              removeFromCart(cartItem.menuItem.id)
                            }
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              )}

              {cart.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        GST (5%)
                      </span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 gap-2"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Place Order
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
