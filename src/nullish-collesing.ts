const falsyValue = false || 0 || -0 || NaN || '' || null || undefined;

// Nullish Coalescing

type Person = {
  name?: string;
  address?: string;
};

const person: Person = {};
const addr1 = person.address ?? 'unknown';

//======================================================
// Or operator
const addr2 = person.address || 'unknown';

//======================================================
// Other demos for Nullish Coalescing
const example1 = null ?? 'n/a';
// "n/a"

const example2 = undefined ?? 'n/a';
// "n/a"

const example3 = false ?? true;
// false

const example4 = 0 ?? 100;
// 0

const example5 = '' ?? 'n/a';
// ""

const example6 = NaN ?? 0;
// NaN

// Other demos for Or Operator

const example7 = false || true;
// true

const example8 = 0 || 100;
// 100

const example9 = '' || 'n/a';
// "n/a"

const example10 = NaN || 0;
// 0

//======================================================
// an example in real world
type Options = {
  prettyPrint?: boolean;
};

function serializeJSON(value: unknown, options: Options): string {
  const prettyPrint = options.prettyPrint || true;
  // ...
  return 'TODO...';
}

serializeJSON(value, { prettyPrint: false });
