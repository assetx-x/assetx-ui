const News = ({ data, selector }) => {
  const posts = [
    {
      id: 1,
      title: 'Coming Soon',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
    },
    {
      id: 1,
      title: 'Coming Soon',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
    },
    {
      id: 1,
      title: 'Coming Soon',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
    },
    {
      id: 1,
      title: 'Coming Soon',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
    },
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
    },
    // More posts...
  ]
  return (
    <section className="mb-20 mt-6">
      <div className="mt-6">
        <div className="relative overflow-x ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-[780px]">
            <h3 className="text-xl font-semibold">
              News
            </h3>
            {posts.map((post) => (
              <article key={post?.id} className="flex max-w-xl flex-col items-start justify-between  border-b">
                <div className="group relative ">
                  <div className="flex justify-between items-center">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post?.href}>
                      <span className="absolute inset-0" />
                      {post?.title}
                    </a>
                  </h3>
                    <time dateTime={post?.datetime} className="text-gray-500">
                      {post?.date}
                    </time>
                  </div>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-500 font-light">{post.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;