import { DashboardTitle } from "@/dashboard/components/DashboardTitle";
import { useState } from "react";
import { X, SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: string;
  tags: string[];
  images: string[];
}

export const CreateUserDebtPage = () => {
  const [product, setProduct] = useState<Product>({
    id: "376e23ed-df37-4f88-8f84-4561da5c5d46",
    title: "Men's Raven Lightweight Hoodie",
    price: 115,
    description:
      "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Hoodie has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve with a french terry interior for versatility in any season. Made from 70% bamboo and 30% cotton.",
    slug: "men_raven_lightweight_hoodie",
    stock: 10,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    gender: "men",
    tags: ["hoodie"],
    images: [
      "https://placehold.co/250x250",
      "https://placehold.co/250x250",
      "https://placehold.co/250x250",
      "https://placehold.co/250x250",
    ],
  });

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <DashboardTitle
          title="Create Debt"
          subtitle="Here you can create a new debt."
        />
        <div className="flex justify-end mb-10 gap-4">
          <Button variant="outline">
            <Link to="/admin/products" className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancell
            </Link>
          </Button>
          <Button>
            <SaveAll className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Debt Information
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="creditor"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Creditor*
                    </label>
                    <select
                      id="creditor"
                      value={product.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="men">Hombre</option>
                      <option value="women">Mujer</option>
                      <option value="unisex">Unisex</option>
                      <option value="kids">Niño</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="creditor"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Amount ($)*
                    </label>
                    <input
                      id="amount"
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        handleInputChange("price", parseFloat(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Precio del producto"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={product.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Descripción del producto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
