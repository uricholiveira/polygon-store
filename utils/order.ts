interface Order {
    id: number;
    referenceId: string;
    status?: OrderStatus;
    items?: OrderItems[];
    totalAmount: number;
}

interface OrderItems {
    id: number;
    referenceId: string;
    amount: number;
    product: Product;
    variant: Variant;
    order: Order;
}

interface OrderStatus {
    id: number;
    description: string;
}
