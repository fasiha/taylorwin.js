function prod(v) {
  let x = 1;
  for (let elt of v) {
    x *= elt;
  }
  return x;
};
function sum(v) {
  let x = 0;
  for (let elt of v) {
    x += elt
  };
  return x;
}
function range0f(n, f) { return Array.from(Array(n), (_, i) => f(i)); }
function range1(n) { return range0f(n, x => x + 1); }
function range1f(n, f) { return range0f(n, x => f(x + 1)); }

export default function taylorwin(N, nbar, sll) {
  const B = Math.pow(10, Math.abs(sll) / 20);
  const A = Math.log(B + Math.sqrt(B * B - 1)) / Math.PI;
  const σ2 = nbar * nbar / (A * A + (nbar - 0.5) * (nbar - 0.5));

  let fNumerator = m =>
      0.5 * Math.pow(-1, m + 1) *
      prod(range1f(nbar - 1,
                   i => 1 - (m * m / σ2) / (A * A + (i - 0.5) * (i - 0.5))));
  let fDenominator = m =>
      prod(range1(nbar - 1).filter(x => x != m).map(j => 1 - m * m / (j * j)));
  let F = range1f(nbar - 1, m => fNumerator(m) / fDenominator(m));

  return range0f(
      N, n => 1 +
              2 * sum(F.map((Fm, m_1) => Fm *
                                         Math.cos(2 * Math.PI * (m_1 + 1) / N *
                                                  (n - 0.5 * N + 0.5)))));
}
