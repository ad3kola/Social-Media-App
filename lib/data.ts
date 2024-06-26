import {NavLinksProps} from '@/lib/typings'

import {
    HomeIcon, BookmarkIcon, SquaresPlusIcon, UserGroupIcon, Cog8ToothIcon, HeartIcon, UserMinusIcon,
} from '@heroicons/react/24/outline'
export const LeftNavLinks: NavLinksProps[] = [
  { title: "Home", Icon: HomeIcon, path: '/' },
  { title: "Bookmarked", Icon: BookmarkIcon, path: '/bookmark' },
  { title: "Communities", Icon: UserGroupIcon, path: '/communities' },
  { title: "Create Post", Icon: SquaresPlusIcon, path: '/create-post' },
  { title: "Liked Posts", Icon: HeartIcon, path: '/liked-posts' },
  { title: "Settings & Privacy", Icon: Cog8ToothIcon, path: '/settings' },
];
export const BottomNavLinks = [
  { title: "Home", Icon: HomeIcon, path: '/' },
  { title: "Bookmarked", Icon: BookmarkIcon, path: '/bookmark' },
  { title: "Create Post", Icon: SquaresPlusIcon, path: '/create-post' },
  { title: "Liked Posts", Icon: HeartIcon, path: '/liked-posts' },
  { title: "Communities", Icon: UserGroupIcon, path: '/communities' },
  { title: "Settings & Privacy", Icon: Cog8ToothIcon, path: '/settings' },
];
