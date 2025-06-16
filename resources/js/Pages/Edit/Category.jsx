import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

export default function EditCategoryForm({ category, onClose }) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: category.name || '',
  });

  const [localErrors, setLocalErrors] = useState({});

  const handleChange = (e) => {
    setData("name", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalErrors({});

    put(`/categories/${category.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        onClose();
      },
      onError: (err) => {
        setLocalErrors(err);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg p-2">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Category Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md shadow-sm border px-3 py-2 ${
            errors.name ? "border-red-500" : "border-green-300"
          } focus:ring-[#bbf7d0] focus:border-[#bbf7d0] sm:text-sm`}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={processing}
          className="w-full bg-[#bbf7d0] hover:bg-[#86efac] text-green-900 font-medium py-2 px-4 rounded-md transition"
        >
          Update Category
        </button>
      </div>
    </form>
  );
}
