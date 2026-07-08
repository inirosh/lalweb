"use client";

// Generic delete button: asks for confirmation, then calls a server
// action bound with the record id. Reused across admin sections.
export default function ConfirmDeleteButton({ id, name, action, label = "Delete" }) {
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
        {label}
      </button>
    </form>
  );
}
