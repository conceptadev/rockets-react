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

| Name | Type | Description | Optional |
| --- | --- | --- | --- |
| key | `string` | Identifier used to enforce re-render and internal state change upon [reconciliation](https://legacy.reactjs.org/docs/reconciliation.html). | Yes
| children | `node` | Child nodes rendered inside the Main component. | No

## AppBar.Drawer

The list of the app routes rendered as a vertical navigation list on the Drawer component.

### Props

| Name | Type | Description | Optional |
| --- | --- | --- | --- |
| items | `object[]` | Array containing information about the pages listed on the drawer. | No
| currentId | `string` | Identifier for the current path, changing the menu item to active when the page selected corresponds to the path name. | Yes
| customToggle | `string` | Custom node that can be rendered on the bottom of the Drawer, serving as toggle for expanded/collapsed state. | Yes
| mobileIsOpen | `string` | Identifier for open state on mobile. | Yes
| onMobileClose | `function` | Handler for Drawer closing action on mobile. | Yes
| logo | `string` | Source for an image logo file. | Yes
| textProps | `object` | Style props for the text rendered by Drawer items. | Yes
| sx | `object` or `object[]` | Object or array containing custom styles, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern. | Yes
| buttonSx | `object` or `object[]` | Object or array containing custom styles for each item button, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern. | Yes
| horizontal | `boolean` | Flag for rendering Drawer each item with text on the bottom or on the side. | Yes
| collapsible | `boolean` | Boolean value that tells if the drawer should have a fixed width or the possibility to expand. | Yes
| collapsibleIcon | `node` | Custom icon to display on collapsed/expanded toggle button. | Yes
| collapsibleIconColor | `string` | Custom color for the collapsed toggle icon. | Yes
| collapsibleIconBgColor | `string` | Custom background color for the collapsed toggle icon. | Yes
| collapsed | `boolean` | Boolean value that tells if the drawer is collapsed. | Yes
| onCollapsedChange | `function` | Handler for collapse/expand action. | Yes
| backgroundColor | `string` | Custom background color for the Drawer component. | Yes
| iconColor | `string` | Custom color for the Drawer items. | Yes
| activeIconColor | `string` | Custom color for the Drawer items when it is in active state. | Yes
| collapsedWidth | `string` or `number` | Custom width of the Drawer when it is on collapsed state. | Yes
| expandedWidth | `string` or `number` | Custom width of the Drawer when it is on expanded state. | Yes

## AppBar.Main

The Main component serves as a wrapper for the navigation bar and page content.

### Props

| Name | Type | Description | Optional |
| --- | --- | --- | --- |
| sx | `object` or `object[]` | Object or array containing custom styles, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern. | Yes
| children | `node` | Content rendered by the page. | Yes

> The AppBar.Main props extend from [Material UI's `Box`](https://mui.com/material-ui/api/box/#props) component props, so every prop is interchangeable between those two.

## AppBar.Nav

The Nav component renders the user info (Avatar and Name) and a list of actions related to user and auth, such as Logout.

### Props

| Name | Type | Description | Optional |
| --- | --- | --- | --- |
| drawerToggle | `function` | Handler for click events on the Menu button. | Yes
| showNotifications | `boolean` |  Flag for showing or hiding the notifications indicator. | Yes
| notificationsNumber | `number` | Indicator for notifications counter. | Yes
| notificationsOnClick | `function` | Handler for click events on the notifications indicator. | Yes
| avatar | `string` | Source of the user profile picture. | Yes
| text | `string` | String that can contain the current user name or username. | Yes
| subText | `string` | String rendered below the _text_ content. | Yes
| headerMenuOptions | `object[]` | List of menu actions. | Yes
| sx | `object` or `object[]` | Object or array containing custom styles, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern. | Yes
