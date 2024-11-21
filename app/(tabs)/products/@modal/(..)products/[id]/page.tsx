import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import CloseButton from '@/components/close-button';
import { formatToWon } from '@/lib/utils';

import db from '@/lib/db';
import { UserIcon } from '@heroicons/react/24/solid';

const getProduct = async (id: number) => {
  return await db.product.findUnique({
    where: {
      id: id,
    },
    select: {
      photo: true,
      title: true,
      description: true,
      price: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
};

export default async function Modal({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }

  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60">
      <CloseButton />

      <div className="flex w-full max-w-screen-sm flex-col items-center">
        <div className="w-11/12 overflow-hidden rounded-md bg-neutral-900">
          <div className="p-5">
            <div className="relative aspect-square">
              <Image
                fill
                className="object-cover"
                src={`${product.photo}`}
                alt={product.title}
              />
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-3 border-b border-neutral-700 py-3">
                <div className="size-10 overflow-hidden rounded-full">
                  {product.user.avatar !== null ? (
                    <Image
                      src={product.user.avatar}
                      alt={product.user.username}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <UserIcon />
                  )}
                </div>

                <div>
                  <h3 className="text-sm">{product.user.username}</h3>
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <h1 className="text-xl font-semibold">{product.title}</h1>
                <p className="text-sm">{product.description}</p>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between bg-neutral-800 p-5">
            <span className="text-xl font-semibold">
              {formatToWon(product.price)}원
            </span>

            <div className="flex gap-x-5">
              <Link
                className="rounded-md bg-orange-500 px-5 py-2.5 font-semibold text-white"
                href={``}
              >
                채팅하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
