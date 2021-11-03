import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'
import { BellIcon, HomeIcon, MenuIcon, UserGroupIcon, XIcon } from '@heroicons/react/outline'
import { getEmail, getUid, getUser } from '../Utils/Common';


const user = {
  name: getUser(),
  email: getEmail(),
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Lists', href: '#', icon: UserGroupIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '/profile/'+getUid() },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/logout' },
]
const lists = [
  { name: 'Food', href: '#' },
  { name: 'Sports', href: '#' },
  { name: 'Gaming', href: '#' },
]
const tabs = [
  { name: 'Global', href: '#', current: true },
  { name: 'Feed 1', href: '#', current: false },
  { name: 'Feed 2', href: '#', current: false },
]

const posts = [
  {
    id: '81614',
    likes: '29',
    replies: '11',
    views: '2.7k',
    user: {
      name: 'Dries Vincent',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    date: 'December 9 at 11:43 AM',
    datetime: '2020-12-09T11:43:00',
    href: '#',
    title: 'What would you have done differently if you ran Jurassic Park?',
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
      <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;</p>
    `,
  },
  // More questions...
]
const whoToLock = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]
const trendingPosts = [
  {
    id: 1,
    user: {
      name: 'Floyd Miles',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
    comments: 291,
  },
  // More posts...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Dashboardz(props: { history: string[]; }) {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-white shadow-sm lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="">
                    <svg aria-label="Home" className="block h-8 w-auto sm:w-auto" id="logo" enable-background="new 0 0 300 300" viewBox="0 0 601 572"><path d="M549.528 354.832C587.161 317.204 549.528 231.128 549.528 163.867C549.528 96.6061 525.301 139.644 473.555 87.9045C421.81 36.1652 428.395 77.7918 374.533 23.936C320.67 -29.9199 277.627 23.936 199.773 23.936C121.684 23.936 59.824 163.867 59.824 163.867C-93.5319 163.867 104.278 326.611 38.4201 392.461C-27.4383 458.311 108.277 462.309 183.544 537.566C258.81 612.823 342.309 537.566 438.98 537.566C535.886 537.566 417.576 427.267 549.293 427.267C681.48 427.502 511.894 392.461 549.528 354.832ZM426.043 357.184C359.715 357.184 419.222 412.686 370.534 412.686C321.846 412.686 279.744 450.55 241.875 412.686C204.007 374.822 135.561 372.706 168.725 339.546C201.89 306.385 102.397 224.308 179.545 224.308C179.545 224.308 210.593 153.755 250.108 153.755C289.387 153.755 311.026 126.709 338.075 153.755C365.124 180.8 361.831 159.869 387.94 185.974C414.048 212.079 426.278 190.442 426.278 224.308C426.278 258.174 445.33 301.447 426.278 320.496C406.991 339.546 492.372 357.184 426.043 357.184Z"></path></svg>
                    </a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">

                  <a
                    href="#"
                    className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>

                  {/* Profile dropdown */}
                  <Menu as="div" className="flex-shrink-0 relative ml-5">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block py-2 px-4 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <a
                    href="#"
                    className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    New Post
                  </a>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700"
                >
                  New Post
                </a>

                <div className="mt-6 flex justify-center">
                  <a href="#" className="text-base font-medium text-gray-900 hover:underline">
                    Go Premium
                  </a>
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
              <div className="pb-8 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
              <div className="pt-10">
                <p
                  className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  id="lists-headline"
                >
                  My lists
                </p>
                <div className="mt-3 space-y-2" aria-labelledby="lists-headline">
                  {lists.map((list) => (
                    <a
                      key={list.name}
                      href={list.href}
                      className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      <span className="truncate">{list.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
            <div className="px-4 sm:px-0">
              <div className="sm:hidden">
                <label htmlFor="question-tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="question-tabs"
                  className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  defaultValue="DEFAULT AHHA"
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                  {tabs.map((tab, tabIdx) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      aria-current={tab.current ? 'page' : undefined}
                      className={classNames(
                        tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                        tabIdx === 0 ? 'rounded-l-lg' : '',
                        tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                        'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                      )}
                    >
                      <span>{tab.name}</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          tab.current ? 'bg-rose-500' : 'bg-transparent',
                          'absolute inset-x-0 bottom-0 h-0.5'
                        )}
                      />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="sr-only">Recent posts</h1>
              <ul role="list" className="space-y-4">
                {posts.map((post) => (
                  <li key={post.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
                    <article aria-labelledby={'post-title-' + post.id}>
                      <div>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={post.user
                              .imageUrl} alt="" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              <a href={post.user.href} className="hover:underline">
                                {post.user.name}
                              </a>
                            </p>
                            <p className="text-sm text-gray-500">
                              <a href={post.href} className="hover:underline">
                                <time dateTime={post.datetime}>{post.date}</time>
                              </a>
                            </p>
                          </div>
                          <div className="flex-shrink-0 self-center flex">
                            <Menu as="div" className="relative inline-block text-left">
                              <div>
                                <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                  <span className="sr-only">Open options</span>
                                  <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex px-4 py-2 text-sm'
                                          )}
                                        >
                                          <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                          <span>Add to favorites</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex px-4 py-2 text-sm'
                                          )}
                                        >
                                          <CodeIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                          <span>Embed</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex px-4 py-2 text-sm'
                                          )}
                                        >
                                          <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                          <span>Report content</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                        <h2 id={'question-title-' + post.id} className="mt-4 text-base font-medium text-gray-900">
                          {post.title}
                        </h2>
                      </div>
                      <div
                        className="mt-2 text-sm text-gray-700 space-y-4"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                      />
                      <div className="mt-6 flex justify-between space-x-8">
                        <div className="flex space-x-6">
                          <span className="inline-flex items-center text-sm">
                            <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">{post.likes}</span>
                              <span className="sr-only">likes</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">{post.replies}</span>
                              <span className="sr-only">replies</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <EyeIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">{post.views}</span>
                              <span className="sr-only">views</span>
                            </button>
                          </span>
                        </div>
                        <div className="flex text-sm">
                          <span className="inline-flex items-center text-sm">
                            <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <ShareIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">Share</span>
                            </button>
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-4 space-y-4">
              <section aria-labelledby="who-to-follow-heading">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <h2 id="who-to-follow-heading" className="text-base font-medium text-gray-900">
                      Who to Lock
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul className="-my-4 divide-y divide-gray-200">
                        {whoToLock.map((user) => (
                          <li key={user.handle} className="flex items-center py-4 space-x-3">
                            <div className="flex-shrink-0">
                              <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                <a href={user.href}>{user.name}</a>
                              </p>
                              <p className="text-sm text-gray-500">
                                <a href={user.href}>{'@' + user.handle}</a>
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                              >
                                <PlusIcon className="-ml-1 mr-0.5 h-5 w-5 text-rose-400" aria-hidden="true" />
                                <span>Follow</span>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </section>
              <section aria-labelledby="trending-heading">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <h2 id="trending-heading" className="text-base font-medium text-gray-900">
                      Trending
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul role="list" className="-my-4 divide-y divide-gray-200">
                        {trendingPosts.map((post) => (
                          <li key={post.id} className="flex py-4 space-x-3">
                            <div className="flex-shrink-0">
                              <img className="h-8 w-8 rounded-full" src={post.user.imageUrl} alt={post.user.name} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-800">{post.body}</p>
                              <div className="mt-2 flex">
                                <span className="inline-flex items-center text-sm">
                                  <button
                                    type="button"
                                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                  >
                                    <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                                    <span className="font-medium text-gray-900">{post.comments}</span>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
    );
}

export default Dashboardz;