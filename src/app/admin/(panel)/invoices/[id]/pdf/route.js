// Generates the branded PDF invoice on the server and returns it.
// Protected: only a logged-in admin can download.
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import InvoiceDocument from "@/components/InvoiceDocument";
import { getInvoiceById } from "@/lib/invoices";
import { createSupabaseServer } from "@/lib/supabase/serverClient";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  // Check login
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const invoice = await getInvoiceById(id);
  if (!invoice) {
    return new Response("Invoice not found", { status: 404 });
  }

  const buffer = await renderToBuffer(
    <InvoiceDocument invoice={invoice} />
  );

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${invoice.invoiceNumber}.pdf"`,
    },
  });
}
