import { memo } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import WhatsAppButton from './WhatsAppButton';

const CartDrawer = memo(() => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, total, itemCount } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="space-y-2.5 pb-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart
            {itemCount > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Start shopping to add items to your cart
            </p>
            <Button onClick={closeCart} variant="outline">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-border last:border-0">
                    <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight line-clamp-2 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-primary font-semibold">
                        KSh {item.price.toLocaleString()}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="pt-6 space-y-4 border-t border-border mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-lg">
                  KSh {total.toLocaleString()}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>

              <div className="space-y-2">
                <WhatsAppButton
                  productName={items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                  productPrice={total}
                  className="w-full bg-accent hover:bg-accent-hover text-accent-foreground py-3 rounded-lg font-medium transition-all"
                />
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
});

CartDrawer.displayName = 'CartDrawer';

export default CartDrawer;
