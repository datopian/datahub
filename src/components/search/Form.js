import React from 'react'
import PropTypes from 'prop-types';

/**
 * Search component form that can be customized with change and submit handlers
 * @param {object} props
 * {
 *  handleChange: A form input change event handler. This function is executed when the
 *                search input or order by input changes.
 *  handleSubmit: A form submit event handler. This function is executed when the
 *                search form is submitted.
 * } 
 * @returns 
 */
const Form = ({ handleChange, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit} className="items-center">
      <div className="flex">
        <input
          type="text"
          name="q"
          value={q}
          onChange={handleChange}
          placeholder="Search"
          aria-label="Search"
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 w-1/2 rounded-lg py-2 px-4 block appearance-none leading-normal"
        />
        <button
          onClick={handleSubmit}
          className="inline-block text-sm px-4 py-3 mx-3 leading-none border rounded text-white bg-black border-black lg:mt-0"
        >
          Search
        </button>
      </div>
      <div className="inline-block my-6 float-right">
        <label htmlFor="field-order-by">Order by:</label>
        <select
          className="bg-white"
          id="field-order-by"
          name="sort"
          onChange={handleChange}
          onBlur={handleChange}
          value={sort}
        >
          <option value="score:desc">Relevance</option>
          <option value="title_string:asc">Name Ascending</option>
          <option value="title_string:desc">Name Descending</option>
          <option value="metadata_modified:desc">Last Modified</option>
          <option value="views_recent:desc">Popular</option>
        </select>
      </div>
    </form>
  );
};

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default Form;
