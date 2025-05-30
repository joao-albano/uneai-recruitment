
import React from "react";
import { Navigate } from "react-router-dom";
import { useProduct } from "@/context/product";
import { ProductType } from "@/context/product/types";

interface ProductGuardProps {
  children: React.ReactNode;
  allowedProduct: ProductType;
  redirectTo: string;
}

export const ProductGuard: React.FC<ProductGuardProps> = ({
  children,
  allowedProduct,
  redirectTo,
}) => {
  const { currentProduct } = useProduct();

  if (currentProduct !== allowedProduct) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
