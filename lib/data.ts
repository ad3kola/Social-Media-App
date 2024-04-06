import {NavLinksProps} from '@/lib/typings'

import {
    HomeIcon, BookmarkIcon, SquaresPlusIcon, UserGroupIcon, Cog8ToothIcon, HeartIcon, UserMinusIcon,
} from '@heroicons/react/24/outline'
export const LeftNavLinks: NavLinksProps[] = [
  { title: "Home", Icon: HomeIcon, path: '/' },
  { title: "Bookmarked", Icon: BookmarkIcon, path: '/' },
  { title: "Communities", Icon: UserGroupIcon, path: '/' },
  { title: "Create Post", Icon: SquaresPlusIcon, path: '/create-post' },
  { title: "Liked Posts", Icon: HeartIcon, path: '/' },
  { title: "Settings & Privacy", Icon: Cog8ToothIcon, path: '/' },
];
export const BottomNavLinks = [
  { title: "Home", Icon: HomeIcon, path: '/' },
  { title: "Bookmarked", Icon: BookmarkIcon, path: '/' },
  { title: "Create Post", Icon: SquaresPlusIcon, path: '/create-post' },
  { title: "Liked Posts", Icon: HeartIcon, path: '/' },
  { title: "Communities", Icon: UserGroupIcon, path: '/' },
  { title: "Settings & Privacy", Icon: Cog8ToothIcon, path: '/' },
];
