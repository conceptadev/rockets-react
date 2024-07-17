import { AppBarMain } from './AppBarMain';
import { AppBarDrawer } from './AppBarDrawer';
import { AppBarNav } from './AppBarNav';
import { AppBarRoot } from './AppBarRoot';

/**
 * The AppBar component is a wrapper for the page content, that renders a
 * lateral menu containing the list of pages rendered by the app and a top
 * navigation bar containing information related to the current user with a
 * dropdown menu with a list of actions.
 *
 * It is composed by the {@link AppBarRoot}, {@link AppBarDrawer},
 * {@link AppBarMain} and {@link AppBarNav} components.
 *
 * A sandbox of this componet is available on our
 * [AppBar Story](https://storybook.rockets.tools/?path=/docs/appbar)
 *
 * @example The following example describes the full composition that mounts the AppBar component:
 *
 * ```tsx
 * import { AppBar } from '@concepta/react-material-ui';
 *
 * <AppBar.Root key={pathname}>
 *   <AppBar.Drawer
 *     currentId={pathname}
 *     logo="/logo.svg"
 *     collapsable
 *     items={[
 *       {
 *         id: '/users',
 *         icon: <GroupsOutlinedIcon />,
 *         text: 'Users',
 *         onClick: () => router.push('/users'),
 *       },
 *       {
 *         id: '/profile',
 *         icon: <PersonOutlinedIcon />,
 *         text: 'Profile',
 *         onClick: () => router.push('/profile'),
 *       },
 *     ]}
 *     expandedWidth={120}
 *   />
 *   <AppBar.Main>
 *     <AppBar.Nav
 *       text={user.fullName}
 *       avatar="https://source.unsplash.com/random"
 *       headerMenuOptions={(handleClose) => (
 *         <MenuItem
 *           onClick={() => {
 *             handleClose();
 *             doLogout();
 *             router.replace('/login');
 *           }}
 *         >
 *           Sign Out
 *         </MenuItem>
 *       )}
 *     />
 *     <Container>{children}</Container>
 *   </AppBar.Main>
 * </AppBar.Root>;
 * ```
 *
 * @see {@link AppBarMain}
 * @see {@link AppBarDrawer}
 * @see {@link AppBarNav}
 * @see {@link AppBarRoot}
 * @see [Storybook - AppBar](https://storybook.rockets.tools/?path=/docs/appbar)
 */
export const AppBar = {
  Main: AppBarMain,
  Drawer: AppBarDrawer,
  Nav: AppBarNav,
  Root: AppBarRoot,
};
