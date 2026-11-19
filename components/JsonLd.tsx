/**
 * Structured data as a native <script> (Next.js JSON-LD guide). `<` is escaped so a string
 * in the data can never close the script tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
