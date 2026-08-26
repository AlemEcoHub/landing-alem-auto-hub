// Road markings between sections — fills the gap that used to be empty space
// and keeps the sections visually separated now that they share one surface.
export default function SectionDivider() {
  return (
    <div className="container-x" aria-hidden>
      <div className="section-divider" />
    </div>
  );
}
