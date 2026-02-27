"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProduct, getProductCategories, uploadProductImage, removeProductImage } from "@/lib/actions/admin-products-actions";

export default function CreateProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    sku: "",
    stock: "",
    category: "HEADPHONES",
    isFeatured: false,
    isArchived: false,
  });

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getProductCategories().then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    // Create preview URL immediately
    const previewUrl = URL.createObjectURL(file);
    setImages((prev) => [...prev, previewUrl]);

    // Upload to server
    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      const result = await uploadProductImage(uploadFormData);
      if (result.success && result.url) {
        // Replace preview URL with actual URL
        setImages((prev) => prev.map((img) => (img === previewUrl ? result.url! : img)));
      } else {
        setError(result.error || "Failed to upload image");
        // Remove the preview if upload failed
        setImages((prev) => prev.filter((img) => img !== previewUrl));
      }
    } catch (err) {
      setError("An error occurred while uploading");
      setImages((prev) => prev.filter((img) => img !== previewUrl));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleImageUpload(event);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Remove image
  const handleRemoveImage = async (index: number) => {
    const imageUrl = images[index];
    if (imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    } else {
      await removeProductImage(imageUrl);
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
        sku: formData.sku,
        stock: parseInt(formData.stock) || 0,
        category: formData.category,
        isFeatured: formData.isFeatured,
        isArchived: formData.isArchived,
        images: images.filter((img) => !img.startsWith("blob:")), // Only send uploaded images
      });

      if (result.success) {
        router.push("/admin/products");
      } else {
        setError(result.error || "Failed to create product");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-20 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/products" className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[16px]">home</span>
          Products
        </Link>
        <span className="material-symbols-outlined text-slate-400 text-[14px]">chevron_right</span>
        <span className="text-slate-900 dark:text-white text-sm font-semibold">Create New Product</span>
      </div>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight mb-2">Create New Product</h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">Set up your product details, pricing, and media to start selling.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information Section */}
            <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Basic Info
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Product Title</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                    placeholder="e.g. Premium Wireless Noise Cancelling Headphones"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 outline-none resize-none"
                    placeholder="Describe the key features and benefits of your product..."
                    rows={6}
                  />
                </div>
              </div>
            </section>

            {/* Media Section */}
            <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">image</span>
                Product Images
              </h3>
              
              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-slate-900 dark:text-white font-semibold">Uploading image...</p>
                  </div>
                ) : (
                  <>
                    <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                    </div>
                    <p className="text-slate-900 dark:text-white font-semibold mb-1">Click to upload or drag and drop</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">PNG, JPG, GIF or WebP (max. 5MB)</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </div>

              {/* Image Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {images.map((image, index) => (
                    <div key={index} className="aspect-square relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded">
                          Primary
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                      {uploading && index === images.length - 1 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Pricing & Inventory Section */}
            <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Pricing & Inventory
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Base Price</label>
                  <div className="relative border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 h-12 flex items-center focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                    <span className="pl-3 text-slate-500">$</span>
                    <input
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full bg-transparent pl-8 pr-4 outline-none text-slate-900 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sale Price (optional)</label>
                  <div className="relative border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 h-12 flex items-center focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                    <span className="pl-3 text-slate-500">$</span>
                    <input
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleChange}
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full bg-transparent pl-8 pr-4 outline-none text-slate-900 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">SKU</label>
                  <input
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                    placeholder="e.g. PROD-001"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Stock Quantity</label>
                  <input
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    type="number"
                    min="0"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Organization Section */}
            <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">category</span>
                Organization
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white outline-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Status & Visibility Section */}
            <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">visibility</span>
                Status & Visibility
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Featured Product</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Show on homepage featured section</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      name="isFeatured"
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Draft Mode</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Hide from catalog (archived)</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      name="isArchived"
                      type="checkbox"
                      checked={formData.isArchived}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Creating...
                  </span>
                ) : (
                  "Create Product"
                )}
              </button>
              <Link
                href="/admin/products"
                className="w-full py-3 bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
