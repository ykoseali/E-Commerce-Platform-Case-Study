"use client";

type CategoryCardProps = {
  _id: string;
  name: string;
  image: string;
};

export default function CategoryCard({ _id, name, image }: CategoryCardProps) {
  return (
    <a
      href={`/category/${_id}`}
      className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-all block"
    >
      <div className="h-24 w-full overflow-hidden rounded mb-2 bg-gray-100">
        <img
          src={image}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder.png";
          }}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="font-medium text-gray-800">{name}</p>
    </a>
  );
}
