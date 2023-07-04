interface Product {
    id: number;
    referenceId?: string;
    description: string;
    imageUrl: string;
    categories?: ProductCategory[];
    variants?: Variant[];
}

interface ProductCategory {
    id: number;
    productId: number;
    categoryId: number;
    category: Category
}

interface ShoppingCart {
    product: Product;
    variant: Variant;
    quantity: number;
}
