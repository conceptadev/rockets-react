const isMobile =
  /Android|BlackBerryi|iPhone|iPad|iPodi|Opera Minii|IEMobilei|WPDesktop/i.test(
    navigator.userAgent,
  );

export { isMobile };
