import { useState, useEffect } from "react";
import { useCollapse } from "react-collapsed";

import Navbar from "../../components/NavBar";
import Filters from "./Filters";
import Availability from "./Availability";
import Categories from "./Categories";
import Sort from "./Sort";
import Items from "./Items";
import TopButton from "../../components/TopButton";
import Footer from "../../components/Footer";
import { All, Apply, MobileFilters, FiltersBTN } from "./StyledComponents";

const Products = () => {
  useEffect(() => {
    document.title = "Our Products";
  }, []);

  // declares state/setter used to set products to render
  const [products, setProducts] = useState();
  // declares states/setters used to set user-selected filter and sort options
  const [sortBy, setSortBy] = useState("AZ");
  const [filters, setFilters] = useState([]);
  const [availOnly, setAvailOnly] = useState("default");

  // loads all products sorted alphabetically (default)
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`https://e-wear-emporium-bb9ddc8904ce.herokuapp.com/products`);
        const { data } = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();

    return setProducts(null);
  }, []);

  // sends new fetch req with sort & filter parameters
  const fetchFiltered = async (sortParam, filtersParam) => {
    setProducts(null);
    try {
      const res = await fetch(
        `/products?sort=${sortParam ? sortParam : sortBy}&filters=${filtersParam ? filtersParam.toString() : filters.toString()
        }&all=${availOnly}`
      );
      const { data } = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // sets sort parameter and triggers new fetch to update results
  const sortHandler = (event) => {
    setSortBy(event.target.value);
    fetchFiltered(event.target.value, null);
  };

  // sets filter parameters
  const filtersHandler = (checked, event) => {
    const checkedFilter = event.currentTarget.innerText;
    // if filter array contains value,
    filters.includes(checkedFilter)
      ? // remove it from array,
      setFilters(filters.filter((category) => category !== checkedFilter))
      : // otherwise add to array
      setFilters([...filters, checkedFilter]);
  };

  // sets user-selected availabilty option
  const stockFilter = (event) => {
    setAvailOnly(event.target.value);
  };

  // triggers new fetch to update results
  const applyFilters = () => {
    fetchFiltered(sortBy, filters);
  };
  // same as above + collapses filters menu
  const applyMobile = () => {
    fetchFiltered(sortBy, filters);
    setExpanded(false);
  };

  // collapsible filters menu
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <>
      <Navbar />
      {/* determines and displays number of items rendered */}
      <All>All Products {products ? `(${products.length})` : ""}</All>

      <Filters
        // passes filter/sort selections down to Filters component
        filtersHandler={filtersHandler}
        applyFilters={applyFilters}
        stockFilter={stockFilter}
      />
      {/* same as above but differentiated for mobile to allow for collapse/expanding  menu*/}
      <MobileFilters {...getCollapseProps()}>
        <Categories filtersHandler={filtersHandler} />
        <Availability stockFilter={stockFilter} />
        <Apply onClick={applyMobile}>Apply</Apply>
      </MobileFilters>
      {/* renders button so user can sort by price or name */}
      <Sort sortHandler={sortHandler} />

      {/* renders "Filters button to collapse/expand menu (mobile)*/}
      <FiltersBTN
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        {isExpanded ? "Filters -" : "Filters +"}
      </FiltersBTN>
      {/* renders all item product cards to display */}
      <Items products={products} />
      {/* scrolls back to top of page */}
      <TopButton />
      <Footer />
    </>
  );
};

export default Products;
