// import Comment from '@/components/Comment'
// import replaceSearchResult from '@/components/Mark'
// import NotionPage from '@/components/NotionPage'
// import ShareBar from '@/components/ShareBar'
// import { siteConfig } from '@/lib/config'
// import { useGlobal } from '@/lib/global'
// import { isBrowser } from '@/lib/utils'
// import { Transition } from '@headlessui/react'
// import dynamic from 'next/dynamic'
// import SmartLink from '@/components/SmartLink'
// import { useRouter } from 'next/router'
// import { createContext, useContext, useEffect, useRef } from 'react'
// import ArticleAdjacent from './components/ArticleAdjacent'
// import ArticleCopyright from './components/ArticleCopyright'
// import { ArticleLock } from './components/ArticleLock'
// import ArticleRecommend from './components/ArticleRecommend'
// import BlogPostArchive from './components/BlogPostArchive'
// import BlogPostListPage from './components/BlogPostListPage'
// import BlogPostListScroll from './components/BlogPostListScroll'
// import ButtonJumpToComment from './components/ButtonJumpToComment'
// import ButtonRandomPostMini from './components/ButtonRandomPostMini'
// import Card from './components/Card'
// import Footer from './components/Footer'
// import Header from './components/Header'
// import Hero from './components/Hero'
// import PostHero from './components/PostHero'
// import RightFloatArea from './components/RightFloatArea'
// import SearchNav from './components/SearchNav'
// import SideRight from './components/SideRight'
// import SlotBar from './components/SlotBar'
// import TagItemMini from './components/TagItemMini'
// import TocDrawer from './components/TocDrawer'
// import TocDrawerButton from './components/TocDrawerButton'
// import CONFIG from './config'
// import { Style } from './style'

// const AlgoliaSearchModal = dynamic(
//   () => import('@/components/AlgoliaSearchModal'),
//   { ssr: false }
// )

// // 主题全局状态
// const ThemeGlobalHexo = createContext()
// export const useHexoGlobal = () => useContext(ThemeGlobalHexo)

// /**
//  * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
//  * @param props
//  * @returns {JSX.Element}
//  * @constructor
//  */
// const LayoutBase = props => {
//   const { post, children, slotTop, className } = props
//   const { onLoading, fullWidth } = useGlobal()
//   const router = useRouter()
//   const showRandomButton = siteConfig('HEXO_MENU_RANDOM', false, CONFIG)

//   const headerSlot = post ? (
//     <PostHero {...props} />
//   // ) : router.route === '/' &&
//   //   siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? (
//   //   <Hero {...props} />
//   ) : null

//   const drawerRight = useRef(null)
//   const tocRef = isBrowser ? document.getElementById('article-wrapper') : null

//   // 悬浮按钮内容
//   const floatSlot = (
//     <>
//       {post?.toc?.length > 1 && (
//         <div className='block lg:hidden'>
//           <TocDrawerButton
//             onClick={() => {
//               drawerRight?.current?.handleSwitchVisible()
//             }}
//           />
//         </div>
//       )}
//       {post && <ButtonJumpToComment />}
//       {showRandomButton && <ButtonRandomPostMini {...props} />}
//     </>
//   )

//   // Algolia搜索框
//   const searchModal = useRef(null)

//   return (
//     <ThemeGlobalHexo.Provider value={{ searchModal }}>
//       <div
//         id='theme-hexo'
//         className={`${siteConfig('FONT_STYLE')} dark:bg-black scroll-smooth`}>
//         <Style />

//         {/* 顶部导航 */}
//         <Header {...props} />

//         {/* 顶部嵌入 */}
//         <Transition
//           show={!onLoading}
//           appear={true}
//           enter='transition ease-in-out duration-700 transform order-first'
//           enterFrom='opacity-0 -translate-y-16'
//           enterTo='opacity-100'
//           leave='transition ease-in-out duration-300 transform'
//           leaveFrom='opacity-100'
//           leaveTo='opacity-0 translate-y-16'
//           unmount={false}>
//           {headerSlot}
//         </Transition>

//         {/* 主区块 */}
//         <main
//           id='wrapper'
//           className={`${siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? '' : 'pt-16'} bg-hexo-background-gray dark:bg-black w-full py-8 md:px-8 lg:px-24 min-h-screen relative`}>
//           <div
//             id='container-inner'
//             className={
//               (JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE'))
//                 ? 'flex-row-reverse'
//                 : '') +
//               ' w-full mx-auto lg:flex lg:space-x-4 justify-center relative z-10'
//             }>
//             <div
//               className={`${className || ''} w-full ${fullWidth ? '' : 'max-w-4xl'} h-full overflow-hidden`}>
//               <Transition
//                 show={!onLoading}
//                 appear={true}
//                 enter='transition ease-in-out duration-700 transform order-first'
//                 enterFrom='opacity-0 translate-y-16'
//                 enterTo='opacity-100'
//                 leave='transition ease-in-out duration-300 transform'
//                 leaveFrom='opacity-100 translate-y-0'
//                 leaveTo='opacity-0 -translate-y-16'
//                 unmount={false}>
//                 {/* 主区上部嵌入 */}
//                 {slotTop}

//                 {children}
//               </Transition>
//             </div>

//             {/* 右侧栏 */}
//             <SideRight {...props} />
//           </div>
//         </main>

//         <div className='block lg:hidden'>
//           <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
//         </div>

//         {/* 悬浮菜单 */}
//         <RightFloatArea floatSlot={floatSlot} />

//         {/* 全文搜索 */}
//         <AlgoliaSearchModal cRef={searchModal} {...props} />

//         {/* 页脚 */}
//         <Footer title={siteConfig('TITLE')} />
//       </div>
//     </ThemeGlobalHexo.Provider>
//   )
// }

// /**
//  * 首页
//  * 是一个博客列表，嵌入一个Hero大图
//  * @param {*} props
//  * @returns
//  */
// const LayoutIndex = props => {
//   return <LayoutPostList {...props} className='pt-8' />
// }

// /**
//  * 博客列表
//  * @param {*} props
//  * @returns
//  */
// const LayoutPostList = props => {
//   return (
//     <div className='pt-8'>
//       <SlotBar {...props} />
//       {siteConfig('POST_LIST_STYLE') === 'page' ? (
//         <BlogPostListPage {...props} />
//       ) : (
//         <BlogPostListScroll {...props} />
//       )}
//     </div>
//   )
// }

// /**
//  * 搜索
//  * @param {*} props
//  * @returns
//  */
// const LayoutSearch = props => {
//   const { keyword } = props
//   const router = useRouter()
//   const currentSearch = keyword || router?.query?.s

//   useEffect(() => {
//     if (currentSearch) {
//       replaceSearchResult({
//         doms: document.getElementsByClassName('replace'),
//         search: keyword,
//         target: {
//           element: 'span',
//           className: 'text-red-500 border-b border-dashed'
//         }
//       })
//     }
//   })

//   return (
//     <div className='pt-8'>
//       {!currentSearch ? (
//         <SearchNav {...props} />
//       ) : (
//         <div id='posts-wrapper'>
//           {' '}
//           {siteConfig('POST_LIST_STYLE') === 'page' ? (
//             <BlogPostListPage {...props} />
//           ) : (
//             <BlogPostListScroll {...props} />
//           )}{' '}
//         </div>
//       )}
//     </div>
//   )
// }

// /**
//  * 归档
//  * @param {*} props
//  * @returns
//  */
// const LayoutArchive = props => {
//   const { archivePosts } = props
//   return (
//     <div className='pt-8'>
//       <Card className='w-full'>
//         <div className='mb-10 pb-20 bg-white md:p-12 p-3 min-h-full dark:bg-hexo-black-gray'>
//           {Object.keys(archivePosts).map(archiveTitle => (
//             <BlogPostArchive
//               key={archiveTitle}
//               posts={archivePosts[archiveTitle]}
//               archiveTitle={archiveTitle}
//             />
//           ))}
//         </div>
//       </Card>
//     </div>
//   )
// }

// /**
//  * 文章详情
//  * @param {*} props
//  * @returns
//  */
// const LayoutSlug = props => {
//   const { post, lock, validPassword } = props
//   const router = useRouter()
//   const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
//   useEffect(() => {
//     // 404
//     if (!post) {
//       setTimeout(
//         () => {
//           if (isBrowser) {
//             const article = document.querySelector('#article-wrapper #notion-article')
//             if (!article) {
//               router.push('/404').then(() => {
//                 console.warn('找不到页面', router.asPath)
//               })
//             }
//           }
//         },
//         waiting404
//       )
//     }
//   }, [post])
//   return (
//     <>
//       <div className='w-full lg:hover:shadow lg:border rounded-t-xl lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray dark:border-black article'>
//         {lock && <ArticleLock validPassword={validPassword} />}

//         {!lock && post && (
//           <div className='overflow-x-auto flex-grow mx-auto md:w-full md:px-5 '>
//             <article
//               id='article-wrapper'
//               itemScope
//               itemType='https://schema.org/Movie'
//               className='subpixel-antialiased overflow-y-hidden'>
//               {/* Notion文章主体 */}
//               <section className='px-5 justify-center mx-auto max-w-2xl lg:max-w-full'>
//                 {post && <NotionPage post={post} />}
//               </section>

//               {/* 分享 */}
//               <ShareBar post={post} />
//               {post?.type === 'Post' && (
//                 <>
//                   <ArticleCopyright {...props} />
//                   <ArticleRecommend {...props} />
//                   <ArticleAdjacent {...props} />
//                 </>
//               )}
//             </article>

//             <div className='pt-4 border-dashed'></div>

//             {/* 评论互动 */}
//             <div className='duration-200 overflow-x-auto bg-white dark:bg-hexo-black-gray px-3'>
//               <Comment frontMatter={post} />
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// /**
//  * 404
//  * @param {*} props
//  * @returns
//  */
// const Layout404 = props => {
//   const router = useRouter()
//   const { locale } = useGlobal()
//   useEffect(() => {
//     // 延时3秒如果加载失败就返回首页
//     setTimeout(() => {
//       if (isBrowser) {
//         const article = document.querySelector('#article-wrapper #notion-article')
//         if (!article) {
//           router.push('/').then(() => {
//             // console.log('找不到页面', router.asPath)
//           })
//         }
//       }
//     }, 3000)
//   })
//   return (
//     <>
//       <div className='text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
//         <div className='dark:text-gray-200'>
//           <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>
//             404
//           </h2>
//           <div className='inline-block text-left h-32 leading-10 items-center'>
//             <h2 className='m-0 p-0'>{locale.COMMON.NOT_FOUND}</h2>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// /**
//  * 分类列表
//  * @param {*} props
//  * @returns
//  */
// const LayoutCategoryIndex = props => {
//   const { categoryOptions } = props
//   const { locale } = useGlobal()
//   return (
//     <div className='mt-8'>
//       <Card className='w-full min-h-screen'>
//         <div className='dark:text-gray-200 mb-5 mx-3'>
//           <i className='mr-4 fas fa-th' /> {locale.COMMON.CATEGORY}:
//         </div>
//         <div id='category-list' className='duration-200 flex flex-wrap mx-8'>
//           {categoryOptions?.map(category => {
//             return (
//               <SmartLink
//                 key={category.name}
//                 href={`/category/${category.name}`}
//                 passHref
//                 legacyBehavior>
//                 <div
//                   className={
//                     ' duration-300 dark:hover:text-white px-5 cursor-pointer py-2 hover:text-indigo-400'
//                   }>
//                   <i className='mr-4 fas fa-folder' /> {category.name}(
//                   {category.count})
//                 </div>
//               </SmartLink>
//             )
//           })}
//         </div>
//       </Card>
//     </div>
//   )
// }

// /**
//  * 标签列表
//  * @param {*} props
//  * @returns
//  */
// const LayoutTagIndex = props => {
//   const { tagOptions } = props
//   const { locale } = useGlobal()
//   return (
//     <div className='mt-8'>
//       <Card className='w-full'>
//         <div className='dark:text-gray-200 mb-5 ml-4'>
//           <i className='mr-4 fas fa-tag' /> {locale.COMMON.TAGS}:
//         </div>
//         <div id='tags-list' className='duration-200 flex flex-wrap ml-8'>
//           {tagOptions.map(tag => (
//             <div key={tag.name} className='p-2'>
//               <TagItemMini key={tag.name} tag={tag} />
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   )
// }

// export {
//   Layout404,
//   LayoutArchive,
//   LayoutBase,
//   LayoutCategoryIndex,
//   LayoutIndex,
//   LayoutPostList,
//   LayoutSearch,
//   LayoutSlug,
//   LayoutTagIndex,
//   CONFIG as THEME_CONFIG
// }

import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import ArticleAdjacent from './components/ArticleAdjacent'
import ArticleCopyright from './components/ArticleCopyright'
import { ArticleLock } from './components/ArticleLock'
import ArticleRecommend from './components/ArticleRecommend'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import ButtonJumpToComment from './components/ButtonJumpToComment'
import ButtonRandomPostMini from './components/ButtonRandomPostMini'
import Card from './components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import PostHero from './components/PostHero'
import RightFloatArea from './components/RightFloatArea'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import SlotBar from './components/SlotBar'
import TagItemMini from './components/TagItemMini'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

const ThemeGlobalHexo = createContext()
export const useHexoGlobal = () => useContext(ThemeGlobalHexo)

/**
 * 基础布局结构
 */
const LayoutBase = props => {
  const { post, children, slotTop, className } = props
  const { onLoading, fullWidth } = useGlobal()
  const router = useRouter()
  const showRandomButton = siteConfig('HEXO_MENU_RANDOM', false, CONFIG)

  // 只有在文章页才显示 PostHero，首页大图已被我们通过 LayoutIndex 自定义取代
  const headerSlot = post ? <PostHero {...props} /> : null

  const drawerRight = useRef(null)
  const tocRef = isBrowser ? document.getElementById('article-wrapper') : null

  const floatSlot = (
    <>
      {post?.toc?.length > 1 && (
        <div className='block lg:hidden'>
          <TocDrawerButton onClick={() => { drawerRight?.current?.handleSwitchVisible() }} />
        </div>
      )}
      {post && <ButtonJumpToComment />}
      {showRandomButton && <ButtonRandomPostMini {...props} />}
    </>
  )

  const searchModal = useRef(null)

  return (
    <ThemeGlobalHexo.Provider value={{ searchModal }}>
      <div id='theme-hexo' className={`${siteConfig('FONT_STYLE')} dark:bg-black scroll-smooth`}>
        <Style />
        <Header {...props} />

        {/* 顶部插槽（文章标题等） */}
        <Transition
          show={!onLoading}
          appear={true}
          enter='transition ease-in-out duration-700 transform order-first'
          enterFrom='opacity-0 -translate-y-16'
          enterTo='opacity-100'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='opacity-100'
          leaveTo='opacity-0 translate-y-16'
        >
          {headerSlot}
        </Transition>

        {/* 主内容区 */}
        <main id='wrapper' className='w-full min-h-screen relative'>
          <div id='container-inner' className={`${router.route === '/' ? '' : 'pt-16'} w-full mx-auto lg:flex lg:space-x-4 justify-center relative z-10`}>
            <div className={`${className || ''} w-full ${fullWidth ? '' : 'max-w-4xl'} h-full`}>
              <Transition
                show={!onLoading}
                appear={true}
                enter='transition ease-in-out duration-700 transform order-first'
                enterFrom='opacity-0 translate-y-16'
                enterTo='opacity-100'
              >
                {slotTop}
                {children}
              </Transition>
            </div>
            {/* 非首页显示右侧边栏 */}
            {router.route !== '/' && <SideRight {...props} />}
          </div>
        </main>

        <div className='block lg:hidden'>
          <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
        </div>
        <RightFloatArea floatSlot={floatSlot} />
        <AlgoliaSearchModal cRef={searchModal} {...props} />
        <Footer title={siteConfig('TITLE')} />
      </div>
    </ThemeGlobalHexo.Provider>
  )
}

/**
 * Singing Bowl 专属简约主页 - 强化居中版
 */
const LayoutIndex = props => {
  const { tagOptions } = props
  const siteBio = siteConfig('BIO') || 'Embodied AI | Large Language Models | Robotics Engineering @ ZJU'

  return (
    <div className="w-full min-h-screen flex flex-col items-center">

      {/* 1. 右上角导航 - 保持不动 */}
      <nav className="fixed top-8 right-8 z-30 hidden md:flex space-x-6 text-sm">
        {tagOptions?.slice(0, 5).map(tag => (
          <SmartLink key={tag.name} href={`/tag/${tag.name}`} className="text-gray-500 hover:text-[#00f2ff] transition-colors duration-300 font-mono">
            # {tag.name}
          </SmartLink>
        ))}
      </nav>

      {/* 2. 核心居中区域 - 占据 100% 视口高度并垂直居中 */}
      <div className="h-screen w-full flex flex-col justify-center items-center px-4 text-center">

        {/* Logo 组 - 居中 */}
        <div className="mb-10 flex justify-center space-x-10 text-[#00f2ff] opacity-70">
          <i className="fas fa-microchip text-4xl animate-pulse"></i>
          <i className="fas fa-robot text-4xl"></i>
          <i className="fas fa-brain text-4xl"></i>
        </div>

        {/* 主标题 - 强行对齐中轴线 */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 select-none">
          Singing Bowl 's <span className="text-[#00f2ff]">Blog</span>
        </h1>

        {/* 个人简介 - 限制宽度并居中 */}
        <div className="max-w-3xl flex flex-col items-center">
          <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed">
            {siteBio}
          </p>
          {/* 装饰线条 */}
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent my-8 opacity-30"></div>
          <p className="text-xs font-mono text-gray-600 tracking-[0.5em] uppercase">
            Embodied AI | Large Language Models | Robotics
          </p>
        </div>

        {/* 向下滚动箭头 - 居中靠底 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <i className="fas fa-chevron-down text-2xl text-white"></i>
        </div>
      </div>

      {/* 3. 文章列表区域 - 紧随其后 */}
      {/* <div className="w-full max-w-5xl px-4 py-20">
        <div className="flex items-center space-x-6 mb-20 opacity-20">
          <div className="h-[1px] flex-grow bg-white"></div>
          <span className="text-xs font-mono tracking-[0.3em] uppercase whitespace-nowrap">Latest Research Logs</span>
          <div className="h-[1px] flex-grow bg-white"></div>
        </div>
        <LayoutPostList {...props} />
      </div> */}

    </div>
  )
}

/**
 * 文章列表组件
 */
const LayoutPostList = props => {
  return (
    <div className='w-full'>
      <SlotBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}
    </div>
  )
}

/**
 * 其他页面布局（搜索、归档、详情、404等）
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s
  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: { element: 'span', className: 'text-red-500 border-b border-dashed' }
      })
    }
  })
  return (
    <div className='pt-8'>
      {!currentSearch ? <SearchNav {...props} /> : <div id='posts-wrapper'> <LayoutPostList {...props} /> </div>}
    </div>
  )
}

const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div className='pt-8'>
      <Card className='w-full'>
        <div className='mb-10 pb-20 bg-white md:p-12 p-3 min-h-full dark:bg-hexo-black-gray'>
          {Object.keys(archivePosts).map(archiveTitle => (
            <BlogPostArchive key={archiveTitle} posts={archivePosts[archiveTitle]} archiveTitle={archiveTitle} />
          ))}
        </div>
      </Card>
    </div>
  )
}

const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  useEffect(() => {
    if (!post) {
      setTimeout(() => {
        if (isBrowser && !document.querySelector('#notion-article')) router.push('/404')
      }, 3000)
    }
  }, [post])
  return (
    <div className='w-full lg:hover:shadow lg:border rounded-t-xl lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray dark:border-black article'>
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && post && (
        <div className='overflow-x-auto flex-grow mx-auto md:w-full md:px-5 '>
          <article id='article-wrapper' className='subpixel-antialiased'>
            <section className='px-5 justify-center mx-auto max-w-2xl lg:max-w-full'>
              <NotionPage post={post} />
            </section>
            <ShareBar post={post} />
            {post?.type === 'Post' && (
              <>
                <ArticleCopyright {...props} />
                <ArticleRecommend {...props} />
                <ArticleAdjacent {...props} />
              </>
            )}
          </article>
          <div className='pt-4 border-dashed'></div>
          <div className='duration-200 overflow-x-auto bg-white dark:bg-hexo-black-gray px-3'>
            <Comment frontMatter={post} />
          </div>
        </div>
      )}
    </div>
  )
}

const Layout404 = props => {
  const { locale } = useGlobal()
  return (
    <div className='text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
      <div className='dark:text-gray-200'>
        <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>404</h2>
        <div className='inline-block text-left h-32 leading-10 items-center'>
          <h2 className='m-0 p-0'>{locale.COMMON.NOT_FOUND}</h2>
        </div>
      </div>
    </div>
  )
}

const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full min-h-screen'>
        <div className='dark:text-gray-200 mb-5 mx-3'><i className='mr-4 fas fa-th' /> {locale.COMMON.CATEGORY}:</div>
        <div className='flex flex-wrap mx-8'>
          {categoryOptions?.map(category => (
            <SmartLink key={category.name} href={`/category/${category.name}`} className='px-5 py-2 hover:text-indigo-400'>
              <i className='mr-4 fas fa-folder' /> {category.name}({category.count})
            </SmartLink>
          ))}
        </div>
      </Card>
    </div>
  )
}

const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-8'>
      <Card className='w-full'>
        <div className='dark:text-gray-200 mb-5 ml-4'><i className='mr-4 fas fa-tag' /> {locale.COMMON.TAGS}:</div>
        <div className='flex flex-wrap ml-8'>
          {tagOptions.map(tag => <div key={tag.name} className='p-2'><TagItemMini tag={tag} /></div>)}
        </div>
      </Card>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
