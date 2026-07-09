"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { useLang } from "@/components/LanguageProvider";
import { formatPrice } from "@/lib/products";
import { getActiveCoupons, validateCoupon } from "@/lib/coupons";
import { SHOP, whatsappLink } from "@/lib/shop";
import { IconWhatsApp, IconTruck } from "@/components/icons";
import { createOrder } from "./actions";

export default function CheckoutPage() {
  const { items, subtotal, clear, loaded } = useCart();
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);

  // Coupons
  const [coupons, setCoupons] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [applied, setApplied] = useState(null); // { code, discount }
  const [couponMsg, setCouponMsg] = useState("");

  useEffect(() => {
    getActiveCoupons().then(setCoupons).catch(() => {});
  }, []);

  const discount = applied ? applied.discount : 0;
  const total = Math.max(0, subtotal - discount);

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    setCouponMsg("");
    if (!code) return;
    const coupon = coupons.find((c) => c.code.toUpperCase() === code);
    const res = validateCoupon(coupon, { subtotal, slugs: items.map((i) => i.slug) });
    if (res.ok) {
      setApplied({ code: coupon.code, discount: res.discount });
      setCouponMsg(`Coupon applied — you saved ${formatPrice(res.discount)}!`);
    } else {
      setApplied(null);
      setCouponMsg(res.reason);
    }
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = t("checkout.errName");
    if (!form.phone.trim()) e.phone = t("checkout.errPhone");
    else if (!/[0-9]{9,}/.test(form.phone.replace(/\D/g, ""))) e.phone = t("checkout.errPhone");
    if (!form.address.trim()) e.address = t("checkout.errAddress");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function placeOrder() {
    if (!validate() || items.length === 0 || placing) return;
    setPlacing(true);

    // 1) Save the order to the database (non-blocking — if it fails,
    //    we still send the WhatsApp order so no sale is lost).
    let orderNumber = null;
    try {
      const res = await createOrder({
        name: form.name,
        phone: form.phone,
        address: form.address,
        note: form.note,
        items: items.map((i) => ({ slug: i.slug, name: i.name, price: i.price, qty: i.qty })),
        subtotal,
        discount,
        couponCode: applied?.code || null,
        total,
      });
      if (res?.orderNumber) orderNumber = res.orderNumber;
    } catch {}

    // 2) Build the WhatsApp message
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const lines = items.map(
      (it, i) =>
        `${i + 1}. ${it.name}  x${it.qty} = ${formatPrice(it.price * it.qty)}\n   ${origin}/products/${it.slug}`
    );

    const message =
      `*NEW ORDER — ${SHOP.name}*\n` +
      (orderNumber ? `*Order No:* ${orderNumber}\n` : "") +
      `\n*Customer:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Address:* ${form.address}\n` +
      (form.note.trim() ? `*Note:* ${form.note}\n` : "") +
      `\n*Items:*\n${lines.join("\n")}\n` +
      `\nSubtotal: ${formatPrice(subtotal)}\n` +
      (applied ? `Coupon (${applied.code}): -${formatPrice(discount)}\n` : "") +
      `Delivery: FREE\n` +
      `*TOTAL (Cash on Delivery): ${formatPrice(total)}*`;

    // 3) Open WhatsApp to the shop with the pre-filled order
    window.open(whatsappLink(message), "_blank");
    clear();
    setPlaced(true);
    setPlacing(false);
  }

  // Success screen
  if (placed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <IconWhatsApp width={34} height={34} />
        </div>
        <h1 className="mt-4 text-xl font-black text-gray-900">{t("checkout.sent")}</h1>
        <p className="mt-2 text-gray-600">{t("checkout.sentMsg")}</p>
        <Link href="/products" className="brand-gradient mt-6 inline-block rounded-full px-6 py-3 font-bold text-white shadow">
          {t("btn.browse")}
        </Link>
      </div>
    );
  }

  if (loaded && items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-xl font-black text-gray-900">{t("cart.empty")}</h1>
        <Link href="/products" className="brand-gradient mt-6 inline-block rounded-full px-6 py-3 font-bold text-white shadow">
          {t("btn.browse")}
        </Link>
      </div>
    );
  }

  const field = "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none focus:border-brand-orange";
  const labelCls = "mb-1 block text-sm font-semibold text-gray-700";

  return (
    <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4">
      <Link href="/cart" className="text-sm font-semibold text-gray-500 hover:text-brand-red">← {t("cart.title")}</Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">{t("checkout.title")}</h1>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-green-700">
        <IconTruck width={16} height={16} /> {t("checkout.cod")}
      </p>

      {/* Delivery details */}
      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-black text-gray-900">{t("checkout.deliveryDetails")}</h2>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>{t("checkout.name")} *</label>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} className={field} />
            {errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className={labelCls}>{t("checkout.phone")} *</label>
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={field} placeholder="071 234 5678" inputMode="tel" />
            {errors.phone && <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label className={labelCls}>{t("checkout.address")} *</label>
            <textarea value={form.address} onChange={(e) => update("address", e.target.value)} rows={3} className={field} />
            {errors.address && <p className="mt-1 text-xs font-semibold text-red-600">{errors.address}</p>}
          </div>
          <div>
            <label className={labelCls}>{t("checkout.note")}</label>
            <input value={form.note} onChange={(e) => update("note", e.target.value)} className={field} />
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-black text-gray-900">{t("checkout.summary")}</h2>
        <ul className="divide-y divide-gray-100">
          {items.map((it) => (
            <li key={it.slug} className="flex items-center justify-between py-2 text-sm">
              <span className="min-w-0 flex-1 truncate text-gray-700">{it.name} <span className="text-gray-400">×{it.qty}</span></span>
              <span className="ml-2 font-semibold text-gray-900">{formatPrice(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
        {/* Coupon */}
        <div className="mt-4 border-t border-gray-200 pt-3">
          <label className="mb-1 block text-sm font-semibold text-gray-700">{t("checkout.coupon")}</label>
          <div className="flex gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="TOOLS10"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm uppercase text-gray-900 outline-none focus:border-brand-orange"
            />
            <button onClick={applyCoupon} type="button" className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-bold text-white hover:bg-black">
              {t("checkout.apply")}
            </button>
          </div>
          {couponMsg && (
            <p className={`mt-1 text-xs font-semibold ${applied ? "text-green-600" : "text-red-600"}`}>{couponMsg}</p>
          )}
        </div>

        <div className="mt-3 space-y-1.5 border-t border-gray-200 pt-3 text-sm">
          <div className="flex justify-between"><span className="text-gray-600">{t("cart.subtotal")}</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
          {discount > 0 && (
            <div className="flex justify-between"><span className="text-gray-600">{t("checkout.coupon").replace("?","")} ({applied.code})</span><span className="font-semibold text-green-600">- {formatPrice(discount)}</span></div>
          )}
          <div className="flex justify-between"><span className="text-gray-600">{t("cart.delivery")}</span><span className="font-bold text-green-600">{t("cart.free")}</span></div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-base"><span className="font-bold text-gray-900">{t("checkout.totalCod")}</span><span className="font-black text-brand-red">{formatPrice(total)}</span></div>
        </div>
      </div>

      <button
        onClick={placeOrder}
        disabled={placing}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-green-600 py-4 text-lg font-bold text-white shadow-lg hover:bg-green-700 disabled:opacity-60"
      >
        <IconWhatsApp width={22} height={22} /> {placing ? t("checkout.placing") : t("checkout.orderNow")}
      </button>
      <p className="mt-2 text-center text-xs text-gray-400">
        Tapping this opens WhatsApp with your order ready to send to {SHOP.phoneDisplay}.
      </p>
    </div>
  );
}
