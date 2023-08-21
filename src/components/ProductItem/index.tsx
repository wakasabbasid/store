const ProductItem = ({
  product,
  onAddToBasket,
  onRemoveFromBasket,
  basketQuantity,
  onRemoveAllFromBasket,
}: ProductItemProps) => {
  const { id, img, name, price } = product,
    isDisabled = basketQuantity === 0;

  return (
    <div className="border p-4 flex items-center justify-between mb-4 rounded">
      <div className="flex items-center">
        <img src={img} alt={name} className="w-16 h-24 mr-4 rounded" />
        <div className="flex flex-col gap-y-5">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p>{`Price: $${price.toFixed(2)}`}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-5">
        <p className="font-semibold">{`Quantity: ${basketQuantity}`}</p>
        <div className="flex space-x-1">
          <button
            onClick={() => onRemoveFromBasket(id)}
            className={
              "bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors w-10"
            }
            disabled={isDisabled}
          >
            {"-"}
          </button>
          <button
            onClick={() => onAddToBasket(id)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors w-10"
          >
            {"+"}
          </button>
        </div>
        <button
          onClick={() => onRemoveAllFromBasket(id)}
          className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
          disabled={isDisabled}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
