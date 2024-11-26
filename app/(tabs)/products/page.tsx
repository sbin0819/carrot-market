import ProductList from '@/components/product-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

// const getCachedProducts = nextCache(getInitialProducts, ['products']);

async function getInitialProducts() {
  console.log('getInitialProducts');
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    // take: 1,
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: 'Products',
};

// export const dynamic = 'force-dynamic';
export const revalidate = 30;

export default async function Products() {
  const initialProducts = await getInitialProducts();

  const revalidate = async () => {
    'use server';
    revalidatePath('/products');
  };

  return (
    <div className="relative">
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <div className="fixed bottom-24 flex w-full max-w-screen-md justify-end pr-8">
        <Link
          href="/products/add"
          className="flex size-16 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400"
        >
          <PlusIcon className="size-10" />
        </Link>
      </div>
    </div>
  );
}
