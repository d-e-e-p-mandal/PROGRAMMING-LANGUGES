import BookWrapper from "./BookWrapper";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BookWrapper>{children}</BookWrapper>;
}