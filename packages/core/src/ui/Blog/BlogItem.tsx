import { Card } from "../Card";
import { formatDate } from "../../utils/formatDate";
import { Blog } from "../types";

interface Props {
  blog: Blog;
}

export const BlogItem: React.FC<Props> = ({ blog }) => {
  return (
    <article className="blogitem md:grid md:grid-cols-4 md:items-baseline">
      <Card className="blogitem-card md:col-span-3">
        <Card.Title className="blogitem-title" href={`${blog.urlPath}`}>
          {blog.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={blog.date}
          className="blogitem-date md:hidden"
          decorate
        >
          {formatDate(blog.date)}
        </Card.Eyebrow>
        {blog.description && (
          <Card.Description className="blogitem-descr">
            {blog.description}
          </Card.Description>
        )}
        <Card.Cta className="blogitem-cta">Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={blog.date}
        className="blogitem-date mt-1 hidden md:block"
      >
        {formatDate(blog.date)}
      </Card.Eyebrow>
    </article>
  );
};
