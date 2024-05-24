# AppBar

The AppBar component is a wrapper for the page content, that renders a lateral menu containing the list of pages rendered by the app and a top navigation bar containing information related to the current user with a dropdown menu with a list of actions. It is composed by the `ApBar.Root`, `AppBar.Drawer`, `AppBar.Main` and `AppBar.Nav` components.

## AppBar.Root

The Root component acts as a wrapper for the context shared by the other parts of the AppBar.

### Props

#### key

identifier used to force re-render on reconciliation

#### children

child nodes rendered by the component

## AppBar.Drawer

The list of routes of the app is rendered as a vertical list on the Drawer component.

### Props

#### currentId

identifier for the current path, changing the menu item to active when the page selected corresponds to the path name

#### logo

source for an image logo file

#### collapsible

boolean value that tells if the drawer should have a fixed width or the possibility to expand

#### items

array containing information about the pages listed on the drawer

## AppBar.Main

The Main component serves as a wrapper for the navigation bar and page content.

### Props

#### sx

object or array containing custom styles

#### children

content rendered by the page

## AppBar.Nav

Lorem ipsum dolor sit amet

### Props

#### text

string that can contain the current user name or username

#### avatar

source of the user profile picture

#### headerMenuOptions

list of menu actions

## Example

The following example describes the full composition that mounts the AppBar component:

```tsx
import { AppBar } from '@concepta/react-material-ui';

<AppBar.Root key={pathname}>
  <AppBar.Drawer
    currentId={pathname}
    logo="/logo.svg"
    collapsable
    items={[
      {
        id: '/users',
        icon: <GroupsOutlinedIcon />,
        text: 'Users',
        onClick: () => router.push('/users'),
      },
      {
        id: '/profile',
        icon: <PersonOutlinedIcon />,
        text: 'Profile',
        onClick: () => router.push('/profile'),
      },
    ]}
    expandedWidth={120}
  />
  <AppBar.Main>
    <AppBar.Nav
      text={user.fullName}
      avatar="https://source.unsplash.com/random"
      headerMenuOptions={(handleClose) => (
        <MenuItem
          onClick={() => {
            handleClose();
            doLogout();
            router.replace('/login');
          }}
        >
          Sign Out
        </MenuItem>
      )}
    />
    <Container>{children}</Container>
  </AppBar.Main>
</AppBar.Root>;
```
