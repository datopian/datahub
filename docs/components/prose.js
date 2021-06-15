export default function Prose({
  children,
  mdFile=null
}) {
  return (
    <main className="prose mx-auto my-24">
      {mdFile &&
        <div dangerouslySetInnerHTML={{ __html: mdFile }} />
      }
      {children}
    </main>
  )
}
