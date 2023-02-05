export default function Head() {
  return (
    <>
      <title>Travy</title>
      <meta name="description" content="Ask GPT-3 where to go this weekend." />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />

      {/* OG */}
      <meta property="og:url" content="https://www.travy.dev/" />
      <meta property="og:title" content="Travy" />
      <meta
        property="og:description"
        content="Ask GPT-3 where to go this weekend."
      />
      <meta property="og:image" content="https://www.travy.dev/logo.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Travy" />
      <meta
        name="twitter:swaxeiprion"
        content="Ask GPT-3 where to go this weekend."
      />
      <meta name="twitter:image" content="https://www.travy.dev/logo.png" />
      <meta name="twitter:site" content="@yhakamay" />
      <meta name="twitter:creator" content="@yhakamay" />
    </>
  );
}
