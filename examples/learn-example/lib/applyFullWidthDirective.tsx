export default function applyFullWidthDirective({
  Component,
  defaultWFull = true,
}) {
  return (props) => {
    const newProps = { ...props };

    let newClassName = newProps.className || "";
    if (newProps.fullWidth === true) {
      newClassName += " w-[90vw] ml-[calc(50%-45vw)] max-w-none";
    } else if (defaultWFull) {
      //  So that charts and tables will have the
      //  same width as the text content, but images
      //  can have its width set using the width prop
      newClassName += " w-full";
    }
    newProps.className = newClassName;

    return <Component {...newProps} />;
  };
}
