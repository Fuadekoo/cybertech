"use client";

import { useState } from "react";
import { useData } from "../../hooks/UseData";
import useMutation from "../../hooks/useMutations";
import Layout from "../../components/Layout";
import {
  getAllProducts,
  createProduct,
  createProductVariant,
  updateProduct,
  updateProductVariant,
  deleteProduct,
  deleteProductVariant,
} from "../../actions/products";

// TypeScript interfaces
interface Product {
  _id: string;
  itemName: string;
  category: string;
  description: string;
  variants?: ProductVariant[];
}

interface ProductVariant {
  _id: string;
  variantCode: string;
  variantSku: string;
  variantName: string;
  unitPrice: number;
  productId: string;
}

interface ProductFormData {
  itemName: string;
  category: string;
  description: string;
}

interface VariantFormData {
  variantCode: string;
  variantSku: string;
  variantName: string;
  unitPrice: number;
  productId: string;
}

// Product Form Component
function ProductForm({
  product,
  onSave,
  onCancel,
  isLoading,
}: {
  product?: Product;
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    itemName: product?.itemName || "",
    category: product?.category || "",
    description: product?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {product ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.itemName}
              onChange={(e) =>
                setFormData({ ...formData, itemName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Variant Form Component
function VariantForm({
  productId,
  variant,
  onSave,
  onCancel,
  isLoading,
}: {
  productId: string;
  variant?: ProductVariant;
  onSave: (data: VariantFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    variantCode: variant?.variantCode || "",
    variantSku: variant?.variantSku || "",
    variantName: variant?.variantName || "",
    unitPrice: variant?.unitPrice || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, productId });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {variant ? "Edit Variant" : "Add New Variant"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variant Code
            </label>
            <input
              type="text"
              value={formData.variantCode}
              onChange={(e) =>
                setFormData({ ...formData, variantCode: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SKU
            </label>
            <input
              type="text"
              value={formData.variantSku}
              onChange={(e) =>
                setFormData({ ...formData, variantSku: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variant Name
            </label>
            <input
              type="text"
              value={formData.variantName}
              onChange={(e) =>
                setFormData({ ...formData, variantName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.unitPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  unitPrice: parseFloat(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Products Page
export default function ProductsPage() {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(
    null
  );
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  // Data fetching
  const [products, isLoadingProducts, refreshProducts] = useData(
    getAllProducts,
    () => {}
  );

  // Mutations
  const [executeCreateProduct, isLoadingCreateProduct] = useMutation(
    createProduct,
    (res) => {
      console.log("Product created:", res);
      refreshProducts();
      setShowProductForm(false);
    }
  );

  const [executeUpdateProduct, isLoadingUpdateProduct] = useMutation(
    updateProduct,
    (res) => {
      console.log("Product updated:", res);
      refreshProducts();
      setShowProductForm(false);
      setEditingProduct(null);
    }
  );

  const [executeDeleteProduct, isLoadingDeleteProduct] = useMutation(
    deleteProduct,
    (res) => {
      console.log("Product deleted:", res);
      refreshProducts();
    }
  );

  const [executeCreateVariant, isLoadingCreateVariant] = useMutation(
    createProductVariant,
    (res) => {
      console.log("Variant created:", res);
      refreshProducts();
      setShowVariantForm(false);
    }
  );

  const [executeUpdateVariant, isLoadingUpdateVariant] = useMutation(
    updateProductVariant,
    (res) => {
      console.log("Variant updated:", res);
      refreshProducts();
      setShowVariantForm(false);
      setEditingVariant(null);
    }
  );

  const [executeDeleteVariant, isLoadingDeleteVariant] = useMutation(
    deleteProductVariant,
    (res) => {
      console.log("Variant deleted:", res);
      refreshProducts();
    }
  );

  const handleProductSave = (data: ProductFormData) => {
    if (editingProduct) {
      executeUpdateProduct(editingProduct.id, data);
    } else {
      executeCreateProduct(data);
    }
  };

  const handleVariantSave = (data: VariantFormData) => {
    if (editingVariant) {
      executeUpdateVariant(editingVariant.id, data);
    } else {
      executeCreateVariant(data);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleEditVariant = (variant: ProductVariant) => {
    setEditingVariant(variant);
    setSelectedProductId(variant.productId);
    setShowVariantForm(true);
  };

  const handleAddVariant = (productId: string) => {
    setSelectedProductId(productId);
    setEditingVariant(null);
    setShowVariantForm(true);
  };

  if (isLoadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Products
              </h1>
              <p className="text-gray-600">Manage your product catalog</p>
            </div>
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowProductForm(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Product List</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {products?.map((product) => (
              <div key={product.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.itemName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Category: {product.category}
                    </p>
                    {product.description && (
                      <p className="text-sm text-gray-500 mb-4">
                        {product.description}
                      </p>
                    )}

                    {/* Variants */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Variants
                        </h4>
                        <button
                          onClick={() => handleAddVariant(product.id)}
                          className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          + Add Variant
                        </button>
                      </div>
                      <div className="space-y-2">
                        {product.variants.map((variant) => (
                          <div
                            key={variant.id}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded"
                          >
                            <div>
                              <p className="text-sm font-medium">
                                {variant.variantName}
                              </p>
                              <p className="text-xs text-gray-600">
                                SKU: {variant.variantSku} | Code:{" "}
                                {variant.variantCode} | Price: $
                                {variant.unitPrice}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditVariant(variant)}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => executeDeleteVariant(variant.id)}
                                disabled={isLoadingDeleteVariant}
                                className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => executeDeleteProduct(product.id)}
                      disabled={isLoadingDeleteProduct}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Form Modal */}
        {showProductForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleProductSave}
            onCancel={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
            isLoading={isLoadingCreateProduct || isLoadingUpdateProduct}
          />
        )}

        {/* Variant Form Modal */}
        {showVariantForm && (
          <VariantForm
            productId={selectedProductId}
            variant={editingVariant}
            onSave={handleVariantSave}
            onCancel={() => {
              setShowVariantForm(false);
              setEditingVariant(null);
              setSelectedProductId("");
            }}
            isLoading={isLoadingCreateVariant || isLoadingUpdateVariant}
          />
        )}
      </div>
    </Layout>
  );
}
