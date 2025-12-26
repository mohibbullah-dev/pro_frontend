import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurantInfo } from "../../redux/slices/restaurantSlice";
import { useMutation } from "@tanstack/react-query";
import { CreateRestaurantApi } from "../../https";
import { useNavigate } from "react-router-dom";

export default function CreateRestaurantModal({ restaurant, setRestaurant }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("open", restaurant);
  }, [restaurant]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    logoFile: null,

    // ✅ NEW FIELDS (match schema)
    status: "active",
    openingOpen: "10:00 AM",
    openingClose: "11:00 PM",
    currency: "BDT",
    taxPercent: 0,
  });

  const [logoPreview, setLogoPreview] = useState("");

  useEffect(() => {
    if (!form.logoFile) {
      setLogoPreview("");
      return;
    }
    const url = URL.createObjectURL(form.logoFile);
    setLogoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [form.logoFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleLogoPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((p) => ({ ...p, logoFile: file }));
    console.log("fileDemo :", file);
  };

  const submit = (e) => {
    e.preventDefault();
    // ✅ minimal validation
    if (!form.name.trim()) return toast.error("name is required");
    if (!form.email.trim()) return toast.error("email is required");
    if (!form.address.trim()) return toast.error("address is required");
    if (!form.logoFile) return toast.error("logoFile is required");
    if (!form.status) return toast.error("status is required");

    // new fields validation
    if (!form.openingOpen.trim())
      return toast.error("opening time is required");
    if (!form.openingClose.trim())
      return toast.error("closing time is required");

    const tax = Number(form.taxPercent);
    if (Number.isNaN(tax) || tax < 0 || tax > 100)
      return toast.error("taxPercent must be 0-100");

    const restData = new FormData();
    restData.append("name", form?.name);
    restData.append("contact[email]", form?.email);
    restData.append("contact[phone]", form?.phone);
    restData.append("address", form?.address);
    restData.append("openingHours[close]", form?.openingClose);
    restData.append("openingHours[open]", form?.openingOpen);
    restData.append("currency", form?.currency);
    restData.append("taxPercent", form?.taxPercent);
    restData.append("status", form?.status);
    restData.append("restaurantLogo", form?.logoFile);

    restaurantMutation.mutate(restData);
  };

  const restaurantMutation = useMutation({
    mutationFn: (restData) => CreateRestaurantApi(restData),
    onSuccess: (data) => {
      console.log("response :", data);
      toast.success("restaurant Created succefully");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={() => setRestaurant(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        // className="relative w-[92vw] max-w-3xl rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl"
        className="relative w-[92vw] max-w-3xl
    rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl
    max-h-[90vh] overflow-y-scroll scrollbar-hide"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Create Restaurant
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Fill details to add a new restaurant.
            </p>
          </div>

          <button
            onClick={() => setRestaurant(false)}
            className="h-9 cursor-pointer w-9 rounded-xl grid place-items-center text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={submit} className="px-7 py-6">
          {/* Row 1: Name + Logo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm text-white/80 mb-2">
                Restaurant Name <span className="text-amber-400">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter restaurant name"
                className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm text-white/80 mb-2">Logo *</label>

              <div className="relative rounded-xl border border-dashed border-white/20 bg-zinc-950/40 p-4 h-[108px] flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <div className="w-full h-full flex items-center gap-3">
                    <img
                      src={logoPreview}
                      alt="logo-preview"
                      className="h-16 w-16 rounded-xl object-cover border border-white/10"
                    />
                    <div className="text-xs text-white/60">
                      <div className="text-white/80 font-medium">
                        Logo selected
                      </div>
                      <div className="mt-1">{form.logoFile?.name}</div>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((p) => ({ ...p, logoFile: null }))
                        }
                        className="mt-2 inline-flex text-amber-300 hover:text-amber-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <div className="text-white/80 font-medium">
                        Upload Logo
                      </div>
                      <div className="text-xs text-white/50 mt-1">
                        PNG, JPG, SVG allowed
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={handleLogoPick}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-7">
            <h3 className="text-sm font-semibold text-amber-300 tracking-wide">
              Contact Information
            </h3>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Email <span className="text-amber-400">*</span>
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/15">
                  <span className="text-white/50">✉️</span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email address"
                    className="w-full bg-transparent text-white placeholder:text-white/35 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Phone
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/15">
                  <span className="text-white/50">📞</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full bg-transparent text-white placeholder:text-white/35 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ✅ NEW: Business Settings */}
          <div className="mt-7">
            <h3 className="text-sm font-semibold text-amber-300 tracking-wide">
              Business Settings
            </h3>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* status */}
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Status <span className="text-amber-400">*</span>
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
                >
                  <option value="active" className="bg-zinc-900">
                    Active
                  </option>
                  <option value="inactive" className="bg-zinc-900">
                    Inactive
                  </option>
                  <option value="closed" className="bg-zinc-900">
                    Closed
                  </option>
                </select>
              </div>

              {/* currency */}
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Currency <span className="text-amber-400">*</span>
                </label>
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
                >
                  <option value="BDT" className="bg-zinc-900">
                    BDT
                  </option>
                  <option value="INR" className="bg-zinc-900">
                    INR
                  </option>
                  <option value="USD" className="bg-zinc-900">
                    USD
                  </option>
                </select>
              </div>

              {/* opening hours */}
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Opening Time
                </label>
                <input
                  name="openingOpen"
                  value={form.openingOpen}
                  onChange={handleChange}
                  placeholder='e.g. "10:00 AM"'
                  className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Closing Time
                </label>
                <input
                  name="openingClose"
                  value={form.openingClose}
                  onChange={handleChange}
                  placeholder='e.g. "11:00 PM"'
                  className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
                />
              </div>

              {/* taxPercent */}
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-2">
                  Tax Percent (0 - 100)
                </label>
                <input
                  type="number"
                  name="taxPercent"
                  value={form.taxPercent}
                  onChange={handleChange}
                  min={0}
                  max={100}
                  step={0.01}
                  placeholder="e.g. 5% / 10% "
                  className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block text-sm text-white/80 mb-2">
              Address <span className="text-amber-400">*</span>
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter full address"
              rows={3}
              className="w-full resize-none rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
            />
          </div>

          {/* Footer */}
          <div className="mt-7">
            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 py-3.5 font-semibold text-black hover:bg-amber-400 active:bg-amber-500 transition shadow-[0_10px_30px_rgba(245,158,11,0.18)]"
            >
              Add Restaurant
            </button>

            <p className="mt-3 text-xs text-white/45">
              Required fields: Name, Email, Address, Logo
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
