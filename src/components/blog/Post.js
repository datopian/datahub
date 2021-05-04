import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

/**
 * Displays a blog post page
 * @param {object} props 
 * {
 *  title: <The title of the blog post>
 *  content: <The body of the blog post>
 *  modified: <The utc date when the post was last modified.
 *  featured_image: <Url/relative url to post cover image
 * }
 * @returns 
 */
const Post = ({ page }) => {
  const { title, content, modified, featured_image } = page;

  return (
    <>
      <h1 className="text-3xl font-semibold text-primary my-6 inline-block">
        {title}
      </h1>
      <p className="mb-6">Edited: {modified}</p>
      <img src={featured_image} className="mb-6" alt="featured_img" />
      <div>{parse(content)}</div>
    </>
  );
};


Post.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    modified: PropTypes.string,
    featured_image: PropTypes.string,
  })
}

export default Post;
