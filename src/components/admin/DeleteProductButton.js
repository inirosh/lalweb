"use client";

// A delete button that asks for confirmation first, then calls the
// server action to remove the product.
export default function DeleteProductButton({ id, name, action }) {
  const deleteWithId = action.bind(null, id);

  return (
    <form
      action={deleteWithId}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
