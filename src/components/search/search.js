import React from "react";

export default function Search({ onSubmit, onInputChanges, inTitle }) {
  return <form className="header__form" onSubmit={onSubmit}>
    <input type="search" placeholder="Search question..." onChange={onInputChanges} value={inTitle}/>
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <path d="M18 16.5l-5.14-5.18h-.35a7 7 0 10-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 112 7a5 5 0 0110 0z"></path>
    </svg>
  </form>
}