import '../index.css'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCards } from "../reducers/fetchProducts";
import _ from "lodash";

export let baseURL = "http://localhost:8000/products";

export const CardsView = () => {
  const [string, setString] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const {
    cards = [],
    loading,
    error,
  } = useSelector((state) => {
    console.log("state ", state)
    return state.card || {};
  });
  const totalProducts = useSelector((state) => {
    return state.card.totalProducts;
  });
  const categories = useSelector((state) => {
    return state.card.allCategories
  })

  console.log("CARDS VIEW CATEGORIES", categories)

  console.log("Cards View State ", cards)

  const pages = Math.ceil(totalProducts / 9);

  const pageNumbers = [];
  for (let i = 0; i < pages; i++) {
    pageNumbers.push(i + 1);
  }

  // to concatenate values to our URL:
  const concatenateUrl = () => {
    let queryParams = [];
    if (category) queryParams.push(`category=${category}`);
    if (string) queryParams.push(`string=${string}`);
    if (price === "priceHigh") queryParams.push(`priceHigh=true`);
    if (price === "priceLow") queryParams.push(`priceLow=true`);
    if (page) queryParams.push(`page=${page}`);

    if (queryParams.length > 0) {
      return `${baseURL}?${queryParams.join("&")}`;
    } else {
      return baseURL;
    }
  };

  const handleFiltersUpdate = () => {
    const url = concatenateUrl();
    console.log(url)
    dispatch(fetchCards(url));
  };

  useEffect(() => {
    handleFiltersUpdate();
  }, [category, price, page]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setString(string);
      handleFiltersUpdate();
    }
  };

  const handleResetFilters = () => {
    baseURL = "http://localhost:8000/products";
    setCategory("");
    setString("");
    setPrice("");
    setPage(1);
    dispatch(fetchCards(baseURL));
  };

  const handlePriceSelect = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderCards = () => {
    if (!_.isEmpty(cards)) {
      return (
        <div className="row">
          {cards.map((card) => {
            return (
              <div key={card._id} className="col-md-4">
                <div className="card" id="card-header">
                  <div className="card-body">
                    <p className="card-title">
                      Category: <b>{card.category}</b>
                    </p>
                    <h4>
                      {card.price}
                    </h4>
                    <img style={{width:'100%', marginBottom: '10px', marginTop: '10px'}}
                      src="https://placehold.jp/250x250.png?css=%7B%22border-radius%22%3A%2215px%22%7D"
                      alt="card product"
                    ></img>
                    <h4 style={{marginTop:25}}>{card.name}</h4>
                  </div>
                </div>{" "}
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>No products found</div>;
    }
  };
  return (
    <div className="container">
      <div className="row m-4">
        <div className="col-2">
          <button onClick={handleResetFilters} className="btn btn-primary">
            Reset Filters
          </button>
        </div>
        <div className="col-5">
          <input
            className="form-control"
            type="Search"
            placeholder="Search"
            onChange={(e) => {
              setString(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            value={string}
          ></input>
        </div>
        <div className="col-2">
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            className="form-select"
          >
            <option selected value="">Category</option>
           {categories.map((cat) => {
            return <option value={cat}>{cat}</option>
           })} 
          </select>
        </div>
        <div className="col-2">
          <select
            value={price}
            onChange={handlePriceSelect}
            className="form-select "
          >
            <option selected>Sort By Price</option>
            <option value="priceHigh">Price High</option>
            <option value="priceLow">Price Low</option>
          </select>
        </div>
      </div>
      {renderCards()}
      <div className="row">
        <div className="col">
          <nav style={{marginTop:30}}>
            <ul className="pagination">
              <h5 style={{marginRight:10}}>Pages </h5>
              {pageNumbers.map((num) => {
                return (
                  <li
                    className="page-item page-link"
                    value={num}
                    onClick={() => {
                      setPage(num);
                    }}
                  >
                    {num}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
