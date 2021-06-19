import React from "react";
const Carousel = ({ data }) => {
  return (
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="false"
    >
      <div class="carousel-inner">
        {data.map((d, i) => (
          <div class={i === 0 ? "carousel-item active" : "carousel-item"}>
            <img
              src={`http://localhost:3001/api/images/${d._id}`}
              class="d-block w-100"
              alt=""
            />
          </div>
        ))}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
