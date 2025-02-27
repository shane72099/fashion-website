export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Tops',
    description: 'T-shirts, blouses, shirts, and more',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    slug: 'tops',
  },
  {
    id: '2',
    name: 'Bottoms',
    description: 'Jeans, skirts, pants, and shorts',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
    slug: 'bottoms',
  },
  {
    id: '3',
    name: 'Dresses',
    description: 'Casual and formal dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
    slug: 'dresses',
  },
  {
    id: '4',
    name: 'Outerwear',
    description: 'Coats, jackets, and blazers',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800',
    slug: 'outerwear',
  },
  {
    id: '5',
    name: 'Accessories',
    description: 'Bags, jewelry, and other accessories',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    slug: 'accessories',
  },
]; 