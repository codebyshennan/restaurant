const useViewport = () => {
  const [height, setHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    const handleWindowResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return { height };
}