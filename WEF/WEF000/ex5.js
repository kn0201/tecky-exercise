function rnaTranscription(n) {
  n = n + "";
  rna = String(n)
    .replace(/G/g, "c")
    .replace(/C/g, "g")
    .replace(/T/g, "a")
    .replace(/A/g, "u");
  return (n = rna.toUpperCase());
}

console.log(rnaTranscription("GCTAGCT"));
