export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <section>
      <div className="frame">My Post: {slug}</div>
    </section>
  );
}
