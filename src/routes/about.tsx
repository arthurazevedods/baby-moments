import { createFileRoute } from "@tanstack/react-router";
import Colors from "../components/Colors";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <section className="container bg-base-100 flex flex-col mx-auto my-1 ">
      <Colors />
    </section>
  );
}
