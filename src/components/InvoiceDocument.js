// Branded PDF invoice, built with @react-pdf/renderer.
// Rendered on the server by the /admin/invoices/[id]/pdf route.
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { SHOP } from "@/lib/shop";

const rs = (n) => "Rs " + Number(n).toLocaleString("en-LK");

const s = StyleSheet.create({
  page: { padding: 36, fontSize: 10, color: "#1a1a1a", fontFamily: "Helvetica" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 3,
    borderBottomColor: "#e01010",
    paddingBottom: 12,
    marginBottom: 16,
  },
  shopName: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#e01010" },
  muted: { color: "#666" },
  invoiceTitle: { fontSize: 22, fontFamily: "Helvetica-Bold", textAlign: "right" },
  row: { flexDirection: "row" },
  section: { marginBottom: 16 },
  label: { fontFamily: "Helvetica-Bold", marginBottom: 2 },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#0f0d0c",
    color: "#ffc400",
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontFamily: "Helvetica-Bold",
  },
  tr: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  cDesc: { width: "50%" },
  cQty: { width: "15%", textAlign: "center" },
  cPrice: { width: "17%", textAlign: "right" },
  cTotal: { width: "18%", textAlign: "right" },
  totals: { marginTop: 12, alignSelf: "flex-end", width: "45%" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  grand: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: "#0f0d0c",
    marginTop: 4,
    paddingTop: 6,
  },
  grandText: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#e01010" },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 36,
    right: 36,
    textAlign: "center",
    color: "#888",
    fontSize: 9,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
});

export default function InvoiceDocument({ invoice }) {
  const date = new Date(invoice.createdAt).toLocaleDateString("en-LK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.shopName}>{SHOP.name}</Text>
            <Text style={s.muted}>{SHOP.location}</Text>
            <Text style={s.muted}>Phone: {SHOP.phoneDisplay}</Text>
            <Text style={s.muted}>{SHOP.email}</Text>
          </View>
          <View>
            <Text style={s.invoiceTitle}>INVOICE</Text>
            <Text style={{ textAlign: "right", marginTop: 4 }}>{invoice.invoiceNumber}</Text>
            <Text style={[s.muted, { textAlign: "right" }]}>{date}</Text>
          </View>
        </View>

        {/* Bill to */}
        <View style={s.section}>
          <Text style={s.label}>Bill To:</Text>
          {invoice.customer ? (
            <>
              <Text>{invoice.customer.name}</Text>
              {invoice.customer.phone ? <Text style={s.muted}>{invoice.customer.phone}</Text> : null}
              {invoice.customer.address ? <Text style={s.muted}>{invoice.customer.address}</Text> : null}
            </>
          ) : (
            <Text style={s.muted}>Walk-in customer</Text>
          )}
        </View>

        {/* Items table */}
        <View style={s.tableHead}>
          <Text style={s.cDesc}>Item</Text>
          <Text style={s.cQty}>Qty</Text>
          <Text style={s.cPrice}>Unit Price</Text>
          <Text style={s.cTotal}>Total</Text>
        </View>
        {invoice.items.map((it, i) => (
          <View style={s.tr} key={i}>
            <Text style={s.cDesc}>{it.description}</Text>
            <Text style={s.cQty}>{it.quantity}</Text>
            <Text style={s.cPrice}>{rs(it.unitPrice)}</Text>
            <Text style={s.cTotal}>{rs(it.lineTotal)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={s.totals}>
          <View style={s.totalRow}>
            <Text style={s.muted}>Subtotal</Text>
            <Text>{rs(invoice.subtotal)}</Text>
          </View>
          {invoice.discount > 0 && (
            <View style={s.totalRow}>
              <Text style={s.muted}>Discount</Text>
              <Text>- {rs(invoice.discount)}</Text>
            </View>
          )}
          <View style={s.grand}>
            <Text style={s.grandText}>TOTAL</Text>
            <Text style={s.grandText}>{rs(invoice.total)}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={s.footer}>
          Thank you for your business! · {SHOP.name} · {SHOP.phoneDisplay} · Instagram @{SHOP.instagram}
        </Text>
      </Page>
    </Document>
  );
}
