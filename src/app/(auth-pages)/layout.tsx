export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="frame flex flex-col gap-12 items-start">{children}</div>
  );
}
