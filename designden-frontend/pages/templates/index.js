import Layout from "@/components/Layout";
import Link from "next/link";

export default function TemplatesPage() {
  // sample data
  let nums = [];
  for (let i = 0; i < 10; i++) {
    nums[i] = i + 1;
  }
  // TODO: route "/templates/add" should be something like "/users/[id]/templates/add"
  return (
    <Layout>
      <h1>Templates</h1>
      <Link href="/templates/add">Post a new template</Link>
      <div>
        <input type="text" placeholder="Search" />
      </div>
      <ul>
        {nums.map((i) => (
          <li key={i}>Template {i}</li>
        ))}
      </ul>
    </Layout>
  );
}
