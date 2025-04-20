import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../redux/slices/product/ProductsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleProductList } from "../components";

function SingleProductPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  return <SingleProductList />;
}

export default SingleProductPage;
