# AppBar

```tsx
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
      text={(user as User)?.username || ''}
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
</AppBar.Root>
```
