import { usePageData } from '@rspress/runtime';
import dayjs from 'dayjs';
import './index.css'


interface ArchivePageInfo {
  year: number;
  month: number;
  day: number;
  date: number;
  url: string;
  title: string;
}

const Page = () => {
  const { siteData: { pages } } = usePageData()

  const posts: ArchivePageInfo[] = pages
    .filter(({ frontmatter: { pageType } }) => (pageType === undefined || pageType === 'blog') )
    .map(({ title, routePath, frontmatter: { date } }) => {
      const d = dayjs(date)
      return {
        year: d.get('year'),
        month: d.get('month'),
        day: d.get('day'),
        date: d.valueOf(),
        url: routePath,
        title
      }
    })

  posts.sort((a, b) => b.date - a.date)

  const postsByYear = posts.reduce((acc, post) => {
    if (!acc[post.year]) {
      acc[post.year] = []
    }
    acc[post.year].push(post)
    return acc
  }, {} as Record<number, typeof posts>)

  // 获取年份并降序排序
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a) // 年份从新到旧

  return (
    <div className="blog-archive">
      {years.map(year => (
        <div key={year} className="year-section">
          <h2 className="year-title">{year} 年</h2>
          <ul className="post-list">
            {postsByYear[year].map((post, index) => (
              <li key={index} className="post-item">
                <a
                  href={post.url}
                  className="post-link"
                >
                  <span className="post-date">
                    {dayjs(post.date).format('MM-DD')}
                  </span>
                  <span className="post-title">{post.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Page