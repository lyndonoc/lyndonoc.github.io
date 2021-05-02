import { DateTime } from 'luxon';
import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

const POST_FILENAME_REGEX = /(\d{4})-(\d{2})-(\d{2})-(.+)\/$/;

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions: { createNodeField },
  getNode,
}) => {
  if (node.internal.type !== 'MarkdownRemark') {
    return;
  }

  const slug = createFilePath({
    node,
    getNode,
  });

  const match = POST_FILENAME_REGEX.exec(slug);

  if (match !== null) {
    const [, year, month, day, filename] = match;
    const date = DateTime.local(Number(year), Number(month), Number(day));

    createNodeField({
      name: 'slug',
      node,
      value: `/blog/${filename}`,
    });
    createNodeField({
      name: 'type',
      node,
      value: 'post',
    });
    createNodeField({
      name: 'date',
      node,
      value: date.toISO(),
    });
  } else {
    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });
    createNodeField({
      name: 'type',
      node,
      value: 'page',
    });
  }
};
