(() => {
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const sign = n => n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`;
  const formatNumber = n => Number.isInteger(n) ? String(n).replace('-', '−') : String(Number(n.toFixed(2))).replace('-', '−');
  const formatFraction = (n, d) => {
    if (d === 1) return formatNumber(n);
    const common = gcd(n, d);
    return `${formatNumber(n / common)}/${d / common}`;
  };
  const uniqueRoots = (a, b, c) => {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return [];
    const rootA = (-b + Math.sqrt(discriminant)) / (2 * a);
    const rootB = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [...new Set([rootA, rootB].map(value => Number(value.toFixed(6))))];
  };

  const generators = {
    solveX() {
      const x = randomInt(-9, 9);
      const a = randomInt(2, 9);
      const b = randomInt(-12, 12);
      const c = a * x + b;
      return {
        prompt: `${a}x ${sign(b)} = ${c}`,
        answer: x,
        acceptable: [x],
        steps: [`Subtract ${formatNumber(b)} from both sides: ${a}x = ${c - b}`, `Divide both sides by ${a}: x = ${formatFraction(c - b, a)}`]
      };
    },
    proportion() {
      let a = randomInt(2, 12);
      let b = randomInt(2, 12);
      const scale = randomInt(2, 5);
      const c = b * scale;
      const d = a * scale;
      return {
        prompt: `${a}/${b} = x/${c}`,
        answer: d,
        acceptable: [d, d / c],
        steps: [`Cross multiply: ${a} · ${c} = ${b}x`, `Divide: x = ${formatFraction(a * c, b)} = ${d}`]
      };
    },
    factoring() {
      const roots = [randomInt(-8, 8), randomInt(-8, 8)];
      const r1 = roots[0];
      const r2 = roots[1];
      const b = -(r1 + r2);
      const c = r1 * r2;
      return {
        prompt: `x² ${sign(b)} ${sign(c) === '+ 0' ? '' : sign(c)} = 0`,
        answer: roots.sort((a, b) => a - b).join(', '),
        acceptable: roots.sort((a, b) => a - b),
        steps: [`Find factors of ${c} that add to ${b}`, `(x ${r1 <= 0 ? '+' : '−'} ${Math.abs(r1)})(x ${r2 <= 0 ? '+' : '−'} ${Math.abs(r2)}) = 0`, `Set each factor equal to zero: x = ${r1}, ${r2}`]
      };
    },
    quadraticFormula() {
      let a, b, c, roots;
      do {
        a = randomInt(1, 3);
        const r1 = randomInt(-7, 7);
        const r2 = randomInt(-7, 7);
        b = -a * (r1 + r2);
        c = a * r1 * r2;
        roots = uniqueRoots(a, b, c);
      } while (roots.length !== 2);
      const disc = b * b - 4 * a * c;
      return {
        prompt: `${a}x² ${sign(b)} ${sign(c)} = 0`,
        answer: roots.sort((a, b) => a - b).join(', '),
        acceptable: roots.sort((a, b) => a - b),
        steps: [`Identify a = ${a}, b = ${b}, c = ${c}`, `Compute the discriminant: b² − 4ac = ${disc}`, `Substitute: x = (−${b} ± √${disc}) / ${2 * a}`, `Solutions: x = ${roots.sort((a, b) => a - b).join(' or ')}`]
      };
    },
    completeSquare() {
      const r = randomInt(-6, 6);
      const h = -r;
      const k = randomInt(1, 8);
      const c = r * r + k;
      const offset = Math.sqrt(k);
      const roots = [r - offset, r + offset].sort((a, b) => a - b).map(formatNumber);
      return {
        prompt: `x² ${sign(-2 * r)} ${sign(c)} = 0`,
        answer: roots.join(', '),
        acceptable: [r - offset, r + offset].sort((a, b) => a - b),
        steps: [`Move the constant: x² ${sign(-2 * r)} = ${-c}`, `Add ${r * r} to complete the square`, `(x ${h < 0 ? '−' : '+'} ${Math.abs(h)})² = ${k}`, `Take the square root and solve: x = ${r} ± √${k}`, `Solutions: x = ${roots.join(' or ')}`]
      };
    },
    systems() {
      const x = randomInt(-5, 5);
      const y = randomInt(-5, 5);
      const a = randomInt(1, 4);
      const b = randomInt(1, 4);
      const c = randomInt(1, 4);
      const d = randomInt(1, 5);
      const e = a * x + b * y;
      const f = c * x + d * y;
      return {
        prompt: `${a}x ${sign(b)}y = ${e}\n${c}x ${sign(d)}y = ${f}`,
        answer: `(${x}, ${y})`,
        acceptable: [x, y],
        steps: [`Eliminate one variable using substitution or addition`, `Solve for x, then substitute to find y`, `The intersection is (${x}, ${y})`]
      };
    }
  };

  window.MathArcadeProblems = { generators, formatNumber };
})();
