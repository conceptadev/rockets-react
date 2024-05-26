# AppBar

The AppBar component is a wrapper for the page content, that renders a lateral menu containing the list of pages rendered by the app and a top navigation bar containing information related to the current user with a dropdown menu with a list of actions. It is composed by the `ApBar.Root`, `AppBar.Drawer`, `AppBar.Main` and `AppBar.Nav` components.

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

## AppBar.Root

The Root component acts as a wrapper for the context API shared with the other parts of the AppBar composition.

### Props

#### key

Identifier used to enforce re-render and internal state change upon [reconciliation](https://legacy.reactjs.org/docs/reconciliation.html).

**Type**: `string`

#### children

Child nodes rendered inside the Main component.

**Type**: `node`

## AppBar.Drawer

The list of the app routes rendered as a vertical navigation list on the Drawer component.

### Props

#### items

Array containing information about the pages listed on the drawer.

**Type**: `object[]`

#### currentId

Identifier for the current path, changing the menu item to active when the page selected corresponds to the path name.

**Type**: `string`

#### customToggle

Custom node that can be rendered on the bottom of the Drawer, serving as toggle for expanded/collapsed state.

**Type**: `string`

#### mobileIsOpen

Identifier for open state on mobile.

**Type**: `string`

#### onMobileClose

Handler for Drawer closing action on mobile.

**Type**: `string`

#### logo

Source for an image logo file.

**Type**: `string`

#### textProps

Style props for the text rendered by Drawer items.

**Type**: `string`

#### sx

Object or array containing custom styles, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern.

**Type**: `object` or `object[]`

#### buttonSx

Object or array containing custom styles for each item button, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern.

**Type**: `object` or `object[]`

#### horizontal

Flag for rendering Drawer each item with text on the bottom or on the side.

**Type**: `boolean`

#### collapsible

Boolean value that tells if the drawer should have a fixed width or the possibility to expand.

**Type**: `boolean`

#### collapsibleIcon

Custom icon to display on collapsed/expanded toggle button.

**Type**: `node`

#### collapsibleIconColor

Custom color for the collapsed toggle icon.

**Type**: `string`

#### collapsibleIconBgColor

Custom background color for the collapsed toggle icon.

**Type**: `string`

#### collapsed

Boolean value that tells if the drawer is collapsed.

**Type**: `boolean`

#### onCollapsedChange

Handler for collapse/expand action.

**Type**: `function`

#### backgroundColor

Custom background color for the Drawer component.

**Type**: `string`

#### iconColor

Custom color for the Drawer items.

**Type**: `string`

#### activeIconColor

Custom color for the Drawer items when it is in active state.

**Type**: `boolean`

#### collapsedWidth

Custom witdh of the Drawer when it is on collapsed state.

**Type**: `string` or `number`

#### expandedWidth

Custom witdh of the Drawer when it is on expanded state.

**Type**: `string` or `number`

## AppBar.Main

The Main component serves as a wrapper for the navigation bar and page content.

### Props

#### sx

Object or array containing custom styles, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern.

**Type**: `object` or `object[]`

#### children

Content rendered by the page.

> The AppBar.Main props extend from [Material UI's `Box`](https://mui.com/material-ui/api/box/#props) component props, so every prop is interchangeable between those two.

**Type**: `node`

## AppBar.Nav

The Nav component renders the user info (Avatar and Name) and a list of actions related to user and auth, such as Logout.

### Props

#### drawerToggle

Handler for click events on the Menu button.

**Type**: `function`

#### showNotifications

Flag for showing or hiding the notifications inficator.

**Type**: `boolean`

#### notificationsNumber

Indicator for notifications counter.

**Type**: `number`

#### notificationsOnClick

Handler for click events on the notifications indicator.

**Type**: `function`

#### avatar

Source of the user profile picture.

**Type**: `string`

#### text

String that can contain the current user name or username.

**Type**: `string`

#### subText

String rendered below the _text_ content.

**Type**: `string`

#### headerMenuOptions

List of menu actions.

**Type**: `object[]`

#### sx

Object or array containing custom styles, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern.

**Type**: `object` or `object[]`
