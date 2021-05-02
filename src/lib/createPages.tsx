import { CreatePagesArgs, GatsbyNode } from 'gatsby';
import { DateTime } from 'luxon';
import { chain, map } from 'lodash';
// @ts-ignore
import { createPagePerItem, paginate } from 'gatsby-awesome-pagination';
import { resolve } from 'path';

import { AppPaths } from '../constants/paths';
import { PostPropsType } from '../components/post';
import { PostTagType } from '../templates/archive';

type GatsbyCreatePage = GatsbyNode['createPages'];

interface BaseNodeType {
  node: {
    id: string;
  };
}

interface PostGroupType {
  year: string;
  groupName: string;
  list: Array<{
    date: string;
    id?: string;
    path: string;
    title: string;
  }>;
}

interface GraphQLQueryResults<T> {
  allMarkdownRemark: T;
}

const getTags = async (
  graphql: CreatePagesArgs['graphql'],
): Promise<PostTagType[]> => {
  const tagsQuery = await graphql<
    GraphQLQueryResults<{
      group: PostTagType[];
    }>
  >(`
    {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          name: fieldValue
          totalCount
        }
      }
    }
  `);

  return chain(tagsQuery.data?.allMarkdownRemark.group || [])
    .orderBy(['totalCount', 'name'], ['desc', 'asc'])
    .slice(0, 40)
    .map(({ name, totalCount }, id) => ({ id, name, totalCount }))
    .value();
};

const createArchivePage: GatsbyCreatePage = async (args) => {
  const {
    actions: { createPage },
    graphql,
  } = args;
  const categoriesQuery = await graphql<
    GraphQLQueryResults<{
      group: PostTagType[];
    }>
  >(`
    {
      allMarkdownRemark {
        group(field: frontmatter___categories) {
          name: fieldValue
          totalCount
        }
      }
    }
  `);
  const categories = chain(categoriesQuery.data?.allMarkdownRemark.group || [])
    .orderBy(['totalCount', 'name'], ['desc', 'asc'])
    .slice(0, 30)
    .map(({ name, totalCount }, id) => ({ id, name, totalCount }))
    .value();
  const postGroupsQuery = await graphql<
    GraphQLQueryResults<{
      nodes: PostPropsType[];
    }>
  >(`
    {
      allMarkdownRemark(
        filter: { fields: { type: { eq: "post" } } }
        sort: { order: DESC, fields: fields___date }
      ) {
        nodes {
          id
          frontmatter {
            title
          }
          fields {
            slug
            date
          }
        }
      }
    }
  `);

  const groups = chain(postGroupsQuery.data?.allMarkdownRemark.nodes || [])
    .map((o) => ({
      id: o.id,
      date: o.fields.date,
      title: o.frontmatter.title,
      path: o.fields.slug,
    }))
    .groupBy((o) => DateTime.fromISO(o.date).year)
    .entries()
    .orderBy([0], 'desc')
    .reduce(
      (arr: PostGroupType[], [year, list]) =>
        arr.concat({
          year,
          groupName: `${year} (${list.length})`,
          list,
        }),
      [],
    )
    .value();

  createPage({
    path: AppPaths.archive,
    component: resolve('./src/templates/archive.tsx'),
    context: {
      categories,
      groups,
      tags: await getTags(graphql),
    },
  });
};

const createMarkdownPages: GatsbyCreatePage = async (args) => {
  const {
    actions: { createPage },
    graphql,
  } = args;
  const result = await graphql<
    GraphQLQueryResults<{
      edges: Array<{
        node: {
          id: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            title: string;
          };
        };
      }>;
    }>
  >(`
    {
      allMarkdownRemark(filter: { fields: { type: { eq: "page" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  (result.data?.allMarkdownRemark.edges || []).forEach(({ node }) => {
    const path = node.fields.slug.replace(/^\/pages/, '');

    createPage({
      path,
      component: resolve('./src/templates/page.tsx'),
      context: { id: node.id },
    });
  });
};

const createPostRelatedPages: GatsbyCreatePage = async (args) => {
  const {
    actions: { createPage },
    graphql,
  } = args;
  const postQuery = await graphql<
    GraphQLQueryResults<{
      edges: Array<{
        node: PostPropsType;
      }>;
    }>
  >(`
    {
      allMarkdownRemark(
        filter: { fields: { type: { eq: "post" } } }
        sort: { fields: fields___date, order: DESC }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  createPagePerItem({
    createPage,
    component: resolve('./src/templates/post.tsx'),
    items: postQuery.data?.allMarkdownRemark.edges,
    itemToPath: 'node.fields.slug',
    itemToId: 'node.id',
  });

  paginate({
    createPage,
    items: postQuery.data?.allMarkdownRemark.edges,
    itemsPerPage: 10,
    pathPrefix: ({ pageNumber }: { pageNumber: number }) =>
      pageNumber === 0 ? AppPaths.blog : AppPaths.blogPaginated,
    component: resolve('./src/templates/posts.tsx'),
    context: { ids: map(postQuery.data?.allMarkdownRemark.edges, 'node.id') },
  });

  const categoriesQuery = await graphql<
    GraphQLQueryResults<{
      group: Array<{
        name: string;
      }>;
    }>
  >(`
    {
      allMarkdownRemark {
        group(field: frontmatter___categories) {
          name: fieldValue
        }
      }
    }
  `);

  const categoryNames = (
    categoriesQuery.data?.allMarkdownRemark.group || []
  ).map(({ name }) => name);

  // eslint-disable-next-line no-restricted-syntax
  for (const categoryName of categoryNames) {
    const categoryQuery = await graphql<
      GraphQLQueryResults<{
        edges: BaseNodeType[];
      }>
    >(`
      {
        allMarkdownRemark(
          filter: {frontmatter: {categories: {in: "${categoryName}"}}},
          sort: {fields: fields___date, order: DESC}
        ) {
          edges {
            node {
              id
            }
          }
        }
      }`);

    paginate({
      createPage,
      items: categoryQuery.data?.allMarkdownRemark.edges || [],
      itemsPerPage: 10,
      pathPrefix: ({ pageNumber }: { pageNumber: number }) =>
        pageNumber === 0
          ? `${AppPaths.category}/${categoryName}`
          : `${AppPaths.category}/${categoryName}/page`,
      component: resolve('./src/templates/posts.tsx'),
      context: {
        ids: map(categoryQuery.data?.allMarkdownRemark.edges, 'node.id'),
      },
    });
  }

  const tags = await getTags(graphql);
  // eslint-disable-next-line no-restricted-syntax
  for (const { name } of tags) {
    const tagQuery = await graphql<
      GraphQLQueryResults<{
        edges: BaseNodeType[];
      }>
    >(`
      {
        allMarkdownRemark(
          filter: {frontmatter: {tags: {in: "${name}"}}},
          sort: {fields: fields___date, order: DESC}
        ) {
          edges {
            node {
              id
            }
          }
        }
      }`);

    paginate({
      createPage,
      items: tagQuery.data?.allMarkdownRemark.edges || [],
      itemsPerPage: 10,
      pathPrefix: ({ pageNumber }: { pageNumber: number }) =>
        pageNumber === 0
          ? `${AppPaths.tag}/${name}`
          : `${AppPaths.tag}/${name}/page`,
      component: resolve('./src/templates/posts.tsx'),
      context: { ids: map(tagQuery.data?.allMarkdownRemark.edges, 'node.id') },
    });
  }
};

export const createPages: GatsbyCreatePage = async (args) => {
  await createArchivePage(args);
  await createMarkdownPages(args);
  await createPostRelatedPages(args);
};
