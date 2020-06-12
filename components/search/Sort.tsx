export default function Sort({ selected }) {
  return (
    <div>
      <label htmlFor="field-order-by">Order by:</label>
      <select className="bg-white" id="field-order-by" name="sort">
        <option value="score:desc">Relevance</option>
        <option value="title_string:asc">Name Ascending</option>
        <option value="title_string:desc">Name Descending</option>
        <option value="metadata_modified:desc">Last Modified</option>
        <option value="views_recent:desc">Popular</option>
      </select>
    </div>
  )
}
