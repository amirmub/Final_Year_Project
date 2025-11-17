function SkeletonLoader() {
  return (
    <div
      className="rounded-4"
      style={{
        height: "120px",
        background: "linear-gradient(90deg, #e2e5e7, #f8f9fa, #e2e5e7)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    ></div>
  );
}

export default SkeletonLoader;
